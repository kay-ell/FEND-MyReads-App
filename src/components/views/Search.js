import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from '../Book'
import * as BooksAPI from '../../BooksAPI'

class Search extends React.Component {
  static propTypes = {
    updateQuery: PropTypes.func.isRequired,
    searchBooks: PropTypes.func.isRequired
  }
  state = {
    query: '',
    results: [],
    Books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ Books: books })
    })
  }

  updateQuery = (query) => {
    this.setState({ query : query }, this.searchBooks)
  }

 // search the query using BooksAPI's search method
  searchBooks() {
    if(this.state.query && this.state.query.length > 0) {
      BooksAPI.search(this.state.query.trim())
      .then(response => {
        if(response.error) { // if there's an error, results will be empty
          return this.setState({ results: [] })
        } else {
          response.map(res => { // map the response from the .search method
            let currentShelf = this.state.Books.find(b => b.id === res.id)
            // find match with books that are on shelf
            if(currentShelf) {
              res.shelf = currentShelf.shelf // if yes, then the result's shelf is set to the same as the one on current shelf
            } else {
              res.shelf = "none" // otherwise, shelf is set to "none"
            }
            return this.setState({ results: response }) // change the state to the response
          })

        }
      })
    } else if(this.state.query === '' || this.state.query === undefined) {
      // if the query is empty or undefined, reset the state to an empty array for results
        return this.setState({ results: [] })
    }
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
                  key={result.id}
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
