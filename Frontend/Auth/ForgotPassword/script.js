const resetEmailForm = document.getElementById("resetPassword");
const emailDiv = document.getElementById("emailDiv");
const btnSendMail = document.getElementById("sendMail");

resetEmailForm.addEventListener("submit", resetPassword);

function resetPassword(e) {
  e.preventDefault();
  const email = document.getElementById("userEmailReset").value;
  const userObj = { email };
  axios
    .post("http://localhost:3000/user/password/forgotpassword", userObj)
    .then((response) => {
      if (response.data.success) {
        console.log(response);
        emailDiv.style.readonly = true;
        btnSendMail.style.readonly = true;
        console.log(document.getElementById("success-alert").classList);
        document
          .getElementById("success-alert")
          .classList.replace("d-none", "d-inline-flex");
        alert("Mail has been sent");
      } else {
        alert("Something went wrong :(");
      }
      console.log(response);
    })
    .catch((err) => console.log(err));
}
