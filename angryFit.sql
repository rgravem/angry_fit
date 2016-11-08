//////////DB info///////////////

--must create DB under this name in postico before running the code below
DATABASE NAME: angryFit



------------------CREATE TABLES---------------------
--Employees Table
CREATE TABLE employees (
	employeeID SERIAL PRIMARY KEY NOT NULL,
	firstName VARCHAR(50),
	lastName VARCHAR(50),
	email VARCHAR(70) unique
);

--Customers table
CREATE TABLE customers (
	customerID SERIAL PRIMARY KEY NOT NULL,
	firstName VARCHAR(50),
	lastName VARCHAR(50),
	email VARCHAR(70) UNIQUE,
	phoneNumber VARCHAR(20),
	streetAddress VARCHAR(100),
	unitNumber VARCHAR(10),
	city VARCHAR(100),
	state VARCHAR(100),
	zip VARCHAR(10)
);


--Bikes table
CREATE TABLE bikes (
	bikeID SERIAL PRIMARY KEY NOT NULL,
	customerID INT REFERENCES customers(customerID),
	bikeName VARCHAR(100),
	bikeType VARCHAR (50)
	);


--create for Form 1: Existing Fit
CREATE TABLE form1_existingFit (
	form1ID SERIAL PRIMARY KEY NOT NULL,
	bikeID INT REFERENCES bikes(bikeID),
	employeeID INT REFERENCES employees(employeeID),
	employeeCreated VARCHAR (100) REFERENCES employees(email),
	employeeUpdated VARCHAR (100) REFERENCES employees(email),
	date VARCHAR(50),
	injuries VARCHAR (1000),
	complaints VARCHAR (1000),
	surgeries VARCHAR (1000),
	averageRideLength VARCHAR (1000),
	upcomingRaces VARCHAR (1000),
	currentBikeBrand VARCHAR (1000),
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
	crankLength VARCHAR (50),
	notes VARCHAR (1000)
);


--create for Form 2: New Fit
CREATE TABLE form2_newFit (
	form2ID SERIAL PRIMARY KEY NOT NULL,
	bikeID INT REFERENCES bikes(bikeID),
	employeeID INT REFERENCES employees(employeeID),
	employeeCreated VARCHAR (100) REFERENCES employees(email),
	employeeUpdated VARCHAR (100) REFERENCES employees(email),
	date VARCHAR (50),
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
	shoeBrandModelSize VARCHAR (50),
	brakeLevelPosition VARCHAR (50),
	crankLength VARCHAR (50),
	standover VARCHAR (50),
	stack VARCHAR (50),
	notes VARCHAR (1000)
);


--  create for Form 3: Custom Frame Geometry
CREATE TABLE form3_customFrameGeometry (
	form3ID SERIAL PRIMARY KEY NOT NULL,
	bikeID INT REFERENCES bikes(bikeID),
	employeeID INT REFERENCES employees(employeeID),
	employeeCreated VARCHAR (100) REFERENCES employees(email),
	employeeUpdated VARCHAR (100) REFERENCES employees(email),
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
	forkOffset VARCHAR(50),
	notes VARCHAR (1000)
);


--create for Form 4: Custom Frame Details
CREATE TABLE form4_customFrameDetails(
	form4ID SERIAL PRIMARY KEY NOT NULL,
	bikeID INT REFERENCES bikes(bikeID),
	employeeID INT REFERENCES employees(employeeID),
	employeeCreated VARCHAR (100) REFERENCES employees(email),
	employeeUpdated VARCHAR (100) REFERENCES employees(email),
	date VARCHAR(50),
	bikeType VARCHAR(50),
	bottomBracketShell VARCHAR(50),
	bottomBracketShellOther VARCHAR(50),
	brakeCompatability VARCHAR(50),
	brakeCompatabilityOther VARCHAR(50),
	brakeMount VARCHAR(50),
	wheelSize VARCHAR(50),
	wheelSizeOther VARCHAR(50),
	thirdBottle VARCHAR(50),
	rackMounts VARCHAR(50),
	fullCoverageFendersOption VARCHAR(50),
	internalBrakeCable VARCHAR(50),
	rockingSlidingDropouts VARCHAR(50),
	thruAxleRear VARCHAR(50),
	di2Routing VARCHAR(50),
	eTapRouting VARCHAR(50),
	customRearRack VARCHAR(50),
	framePump VARCHAR(50),
	dropoutSpecsIn VARCHAR(50),
	dropoutSpacingIn VARCHAR(50),
	dropoutSpacingCustom VARCHAR(50),
	specialFrameOptions VARCHAR(400),
	headTubeSize VARCHAR(50),
	customOrStandardFork VARCHAR(50),
	forkType TEXT[],
	forkBrand VARCHAR(50),
	forkModel VARCHAR(50),
	thruAxle VARCHAR(50),
	frontRackMounts VARCHAR(50),
	fenderMounts VARCHAR(50),
	internalRouting VARCHAR(50),
	integratedForkContact VARCHAR(50),
	customFrontRack VARCHAR(50),
	seatDropper VARCHAR(50),
	seatDropperBrand VARCHAR(50),
	seatDropperModel VARCHAR(50),
	drivetrain VARCHAR(50),
	drivetrainFillIn VARCHAR(50),
	drivetrainFillIn2 VARCHAR(50),
	paintColor VARCHAR(50),
	paintColorOther VARCHAR(50),
	fullCoverageFenders VARCHAR(50),
	fendersPainted VARCHAR(50),
	frameNotes VARCHAR(400),
	frameOptions TEXT[],
	paintNotes VARCHAR(1000)
	);
