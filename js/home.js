// imports
import { navAction, Logout, ActiveNav } from "./global.js";
const Links = document.querySelectorAll("li.actions");
const name = document.querySelector("li.User");
const reg = document.querySelector("a.reg");
const log = document.querySelector("a.log");
const activeLinks = document.querySelectorAll("a.nav-link");
navAction(Links, name);
Logout(reg, log);
ActiveNav(activeLinks);

const api = "https://www.themealdb.com/api/json/v1/1/categories.php";
const Grid = document.getElementById("categoriesGrid");
const getcat = async () => {
  try {
    const response = await fetch(api);
    const data = await response.json();
    data.categories.forEach((cat) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img
    src="${cat.strCategoryThumb}"
    alt="Teriyaki Chicken Casserole"
/>
<div class="card-content">
    <h3>
    <a href="/meals.html?cat=${cat.strCategory}"> ${cat.strCategory} </a>
    </h3>
    <p>
    ${cat.strCategoryDescription.substring(1, 100)}
    </p>
</div>
      `;
      Grid.appendChild(card);
    });
  } catch (Error) {
    Grid.innerHTML = `<p class="Error">${Error.message}</p>`;
  }
};

getcat();
