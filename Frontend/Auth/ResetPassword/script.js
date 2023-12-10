const resetEmailForm = document.getElementById("resetPassword");

resetEmailForm.addEventListener("submit", resetPassword);

function resetPassword(e) {
  e.preventDefault();
  const password = document.getElementById("userPassword").value;
  const passwordConfirm = document.getElementById("userConfirmPassword").value;
  if (password != passwordConfirm)
    alert("Password and Confirm Password donot matched");
  else {
    const userObj = { password };
    axios
      .post(
        `http://localhost:3000/user/password/updatePassword/${getParam("id")}`,
        userObj
      )
      .then((response) => {
        if (response.data.success) {
          window.location.replace(
            "http://127.0.0.1:5500/Frontend/Auth/index.html"
          );
        } else {
          alert("Something went wrong :(");
        }
        console.log(response);
      })
      .catch((err) => console.log(err));
  }
}

function getParam(key) {
  return window.location.href
    .split("?")[1]
    .split("&")
    .filter((x) => x.split("=")[0] == key)[0]
    .split("=")[1];
}
