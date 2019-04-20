# BANKA
Banka is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals. This app is meant to support a single bank, where users **can signup and create bank accounts online, but must visit the branch to withdraw or deposit money..


[![Build Status](https://travis-ci.com/idowuadeleke/BANKA.svg?branch=develop)](https://travis-ci.com/idowuadeleke/BANKA)
[![Coverage Status](https://coveralls.io/repos/github/idowuadeleke/BANKA/badge.svg)](https://coveralls.io/github/idowuadeleke/BANKA)
[![Maintainability](https://api.codeclimate.com/v1/badges/6063d53fa1f8c4cdad9a/maintainability)](https://codeclimate.com/github/idowuadeleke/BANKA/maintainability)

## Required Features
- User (client) **can sign up**
- User (client) **can login**
- User (client) **can create an account**
- User (client) **can view account transaction history**
- User (client) **can view a specific account transaction**
- Staff (cashier) **can debit user (client) account**
- Staff (cashier) **can credit user (client) account**
- Admin/staff **can view all user accounts**
- Admin/staff **can view a specific user account**
- Admin/staff **can activate or deactivate an account**
- Admin/staff **can delete a specific user account**
- Admin **can create staff and admin user accounts**

## Optional Features
- User can reset password.
- Integrate real time email notification upon credit/debit transaction on user account.
- User can upload a photo to their profile.

## Technologies

[node]: (https://nodejs.org)

- [Node.js](node) A run time environment based off Chrome's v8 Engines for writing Javascript server-side applications.
- [Express.js](https://expressjs.com) - Web application framework based on Node.js.
- [ESLint](https://eslint.org/) - A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
- [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) style guide was followed.

---

## Tools
- [Postman](https://www.getpostman.com/) is the only complete API development environment, and flexibly integrates with the software development cycle.
- Testing
  - [Mocha](https://mochajs.org/) A javascript testing framework.
  - [Chai](https://chaijs.com) A test assertion library for Javascript.
- [Swagger](https://swagger.io/) is an open-source software framework backed by a large ecosystem of tools that helps developers design, build, document, and consume RESTful Web services
- [Pivotal Tracker](https://www.pivotaltracker.com) is the agile project management tool of choice for developers around the world for real-time collaboration around a shared, prioritized backlog.
- [Heroku](https://www.heroku.com/) is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.
- [Travis CI](https://travis-ci.org/) is a hosted, distributed continuous integration service used to build and test software projects hosted at GitHub.
- [Coveralls](https://codeclimate.com/) consolidates the results from a suite of static analysis tools into a single, real-time report, giving your team the information it needs to identify hotspots, evaluate new approaches, and improve code quality(from crunch base).

---

## Installations

#### Getting started

- You need to have Node and NPM installed on your computer.
- Installing [Node](node) automatically comes with npm.

#### Clone

- Clone this project to your local machine `https://github.com/idowuadeleke/BANKA.git`

#### Setup

- Installing the project dependencies
  > Run the command below
  ```shell
  $ npm install
  ```
- Start your node server
  > run the command below
  ```shell
  $ npm start
  ```
- Use `http://localhost:3000` as base url for endpoints

#### Running Unit Test
- Run test for all endpoints
  > run the command below
  ```shell
  $ npm test
  ```

## API-ENDPOINTS

- V1

`- POST /api/v1/auth/signup Create a new user account.`

`- POST /api/v1/auth/ log a user in.`

`- POST /api/v1/accounts Create a bank account.`

`- PATCH /api/v1/account/<account-number> Activate or deactivate an account.`

`- DELETE /api/v1/accounts/<account-number> Delete a user account.`

`- POST /api/v1/transactions/<account-number>/debit Debit a bank account.`

`- POST /transactions/<account-number>/credit Credit a bank account..`

## Pivotal Tracker stories

[https://www.pivotaltracker.com/n/projects/2321237](https://www.pivotaltracker.com/n/projects/2321237)

## Template UI

You can see a hosted version of the template at [https://idowuadeleke.github.io/BANKA/](https://idowuadeleke.github.io/BANKA/)

## API

The API is currently in version 1 (v1)  is hosted at [https://bankaapplication.herokuapp.com/](https://bankaapplication.herokuapp.com/)



## API Documentation
API Documentation was generated with [swagger](link).

## Acknowledgments

- [Andela](https://andela.com/)

## Author

- [Idowu Adeleke](https://twitter.com/idowu_adelek)

