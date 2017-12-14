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
                <option key="block" value="block" disabled>Move to...</option>
                <option key="currentlyReading" value="currentlyReading">Currently Reading</option>
                <option key="wantToRead" value="wantToRead">Want to Read</option>
                <option key="read" value="read">Read</option>
                <option key="none" value="none" selected>None</option>
            </select>
        )
    }
}

export default ChangeShelf