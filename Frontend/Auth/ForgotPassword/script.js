const resetEmailForm = document.getElementById("resetPassword");

resetEmailForm.addEventListener("submit", resetPassword);

function resetPassword(e) {
  e.preventDefault();
  const email = document.getElementById("userEmailReset").value;
  const userObj = { email };
  axios
    .post("http://localhost:3000/user/password/forgotpassword", userObj)
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
