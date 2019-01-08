import React from 'react'
import * as BooksAPI from '../../BooksAPI'
import { Link } from 'react-router-dom'
import BookShelf from '../BookShelf'

class Main extends React.Component {
  state = {
    books: []
  }

  // use BooksAPI's getAll() method to get all the books
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

// update the book's shelf based on selection from the dropdown
  updateShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf)
    .then(response => {
      let allBooks = this.state.books
      book.shelf = newShelf
      this.setState(state => ({
        books: allBooks.filter(b => b.id !== book.id).concat([ book ])
      }))
    })
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf updateShelf={this.updateShelf} shelfTitle="Currently Reading" booksOnShelf={this.state.books.filter(book => book.shelf === "currentlyReading")} />
            <BookShelf updateShelf={this.updateShelf} shelfTitle="Want to Read" booksOnShelf={this.state.books.filter(book => book.shelf === "wantToRead")} />
            <BookShelf updateShelf={this.updateShelf} shelfTitle="Read" booksOnShelf={this.state.books.filter(book => book.shelf === "read")} />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>

    )
  }
}

export default Main
