import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { createMuiTheme } from "@material-ui/core/styles";
import * as BooksAPI from "./BooksAPI";
import Results from "./Results";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      bookElement: {
        urls: [],
        names: [],
        authors: [],
        ids: [],
        shelfs: [],
      },
      searchError: undefined,
    };

    this.updateBookShelf = this.updateBookShelf.bind(this);
  }

  updateBookShelf = (book, shelf) => {
    const allShelf = this.state.bookElement.shelfs;

    this.state.bookElement["ids"].map((element, index) => {
      if (element === book) {
        allShelf[index] = shelf;
      }
    });

    this.setState({
      shelfs: allShelf,
    });
  };

  getBooks = (bookResult) => {
    const resultDict = {};
    resultDict["urls"] = [];
    resultDict["names"] = [];
    resultDict["authors"] = [];
    resultDict["ids"] = [];
    resultDict["shelfs"] = [];

    for (var key in bookResult) {
      console.log(bookResult[key].imageLinks);
      if (bookResult[key].imageLinks === undefined) {
        resultDict["urls"].push("");
      } else {
        resultDict["urls"].push(
          `url('${bookResult[key].imageLinks.thumbnail}')`
        );
      }

      resultDict["names"].push(bookResult[key].title);
      resultDict["ids"].push(bookResult[key].id);
      resultDict["shelfs"].push(bookResult[key].shelfs);

      resultDict["authors"][key] = [];
      for (var index in bookResult[key].authors) {
        resultDict["authors"][key].push(bookResult[key].authors[index]);
      }
    }

    return resultDict;
  };

  getResults = async () => {
    const newBooks = {
      urls: [],
      names: [],
      authors: [],
      ids: [],
      shelfs: [],
    };

    const result = await BooksAPI.search(this.state.query).then((results) => {
      if (results !== undefined) {
        this.setState({
          searchError: results.error,
        });

        console.log(results);

        if (results.error !== "empty query") {
          this.getBooks(results)["urls"].map((element) => {
            newBooks.urls.push(element);
          });

          this.getBooks(results)["names"].map((element) => {
            newBooks.names.push(element);
          });

          this.getBooks(results)["authors"].map((element) => {
            newBooks.authors.push(element);
          });

          this.getBooks(results)["ids"].map((element) => {
            newBooks.ids.push(element);
          });

          this.getBooks(results)["shelfs"].map((element) => {
            newBooks.shelfs.push(element);
          });
        }
      }
    });

    this.setState({
      bookElement: newBooks,
    });
  };

  updateQuery = (query) => {
    this.setState(
      {
        query: query.trim(),
      }
      // () => console.log(this.state.query)
    );
  };

  renderResults = () => {
    if (
      (this.state.searchError !== "empty query") &
      (this.state.bookElement.urls.length !== 0)
    ) {
      return <Results 
      bookElement={this.state.bookElement} 
      updateBookShelf={this.updateBookShelf}
      />;
    } else if (
      (this.state.searchError === "empty query") &
      (this.state.bookElement.urls.length === 0)
    ) {
      return <div class="not-found">Not Results Found</div>;
    }
  };

  handleClear = () => {
    this.setState(
      {
        query: "",
      },
      () => this.getResults()
    );
  };

  onKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed");
      this.getResults();
    }
  };

  render() {
    // this.getResults()

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div
            className="search-books-input-wrapper"
            style={{ backgroundColor: "green" }}
          >
            {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-MyReads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
            <TextField
              label="Search by title or author"
              value={this.state.query}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton onClick={() => this.getResults()}>
                      <Icon>search</Icon>
                    </IconButton>
                    <IconButton onClick={() => this.handleClear()}>
                      <Icon>clear</Icon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(event) => this.updateQuery(event.target.value)}
              onKeyUp={(event) => this.onKeyPress(event)}
            />
          </div>
        </div>
        <div className="search-books-results">{this.renderResults()}</div>
      </div>
    );
  }
}

export default Search;
