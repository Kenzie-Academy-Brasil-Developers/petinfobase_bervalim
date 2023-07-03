import {
  createPostRequest,
  getAllPosts,
  updatePostById,
  deletePostById,
  getUsersProfile,
  loginFailureColor,
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

  imageHeader.src = showImage.avatar;
  paragraphUsername.innerText = showImage.username;
  divHeader.append(imageHeader, paragraphUsername);
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

function handleNewPostModal() {
  const inputsCreateNewPost = document.querySelectorAll(".create__task");
  const buttonCreateNewPost = document.querySelector("#sendPublication");
  const modalController = document.querySelector(".modal__controller__newPost");
  const newPost = {};
  let count = 0;

  buttonCreateNewPost.addEventListener("click", (event) => {
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
      showDashboard();

      inputsCreateNewPost.forEach((input) => {
        input.value = "";
      });
    }
  });
}

function closeModal() {
  const buttonCloseModal = document.querySelector("#closeModalButton");
  const modalController = document.querySelector(".modal__controller__newPost");

  buttonCloseModal.addEventListener("click", () => {
    modalController.close();
  });
}

authentication();
showDashboard();
showHeader();
showAddTaskModal();
handleNewPostModal();
