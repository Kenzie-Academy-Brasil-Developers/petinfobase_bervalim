const baseURL = "http://localhost:3333";

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
        return responseJSON;
      } else {
        throw new Error(responseJSON.message);
      }
    })
    .catch((err) => alert(err));

  return tokenLogin;
}
