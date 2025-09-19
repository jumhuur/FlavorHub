import { ActiveNav, navAction } from "./global.js";
const activeLinks = document.querySelectorAll("a.nav-link");
const Links = document.querySelectorAll("li.actions");
const name = document.querySelector("li.User");
navAction(Links, name);
ActiveNav(activeLinks);
const cat = window.location.search.split("=")[1];
const title = document.querySelector("h2.section-title");
title.textContent = `${cat} meals list`;
const grid = document.getElementById("categoriesGrid");
const api = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`;
const getcatmeals = async () => {
  try {
    const res = await fetch(api);
    const data = await res.json();
    console.log(data);
    data.meals.forEach((meal) => {
      console.log(meal);
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
            <img
        src="${meal.strMealThumb}"
        alt="Boulangère Potatoes"
    />
    <div class="card-content">
        <h3>
        <a href="/meal.html?id=${meal.idMeal}"> ${meal.strMeal} </a>
        </h3>
    </div>
      `;
      grid.appendChild(card);
      console.log(meal);
    });
  } catch (Error) {
    grid.innerHTML = `<p class="Error">${Error.message}</p>`;
  }
};

getcatmeals();
