import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import debounce from 'throttle-debounce/debounce'

class SearchPage extends React.Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired,
        getBooks: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)    
        
        this.state = {
            query: '',
            books: [],
            loading: false
        }
        this.searchBook = debounce(600, this.searchBook)
    }

    searchBook = (query) => {
        if (query) {
            BooksAPI.search(query.trim())
                .then((books) => {
                    if (query.trim() !== this.state.query.trim()) {
                        this.searchBook(this.state.query)
                    }                    

                    if(books !== undefined && books.length > 0)
                    {
                        books.map((book) => 
                        (
                            this.props.books.filter((bp) => bp.id === book.id).map((bk) => 
                            (
                                book.shelf = bk.shelf
                            ))
                        ));
                    }

                    this.setState(state => ({
                        books: books.length > 0 ? books.sort(sortBy('title')) : books = [],
                        loading: false
                    }))
                })
        } else {
            this.setState(state => ({
                books: []
            }))
        }
    }

    updateQuery = (query) => {
        if (query !== undefined && query !== '') {
            this.setState(state => ({
                query,
                loading: true
            }))
            this.searchBook(query)
        } else {
            this.setState(state => ({
                query,
                books: []
            }))
        }
    }

    render() {
        const { onUpdateBook, getBooks } = this.props
        const { query, books, loading } = this.state

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to='/'
                        className='close-search'
                        onClick={getBooks}
                    >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.id}>
                                <Book
                                    book={book}
                                    onUpdateBook={onUpdateBook}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
                {loading ? 
                (<div className="lds-css center" >
                    <div className="lds-wave"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>) : ""}                
            </div>
        )
    }
}



export default SearchPage