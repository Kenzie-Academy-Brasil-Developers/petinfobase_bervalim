import { toast } from "./toast.js";
import { loginFailureColor } from "./requests.js";

export async function render(array = []) {
  const listOfPosts = document.querySelector(".container__posts");

  if (array.message) {
    toast(array.message, loginFailureColor);
  }

  listOfPosts.innerHTML = "";

  array.forEach((post) => {
    const cardPost = createPost(post);
    listOfPosts.appendChild(cardPost);
  });
}

function createPost({ id, title, content, user, createdAt }) {
  const cardPostContainer = document.createElement("li");
  const divContainerFirst = document.createElement("div");
  const divPersonalUserInformation = document.createElement("div");
  const imageUser = document.createElement("img");
  const spanUsername = document.createElement("span");
  const spanSymbol = document.createElement("span");
  const spanDate = document.createElement("span");
  const divButtons = document.createElement("div");
  const editionButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const postDiv = document.createElement("div");
  const postTitle = document.createElement("h2");
  const postDescription = document.createElement("p");
  const buttonAcessPost = document.createElement("p");

  cardPostContainer.classList.add("card__container");
  divContainerFirst.classList.add("container__first");
  divPersonalUserInformation.classList.add("container__info");
  divButtons.classList.add("container__buttons");
  postDiv.classList.add("post");

  imageUser.src = user.avatar;
  spanUsername.innerText = user.username;
  spanSymbol.innerText = "|";
  spanDate.innerText = new Date(createdAt).toLocaleDateString();
  editionButton.innerText = "Editar";
  deleteButton.innerText = "Excluir";
  deleteButton.dataset.postId = id;
  postTitle.innerText = title;
  postDescription.innerText = content;
  buttonAcessPost.innerText = "Acessar publicação";

  divPersonalUserInformation.append(
    imageUser,
    spanUsername,
    spanSymbol,
    spanDate
  );
  divButtons.append(editionButton, deleteButton);
  divContainerFirst.append(divPersonalUserInformation, divButtons);
  postDiv.append(postTitle, postDescription, buttonAcessPost);
  cardPostContainer.append(divContainerFirst, postDiv);

  return cardPostContainer;
}