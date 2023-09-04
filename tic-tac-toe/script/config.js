function openPlayerConfig(event) {
  editedPlayer = +event.target.dataset.playerid; //숫자 타입으로 형변환
  playerConfigOverlayElement.style.display = "block";
  backdropElement.style.display = "block";
}

function closePlayerConfig() {
  playerConfigOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  errorsOutputElement.textContent = "";
  formElement.firstElementChild.lastElementChild.value = "";
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
  //유효한 이름 사용시 player의 data를 바꿔준다.
  const updatedPlayerDataElement = document.getElementById(
    "player-" + editedPlayer + "-data"
  );
  //h3 element update
  updatedPlayerDataElement.children[1].textContent = enteredPlayername;
  //editedPlayer에 따라 정보 갱신
  players[editedPlayer - 1].name = enteredPlayername;
  closePlayerConfig();
}
