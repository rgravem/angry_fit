////////Create any DB info///////////////

CREATE TABLE employees (
	id SERIAL PRIMARY KEY NOT NULL,
	fName VARCHAR(50),
	lName VARCHAR(50),
	email VARCHAR(70) unique
);
