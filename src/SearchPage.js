import React from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class Search extends React.Component {
    state = {
    query: '',
    results: []
  }

  updateQuery = (query) => {
    this.setState({
      query: query
    })
    this.showBooks(query);
  }

  //shows search results and handles invalid queries

  showBooks = (query) => {
    if (query) {
      BooksAPI.search(query).then((results) => {
        if (results.error) {
          this.setState({
            results: []
          })
        } else {
          this.setState({
            results: results,
            query: query
          })
        }
      })
    } else {
      this.setState({
        results: []
      })
    }
  }


  render() {

    const {handleChange, update} = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search"> Close </Link>
          <div className="search-books-input-wrapper">
            <input type="text"
      		 placeholder="Search by title or author"
      		 value={this.state.query}
			 onChange={(event)=>this.updateQuery(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {this.state.results.map(result => {
            let bookShelf = "none"
            this.props.searchCurrent.map(book => (
              book.id === result.id ? bookShelf = "currentlyReading" : ''))
            this.props.searchWant.map(book => (
              book.id === result.id ? bookShelf = "wantToRead" : ''))
            this.props.searchRead.map(book => (
              book.id === result.id ? bookShelf = "read" : ''));

          return (
            <li key={result.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193,
                   backgroundImage: `url( "${result.imageLinks ? result.imageLinks.thumbnail : ''}")` }}></div>
                  <div className="book-shelf-changer">
                    <select onChange={(e)=> {update(result, handleChange(e))}} value={bookShelf}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                  </div>
                </div>
                <div className="book-title">{result.title}</div>
                <div className="book-authors">{result.authors}</div>
              </div>
            </li>
            )})}
          </ol>
        </div>
      </div>
      )
    }
  }

export default Search
