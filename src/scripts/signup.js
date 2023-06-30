import { createNewUserRequest, loginFailureColor } from "./requests.js";
import { toast } from "./toast.js";

function handleCreateNewUserRequest() {
  const inputCreateNewUser = document.querySelectorAll(".input__signup");
  const buttonCreateNewUser = document.querySelector("#register__button");

  let newUser = {};
  let count = 0;

  buttonCreateNewUser.addEventListener("click", (event) => {
    event.preventDefault();

    inputCreateNewUser.forEach((input) => {
      if (input.value.trim() === "") {
        count++;
      }
      newUser[input.name] = input.value.trim();
    });
    if (count !== 0) {
      count = 0;
      return toast(
        "Por favor preencha todos os campos de cadastro",
        loginFailureColor
      );
    } else {
      createNewUserRequest(newUser);
    }
  });
}

handleCreateNewUserRequest();
