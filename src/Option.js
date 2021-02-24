import React from "react";
import { Link, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

class Option extends React.Component {
  constructor(props) {
    super(props);
  }

  getBookOption = (book) => {
    BooksAPI.get(book).then((results) => {
      // console.log(results.shelf)
      this.props.updateBookShelf(book, results.shelf)
    });
  };

  updateBookOption = async (book, shelf) => {
    // console.log(shelf);

    const update = await BooksAPI.update(book, shelf).then((results) => {
      console.log(results);
    });

    this.getBookOption(book);
  };

  shelfValue = () => {
    if (this.props.shelfStatus === undefined) {
      return "none"
    } else {
      return this.props.shelfStatus
    }
  }

  render() {
    // this.getBookOption()

    return (
      <select
        onChange={(event) => {
          this.updateBookOption(this.props.book, event.target.value);
        }}
        value={this.shelfValue()}
      >
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    );
  }
}

export default Option;
