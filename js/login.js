// imports
import { ProctectRoutes, ActiveNav } from "./global.js";
ProctectRoutes();
const Form = document.getElementById("loginForm");
const activeLinks = document.querySelectorAll("a.nav-link");
ActiveNav(activeLinks);
// signup form handling
const LgUsers = localStorage.getItem("Users");
const Users = JSON.parse(LgUsers) || [];

Form.addEventListener("submit", function (e) {
  e.preventDefault();
  // get form data
  const formData = new FormData(Form);
  const email = formData.get("email");
  const password = formData.get("password");
  // validation
  if (!email || !password) {
    alert("please fill in all required fields");
    return;
  }

  // check if user in db
  const checkUser = () => {
    const check = Users.filter((User) => User.email === email);
    return check.length < 1 ? false : true;
  };

  if (checkUser() === false) {
    swal(
      "this Account Not Found !",
      "Please use different Email Or signup a new  account ...",
      "error"
    );
    return;
  }

  // check password
  const checkPassword = () => {
    const check = Users.filter((User) => User.email === email);
    const User = check[0];
    const UserPassword = atob(User.password);
    console.log(UserPassword);
    if (UserPassword === password) {
      const btnsubmit = document.querySelector('button[type="submit"]');
      btnsubmit.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Signing in ...`;
      btnsubmit.disabled = true;
      // save user  info
      swal({
        title: "Login successfull !",
        text: "Welcome to FlavorHub ",
        type: "success",
      });
      setTimeout(() => {
        localStorage.setItem("User", JSON.stringify(User));
        // redirect to home page
        window.location.href = "/index.html";
      }, 2000);
    } else {
      swal("Your password is incorrect", "Please try again ", "error");
    }
  };

  checkPassword();
});
