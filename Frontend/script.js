const form = document.getElementById("signUpUser");
const formLogIn = document.getElementById("logInUser");

form.addEventListener("submit", signUpUser);
formLogIn.addEventListener("submit", logInUser);

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
function logInUser(e) {
  e.preventDefault();
  const email = document.getElementById("userLogInEmail").value;
  const password = document.getElementById("userLogInPassword").value;
  const userObj = { email, password };
  axios
    .post("http://localhost:3000/user/login", userObj)
    .then((response) => {
      if (response.data.success) alert("Login Success");
      else alert("Login Failed !");
    })
    .catch((err) => console.log(err));
}
