import { createNewUserRequest, loginFailureColor } from "./requests.js";
import { toast } from "./toast.js";

function handleCreateNewUserRequest() {
  const inputCreateNewUser = document.querySelectorAll(".input__signup");
  const buttonCreateNewUser = document.querySelector("#register__button");
  const spinner = document.querySelector(".spinner");

  let newUser = {};
  let count = 0;

  buttonCreateNewUser.addEventListener("click", (event) => {
    spinner.classList.remove("hidden");
    event.preventDefault();

    inputCreateNewUser.forEach((input) => {
      if (input.value.trim() === "") {
        count++;
      }
      newUser[input.name] = input.value.trim();
    });
    if (count !== 0) {
      count = 0;
      setTimeout(() => {
        spinner.classList.add("hidden");
        return toast(
          "Por favor preencha todos os campos de cadastro",
          loginFailureColor
        );
      }, 1000);
      return;
    } else {
      createNewUserRequest(newUser);
      setTimeout(() => {
        spinner.classList.add("hidden");
      }, 1000);
    }
  });
}

handleCreateNewUserRequest();
