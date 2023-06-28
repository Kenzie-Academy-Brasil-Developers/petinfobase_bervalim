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
