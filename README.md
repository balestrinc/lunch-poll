# Lunch Poll

A small application that aims to help in choosing the place where a team would like to have lunch.
The results are displayed with bar graphic, where the most voted/winner restaurant is displayed on the top.

## Simple Rules:
- Users can only cast one vote per day up to noon.
- A place can't be vote if it has already won in the current week.

## About the code
Project based on MVC pattern written in JavaScript, using AngularJS on the front, Express + Node on the back.

### What I've done:
The integrity of data is maintained in the backend. Hence it should have a good test coverage.

The Validation Logic was placed on a separated model.

The data needed for this application was stubbed in the back-end, except for the user, that is hardcoded in the front-end:

```json
 {
 "email": "matheus@test.com",
 "name": "Matheus",
 "team": "Node"
 }
```

### What could be done in the future
Add front end tests (For now there aren't front-end automated tests as the project is simple and could easily be tested in a few clicks)

Add login page (Using Google/Facebook et al)

Display a link of the restaurant on Foursquare, so that the user can think about what he/she can order and see the address.

Send a push notification to all team members via slack (or Ryver et al) to notify: 
- the chosen restaurant when the poll is closed. 
- send Google/Waze route link to the restaurant to ease the navigation

## Prerequisite to run the application

Install [Node.js](https://nodejs.org/)

Install bower
```bash
$ npm install -g bower
```

Clone this repository
```bash
$ git clone https://github.com/balestrinc/lunch-poll.git
```
Inside the cloned folder, run:

```bash
$ npm install
$ bower install
```

## Running the application

```bash
$ npm start
```

After that, open the address:
http://localhost:7000

## Running the tests

```bash
$ npm run test
```
