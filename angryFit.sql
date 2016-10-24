//////////DB info///////////////

--Employees Table
CREATE TABLE employees (
	id SERIAL PRIMARY KEY NOT NULL,
	firstName VARCHAR(50),
	lastName VARCHAR(50),
	email VARCHAR(70) unique
);

--Customers table
CREATE TABLE customers (
	id SERIAL PRIMARY KEY NOT NULL,
	firstName VARCHAR(50),
	lastName VARCHAR(50),
	email VARCHAR(70) UNIQUE,
	phoneNumber varchar(12) check (phoneNumber ~ '^[0-9]+$'),
	streetAddress VARCHAR(100),
	unitNumber VARCHAR(10),
	city VARCHAR(100),
	state VARCHAR(100),
	zip VARCHAR(5)
);

--Bikes table
CREATE TABLE bikes (
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(50),
	customerID INT REFERENCES customers(id)
);
