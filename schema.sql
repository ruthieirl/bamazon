/*schema for SQL database bamazon & table products*/
DROP DATABASE IF EXISTS bamazon;

/*create a database called bamazon*/
CREATE DATABASE bamazon;

/*use the database called bamazon*/
USE bamazon;

/*create a table called products*/
CREATE TABLE products(
	
	/*unique id for each product*/
	item_id INT(11) AUTO_INCREMENT NOT NULL,

	/*name of product*/
	product_name VARCHAR(255) NOT NULL,

	/*department name*/
	department_name VARCHAR(255) NOT NULL,

	/*cost to customer*/
	price INT(11) DECIMAL(10,2) NOT NULL,

	/*how many of the product is available in the store*/
	stock_quantity INT(11) NOT NULL,

	PRIMARY KEY(item_id)
);