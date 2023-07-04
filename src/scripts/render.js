import { toast } from "./toast.js";
import { loginFailureColor, deletePostById } from "./requests.js";
import { handleDeletePosts, showEditTaskModal } from "./dashboard.js";

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
  const postDiv = document.createElement("div");
  const postTitle = document.createElement("h2");
  const postDescription = document.createElement("p");
  const buttonAcessPost = document.createElement("p");

  buttonAcessPost.addEventListener("click", () => {
    renderModal(user, title, content, user.avatar, createdAt);
  });
  cardPostContainer.classList.add("card__container");
  divContainerFirst.classList.add("container__first");
  divPersonalUserInformation.classList.add("container__info");
  divButtons.classList.add("container__buttons");
  postDiv.classList.add("post");

  imageUser.src = user.avatar;
  spanUsername.innerText = user.username;
  spanSymbol.innerText = "|";
  spanDate.innerText = new Date(createdAt).toLocaleDateString();

  postTitle.innerText = title;
  postDescription.innerText = content;
  buttonAcessPost.innerText = "Acessar publicação";
  buttonAcessPost.dataset.postId = id;

  const userId = JSON.parse(localStorage.getItem("userId"));

  let editionButton, deleteButton;

  if (userId === user.id) {
    editionButton = document.createElement("button");
    deleteButton = document.createElement("button");
    editionButton.innerText = "Editar";
    editionButton.classList.add("edit__button");
    deleteButton.innerText = "Excluir";
    deleteButton.dataset.postId = id;
    editionButton.dataset.postId = id;
    deleteButton.classList.add("delete__button");
    showEditTaskModal(editionButton, title, content);
    deleteButton.addEventListener("click", async (event) => {
      await deletePostById(event.target.dataset.postId);
      cardPostContainer.remove();
    });
    divButtons.append(editionButton, deleteButton);
  }

  divPersonalUserInformation.append(
    imageUser,
    spanUsername,
    spanSymbol,
    spanDate
  );
  divContainerFirst.append(divPersonalUserInformation, divButtons);
  postDiv.append(postTitle, postDescription, buttonAcessPost);
  cardPostContainer.append(divContainerFirst, postDiv);

  return cardPostContainer;
}

function renderModal(user, title, content, image, createdAt) {
  const modalController = document.querySelector(
    ".modal__controller__accessPost"
  );

  modalController.innerHTML = "";
  const divAccessContainer = document.createElement("div");
  const divAccessFirst = document.createElement("div");
  const divAccessInfo = document.createElement("div");
  const divAccessPost = document.createElement("div");
  const modalImageUser = document.createElement("img");
  const modalUserName = document.createElement("span");
  const modalUserData = document.createElement("span");
  const modalSpanSymbol = document.createElement("span");
  const modalCloseButton = document.createElement("button");
  const modalTitle = document.createElement("h2");
  const modalContent = document.createElement("p");

  divAccessContainer.classList.add("modalAcess__container");
  divAccessFirst.classList.add("Access__first");
  divAccessInfo.classList.add("Access__info");
  divAccessPost.classList.add("Access__post");
  modalCloseButton.id = "closeAccessModal";

  modalCloseButton.innerText = "X";
  modalUserName.innerText = user.username;
  modalImageUser.src = image;
  modalUserData.innerText = new Date(createdAt).toLocaleDateString();
  modalTitle.innerText = title;
  modalContent.innerText = content;
  modalSpanSymbol.innerText = "|";

  divAccessInfo.append(
    modalImageUser,
    modalUserName,
    modalSpanSymbol,
    modalUserData
  );
  divAccessFirst.append(divAccessInfo, modalCloseButton);
  divAccessPost.append(modalTitle, modalContent);
  divAccessContainer.append(divAccessFirst, divAccessPost);
  modalController.append(divAccessContainer);
  modalController.showModal();

  modalCloseButton.addEventListener("click", () => {
    modalController.close();
  });
}
