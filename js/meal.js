import { IsLogin, ActiveNav, navAction } from "./global.js";
// elements
const activeLinks = document.querySelectorAll("a.nav-link");
const Links = document.querySelectorAll("li.actions");
const name = document.querySelector("li.User");
navAction(Links, name);
ActiveNav(activeLinks);
const container = document.querySelector("div.container");
const mealcard = document.querySelector("div.meal-card");
const Id = window.location.search.split("=")[1];
const api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${Id}`;
// proctect on meal info
if (IsLogin().Login === false) {
  window.location.href = "/login.html";
}

const GetInfo = async () => {
  try {
    const response = await fetch(api);
    const data = await response.json();
    const meal = data.meals[0];
    const ingredients = Object.keys(meal)
      .filter((keys) => keys.startsWith("strIngredient") && meal[keys])
      .map((keys) => meal[keys]);
    console.log(ingredients);
    console.log(meal);
    mealcard.innerHTML = `
            <div class="img">
          <img
            src="${meal.strMealThumb}"
            alt="${meal.strMeal}"
          />
        </div>
        <div class="meal-info">
          <h2 class="meal-title">${meal.strMeal}</h2>
          <h3>Instructions</h3>
          <p class="instructions">
         ${
           meal.strInstructions.length > 250
             ? meal.strInstructions.substring(1, 300) + "..."
             : meal.strInstructions
         }
          </p>
          <p><b>Category:</b> ${meal.strCategory}</p>
          <p><b>Area:</b> ${meal.strArea}</p>
          <div class="ingredients">
            <h3>Ingredients</h3>
            <ul>
              ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
            </ul>
          </div>
          <a
            class="youtube-link"
            href="${meal.strYoutube}"
            target="_blank"
          >
            ▶ Watch on YouTube
          </a>
        </div>
    `;
  } catch (Error) {}
};
GetInfo();
