"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = exports.UserWithNotebooks = exports.NoteBook = exports.Note = exports.Admin = exports.User = void 0;
// 1. Base Class - User
class User {
    id;
    name;
    email;
    password;
    phone;
    _age;
    constructor(id, name, email, password, phone, age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
    }
    get age() {
        return this._age;
    }
    set age(value) {
        if (value >= 18 && value <= 60) {
            this._age = value;
        }
        else {
            throw new Error("Age must be between 18 and 60");
        }
    }
    displayInfo() {
        console.log(`User [ID: ${this.id}] - Name: ${this.name}, Email: ${this.email}, Phone: ${this.phone}, Age: ${this.age}`);
    }
}
exports.User = User;
// 2. Inheritance - Admin User
class Admin extends User {
    constructor(id, name, email, password, phone, age) {
        super(id, name, email, password, phone, age);
    }
    manageNotes() {
        console.log(`Admin ${this.name} is managing system notes.`);
    }
}
exports.Admin = Admin;
// 3. Class - Note & 6. Association (Note and User)
class Note {
    id;
    title;
    content;
    author;
    constructor(id, title, content, author) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
    }
    preview() {
        return this.content.length > 20
            ? this.content.substring(0, 20) + "..."
            : this.content;
    }
}
exports.Note = Note;
// 4. Composition - NoteBook and Notes
class NoteBook {
    id;
    title;
    notes = [];
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }
    addNote(note) {
        this.notes.push(note);
    }
    removeNote(noteId) {
        this.notes = this.notes.filter((note) => note.id !== noteId);
    }
    getNotes() {
        return this.notes;
    }
}
exports.NoteBook = NoteBook;
// 5. Aggregation - User and Notebook
class UserWithNotebooks extends User {
    notebooks = [];
    constructor(id, name, email, password, phone, age) {
        super(id, name, email, password, phone, age);
    }
    addNotebook(notebook) {
        this.notebooks.push(notebook);
    }
    removeNotebook(notebookId) {
        this.notebooks = this.notebooks.filter((nb) => nb.id !== notebookId);
    }
}
exports.UserWithNotebooks = UserWithNotebooks;
// 7. Generics - Data Storage
class Storage {
    items = [];
    addItem(item) {
        this.items.push(item);
    }
    removeItem(item) {
        this.items = this.items.filter((i) => i !== item);
    }
    getAllItems() {
        return this.items;
    }
}
exports.Storage = Storage;
// --- Testing / Demo ---
console.log("===== Testing Assignment 15 =====");
// 1. User
const user1 = new User(1, "Zyad Mahmoud", "zyad@example.com", "pass123", "01120829566", 22);
user1.displayInfo();
// 2. Admin
const admin1 = new Admin(2, "Ahmed Ali", "admin@example.com", "adminPass", "01012345678", 32);
admin1.manageNotes();
// 3. Note & Association
const note1 = new Note(101, "OOP Intro", "TypeScript Object Oriented Programming summary and guide", user1);
console.log("Note Preview:", note1.preview());
// 4. NoteBook & Composition
const myNotebook = new NoteBook(1, "Backend Course");
myNotebook.addNote(note1);
console.log("Notes in Notebook:", myNotebook.getNotes().length);
// 5. User & Notebooks (Aggregation)
const userWithNb = new UserWithNotebooks(3, "Omar Khaled", "omar@example.com", "omar123", "01234567890", 25);
userWithNb.addNotebook(myNotebook);
console.log("Notebooks count for user:", userWithNb.notebooks.length);
// 7. Generic Storage
const stringStorage = new Storage();
stringStorage.addItem("First Note");
stringStorage.addItem("Second Note");
stringStorage.removeItem("First Note");
console.log("Storage items:", stringStorage.getAllItems());
