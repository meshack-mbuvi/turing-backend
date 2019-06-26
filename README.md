[![Build Status](https://travis-ci.com/meshack-mbuvi/turing-backend.svg?token=gzS9GtKGFgPZxft9xEg3&branch=develop)](https://travis-ci.com/meshack-mbuvi/turing-backend)
[![Coverage Status](https://coveralls.io/repos/github/meshack-mbuvi/turing-backend/badge.svg?branch=develop)](https://coveralls.io/github/meshack-mbuvi/turing-backend?branch=develop)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a4714885a106475f9c195455786cb0dc)](https://www.codacy.com/app/meshack-mbuvi/turing-backend?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=meshack-mbuvi/turing-backend&amp;utm_campaign=Badge_Grade)

# turing-backend
## Project Overview
This is an e-commerce system which allows users to search, add items to their shopping cart, create order and checkout successfully.

## Technical details
```
Javascript - a high-level, interpreted programming language that conforms to the ECMAScript specification.
Mocha - A feature-rich JavaScript test framework running on Node.js
ExpressJs - Express.js, or simply Express, is a web application framework for Node.js designed for building web applications and APIs.
MySQL - an open-source relational database management system.
```

## Patterns (MVC)
The MVC is an acronym for Model View Controller. This pattern is a software architecture pattern that separates data presentation from the logic of handling user interactions.

Model - deals with all the data-related logic that the user works with. Mostly implemented as the backend logic of an application. The models link the system with database for data persistence.

View - This can be implemented in the front-end using Javascript frameworks(React, Angular, etc). The API has routes which handle all incoming requests from clients and then direct them to the appropriate controllers.

Controllers - provide an interface between Model and View that processes all the business logic and incoming requests.

## System architecture
Database:  Stores data and persists it in the database. For this product, MySQL is used as the database.
Mysql2: a MySQL client for Node.js with focus on performance. It  interacts with the MySQL database by transforming ORM queries into SQL query statements. The SQL statements are then executed.
Sequelize:  a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.
![Diagram](https://github.com/meshack-mbuvi/turing-backend/blob/develop/Screenshot%202019-06-27%20at%2019.44.30.png)

## Features requirements
- [x] Users can view all items when entering the website
- [x] Items are displayed properly based on the selected department and category
- [x] Users can search items through search box
- [x] Support paging if we have too many items
- [x] Users can see item details by selecting a specific item
- [x] Users can add items to their shopping carts
- [x] Users can register/login using website custom forms, or social login libraries
- [x] Users can update personal profiles with shipping addresses and other info
- [x] Users can checkout with 3rd party payment gateways: Stripe
- [x] Users will get confirmations over emails about their orders

### Run application locally

Install mysql database engine in your development server, then

### Follow this guide to avoid known issues with the MySQL 8.*
- Install MySQL engine and follow the steps specified below
Open your terminal and execute the following:
- `mysql -u dbuser -p`
You will prompted to enter your password. Do so to log in.
- Run `create database turing;`
- `create user turing@localhost identified by 'turing';`
- `grant all privileges on turing.* to turing@localhost;`
- `ALTER USER turing@localhost IDENTIFIED WITH mysql_native_password BY "turing";`
- Close the terminal and execute the following command:
- `mysql -u turing -p -D turing< ./src/database/database.sql`
- Clone this repository and execute the commands:
- `cd turing-backend`
- Add a .env file in your root directory using the .env-sample
Run the following commands while in the root directory of the project
- `npm install` Installs the project dependencies
- `sequelize db:migrate` This creates the required/missing schema
- `npm run start:dev` to run the app in the development mode.
- `npm run start` to run the app in the production mode.
  Open http://localhost:3003/api-docs to access the documentation in your browser

Access the live application [here](https://turing-api-endpoints.herokuapp.com/api-docs)
Note: Select the heroku api server from the dropdown.
## Developer/Owner
[Meshack Mbuvi](https://github.com/meshack-mbuvi)
