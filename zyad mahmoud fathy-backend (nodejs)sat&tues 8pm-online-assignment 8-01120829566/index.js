const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./src/DB/connection');
const userRouter = require('./src/modules/user/user.routes');
const noteRouter = require('./src/modules/note/note.routes');

const app = express();
app.use(express.json());

connectDB();

app.use('/users', userRouter);
app.use('/notes', noteRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
