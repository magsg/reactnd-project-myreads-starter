import React from 'react'
import {Link} from 'react-router-dom'
import {Route} from 'react-router-dom'
import './App.css'
import Books from './Books'
import Search from './SearchPage'
import * as BooksAPI from './BooksAPI'



class BooksApp extends React.Component {
    state = {
      books: [],
      current: [],
      want: [],
      read: [],
    }

    //imports books from the server and assigns a shelf

    componentDidMount() {
      BooksAPI.getAll().then((books) => {
        this.setState({
          books: books
        })
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

    //moves books between shelves

    updateBook = (book, shelf) => {

      // Currently Reading shelf

      let oldState = book.shelf

      if (shelf === "currentlyReading" && oldState !== "currentlyReading") {
        this.state.books.filter((b) => b.id === book.id).map(bk => {
          bk.shelf = shelf;
          this.setState((state) => ({
            current: [...this.state.current, bk]
          }))
        })

        if (oldState === "wantToRead") {
          this.setState((state) => ({
            want: state.want.filter((b) => b.id !== book.id)
          }))
        }

        if (oldState === "read") {
          this.setState((state) => ({
            read: state.read.filter((b) => b.id !== book.id)
          }))
        }
      }

      //  Want To Read shelf

      if (shelf === "wantToRead" && oldState !== "wantToRead") {
        this.state.books.filter((b) => b.id === book.id).map(bk => {
          bk.shelf = shelf;
          this.setState((state) => ({
            want: [...this.state.want, bk]
          }))
        })

        if (oldState === "currentlyReading") {
          this.setState((state) => ({
            current: state.current.filter((b) => b.id !== book.id)
          }))
        }

        if (oldState === "read") {
          this.setState((state) => ({
            read: state.read.filter((b) => b.id !== book.id)
          }))
        }
      }

      //  Read shelf
      if (shelf === "read" && oldState !== "read") {
        this.state.books.filter((b) => b.id === book.id).map(bk => {
          bk.shelf = shelf;
          this.setState((state) => ({
            read: [...this.state.read, bk]
          }))
        })

        if (oldState === "currentlyReading") {
          this.setState((state) => ({
            current: state.current.filter((b) => b.id !== book.id)
          }))
        }

        if (oldState === "wantToRead") {
          this.setState((state) => ({
            want: state.want.filter((b) => b.id !== book.id)
          }))
        }
      }

      // no shelf ("none")

      if (shelf === "none" && oldState !== "none") {
        this.state.books.filter((b) => b.id === book.id).map(bk => {
          bk.shelf = shelf;
          this.setState((state) => ({
            read: state.read.filter((b) => b.id !== book.id)
          }))
        })

        if (oldState === "currentlyReading") {
          this.setState((state) => ({
            current: state.current.filter((b) => b.id !== book.id)
          }))
        }

        if (oldState === "wantToRead") {
          this.setState((state) => ({
            want: state.want.filter((b) => b.id !== book.id)
          }))
        }

        if (oldState === "read") {
          this.setState((state) => ({
            want: state.want.filter((b) => b.id !== book.id)
          }))
        }
      }

      BooksAPI.update(book, shelf);
    }

    //returns shelf value

    handleChange = (event) => {
      let st = event.target.value
      return (st);
    }

	//moves books from the search page to the main page

 	updateMainPage = (book, shelf) => {

      this.updateBook(book, shelf);

      BooksAPI.getAll().then((books) => {
       this.setState({
          books: books
        })
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

    render() {

        return (

          <div className="app" >

            <Route path='/search'
              render={() => (
      			<Search update={this.updateMainPage} handleChange={this.handleChange}
				searchCurrent={this.state.current} searchWant={this.state.want} searchRead=									{this.state.read}/>
			)}/>

            <Route exact path='/'
              render={() => (
                <div className="list-books">
                  <div className="list-books-title">
                    <h1> MyReads </h1>
                  </div>

                  <Books stateChange={this.updateBook} current={this.state.current} want={this.state.want}
				   read={this.state.read} handleChange={this.handleChange}/>
                    <div className="open-search">
                      <Link to='/search'> Add a book </Link>
                    </div>
                </div>
              )}/>
           </div>
           )
         }
       }

export default BooksApp
