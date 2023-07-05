/* Desenvolva seu código aqui */
import { loginRequest, loginFailureColor } from "./requests.js";
import { toast } from "./toast.js";

function authentication() {
  const token = localStorage.getItem("@petInfo:tokenLogin");
  if (token) {
    location.replace("./src/pages/dashboard.html");
  }
}

function handleLoginRequest() {
  const inputsLoginRequest = document.querySelectorAll(".input__login");
  const buttonLoginRequest = document.querySelector("#button__login");
  const spinner = document.querySelector(".spinner");

  let loginUserBody = {};
  let count = 0;

  buttonLoginRequest.addEventListener("click", (event) => {
    event.preventDefault();
    // Adicionar o spinner
    spinner.classList.remove("hidden");
    inputsLoginRequest.forEach((input) => {
      if (input.value.trim() === "") {
        count++;
      }
      loginUserBody[input.name] = input.value.trim();
    });
    if (count !== 0) {
      count = 0;
      setTimeout(() => {
        spinner.classList.add("hidden");
        return toast(
          "Por favor preencha todos os campos de login",
          loginFailureColor
        );
      }, 1000);
      return;
    } else {
      loginRequest(loginUserBody);
      setTimeout(() => {
        spinner.classList.add("hidden");
      }, 1000);
    }
  });
}
authentication();
handleLoginRequest();
