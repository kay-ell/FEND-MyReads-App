# MyReads Project

This is Project 6 for the Front-End NanoDegree. We were to convert the static page into an interactive one using React. On the main page, there are three shelves to hold our books. They are "Currently Reading", "Want to Read", and "Read".

The user can click on the arrow to select where they want to move the book to. When the user makes a selection to move the book, the shelves gets re-rendered to show the update.

There is also a search page where users can search for books and add them to shelf. If a book in the search results is already part of the shelf, it gets assigned the same shelf value as the one on shelf

## TL;DR

To get this app working on your local machine:

* clone this repository
* cd into the root folder
* install all project dependencies with `npm install`
* start the development server with `npm start`

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── components
        ├── views
            ├── Main.js # Main page of our app
            ├── Search.js # Search page
        ├── Book.js # This page holds the book component
        ├── BookShelf.js # This page holds the three shelves we have on our main page
    ├── App.css # Styles for our app. Feel free to customize this as you desire.
    ├── App.js # This is the root of our app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for our app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```


## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Resources
* [React API](https://reactjs.org/docs/react-api.html)
* [React Training / React Router](https://reacttraining.com/react-router/web/api/BrowserRouter)

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
