import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class Books extends Component {
  static propTypes= {
    // books: PropTypes.array.isRequired,
    stateChange: PropTypes.func.isRequired
  }

//
// constructor(props) {
//   super(props);
//   this.state = {
//     shelf: ''
//   };
//
//   this.handleChange = this.handleChange.bind(this);
//
// }
//
// handleChange(event) {
//   this.setState({shelf: event.target.value});
//   // return(this.shelf);
//   console.log(this.state.shelf)
// }

handleChange1(event) {
  let st = event.target.value
  console.log(st);
  return(st);

}


  render() {
    const {books, stateChange} = this.props

    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
      <ol className='books-grid'>
        {this.props.current.map((book) => (
          <li key={book.id}>
          <div className="book">
            <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
            <select value={"move"} onChange={(e)=> {BooksAPI.update(book, this.handleChange1(e))}}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading" >Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
              </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>
        ))}
      </ol>
      <div className="bookshelf">
        <h2 className="bookshelf-title">Want to Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {this.props.want.map((book) => (
            <li key={book.id}>
            <div className="book">
              <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
              <div className="book-shelf-changer">
              <select value={"move"} onChange={(e)=> {BooksAPI.update(book, this.handleChange1(e))}}>
                <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
                </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {this.props.read.map((book) => (
            <li key={book.id}>
            <div className="book">
              <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
              <div className="book-shelf-changer">
                <select value={"move"} onChange={(e) => {stateChange(book, this.handleChange1(e))}}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
                </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
            </li>
          ))}
          </ol>

        </div>
      </div>
      </div>
      </div>
      </div>
      </div>

    )
  }
}

export default Books


// () => onDeleteContact(contact)}
