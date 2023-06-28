/* Desenvolva seu código aqui */
import { loginRequest } from "./requests.js";

function handleLoginRequest() {
  const inputsLoginRequest = document.querySelectorAll(".input__login");
  const buttonLoginRequest = document.querySelector("#button__login");

  let loginUser = {};

  buttonLoginRequest.addEventListener("click", (event) => {
    event.preventDefault();
    inputsLoginRequest.forEach((input) => {
      loginUser[input.name] = input.value;
    });
    loginRequest(loginUser);
  });
}

handleLoginRequest();
