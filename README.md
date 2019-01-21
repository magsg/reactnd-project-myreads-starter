# MyReads Project

## What is MyReads Project?

MyReads project is one of the assessment projects for Udacity's Front End Nanodegree course.
The goal was to add interactivity to a single page application by using React to refactor static code provided in a template.

## How to install and run the project

* in a terminal, type `npm install` to install necessary project dependencies then `npm start` to launch the application,
* each book has a green control button which allows the user to move books between different shelves,
* the green _Add_ button directs the user to a search page where the user can search for new books and add them to chosen shelves
### Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend.

## How the project was built

* The project was built with React and a static template provided by Udacity.
* It utilises [`BooksAPI.js`], a JavaScript API for a backend server also provided by Udacity,
* The application uses asynchronous requests to obtain data from _BooksAPI_ and perform necessary operations on the backend
* The application uses `map()` and `filter()` methods to categorise books and assign them to correct shelves
* It implements _React Router_ to link main page and search page.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
