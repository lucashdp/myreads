import React from 'react'
import PropTypes from 'prop-types'

class ChangeShelf extends React.Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }

    render() {
        const { book, onUpdateBook } = this.props

        return (
            <select value={book.shelf} 
            onChange={(e) => { 
                book.shelf = e.target.value
                onUpdateBook(book)
            }}>
                <option key="none" value="none" disabled>Move to...</option>
                <option key="currentlyReading" value="currentlyReading" selected={book.shelf === this.value}>Currently Reading</option>
                <option key="wantToRead" value="wantToRead" selected={book.shelf === this.value}
                    onClick={(value = this.value) => { this.setShelfState(value).bind(this) }}>Want to Read</option>
                <option key="read" value="read" selected={book.shelf === this.value}
                    onClick={(value = this.value) => { this.setShelfState(value).bind(this) }}>Read</option>
            </select>
        )
    }
}

export default ChangeShelf