import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Books from './Books'
import * as BooksAPI from './BooksAPI'



class BooksApp extends React.Component {
  state = {
    books: [],
    current: [],
    want: [],
    read: [],
    // shelf: '',


    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }



  componentDidMount() {
    BooksAPI.getAll().then((books)=> {
      this.setState({books})
      this.setState((state) => ({
        current: state.books.filter((b) => b.shelf === "currentlyReading")
      }))
      this.setState((state) => ({
        want: state.books.filter((b) => b.shelf === "wantToRead")
      }))
      this.setState((state) => ({
        read: state.books.filter((b) => b.shelf === "read")
      }))
    })

  }



updateBook = (book, shelf) => {

  // this.setState((state) => ({
  //   books: this.state.books, {book: shelf}
  // }))
  if(shelf === "currentlyReading") {
  let nb = this.state.current.concat(book)
  this.setState({current: nb})

  
  this.setState((state) => ({
    current: state.books.filter((b) => b.id === book.id && b.shelf === "currentlyReading")
  }))
  this.setState((state) => ({
    want: state.books.filter((b) => b.id !== book.id && b.shelf === "wantToRead")
  }))
  this.setState((state) => ({
    read: state.books.filter((b) => b.id !== book.id && b.shelf === "read")
  }))
}
  // this.setState((state) => ({
  //   current: state.current.filter((b) => b.shelf !== book.shelf)
  // }))
  // this.setState((state) => ({
  //   want: state.books.filter((b) => b.shelf === "wantToRead")
  // }))
  // this.setState((state) => ({
  //   read: state.books.filter((b) => b.shelf === book.shelf)
  // }))

  BooksAPI.update(book, shelf)


  // if (shelf === "currentlyReading") {
  // this.setState((state) => ({
  //   read: state.read.filter((b) => b.id !== book.id)
  // }))
  // }
  //
  // console.log(book.shelf)
}



  render() {

    return (

      <div className="app">

        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <Books
            stateChange={this.updateBook}
            current={this.state.current}
            want={this.state.want}
            read={this.state.read}
            />


            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
