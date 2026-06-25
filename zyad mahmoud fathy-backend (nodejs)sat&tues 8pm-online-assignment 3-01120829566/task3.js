// 1) 
// const fs = require("fs");
// const readStream = fs.createReadStream("./big.txt", {
//     encoding: "utf8"
// });
// readStream.on("data", (chunk) => {
//     console.log(chunk);
// });

// 2) 
// const fs = require("fs");
// const readStream = fs.createReadStream("./source.txt");
// const writeStream = fs.createWriteStream("./dest.txt");
// readStream.pipe(writeStream);
// console.log("File copied using streams");

// 3)
// const fs = require("fs");
// const zlib = require("zlib");
// const { pipeline } = require("stream");
// pipeline(
//     fs.createReadStream("./data.txt"),
//     zlib.createGzip(),
//     fs.createWriteStream("./data.txt.gz"),
//     (err) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("Compressed Successfully");
//         }
//     }
// );

// 4)
// if(req.method === "POST" && req.url === "/user"){
//     let body = "";
//     req.on("data",(chunk)=>{
//         body += chunk;
//     });
//     req.on("end",()=>{
//         const newUser = JSON.parse(body);
//         const users = JSON.parse(
//             fs.readFileSync("./users.json","utf8")
//         );
//         const emailExists = users.find(
//             user => user.email === newUser.email
//         );
//         if(emailExists){
//             res.end("Email already exists");
//             return;
//         }
//         users.push(newUser);
//         fs.writeFileSync(
//             "./users.json",
//             JSON.stringify(users,null,2)
//         );
//         res.end("User Added");
//     });
// }

// 5)
// if(req.method === "PATCH" && req.url.startsWith("/user/")){
//     let body = "";
//     req.on("data",(chunk)=>{
//         body += chunk;
//     });
//     req.on("end",()=>{
//         const id = Number(
//             req.url.split("/")[2]
//         );
//         const data = JSON.parse(body);
//         const users = JSON.parse(
//             fs.readFileSync("./users.json","utf8")
//         );
//         const user = users.find(
//             user => user.id === id
//         );
//         if(!user){
//             res.end("User Not Found");
//             return;
//         }
//         if(data.name){
//             user.name = data.name;
//         }
//         if(data.age){
//             user.age = data.age;
//         }
//         if(data.email){
//             user.email = data.email;
//         }
//         fs.writeFileSync(
//             "./users.json",
//             JSON.stringify(users,null,2)
//         );
//         res.end("User Updated");
//     });
// }

// 6)
// if(req.method === "DELETE" && req.url.startsWith("/user/")){
//     const id = Number(
//         req.url.split("/")[2]
//     );
//     const users = JSON.parse(
//         fs.readFileSync("./users.json","utf8")
//     );
//     const filteredUsers = users.filter(
//         user => user.id !== id
//     );
//     fs.writeFileSync(
//         "./users.json",
//         JSON.stringify(filteredUsers,null,2)
//     );
//     res.end("User Deleted");
// }

// 7) 
// if(req.method === "GET" && req.url === "/user"){
//     const users = JSON.parse(
//         fs.readFileSync("./users.json","utf8")
//     );
//     res.end(
//         JSON.stringify(users)
//     );
// }

// 8) 
// if(req.method === "GET" && req.url.startsWith("/user/")){
//     const id = Number(
//         req.url.split("/")[2]
//     );
//     const users = JSON.parse(
//         fs.readFileSync("./users.json","utf8")
//     );
//     const user = users.find(
//         user => user.id === id
//     );
//     res.end(
//         JSON.stringify(user)
//     );
// }




// 2))))))))))))))))))))))))))))))))))))))))))))))))
// 1) Event Loop
// Event Loop هو الجزء المسؤول عن متابعة الـ Call Stack والـ Callback Queue

// 2) Libuv
// Libuv هي مكتبة مكتوبة بلغة C مسؤولة عن الـ Event Loop و File System و Networking و Thread Pool داخل Node.js.

// 3) Async Operations
// عندما يتم تنفيذ عملية غير متزامنة مثل fs.readFile() تقوم Node.js بإرسال المهمة إلى Libuv

// 4) Call Stack vs Event Queue vs Event Loop
// Call Stack
// تنفيذ الدوال الحالية

// Event Queue
// انتظار الـ Callbacks

// Event Loop
// ينقل الـ Callback من Queue إلى Stack.

// 5) Thread Pool
// مجموعة Threads تستخدمها Libuv لتنفيذ العمليات الثقيلة
// الحجم الافتراضى:
// 4
// تغييره:
// process.env.UV_THREADPOOL_SIZE = 8;

// 6) Blocking vs Non Blocking
// Blocking
// fs.readFileSync("test.txt");
// ينتظر انتهاء العملية.

// Non Blocking
// fs.readFile("test.txt",(err,data)=>{
// });
// يكمل تنفيذ بقية الكود دون انتظار.

// 15) Bonus (Majority Element)

