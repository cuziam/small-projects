const fs = require("fs/promises");

async function readFile() {
  let fileData;
  //   fileData = fs.readFile("data.txt", function (error, fileData) {
  //     console.log("File parsing done!");
  //     console.log(fileData.toString());
  //     //start another async task that sends the data toa database
  //   });
  // if(error){

  // }
  //아까랑 다른 readFile의 콜백함수 내부에 또 다른 콜백함수를 실행하는 것이 아니라
  //Promise.then()의 인자로 콜백함수를 넘겨서 실행한다.
  fileData = await fs
    .readFile("data.txt")
    .then((fileData) => {
      console.log("File parsing done!");
      console.log(fileData.toString());
    })
    .then(() => {
      console.log("fulfilled");
    })
    .catch((error) => {
      console.log(error);
    });

  console.log("Hi there!");
}

readFile();
