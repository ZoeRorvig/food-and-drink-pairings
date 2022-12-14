// Variables
var userInput = "";
var foodName = "";
var savedFood = [];
var savedDrink = [];
var clearBtnEl = document.querySelector("#clearBtn");

var foodIngredients = document.querySelector("#food-list");
var drinkIngredients = document.querySelector("#drink-list");

// Random food/drink search
document.querySelector("#randomize-button").addEventListener("click", function () {
    var randomFoodApi = "https://www.themealdb.com/api/json/v1/1/random.php";
    var randomDrinkApi = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

    fetch(randomFoodApi)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        var randomFood = data;
                        displayFoodItems(randomFood);
                        fetch(randomDrinkApi)
                            .then(function (response) {
                                if (response.ok) {
                                    response.json()
                                        .then(function (data) {
                                            var randomDrink = data;
                                            displayDrinkItems(randomDrink);
                                        });
                                }
                            });
                    });
            }
        });
});

var getType = function (meal, keyType) {
    var keys = Object.keys(meal);
    var ingredientsKeys = keys.filter(function (key) {
        return key.includes(keyType);
    });
    var ingredients = ingredientsKeys.map(function (key) {
        return meal[key];
    });
    var filteredIngredients = ingredients.filter(function (ingredient) {
        return ingredient;

    });
    return filteredIngredients;
}

// Display Food
var displayFoodItems = function (food) {
    document.querySelector("form").style.height = "auto";
    document.querySelector("#foodFav").textContent = "Add to Favorites";
    document.querySelector("#intro-block").style.display = "none";
    document.querySelector(".card-food").style.display = "block";
    var foodCard = document.querySelector(".card-food");
    foodIngredients.textContent = "";

    foodCard.children[0].src = food.meals[0].strMealThumb;
    foodCard.children[1].children[0].textContent = food.meals[0].strMeal;
    foodCard.children[3].href = food.meals[0].strSource;
    foodCard.children[4].href = food.meals[0].strYoutube;

    var ingredients = getType(food.meals[0], "Ingredient");
    var measurements = getType(food.meals[0], "Measure");

    for (var i = 0; i < ingredients.length; i++) {
        var li = document.createElement("li");
        li.textContent = measurements[i] + " " + ingredients[i];
        li.setAttribute("data-index", i);
        foodIngredients.appendChild(li);
    }
};

// Display Drink
var displayDrinkItems = function (drink) {
    document.querySelector("form").style.height = "auto";
    document.querySelector("#drinkFav").textContent = "Add to Favorites";
    document.querySelector("#intro-block").style.display = "none";
    document.querySelector(".card-drink").style.display = "block";
    var drinkCard = document.querySelector(".card-drink");
    drinkIngredients.textContent = "";

    drinkCard.children[0].src = drink.drinks[0].strDrinkThumb;
    drinkCard.children[1].children[0].textContent = drink.drinks[0].strDrink + " [" + drink.drinks[0].strAlcoholic + "]";

    drinkCard.children[3].textContent = drink.drinks[0].strInstructions;
    var ingredients = getType(drink.drinks[0], "Ingredient");
    var measurements = getType(drink.drinks[0], "Measure");

    for (var i = 0; i < ingredients.length; i++) {
        var li = document.createElement("li");
        li.textContent = measurements[i] + " " + ingredients[i];
        li.setAttribute("data-index", i);
        drinkIngredients.appendChild(li);
    }
};

// Filter food by ingredients
document.querySelector("#food-button").addEventListener("click", function () {
    document.querySelector(".food-ingredient").children[2].textContent = "";
    userInput = document.querySelector("#food-input").value.split(' ').join('_');
    var foodUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + userInput;

    fetch(foodUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        if (data.meals == null) {
                            document.querySelector(".food-ingredient").children[2].textContent = "Oops! Please try a different ingredient!";
                        } else {
                            food = Math.floor(Math.random() * data.meals.length);
                            foodName = data.meals[food].strMeal;
                            var foodNameURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + foodName;
                            fetch(foodNameURL)
                                .then(function (response) {
                                    if (response.ok) {
                                        response.json()
                                            .then(function (data) {
                                                displayFoodItems(data);
                                            });
                                    }
                                });
                        }
                    });
            }
        });
});

// Filter drink by ingredients
document.querySelector("#drink-button").addEventListener("click", function () {
    document.querySelector(".drink-ingredient").children[2].textContent = "";
    userInput = document.querySelector("#drink-input").value.split(' ').join('_');
    var drinkUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + userInput;


    fetch(drinkUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        if (data.drinks == null) {
                            document.querySelector(".drink-ingredient").children[2].textContent = "Oops! Please try a different ingredient!";
                        } else {
                            drink = Math.floor(Math.random() * data.drinks.length);
                            drinkName = data.drinks[drink].strDrink;
                            var drinkNameURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName;
                            fetch(drinkNameURL)
                                .then(function (response) {
                                    if (response.ok) {
                                        response.json()
                                            .then(function (data) {
                                                displayDrinkItems(data);
                                            });
                                    }
                                });
                        }
                    });
            }
        });
});

// Add food item to favorites section
document.querySelector("#foodFav").addEventListener("click", function () {
    document.querySelector("#foodFav").textContent = "Added to Favorites";
    var food = document.getElementById("foodCardTitle").textContent;

    savedFood.push(food);
    localStorage.setItem('favorite-food', JSON.stringify(savedFood));
    displayFavorites();

});

// Add drink item to favorites section
document.querySelector("#drinkFav").addEventListener("click", function () {
    document.querySelector("#drinkFav").textContent = "Added to Favorites";
    var drink = document.getElementById("drinkCardTitle").textContent;
    savedDrink.push(drink);
    localStorage.setItem('favorite-drink', JSON.stringify(savedDrink));
    displayFavorites();
});

// Display favorites in favorites section
var displayFavorites = function () {
    document.getElementById("foodList").innerHTML = null;
    savedFood = JSON.parse(localStorage.getItem('favorite-food')) || [];

    for (i = 0; i < savedFood.length; i++) {

        var li = document.createElement('li');
        li.textContent = savedFood[i];
        document.getElementById("foodList").appendChild(li);
    };

    document.getElementById("drinkList").innerHTML = null;
    savedDrink = JSON.parse(localStorage.getItem('favorite-drink')) || [];

    for (i = 0; i < savedDrink.length; i++) {

        var li = document.createElement('li');
        li.textContent = savedDrink[i];
        document.getElementById("drinkList").appendChild(li);
    };
};

// Clear favorites and reset screen
clearBtnEl.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

displayFavorites();