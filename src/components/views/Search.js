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

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books)
      this.setState({ Books: books })
    })
  }

  updateQuery = (query) => {
    this.setState({ query : query }, this.searchBooks)
  }

  searchBooks() {
    if(this.state.query && this.state.query.length > 0) {
      BooksAPI.search(this.state.query.trim())
      .then(response => {
        console.log(response)
        if(response.error) {
          return this.setState({ results: [] })
        } else {
          response.map(res => {
            let currentShelf = this.state.Books.find(b => b.id === res.id)
            if(currentShelf) {
              res.shelf = currentShelf.shelf
            } else {
              res.shelf = "none"
            }
          })
          return this.setState({ results: response })
        }
      })
    } else if(this.state.query === '' || this.state.query === undefined) {
        return this.setState({ results: [], Books: [] })
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
