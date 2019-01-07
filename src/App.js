import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import Main from './components/views/Main'
import Search from './components/views/Search'

class BooksApp extends React.Component {


  render() {
    return (
      <div className='App'>
        <Route exact path='/' component={ Main }/>
        <Route exact path='/search' component={ Search }/>
      </div>
    )
  }
}

export default BooksApp
