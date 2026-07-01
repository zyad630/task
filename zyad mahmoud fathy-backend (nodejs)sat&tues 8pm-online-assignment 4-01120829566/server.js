const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const usersFilePath = path.join(__dirname, "users.json");

function readUsers() {
  if (!fs.existsSync(usersFilePath)) {
    return [];
  }
  const fileContent = fs.readFileSync(usersFilePath, "utf8");
  if (!fileContent) {
    return [];
  }
  return JSON.parse(fileContent);
}

function writeUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

app.post("/user", (req, res) => {
  const { name, age, email } = req.body;
  const users = readUsers();

  let emailExists = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      emailExists = true;
      break;
    }
  }

  if (emailExists) {
    return res.status(400).json({ message: "Email already exists." });
  }

  let maxId = 0;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id > maxId) {
      maxId = users[i].id;
    }
  }
  const newId = maxId + 1;

  users.push({ id: newId, name, age, email });
  writeUsers(users);

  res.status(201).json({ message: "User added successfully." });
});

app.patch("/user/:id", (req, res) => {
  const id = Number(req.params.id);
  const users = readUsers();

  let userIndex = -1;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      userIndex = i;
      break;
    }
  }

  if (userIndex === -1) {
    return res.status(404).json({ message: "User ID not found." });
  }

  const { name, age, email } = req.body;

  if (email !== undefined) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email && users[i].id !== id) {
        return res.status(400).json({ message: "Email already exists." });
      }
    }
  }

  const updatedFields = [];
  if (name !== undefined) {
    users[userIndex].name = name;
    updatedFields.push("name");
  }
  if (age !== undefined) {
    users[userIndex].age = age;
    updatedFields.push("age");
  }
  if (email !== undefined) {
    users[userIndex].email = email;
    updatedFields.push("email");
  }

  writeUsers(users);

  if (updatedFields.length === 1) {
    res.status(200).json({ message: `User ${updatedFields[0]} updated successfully.` });
  } else {
    res.status(200).json({ message: "User updated successfully." });
  }
});

app.delete("/user/:id?", (req, res) => {
  const id = Number(req.params.id || req.body.id);
  const users = readUsers();

  let userIndex = -1;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      userIndex = i;
      break;
    }
  }

  if (userIndex === -1) {
    return res.status(404).json({ message: "User ID not found." });
  }

  users.splice(userIndex, 1);
  writeUsers(users);

  res.status(200).json({ message: "User deleted successfully." });
});

app.get("/user/getByName", (req, res) => {
  const name = req.query.name;
  const users = readUsers();

  for (let i = 0; i < users.length; i++) {
    if (users[i].name.toLowerCase() === name.toLowerCase()) {
      return res.status(200).json(users[i]);
    }
  }

  res.status(404).json({ message: "User name not found." });
});

app.get("/user/filter", (req, res) => {
  const minAge = Number(req.query.minAge);
  const users = readUsers();

  const result = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].age >= minAge) {
      result.push(users[i]);
    }
  }

  if (result.length === 0) {
    return res.status(404).json({ message: "no user found" });
  }

  res.status(200).json(result);
});

app.get("/user", (req, res) => {
  const users = readUsers();
  res.status(200).json(users);
});

app.get("/user/:id", (req, res) => {
  const id = Number(req.params.id);
  const users = readUsers();

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      return res.status(200).json(users[i]);
    }
  }

  res.status(404).json({ message: "User not found." });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
