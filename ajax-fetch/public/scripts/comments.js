const loadCommentsBtnElement = document.getElementById("load-comments-btn");
const commentsSectionElement = document.getElementById("comments");
const commentFormElement = document.querySelector("#comments-form form");
const commentTitleElement = document.getElementById("title");
const commentTextElement = document.getElementById("text");

function createCommentsList(comments) {
  const commentListElement = document.createElement("ol");
  for (const comment of comments) {
    const commentElement = document.createElement("li");
    commentElement.innerHTML = `<article class="comment-item">
        <h2>${comment.title}</h2>
        <p>${comment.text}</p>
      </article>
      `;
    commentListElement.appendChild(commentElement);
  }
  return commentListElement;
}

async function fetchCommentsForPost() {
  const postId = loadCommentsBtnElement.dataset.postid;
  try {
    const response = await fetch(`/posts/${postId}/comments`); //fetch는 기본적으로 get요청을 보낸다. URL의 ...는 플레이스 홀더다.
    if (!response.ok) {
      alert("Fetching Comment fail!");
      return;
    }
    const responseData = await response.json(); //응답으로 받은 json을 배열로 바꿔준다.

    if (responseData && responseData.length > 0) {
      const commentsListElement = createCommentsList(responseData);
      commentsSectionElement.innerHTML = "";
      commentsSectionElement.appendChild(commentsListElement);
    } else {
      commentsSectionElement.firstElementChild.textContent =
        "we could not find any comments";
    }
  } catch {
    alert("Getting comments failed!");
  }
}

async function saveComment(event) {
  event.preventDefault();

  const postId = loadCommentsBtnElement.dataset.postid;

  const enteredTitle = commentTitleElement.value;
  const enteredText = commentTextElement.value;

  const comment = { title: enteredTitle, text: enteredText };

  try {
    const response = await fetch(`/posts/${postId}/comments`, {
      method: "post",
      body: JSON.stringify(comment),
      headers: {
        "Content-type": "application/json", //content-type설정을 해주어야 서버가 body에 든게 json인지 알 수 있다.
      },
    });
    if (response.ok) {
      fetchCommentsForPost();
    } else {
      alert("Could not send comment");
    }
  } catch {
    alert("Could not send request, maybe try again later!");
  }
}
loadCommentsBtnElement.addEventListener("click", fetchCommentsForPost);
commentFormElement.addEventListener("submit", saveComment);
