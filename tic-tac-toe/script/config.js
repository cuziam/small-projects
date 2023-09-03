function openPlayerConfig() {
  playerConfigOverlayElement.style.display = "block";
  backdropElement.style.display = "block";
}

function closePlayerConfig() {
  playerConfigOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  errorsOutputElement.textContent = "";
}

function savePlayerConfig(event) {
  event.preventDefault(); //submit이벤트의 기본 동작을 방지함
  //즉 http요청을 서버로 작업을 수행하지 않는다.
  const formData = new FormData(event.target);
  const enteredPlayername = formData.get("playername").trimEnd();
  if (!enteredPlayername) {
    event.target.firstElementChild.classList.add("error");
    errorsOutputElement.textContent = "please enter a valid name!";
    return;
  }
  //유효한 이름을 사용한다면 Player Name을 바꿔준다.
  closePlayerConfig();
}
