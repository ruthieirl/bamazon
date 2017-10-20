/*bring in the required packages*/
var mysql = require("mysql");
var fs = require("fs");
var inquirer = require("inquirer");

/*MYSQL connection parameters*/
var connection = mysql.createConnection({
	host:"localhost",
	port: 3306,

	user: "root",

	password: "C0tto<3!",
	database: "bamazon"
});

/*connect to mysql server and sql database*/
connection.connect(function(err) {
	if (err) throw err;
	//console.log(err);
	/*run the start function after the connection is established*/
	start();
});

//displays all items in stock
function start() {
	connection.query("SELECT * FROM products",
		function(err, results) {
			if (err) throw err;
			console.log("Welcome to Bamazon");
			console.log("Below is a list of items that are currently available.");
			console.log(" ");
			console.log("ITEM ID | PRODUCT NAME | PRICE PER UNIT");

			for (var i = 0; i < results.length; i++) {
				console.log(results[i].item_id + " | " + results[i].product_name + " | " + results[i].price);
			};
		})
		selectProduct();
	};

//user will be prompted to choose a product by id
function selectProduct() {
	connection.query("SELECT * FROM products",
		function(err, results) {
			if (err) throw err;
			inquirer
				.prompt([
				{
					name: "productID",
					type: "userInput",
					message: "What is the id number of the product you would like to purchase?",
					validate: function(value){
                    	if (!isNaN(value)){
                    		return true;
                    	}
                    	return false;
                    }
				},
				{
                    name: "amount",
                    type: "input",
                    message: "How many units of that product would you like to buy?",
                    validate: function(value){
                    	if (!isNaN(value)){
                    		return true;
                    	}
                    	return true;
                    }

                }
				]).then(function(answer) {
				
					var item = answer.productID;
					//console.log(item);

					var itemAmount = answer.amount;
					//console.log(itemAmount);
					console.log("You want to buy " + itemAmount + " of product number " + item +".");

					connection.query("SELECT * FROM products WHERE ?", 
						[
						{item_id : item}
						], 
						function(err, res) {
						if (err) throw err;

						console.log(res);

						var inStock = res[0].stock_quantity;
						var price = res[0].price;
						var remainingInStock = inStock - itemAmount;
						console.log(remainingInStock);

						if (inStock > itemAmount) {
							connection.query("UPDATE products SET ? WHERE ?"),
							[
							{stock_quantity : remainingInStock}, {item_id : item}
							],
							function(err, res) {
								if (err) throw err;

								console.log("Stock quantity updated.")
							}
						}
					})	
				})
		})
}