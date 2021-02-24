import React, { Component } from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link, Route } from "react-router-dom";

import HomePage from "./HomePage";
import Search from "./Search";


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true
  }

  render() {
    return (
      <div>
        <Route
        exact path="/"
        render={() => <HomePage/>}
      />
      <Route
      exact path="/Search"
      render={() => <Search/>}
    />
    </div>
    )
  }
}

export default BooksApp
