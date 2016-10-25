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

--form one (consulation) table
CREATE TABLE consultation (
	id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR (50),
	phone VARCHAR(10),
	email VARCHAR (70),
	address VARCHAR (70),
	injuries VARCHAR (400),
	complaints VARCHAR (400),
	surgeries VARCHAR (400),
	averageRide VARCHAR (50),
	goals VARCHAR (400),
	currentBikeInformation VARCHAR (200),
	saddleHeight VARCHAR (50),
	saddleHeightOverBars VARCHAR (50),
	saddleAngle VARCHAR (50),
	saddleSetback VARCHAR (50),
	saddleToHandlebarReach VARCHAR (50),
	stemLength VARCHAR (50),
	stemAngle VARCHAR (50),
	handleBarWidth VARCHAR (50),
	handleBarBrandModel VARCHAR (50),
	pedalBrandModel VARCHAR (50),
	shoeBrandModelSize VARCHAR (50),
	brakeLevelPosistion VARCHAR (50),
	crankLength VARCHAR (50)
);
