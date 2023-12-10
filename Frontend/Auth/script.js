const form = document.getElementById("signUpUser");
const formLogIn = document.getElementById("logInUser");

if (form != null) form.addEventListener("submit", signUpUser);
if (formLogIn != null) formLogIn.addEventListener("submit", logInUser);

function signUpUser(e) {
  e.preventDefault();
  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;
  const password = document.getElementById("userPassword").value;
  const userObj = { name, email, password };
  axios
    .post("http://localhost:3000/user/signup", userObj)
    .then((response) => {
      if (!response) alert("Something went wrong!");
      else
        window.location.replace(
          "http://127.0.0.1:5500/Frontend/Auth/index.html"
        );
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
      if (response.data.success) {
        localStorage.setItem("userId", response.data.token);
        localStorage.setItem("isPremiumUser", response.data.isPremiumUser);
        window.location.replace(
          "http://127.0.0.1:5500/Frontend/Expenses/index.html"
        );
      } else alert("Login Failed !");
    })
    .catch((err) => console.log(err));
}
