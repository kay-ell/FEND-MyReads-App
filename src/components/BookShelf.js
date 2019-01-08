import React from 'react'
import Book from './Book'
// import * as BooksAPI from '../BooksAPI'

class BookShelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { // list all the books on the shelf
              this.props.booksOnShelf.map((book, key) => (
                <Book
                  book={book}
                  key={book.id}
                  updateShelf={this.props.updateShelf}
                />
              ))
            }

          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
