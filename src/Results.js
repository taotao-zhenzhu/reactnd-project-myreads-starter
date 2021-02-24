import React from "react";
import { Link, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Option from "./Option";

class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  getUrls = (bookElement) => {
    // console.log(this.props.bookElement)
    return this.props.bookElement.urls.map((element, index) => {
      return (
        <li>
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{ width: 128, height: 193, backgroundImage: element }}
              />
              <div className="book-shelf-changer">
              <Option
                book={this.props.bookElement.ids[index]}
                updateBookShelf={this.props.updateBookShelf}
                shelfStatus={this.props.bookElement.shelfs[index]}
              />
              </div>
            </div>
            <div className="book-title">
              {this.props.bookElement.names[index]}
            </div>
            <div className="book-authors">
              {this.props.bookElement.authors[index]}
            </div>
          </div>
        </li>
      );
    });
  };

  render() {
    return (
      <div className="search-books-results">
        <ol className="books-grid">{this.getUrls(this.props.bookElement)}</ol>
      </div>
    );
  }
}

export default Results;
