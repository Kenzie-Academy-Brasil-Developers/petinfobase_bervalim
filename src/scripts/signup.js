import { createNewUserRequest, loginFailureColor } from "./requests.js";
import { toast } from "./toast.js";

function handleCreateNewUserRequest() {
  const inputCreateNewUser = document.querySelectorAll(".input__signup");
  const buttonCreateNewUser = document.querySelector("#register__button");

  let newUser = {};

  buttonCreateNewUser.addEventListener("click", (event) => {
    event.preventDefault();

    inputCreateNewUser.forEach((input) => {
      newUser[input.name] = input.value;
    });

    createNewUserRequest(newUser);
  });
}

handleCreateNewUserRequest();
