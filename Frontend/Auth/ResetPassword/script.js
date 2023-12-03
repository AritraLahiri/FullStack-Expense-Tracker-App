const resetEmailForm = document.getElementById("resetPassword");

resetEmailForm.addEventListener("submit", resetPassword);

function resetPassword(e) {
  e.preventDefault();
  const password = document.getElementById("userPassword").value;
  const passwordConfirm = document.getElementById("userConfirmPassword").value;
  if (password != passwordConfirm)
    alert("Password and Confirm Password not matched");
  else {
    const userObj = { password };
    axios
      .post("http://localhost:3000/user/password/updatePassword", userObj)
      .then((response) => {
        if (response.data.success) {
          alert("Mail has been sent");
        } else {
          alert("Something went wrong :(");
        }
        console.log(response);
      })
      .catch((err) => console.log(err));
  }
}
