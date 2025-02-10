import { booksData } from "../data/books.js";
import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js"

const BOOK_STORAGE_KEY = "BOOK_STORAGE"
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter
}


function query(filterBy = {}) {
    return storageService.query(BOOK_STORAGE_KEY)
        .then(books => {
            if (filterBy.txt) { //  filter by text
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title) || regExp.test(book.description))
            }

            if (filterBy.listPrice && filterBy.listPrice.amount) {  //  filter by price
                books = books.filter(book => book.listPrice.amount >= filterBy.listPrice.amount && book.listPrice.currencyCode === filterBy.listPrice.currencyCode)
            }

            return books
        })
}

function get(bookID) {
    return storageService.get(BOOK_STORAGE_KEY, bookID)
}

function remove(bookID) {
    return storageService.remove(BOOK_STORAGE_KEY, bookID)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_STORAGE_KEY, book)
    } else {
        return storageService.post(BOOK_STORAGE_KEY, book)
    }
}

function getEmptyBook(title = '', description = '', listPrice = {amount: 0, currencyCode: 'EUR'}) {
    return { title, description, listPrice }
}

function getDefaultFilter(filterBy = { txt: '', listPrice: {amount: 0, currencyCode: 'EUR'} }) {
    return { txt: filterBy.txt, listPrice: filterBy.listPrice }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_STORAGE_KEY)
    if (!books || !books.length) {
        books = booksData
        utilService.saveToStorage(BOOK_STORAGE_KEY, books)
    }
}