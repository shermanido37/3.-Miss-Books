const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { booksService } from '../services/books.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { getTruthyValues } from '../services/util.service.js'


export function BookIndex() {
    const [books, setBooks] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(booksService.getFilterFromSearchParams(searchParams))
    
    useEffect(() => {
        console.log('Loading Books')
        setSearchParams(getTruthyValues(filterBy))
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        booksService.query(filterBy)
            .then(setBooks)
            .catch(err => console.log('err:', err))
    }

    function onSetFilterBy(newFilter) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))
    }

    function removeBook(bookId) {
        booksService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => bookId !== book.id))
                showSuccessMsg('Book has been successfully removed!')
            })
            .catch(() => {
                showErrorMsg(`couldn't remove book`)
                navigate('/book')
            })
    }

    return (
        <div className='books-container'>
            <h2>Books list</h2>
            <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <Link className="add-book-link" to="/book/edit"><button className='add-book'>Add book </button></Link>
            <BookList books={books} onRemove={removeBook} />
        </div>
    )
}



