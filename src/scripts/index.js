/* Desenvolva seu código aqui */
import { loginRequest, loginFailureColor } from "./requests.js";
import { toast } from "./toast.js";

function handleLoginRequest() {
  const inputsLoginRequest = document.querySelectorAll(".input__login");
  const buttonLoginRequest = document.querySelector("#button__login");

  let loginUserBody = {};
  let count = 0;

  buttonLoginRequest.addEventListener("click", (event) => {
    event.preventDefault();

    inputsLoginRequest.forEach((input) => {
      if (input.value.trim() === "") {
        count++;
      }
      loginUserBody[input.name] = input.value.trim();
    });
    if (count !== 0) {
      count = 0;
      return toast(
        "Por favor preencha todos os campos de login",
        loginFailureColor
      );
    } else {
      loginRequest(loginUserBody);
    }
  });
}

handleLoginRequest();
