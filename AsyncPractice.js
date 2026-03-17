// // ts-worksheet

// function walkDog() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const dogWalked = true;

//       if (dogWalked) {
//         resolve("You walked the dog");
//         console.log("This ran captain");
//       } else {
//         reject("You didn't walk the dog");
//       }
//     }, 3000);
//   });
// }

// function cleanKitchen() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const cleaned = true;
//       if (cleaned) {
//         resolve("You cleaned the kitchen");
//       } else {
//         reject("You didn't clean the kitchen");
//       }
//     }, 2400);
//   });
// }

// function takeOutTrash() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const tookOut = true;
//       if (tookOut) {
//         resolve("You took out the trash");
//       } else {
//         reject("You didn't take out the trash");
//       }
//     }, 3000);
//   });
// }

// async function doChores() {
//   console.time("Total Time"); // Start a timer for the whole function

//   // --- Step 1 ---
//   console.time("Walk Dog");
//   const walkedDogResult = await walkDog(); // 3s
//   console.timeEnd("Walk Dog");

//   // --- Step 2 ---
//   console.time("Extra Pause");
//   await new Promise((resolve) => setTimeout(resolve, 1000)); // 1s
//   console.timeEnd("Extra Pause");

//   console.log(walkedDogResult);

//   // --- Step 3 ---
//   console.time("Clean Kitchen");
//   const cleanedKitchenResult = await cleanKitchen(); // 2.4s
//   console.timeEnd("Clean Kitchen");

//   // --- Step 4 ---
//   console.time("Take Out Trash");
//   const tookOutTrashResult = await takeOutTrash(); // 3s
//   console.timeEnd("Take Out Trash");

//   console.log(cleanedKitchenResult);
//   console.log(tookOutTrashResult);

//   console.log("Chores done");
//   console.timeEnd("Total Time"); // Ends the whole timer
// }

// function getData() {
//   return walkDog();
// }

// async function sail() {
//   const data = await getData();
//   console.log(data);
// }

// sail();

// (x => console.log("hello"))();
