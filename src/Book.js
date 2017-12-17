import React from 'react'
import PropTypes from 'prop-types'
import ChangeShelf from './ChangeShelf'

const serializeAuthors = (authors = ['', '']) => {

    if (authors.length === 1)
        return authors

    let serializedAuthors = '';

    for (const author of authors) {
        serializedAuthors += author + ', '
    }

    return serializedAuthors.substring(0, serializedAuthors.length - 2) + '.';
}

const Book = (props) => {

    const { book, onUpdateBook } = props

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover"
                    style={{
                        width: 128, height: 193,
                        backgroundImage: `url(${book.imageLinks !== undefined ?
                            book.imageLinks.smallThumbnail : ''})`
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
            <div className="book-authors">{serializeAuthors(book.authors)}</div>
        </div>
    )
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateBook: PropTypes.func.isRequired
}

export default Book