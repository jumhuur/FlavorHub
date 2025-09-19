const IsLogin = () => {
  const User = JSON.parse(localStorage.getItem("User"));
  if (User) {
    return {
      Login: true,
      name: User.firstname,
      email: User.email,
    };
  } else {
    return {
      Login: false,
    };
  }
};

const navAction = (elements, userelement) => {
  if (IsLogin().Login === true) {
    elements.forEach((element) => {
      element.style.display = "none";
    });
    userelement.innerHTML = `Welcome 👋 <span>${IsLogin().name} </span>`;
    userelement.style.display = "block";
  } else {
    elements.forEach((element) => {
      element.style.display = "block";
    });

    userelement.style.display = "none";
  }
};

const Logout = (reg, log) => {
  if (IsLogin().Login === true) {
    reg.style.display = "none";
    log.style.display = "block";
    log.addEventListener("click", () => {
      localStorage.removeItem("User");
      window.location.href = "/index.html";
    });
  } else {
    log.style.display = "none";
  }
};

const ProctectRoutes = () => {
  if (IsLogin().Login === true) {
    if (
      window.location.pathname === "/login.html" ||
      window.location.pathname === "/signup.html"
    ) {
      window.location.href = "/index.html";
    }
  }
};

const ActiveNav = (Links) => {
  Links.forEach((Link) => {
    const path = Link.getAttribute("href");
    if (`/${path}` === window.location.pathname) {
      Link.classList.add("active");
    } else {
      Link.classList.remove("active");
    }
  });
};

export { IsLogin, navAction, Logout, ProctectRoutes, ActiveNav };
