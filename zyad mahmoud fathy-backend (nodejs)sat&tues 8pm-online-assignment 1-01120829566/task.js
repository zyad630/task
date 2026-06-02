// 1) let num = Number("123");

// console.log(num + 7);



// 2)) let value = 0;
// if (!value) {
//    console.log("Invalid");
// }


// 3))))))
// for(let i = 1; i <= 10; i++){
//    if(i % 2 === 0){
//       continue;
//    }
//    console.log(i);
// }

// 4)) 
// let numbers = [1,2,3,4,5];

// let even = numbers.filter(function(num){
//     return num % 2 == 0;
// });
// console.log(even);

// 5))
// let numbers = [1,2,3,4,5];

// let even = numbers.filter(function(num){
//     return num % 2 === 0;
// });
// console.log(even);

// 6))
// let arr1 = [1,2,3];
// let arr2 = [4,5,6];

// let merged = [...arr1 , ...arr2];
// console.log(merged);


// 7))
// let day = 2;

// switch(day){

//     case 1:
//         console.log("sunday");
//         break;

//     case 2:
//         console.log("monday");
//         break;

//     case 3:
//         console.log("tuesday");
//         break;

//     case 4:
//         console.log("wednesday");
//         break;

//     case 5:
//         console.log("thursday");
//         break;

//     case 6:
//         console.log("friday");
//         break;

//     case 7:
//         console.log("saturday");
//         break;

//     default:
//         console.log("invalid");
// }


// 7))
// let words = ["a","ab","abc"];

// let result = words.map(function(word){
//     return word.length;
// });

// console.log(result);


// 8))
// function check(num){

//     if(num % 3 === 0 && num % 5 === 0){
//         return "divisible by both";
//     }

//     return "Not divisible";
// }

// console.log(check(20));


// 9))
// function check(num){
//     if(num % 3 === 0 && num % 5 === 0){
//         return "Divisible by both";
//     }
//     return "Not divisible";
// }
// console.log(check(15));

// 10))
// function Info({name , age}){
//     return name + " is " + age + " years old";
// }
// const person = {
//     name: "John",
//     age: 25
// }
// console.log(Info(person));

// 11))
// function sum(...numbers){
//     let total = 0;
//     for(let num of numbers){
//         total += num;
//     }
//     return total;
// }
// console.log(sum(1,2,3,4,5));


// 12))
// function test(){
//     return new Promise(function(resolve){
//         setTimeout(function(){
//             resolve("Success");
//         },3000);
//     });
// }
// test().then(function(result){
//     console.log(result);
// });


// 13))
// function largest(arr){
//     let max = arr[0];
//     for(let num of arr){
//         if(num > max){
//             max = num;
//         }
//     }
//     return max;
// }
// console.log(largest([1,3,7,2,4]));



// 14))
// function getKeys(obj){
//     return Object.keys(obj);
// }
// let person = {
//     name: "zyad",
//     age: 30
// }
// console.log(getKeys(person));


// 15))
// function splitWords(text){
//     return text.split(" ");
// }
// console.log(splitWords("The quick brown fox"));

// =======================================================================================================
// essay

// 1) الفرق بين forEach و for...of
// forEach
// تستخدم مع arrays فقط، ومش ينفع تستخدم break أو continue جواها.
// for...of
// تستخدم للـ iteration على arrays وغيرها، وينفع تستخدم break و continue.


// 2) Hoisting و TDZ
// Hoisting
// JavaScript بترفع declarations لفوق قبل التنفيذ.
// TDZ
// مع let و const مينفعش تستخدم المتغير قبل تعريفه.
 

// 3) الفرق بين == و ===
// ==
// يقارن القيم فقط وقد يحول النوع.
// ===
// يقارن القيمة والنوع.


// 4))
// try-catch
// تستخدم لمعالجة الأخطاء ومنع توقف البرنامج.
// try{
//    console.log(x);
// }catch(error){
//    console.log("Error");
// }
// مهمة جدًا مع async operations علشان نمسك الأخطاء.


// 5) Type Conversion vs Coercion
// Type Conversion
// تحويل يدوي للنوع.
// Number("5");

// Coercion
// JavaScript تحول النوع تلقائيًا.
// "5" * 2
