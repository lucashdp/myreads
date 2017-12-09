import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchPage from './SearchPage'
import { BrowserRouter, Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(
      (books) => { this.setState({ books }) }
      )
  }

  updateBook = (book) => {
    let { books } = this.state
    books.filter((b) => b.id !== book.id)

    BooksAPI.update(book, book.shelf)
      .then(book => {
        this.setState(state => ({
          books: books.concat([book])
        }))
      })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route path='/search' render={() => (
            <SearchPage/>
          )} />
          <Route exact path='/' render={() => (
            <div>
              <ListBooks
                books={this.state.books}
                onUpdateBook={this.updateBook} />
              <div className="open-search">
                <Link
                  to='/search'
                >Add a boo</Link>
              </div>
            </div>
          )} />
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
