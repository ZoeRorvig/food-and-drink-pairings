// var foodUrl = "https://www.themealdb.com/api.php";
// var drinkUrl = "https://www.thecocktaildb.com/api.php";
var userInput = "";
var foodName = "";

var foodIngredients = document.querySelector("#food-list");
var drinkIngredients = document.querySelector("#drink-list");
document.querySelector("#randomize-button").addEventListener("click", function () {
    var randomFoodApi = "https://www.themealdb.com/api/json/v1/1/random.php";
    var randomDrinkApi = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

    fetch(randomFoodApi)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        console.log(data);
                        var randomFood = data;
                        displayFoodItems(randomFood);
                        fetch(randomDrinkApi)
                            .then(function (response) {
                                if (response.ok) {
                                    response.json()
                                        .then(function (data) {
                                            console.log(data);
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

var displayFoodItems = function (food) {
    var foodCard = document.querySelector(".card-food");
    foodIngredients.textContent = "";

    // Display Food
    foodCard.children[0].src = food.meals[0].strMealThumb;
    foodCard.children[1].children[0].textContent = food.meals[0].strMeal;
    foodCard.children[3].href = food.meals[0].strSource;
    foodCard.children[4].href = food.meals[0].strYoutube;

    var ingredients = getType(food.meals[0], "Ingredient");
    var measurements = getType(food.meals[0], "Measure");
    console.log(ingredients);
    console.log(measurements)

    for (var i = 0; i < ingredients.length; i++) {
        var li = document.createElement("li");
        li.textContent = measurements[i] + " " + ingredients[i];
        li.setAttribute("data-index", i);
        foodIngredients.appendChild(li);
    }
};

var displayDrinkItems = function (drink) {
    var drinkCard = document.querySelector(".card-drink");
    drinkIngredients.textContent = "";

    // Display Drink
    drinkCard.children[0].src = drink.drinks[0].strDrinkThumb;
    drinkCard.children[1].children[0].textContent = drink.drinks[0].strDrink;

    drinkCard.children[3].textContent = drink.drinks[0].strInstructions;
    var ingredients = getType(drink.drinks[0], "Ingredient");
    var measurements = getType(drink.drinks[0], "Measure");
    console.log(ingredients);
    console.log(measurements)

    for (var i = 0; i < ingredients.length; i++) {
        var li = document.createElement("li");
        li.textContent = measurements[i] + " " + ingredients[i];
        li.setAttribute("data-index", i);
        drinkIngredients.appendChild(li);
    }
};
document.querySelector("#food-button").addEventListener("click", function () {
    document.querySelector(".ingredient").children[2].textContent = "";
    userInput = document.querySelector("#food-input").value.split(' ').join('_');
    console.log(userInput);
    var foodUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + userInput;


    fetch(foodUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        console.log(data);
                        if (data.meals == null){
                            document.querySelector(".ingredient").children[2].textContent = "Oops! Please try a different ingredient!";
                        } else{
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
