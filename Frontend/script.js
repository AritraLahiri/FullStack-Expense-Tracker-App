const form = document.getElementById("signUpUser");

form.addEventListener("submit", signUpUser);

function signUpUser(e) {
  e.preventDefault();
  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;
  const password = document.getElementById("userPassword").value;
  const userObj = { name, email, password };
  axios
    .post("http://localhost:3000/user/signup", userObj)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => console.log(err));
}
