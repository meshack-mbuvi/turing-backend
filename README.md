[![Build Status](https://travis-ci.org/meshack-mbuvi/turing-backend.svg?branch=develop)](https://travis-ci.org/meshack-mbuvi/turing-backend)
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

- Clone this repository
- `cd turing-backend`
- `git checkout develop`
- `npm install`
- `npm run start:dev` to run the app in the development mode.
- `npm run start` to run the app in the production mode.
  Open http://localhost:3003/api-docs to access the documentation in your browser

Access the live application [here](https://turing-api-endpoints.herokuapp.com/)
## Developer/Owner
[Meshack Mbuvi](https://github.com/meshack-mbuvi)
