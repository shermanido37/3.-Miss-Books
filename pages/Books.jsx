import { BookFilter } from "../cmps/BooksCmps/BookFilter.jsx";
import { bookService } from "../services/book.service.js";
import { BookList } from "../cmps/BooksCmps/BookList.jsx"

const {useState, useEffect} = React

export function Books(){

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks(){
        bookService.query(filterBy)
            .then(setCars)
            .catch(err => {
                console.log("Can't get books: " + err)
            })
    }

    function onRemoveBook(bookID) {
        bookService.remove(bookID)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookID))
            })
            .catch(err => {
                console.log(`Cannot remove book ${bookID}:`)
                console.log(err)
            })
    }

    function onSetFilter(filterBy) {
        // console.log('filterBy:', filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!books) return <div className="loader">Loading...</div>

    return <section className="books-container">
        <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
        <Link to="/book/edit">Add Car</Link>
        <BookList
                books={books}
                onRemoveBook={onRemoveBook}
            />
    </section>
}