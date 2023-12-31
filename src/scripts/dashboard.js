import {
  createPostRequest,
  getAllPosts,
  updatePostById,
  deletePostById,
  getUsersProfile,
  loginFailureColor,
  loginSucessColor,
} from "./requests.js";

import { render } from "./render.js";
import { toast } from "./toast.js";

function authentication() {
  const token = localStorage.getItem("@petInfo:tokenLogin");
  if (!token) {
    location.replace("../../");
  }
}
async function showDashboard() {
  const allPosts = await getAllPosts();
  render(allPosts);
}

async function showHeader() {
  const divHeader = document.querySelector(".header__content");
  const showImage = await getUsersProfile();
  const imageHeader = document.createElement("img");
  const paragraphUsername = document.createElement("p");
  const logoutButton = document.createElement("button");
  const iconImage = document.createElement("img");
  const divAccountUsername = document.createElement("div");
  logoutButton.classList.add("header__button");
  logoutButton.innerText = "Sair da conta";
  localStorage.setItem("userId", JSON.stringify(showImage.id));
  imageHeader.src = showImage.avatar;
  iconImage.src = "../assets/img/logout.svg";
  imageHeader.classList.add("imageHeader");
  iconImage.classList.add("icon_image");
  paragraphUsername.innerText = showImage.username;
  divAccountUsername.classList.add("show");
  divHeader.append(imageHeader, divAccountUsername);
  // imageHeader.append(paragraphUsername, logoutButton);
  logoutButton.appendChild(iconImage);
  divAccountUsername.append(paragraphUsername, logoutButton);
  logoutAction();
}

function makeLogoutAndUserNameAppear() {
  const imageHeader = document.querySelector(".imageHeader");
  const divAccountUsername = document.querySelector(".show");
  divAccountUsername.classList.add("hidden");
  imageHeader.addEventListener("click", () => {
    if (divAccountUsername.classList.contains("hidden")) {
      divAccountUsername.classList.add("show");
      divAccountUsername.classList.remove("hidden");
    } else {
      divAccountUsername.classList.add("animateClass");
      setTimeout(() => {
        divAccountUsername.classList.add("hidden");
        divAccountUsername.classList.remove("show");
        divAccountUsername.classList.remove("animateClass ");
      }, 1000);
    }
  });
}

function logoutAction() {
  const logoutButton = document.querySelector(".header__button");
  logoutButton.addEventListener("click", () => {
    localStorage.clear();
    location.replace("../../index.html");
  });
}

function showAddTaskModal() {
  const buttonCreatePublication = document.querySelector(
    "#create__publication"
  );
  const modalController = document.querySelector(".modal__controller__newPost");
  buttonCreatePublication.addEventListener("click", () => {
    modalController.showModal();
    closeModal();
  });
}

function deletePost() {
  const exclusionButton = document.querySelector("#exclusionButton");
  const modalController = document.querySelector(
    ".modal__controller__exclusionConfirmation"
  );
  const closeModalButton = document.querySelector("#closeModalExclusionButton");
  const cancelExclusionButton = document.querySelector("#cancelExclusionModal");

  exclusionButton.addEventListener("click", async () => {
    const idExclusionButton = exclusionButton.dataset.postId;
    await deletePostById(idExclusionButton);
    await showDashboard();
    modalController.close();
  });

  closeModalButton.addEventListener("click", () => {
    modalController.close();
  });

  cancelExclusionButton.addEventListener("click", () => {
    modalController.close();
  });
}

export function showEditTaskModal(button, title, content) {
  const modalController = document.querySelector(
    ".modal__controller__editPost"
  );

  button.addEventListener("click", () => {
    const inputTitle = document.querySelector("#editTitle");
    const inputContent = document.querySelector("#editContent");
    inputTitle.value = title;
    inputContent.value = content;
    modalController.showModal();
    modalController.dataset.postId = button.dataset.postId;
    closeEditModal();
  });
}

// export function accessPublicationModal()

function handleNewPostModal() {
  const inputsCreateNewPost = document.querySelectorAll(".create__task");
  const buttonCreateNewPost = document.querySelector("#sendPublication");
  const modalController = document.querySelector(".modal__controller__newPost");
  const newPost = {};
  let count = 0;

  buttonCreateNewPost.addEventListener("click", async (event) => {
    event.preventDefault();

    inputsCreateNewPost.forEach((input) => {
      if (input.value.trim() === "") {
        count++;
      }

      newPost[input.name] = input.value.trim();
    });

    if (count != 0) {
      count = 0;
      toast(
        "Por favor,preencha todos os campos necessários",
        loginFailureColor
      );
    } else {
      createPostRequest(newPost);
      modalController.close();
      await showDashboard();

      inputsCreateNewPost.forEach((input) => {
        input.value = "";
      });
    }
  });
}

function editPostModal() {
  const inputsEditModal = document.querySelectorAll(".edit__post");
  const formEditModal = document.querySelector(".edit__form");
  const editModalController = document.querySelector(
    ".modal__controller__editPost"
  );
  const postEdition = {};
  let count = 0;

  formEditModal.addEventListener("submit", async (event) => {
    event.preventDefault();

    inputsEditModal.forEach((input) => {
      if (input.value.trim() === "") {
        count++;
      }
      postEdition[input.name] = input.value;
    });

    if (count !== 0) {
      count = 0;
      toast("Por favor, preencha os dados necessários", loginFailureColor);
    } else {
      updatePostById(postEdition, editModalController.dataset.postId);
      toast("Post Atualizado com sucesso", loginSucessColor);

      editModalController.close();

      await showDashboard();
    }
  });
}

function closeModal() {
  const buttonCloseModal = document.querySelector("#closeModalButton");
  const modalController = document.querySelector(".modal__controller__newPost");
  const cancelPublicationButton = document.querySelector("#cancelPublication");
  buttonCloseModal.addEventListener("click", () => {
    modalController.close();
  });

  cancelPublicationButton.addEventListener("click", (event) => {
    event.preventDefault();
    modalController.close();
  });
}

function closeEditModal() {
  const buttonCloseEditModal = document.querySelectorAll("#close__button");
  const modalController = document.querySelector(
    ".modal__controller__editPost"
  );
  const buttonCancelEditModal = document.querySelector(
    "#cancelEditPublication"
  );
  buttonCloseEditModal.forEach((button) => {
    button.addEventListener("click", () => {
      modalController.close();
    });
  });

  buttonCancelEditModal.addEventListener("click", () => {
    modalController.close();
  });
}

export function handleDeletePosts() {
  // Pegando todos os botões de deletar
  const deletePostsButton = document.querySelectorAll(".delete__button");

  deletePostsButton.forEach((button) => {
    button.addEventListener("click", async (event) => {
      deletePostById(event.target.dataset.postId);

      // const allPosts = await getAllPosts();

      // await render(allPosts);
      await showDashboard();
    });
  });
}

authentication();
await showHeader();
await showDashboard();
showAddTaskModal();
handleNewPostModal();
editPostModal();
deletePost();
makeLogoutAndUserNameAppear();
