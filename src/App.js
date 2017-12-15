import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchPage from './SearchPage'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import toastr from 'toastr'
import 'toastr/build/toastr.css';


class BooksApp extends React.Component {
  state = {
    books: [],
    loading: true
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then(
    (books) => { this.setState({ books, loading: false }) }
    )
  }

  getAllBooks = () => {
    this.setState({ loading: true })
    BooksAPI.getAll()
      .then(
      (books) => { this.setState({ books, loading: false }) }
      )
  }

  updateBook = (book) => {
    this.setState({ loading: true })
    let { books } = this.state
    books.filter((b) => b.id !== book.id)

    BooksAPI.update(book, book.shelf)
      .then(book => {
        this.setState(state => ({
          books: books.concat([book]), 
          loading: false
        }))
        toastr.success('Book updated successfully !')
      })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route path='/search' render={() => (
            <SearchPage
              books={this.state.books}
              onUpdateBook={this.updateBook}
              getBooks={this.getAllBooks}
            />
          )} />
          <Route exact path='/' render={() => (
            <div>
              <ListBooks
                books={this.state.books}
                onUpdateBook={this.updateBook}
                loading={this.state.loading} />
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
