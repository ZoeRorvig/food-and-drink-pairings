var foodUrl = "https://www.themealdb.com/api.php";
var drinkUrl = "https://www.thecocktaildb.com/api.php";

document.querySelector("#randomize-button").addEventListener("click" , function() {
    var randomFood = "https://www.themealdb.com/api/json/v1/1/random.php"; 
    var randomDrink = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

    fetch(randomFood)
        .then(function(response) {
            if (response.ok) {
                response.json()
                .then(function (data) {
                    console.log(data);
                    //displayResults(data.results, location, format);
                });
            }
        });

        fetch(randomDrink)
        .then(function(response) {
            if (response.ok) {
                response.json()
                .then(function (data) {
                    console.log(data);
                });
            }
});
});
