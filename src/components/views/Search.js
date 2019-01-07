import React from 'react'
import { Link } from 'react-router-dom'
import Book from '../Book'
import * as BooksAPI from '../../BooksAPI'

class Search extends React.Component {
  state = {
    query: '',
    results: [],
    Books: []
  }

  updateQuery = (query) => {
    this.setState({ query : query }, this.searchBooks)
  }

  searchBooks() {
    // if query is empty or undefined, clear out the results array
    if(this.state.query === '' || this.state.query === undefined) {
      return this.setState({ results: [] })
    }
    BooksAPI.search(this.state.query.trim())
    .then(response => {
      console.log(response)
      if(response.error) {
        return this.setState({ results: [] })
      } else {
        response.map(res => {
          this.state.Books.map(b => {
            (b.id !== res.id ? res.shelf = "none" : res.shelf = b.shelf)
          })
        })
        return this.setState({ results: response })
      }
    })
  }

  updateShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf)
    .then(response => {
      let allBooks = this.state.Books
      book.shelf = newShelf
      this.setState(state => ({
        Books: allBooks.filter(b => b.id !== book.id).concat([ book ])
      }))
    })
  }



  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.results.map((result, key) => (
                <Book
                  book={result}
                  key={key}
                  updateShelf={this.updateShelf}
                />
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
