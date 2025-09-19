// imports
import { ProctectRoutes, ActiveNav } from "./global.js";
ProctectRoutes();
const activeLinks = document.querySelectorAll("a.nav-link");
ActiveNav(activeLinks);
// elements
const passwordInput = document.getElementById("password");
const strengthfill = document.querySelector("div.strength-fill");
const strengthtext = document.querySelector("span.strength-text");
const Form = document.getElementById("signupForm");

passwordInput.addEventListener("input", function () {
  const password = this.value;
  const strength = passwordCheckstrength(password);
  strengthfill.style.width = `${strength.percentage}%`;
  strengthfill.className = `strength-fill ${strength.class}`; //classList.add(strength.class);
  strengthtext.textContent = strength.Text;
});

const passwordCheckstrength = (password) => {
  let score = 0;
  let feedback = [];
  if (password.length >= 8) {
    score += 25;
  } else {
    feedback.push("at lest 8 characters");
  }

  if (/[a-z]/.test(password)) {
    score += 25;
  } else {
    feedback.push("lowercase letters");
  }

  if (/[A-Z]/.test(password)) {
    score += 25;
  } else {
    feedback.push("Uppercase  letters");
  }

  if (/[0-9]/.test(password)) {
    score += 25;
  } else {
    feedback.push("Uppercase  letters");
  }

  if (score < 50) {
    return {
      percentage: score,
      class: "weak",
      Text: `Week - add ${feedback.join(",")}`,
    };
  } else if (score < 75) {
    return {
      percentage: score,
      class: "medium",
      Text: `medium - Good Password`,
    };
  } else {
    return {
      percentage: score,
      class: "strong",
      Text: `strong - strong Password`,
    };
  }
};

// signup form handling
const LgUsers = localStorage.getItem("Users");
const Users = JSON.parse(LgUsers) || [];

Form.addEventListener("submit", function (e) {
  e.preventDefault();
  // get form data
  const formData = new FormData(Form);
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");

  // validation
  if (!firstName || !lastName || !email || !password) {
    alert("please fill in all required fields");
    return;
  }

  const CurrentUser = {
    firstname: firstName,
    lastname: lastName,
    email: email,
    password: btoa(password),
  };

  // check if user in db
  const checkUser = () => {
    const check = Users.filter((User) => User.email === CurrentUser.email);
    return check.length < 1 ? false : true;
  };

  if (checkUser() === true) {
    // alert("this email is already registered");
    swal(
      "this email is already registered !",
      "Please use different Email Or log in to your account ...",
      "error"
    );
    return;
  }
  const btnsubmit = document.querySelector('button[type="submit"]');
  btnsubmit.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Creating account ..`;
  btnsubmit.disabled = true;
  // save user  info
  swal("Your account is Created !", "Welcome to FlavorHub ", "success");
  setTimeout(() => {
    Users.push(CurrentUser);
    localStorage.setItem("Users", JSON.stringify(Users));
    localStorage.setItem("User", JSON.stringify(CurrentUser));

    // redirect to home page
    window.location.href = "/index.html";
  }, 2000);
});
