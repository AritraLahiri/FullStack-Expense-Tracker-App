const resetEmailForm = document.getElementById("resetPassword");
const emailDiv = document.getElementById("emailDiv");
const passDiv = document.getElementById("passDiv");
const confirmPassDiv = document.getElementById("passConfirmDiv");
resetEmailForm.addEventListener("submit", resetPassword);

function resetPassword(e) {
  e.preventDefault();
  const email = document.getElementById("userEmailReset").value;
  const passWord = document.getElementById("userPassword").value;
  const passWordConfirm = document.getElementById("userConfirmPassword").value;
  let userId;
  const userObj = { email };
  console.log(passWord);
  if (!passWord) {
    axios
      .post("http://localhost:3000/user/password/forgotpassword", userObj)
      .then((response) => {
        if (response.data.success) {
          emailDiv.style.readonly = true;
          passDiv.style.readonly = false;
          confirmPassDiv.style.readonly = false;
          alert("Mail has been sent");
        } else {
          alert("Something went wrong :(");
        }
        console.log(response);
      })
      .catch((err) => console.log(err));
  } else {
    console.log(e);
    userObj.password = passWord;
    axios
      .post(
        `http://localhost:3000/user/password/updatePassword/${getParam("id")}`,
        userObj
      )
      .then((response) => {
        if (response.data.success) {
          alert("Password reset");
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
