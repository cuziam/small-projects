console.log(document.body.children[0]);
let anchor = document.getElementById("external-link");
anchor.href = "https://google.com";
document.querySelector("#external-id"); //css선택자를 사용함

/*
querySelectorByClassName, querySelectorByTagName도 있다.
아무튼 뭐가 더 좋은지는 우열을 가리기 힘들다.
*/
console.dir(document);

//add an element
let newAnchorElement = document.createElement("a");
newAnchorElement.textContent = "Hello everyone";
let firstParagraph = document.querySelector("p");
firstParagraph.append(newAnchorElement);

//remove an element
let firstH1Element = document.querySelector("h1");
firstH1Element.remove(); //현재 방식
//firstH1Element.parentElement.remove(); //옛날 방식

//move element
firstParagraph.parentElement.append(firstParagraph);

//innerHTML
newAnchorElement.innerHTML = "<h1>TEXAS</h1>";
