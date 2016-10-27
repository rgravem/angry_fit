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
);

--create for table 2
CREATE TABLE form2NewFit (
	id SERIAL PRIMARY KEY NOT NULL,
	form2Date VARCHAR (50),
	customerID INT REFERENCES customers(id),
	employeeID INT REFERENCES employees(id),
	saddleHeight VARCHAR (50),
	saddleHeightOverBars VARCHAR (50),
	saddleToHandlebarReach VARCHAR (50),
	saddleAngle VARCHAR (50),
	saddleForeAft VARCHAR (50),
	saddleBrandAndWidth VARCHAR (50),
	stemLength VARCHAR (50),
	stemAngle VARCHAR (50),
	handleBarWidth VARCHAR (50),
	handleBarBrandAndModel VARCHAR (50),
	pedalBrandAndModel VARCHAR (50),
	showBrandModelSize VARCHAR (50),
	brakeLevelPosition VARCHAR (50),
	crankLength VARCHAR (50),
	standover VARCHAR (50),
	stack VARCHAR (50)
);

--  create for table 3
CREATE TABLE form3custom_frame_geometry (
	id SERIAL PRIMARY KEY NOT NULL,
	customerID INT REFERENCES customers(id),
	employeeID INT REFERENCES employees(id),
	date VARCHAR(50),
	inseam VARCHAR(50),
	torso VARCHAR(50),
	arm VARCHAR(50),
	footLength VARCHAR(50),
	effectiveTopTube VARCHAR(50),
	standover VARCHAR(50),
	seatTubeLength VARCHAR(50),
	seatTubeAngle VARCHAR(50),
	headTubeLength VARCHAR(50),
	headTubeAngle VARCHAR(50),
	stack VARCHAR(50),
	reach VARCHAR(50),
	wheelBase VARCHAR(50),
	chainstayLength VARCHAR(50),
	bbDrop VARCHAR(50),
	axleToCrown VARCHAR(50),
	mechanicalTrail VARCHAR(50),
	forkOffset VARCHAR(50)
);
-- create form 4 table
CREATE TABLE form4_custom_frame_details(
	id SERIAL PRIMARY KEY NOT NULL,
	customerID INT REFERENCES customers(id),
	employeeID INT REFERENCES employees(id),
	date VARCHAR(50),
	bikeStyle VARCHAR(50),
	bottomBracketShell VARCHAR(50),
	brakeCompatability VARCHAR(50),
	brakeMount VARCHAR(50),
	wheelSize VARCHAR(50),
	specialFrameOptions VARCHAR(400),
	headTubeSize VARCHAR(50),
	forkType TEXT[],
	seatDropper VARCHAR(50),
	drivetrain VARCHAR(50),
	paintColor VARCHAR(50),
	fullCoverageFenders VARCHAR(50),
	fendersPainted VARCHAR(50),
	frameNotes VARCHAR(400),
	frameOptions TEXT[],
	paintNotes VARCHAR(400)
	);
	
