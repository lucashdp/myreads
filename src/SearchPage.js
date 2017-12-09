import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ChangeShelf from './ChangeShelf'

class SearchPage extends React.Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }

    serializeAuthors(authors = ['', '']) {

        if (authors.length === 1)
            return authors

        let serializedAuthors = '';

        for (const author of authors) {
            serializedAuthors += author + ', '
        }

        return serializedAuthors.substring(0, serializedAuthors.length - 2) + '.';
    }

    render() {
        const { books, onUpdateBook } = this.props

        return (

            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to='/'
                        className='close-search'
                    >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover"
                                            style={{
                                                width: 128, height: 193,
                                                backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                                            }}>
                                        </div>
                                        <div className="book-shelf-changer">
                                            <ChangeShelf
                                                book={book}
                                                onUpdateBook={() => onUpdateBook(book)}
                                            />
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{this.serializeAuthors(book.authors)}</div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchPage