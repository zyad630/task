// 1. Base Class - User
export class User {
  public id: number;
  public name: string;
  public email: string;
  protected password: string;
  public phone: string;
  private _age!: number;

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.age = age;
  }

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    if (value >= 18 && value <= 60) {
      this._age = value;
    } else {
      throw new Error("Age must be between 18 and 60");
    }
  }

  displayInfo(): void {
    console.log(`User [ID: ${this.id}] - Name: ${this.name}, Email: ${this.email}, Phone: ${this.phone}, Age: ${this.age}`);
  }
}

// 2. Inheritance - Admin User
export class Admin extends User {
  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number
  ) {
    super(id, name, email, password, phone, age);
  }

  manageNotes(): void {
    console.log(`Admin ${this.name} is managing system notes.`);
  }
}

// 3. Class - Note & 6. Association (Note and User)
export class Note {
  public id: number;
  public title: string;
  public content: string;
  public author: User;

  constructor(id: number, title: string, content: string, author: User) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
  }

  preview(): string {
    return this.content.length > 20
      ? this.content.substring(0, 20) + "..."
      : this.content;
  }
}

// 4. Composition - NoteBook and Notes
export class NoteBook {
  public id: number;
  public title: string;
  private notes: Note[] = [];

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }

  addNote(note: Note): void {
    this.notes.push(note);
  }

  removeNote(noteId: number): void {
    this.notes = this.notes.filter((note) => note.id !== noteId);
  }

  getNotes(): Note[] {
    return this.notes;
  }
}

// 5. Aggregation - User and Notebook
export class UserWithNotebooks extends User {
  public notebooks: NoteBook[] = [];

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number
  ) {
    super(id, name, email, password, phone, age);
  }

  addNotebook(notebook: NoteBook): void {
    this.notebooks.push(notebook);
  }

  removeNotebook(notebookId: number): void {
    this.notebooks = this.notebooks.filter((nb) => nb.id !== notebookId);
  }
}

// 7. Generics - Data Storage
export class Storage<T> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  removeItem(item: T): void {
    this.items = this.items.filter((i) => i !== item);
  }

  getAllItems(): T[] {
    return this.items;
  }
}

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
const stringStorage = new Storage<string>();
stringStorage.addItem("First Note");
stringStorage.addItem("Second Note");
stringStorage.removeItem("First Note");
console.log("Storage items:", stringStorage.getAllItems());