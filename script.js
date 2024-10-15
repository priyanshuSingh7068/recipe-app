const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipe_container = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");

const fetchRecipes = async (RecipeName) => {
  recipe_container.innerHTML = `<h2>Fetching Recipes...</h2>`;
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${RecipeName}`
  );
  const response = await data.json();

  recipe_container.innerHTML = "";
  response.meals.forEach((meal) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");
    recipeDiv.innerHTML = `
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea}</span> Dish</p>
    <p>Belongs to <span>${meal.strCategory}</span> categary</p>
    `;
    const button = document.createElement("button");
    button.textContent = "View Recipe";
    recipeDiv.appendChild(button);

    // adding addEventListener to recipe button
    button.addEventListener("click", () => {
      openRecipePopup(meal);
    });

    recipe_container.appendChild(recipeDiv);
  });
};

const fetchIngredients = (meal) => {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};

const openRecipePopup = (meal) => {
  recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientsList">${fetchIngredients(meal)}</ul>
    <div>
    <h3>Instructions:</h3>
    <p class="resipeInstructions">${meal.strInstructions}</p>
    </div>
    `;
  recipeDetailsContent.parentElement.style.display = "block";
  recipeDetailsContent.parentElement.style.width = "40%";
  recipeDetailsContent.parentElement.style.height = "50%";
  recipeDetailsContent.parentElement.style.opacity = "1";
};

recipeCloseBtn.addEventListener("click", () => {
  // recipeDetailsContent.parentElement.style.display = "none"
  recipeDetailsContent.parentElement.style.width = "0px";
  recipeDetailsContent.parentElement.style.height = "0px";
  recipeDetailsContent.parentElement.style.opacity = "0";
});
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  fetchRecipes(searchInput);
});