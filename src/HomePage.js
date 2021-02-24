import React from "react";
import { Link, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Option from "./Option";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookResults: {
        url: [],
        name: [],
        authors: [],
        id: [],
        shelf: [],
      },
    };

    this.updateBookShelf = this.updateBookShelf.bind(this);
  }

  componentDidMount() {
    this.getAllBooks();
  }

  getBooks = (bookResult) => {
    const resultDict = {};
    resultDict["url"] = [];
    resultDict["name"] = [];
    resultDict["authors"] = [];
    resultDict["id"] = [];
    resultDict["shelf"] = [];

    for (var key in bookResult) {
      if (bookResult[key].imageLinks === undefined) {
        resultDict["url"].push("");
      } else {
        resultDict["url"].push(
          `url('${bookResult[key].imageLinks.thumbnail}')`
        );
      }

      resultDict["name"].push(bookResult[key].title);
      resultDict["id"].push(bookResult[key].id);
      resultDict["shelf"].push(bookResult[key].shelf);

      resultDict["authors"][key] = [];
      for (var index in bookResult[key].authors) {
        resultDict["authors"][key].push(bookResult[key].authors[index]);
      }
    }

    return resultDict;
  };

  getAllBooks = async () => {
    const allBooks = {
      url: [],
      name: [],
      authors: [],
      id: [],
      shelf: [],
    };

    const result = await BooksAPI.getAll().then((results) => {
      // console.log(results)
      this.getBooks(results)["url"].map((element) => {
        allBooks.url.push(element);
      });

      this.getBooks(results)["name"].map((element) => {
        allBooks.name.push(element);
      });

      this.getBooks(results)["authors"].map((element) => {
        allBooks.authors.push(element);
      });

      this.getBooks(results)["id"].map((element) => {
        allBooks.id.push(element);
      });

      this.getBooks(results)["shelf"].map((element) => {
        allBooks.shelf.push(element);
      });
    });

    // console.log(allBooks)
    this.setState({
      bookResults: allBooks,
    });
  };

  updateBookShelf = (book, shelf) => {
    const allShelf = this.state.bookResults.shelf;

    this.state.bookResults["id"].map((element, index) => {
      if (element === book) {
        allShelf[index] = shelf;
      }
    });

    this.setState({
      shelf: allShelf,
    });
  };

  CurrentlyReadingGroup = () => {
    return this.state.bookResults.url.map((element, index) => {
      if (this.state.bookResults.shelf[index] === "currentlyReading") {
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
                    book={this.state.bookResults.id[index]}
                    updateBookShelf={this.updateBookShelf}
                    shelfStatus={this.state.bookResults.shelf[index]}
                  />
                </div>
              </div>
              <div className="book-title">
                {this.state.bookResults.name[index]}
              </div>
              <div className="book-authors">
                {this.state.bookResults.authors[index]}
              </div>
            </div>
          </li>
        );
      }
    });
  };

  WantToRead = () => {
    return this.state.bookResults.url.map((element, index) => {
      if (this.state.bookResults.shelf[index] === "wantToRead") {
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
                    book={this.state.bookResults.id[index]}
                    updateBookShelf={this.updateBookShelf}
                    shelfStatus={this.state.bookResults.shelf[index]}
                  />
                </div>
              </div>
              <div className="book-title">
                {this.state.bookResults.name[index]}
              </div>
              <div className="book-authors">
                {this.state.bookResults.authors[index]}
              </div>
            </div>
          </li>
        );
      }
    });
  };

  Read = () => {
    return this.state.bookResults.url.map((element, index) => {
      if (this.state.bookResults.shelf[index] === "read") {
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
                    book={this.state.bookResults.id[index]}
                    updateBookShelf={this.updateBookShelf}
                    shelfStatus={this.state.bookResults.shelf[index]}
                  />
                </div>
              </div>
              <div className="book-title">
                {this.state.bookResults.name[index]}
              </div>
              <div className="book-authors">
                {this.state.bookResults.authors[index]}
              </div>
            </div>
          </li>
        );
      }
    });
  };

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>HomePage</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">{this.CurrentlyReadingGroup()}</ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">{this.WantToRead()}</ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">{this.Read()}</ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/Search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default HomePage;
