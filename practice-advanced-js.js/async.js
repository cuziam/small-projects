const fs = require("fs");

function readFile() {
  let fileData;
  fileData = fs.readFileSync("data.txt");
  console.log("An error occured!");
  console.log(fileData.toString());
  console.log("Hi there!");
}

readFile();
