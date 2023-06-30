import { toast } from "./toast.js";

const baseURL = "http://localhost:3333";
const loginSucessColor = "hsl(162, 88%, 26%)";
export const loginFailureColor = "hsl(349, 57%, 50%)";

export async function loginRequest(loginRequestBody) {
  const tokenLogin = await fetch(`${baseURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginRequestBody),
  })
    .then(async (res) => {
      const responseJSON = await res.json();
      if (res.ok) {
        localStorage.setItem("@petInfo:tokenLogin", responseJSON.token);
        toast(
          "Login realizado com sucesso,redirecionando para a dashboard",
          loginSucessColor
        );
        setTimeout(() => {
          location.replace("./src/pages/dashboard.html");
        }, 2000);
        return responseJSON;
      } else {
        throw new Error(responseJSON.message);
      }
    })
    .catch((err) => {
      toast(err.message, loginFailureColor);
    });

  return tokenLogin;
}

export async function createNewUserRequest(createNewUserRequestBody) {
  const newUser = await fetch(`${baseURL}/users/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createNewUserRequestBody),
  })
    .then(async (res) => {
      const responseJSON = await res.json();
      if (res.ok) {
        toast("Sua conta foi criada com sucesso", loginSucessColor);
        setTimeout(() => {
          location.replace("../../index.html");
        }, 2000);
        return responseJSON;
      } else {
        throw new Error(responseJSON.message);
      }
    })
    .catch((err) => {
      toast(err.message, loginFailureColor);
    });

  return newUser;
}

// Requisição criar novo post
export async function createPostRequest(createPostRequestBody) {
  const token = localStorage.getItem("@petInfo:tokenLogin");
  const newPost = await fetch(`${baseURL}/posts/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(createPostRequestBody),
  })
    .then(async (res) => {
      const responseJSON = await res.json();

      if (res.ok) {
        toast("Post criado com sucesso", loginSucessColor);
        return responseJSON;
      } else {
        throw new Error(responseJSON.message);
      }
    })
    .catch((err) => toast(err.message, loginFailureColor));

  return newPost;
}
// Requisição para pegar todos os posts
export async function getAllPosts() {
  const token = localStorage.getItem("@petInfo:tokenLogin");
  const allPosts = await fetch(`${baseURL}/posts`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Problemas no servidor,tente novamente mais tarde");
      }
    })
    .catch((err) => toast(err.message, loginFailureColor));

  return allPosts;
}
