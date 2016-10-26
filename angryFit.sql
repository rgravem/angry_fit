//////////DB info///////////////

--must create DB under this name in postico before running the code below
DATABASE NAME: angryFit

--------COPY, PASTE, AND RUN FROM HERE ON DOWN---------

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

--form one (consulation) table
CREATE TABLE exsistingFit (
	id SERIAL PRIMARY KEY NOT NULL,
	customerID INT REFERENCES customers(id),
	employeeID INT REFERENCES employees(id),
	formOneDate VARCHAR (20),
	injuries VARCHAR (400),
	complaints VARCHAR (400),
	surgeries VARCHAR (400),
	averageRideLength VARCHAR (50),
	upcomingRaces VARCHAR (400),
	currentBikeBrand VARCHAR (200),
	saddleHeight VARCHAR (50),
	saddleHeightOverBars VARCHAR (50),
	saddleAngle VARCHAR (50),
	saddleSetback VARCHAR (50),
	saddleHandlebarReach VARCHAR (50),
	stemLength VARCHAR (50),
	stemAngle VARCHAR (50),
	handleBarWidth VARCHAR (50),
	handleBarBrand VARCHAR (50),
	pedalBrandModel VARCHAR (50),
	shoeBrand VARCHAR (50),
	brakeLevel VARCHAR (50),
	crankLength VARCHAR (50)
)
