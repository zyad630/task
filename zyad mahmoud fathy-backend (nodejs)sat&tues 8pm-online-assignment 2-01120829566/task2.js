// 1) 
// console.log({
//     File: __filename,
//     Dir: __dirname
// });

// 2) 
// function getFileName(filePath) {
//     return path.basename(filePath);
// }
// console.log(
//     getFileName("C:\\Users\\zyad\\Desktop\\bot\\report.pdf")
// );

// 3)
// function buildPath(obj) {
//     return path.join(obj.dir, obj.name + obj.ext);
// }
// console.log(
//     buildPath({
//         dir: "C:\\Users\\zyad\\Desktop\\bot",
//         name: "app",
//         ext: ".js"
//     })
// );


// 4)
// function getExtension(filePath) {
//     return path.extname(filePath);
// }
// console.log(
//     getExtension("C:\\Users\\zyad\\Desktop\\bot\\notes.txt")
// );

// 5)
// function parseFile(filePath) {
//     let result = path.parse(filePath);
//     return {
//         Name: result.name,
//         Ext: result.ext
//     };
// }
// console.log(
//     parseFile("C:\\Users\\zyad\\Desktop\\bot\\main.js")
// );

// 6) 
// console.log(
//     path.isAbsolute(
//         "C:\\Users\\zyad\\Desktop\\bot\\main.js"
//     )
// );

// 7)
// console.log(
//     path.join(
//         "C:\\Users\\zyad\\Desktop\\bot",
//         "src",
//         "App.js"
//     )
// );

// 8) 
// console.log(
//     path.resolve("./index.js")
// );
// C:\Users\zyad\Desktop\bot\index.js

// 9) 
// console.log(
//     path.join(
//         "C:\\Users\\zyad\\Desktop\\bot",
//         "folder2\\file.txt"
//     )
// );

// 10) 
// fs.unlink(
//     "C:\\Users\\zyad\\Desktop\\bot\\delete.txt",
//     (err) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("delete.txt is deleted");
//         }
//     }
// );

// 11) 
// fs.mkdirSync(
//     "C:\\Users\\zyad\\Desktop\\bot\\NewFolder"
// );
// console.log("Success");

// 12)
// const emitter = new EventEmitter();
// emitter.on("start", () => {
//     console.log("Welcome event triggered!");
// });
// emitter.emit("start");

// 13)
// emitter.on("login", (username) => {
//     console.log(`User logged in: ${username}`);
// });
// emitter.emit("login", "Ahmed");

// 14) 
// let data = fs.readFileSync(
//     "C:\\Users\\zyad\\Desktop\\bot\\notes.txt",
//     "utf8"
// );
// console.log(data);

// 15) 
// fs.writeFile(
//     "C:\\Users\\zyad\\Desktop\\bot\\async.txt",
//     "Async save",
//     (err) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("Saved");
//         }
//     }
// );

// 16)
// console.log(
//     fs.existsSync(
//         "C:\\Users\\zyad\\Desktop\\bot\\notes.txt"
//     )
// );

// 17)
// console.log({
//     Platform: os.platform(),
//     Arch: os.arch()
// });