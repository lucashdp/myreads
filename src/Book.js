import React from 'react'
import PropTypes from 'prop-types'
import ChangeShelf from './ChangeShelf'

class SearchPage extends React.Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
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
        const { book, onUpdateBook } = this.props

        return (
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
            </div>
        )
    }
}

export default SearchPage