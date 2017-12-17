import React from 'react'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class ListBooks extends React.Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired
    }

    render() {
        const { books, onUpdateBook, loading } = this.props
        let booksCurrently = books.filter((book) => book.shelf === 'currentlyReading')
        let booksWantToRead = books.filter((book) => book.shelf === 'wantToRead')
        let booksRead = books.filter((book) => book.shelf === 'read')

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>

                {!loading ? (
                    <div className="list-books-content">
                        <div>
                            <BookShelf
                                books={booksCurrently}
                                onUpdateBook={onUpdateBook}
                                shelf='Currently Reading'
                            />
                            <BookShelf
                                books={booksWantToRead}
                                onUpdateBook={onUpdateBook}
                                shelf='Wanto to Read'
                            />
                            <BookShelf
                                books={booksRead}
                                onUpdateBook={onUpdateBook}
                                shelf='Read'
                            />
                        </div>
                    </div>
                ) : ""}
                {loading ?
                    (<div className="lds-css center" >
                        <div className="lds-wave"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>) : ""}
            </div>
        )
    }
}

export default ListBooks