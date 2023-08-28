const productNameInputEle = document.getElementById("product-name");
const remainingCharsEle = document.getElementById("remaining-chars");

function updateRemainingChars(event) {
  const enteredText = event.target.value;
  const enteredTextLength = enteredText.length;
  if (enteredTextLength >= 50) {
    remainingCharsEle.style.color = "red";
  }
  remainingCharsEle.textContent = String(enteredTextLength);
}

productNameInputEle.addEventListener("input", updateRemainingChars);
