import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class ListBooks extends React.Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }

    render() {
        const { books, onUpdateBook } = this.props
        let booksCurrently = books.filter((book) => book.shelf === 'currentlyReading')
        let booksWantToRead = books.filter((book) => book.shelf === 'wantToRead')
        let booksRead = books.filter((book) => book.shelf === 'read')

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {booksCurrently.map((book) => (
                                        <li key={book.id}>
                                            <Book
                                                book={book}
                                                onUpdateBook={onUpdateBook}
                                            />
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {booksWantToRead.map((book) => (
                                        <li key={book.id}>
                                            <Book
                                                book={book}
                                                onUpdateBook={onUpdateBook}
                                            />
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {booksRead.map((book) => (
                                        <li key={book.id}>
                                            <Book
                                                book={book}
                                                onUpdateBook={onUpdateBook}
                                            />
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListBooks