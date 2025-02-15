import { booksService } from "../services/books.service.js"

const { useParams, useNavigate } = ReactRouter

const { useState, useEffect } = React

export function BookEdit() {
    const [book, setBook] = useState(booksService.getEmptyBook())
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (params.bookId) loadBook()
    }, [])

    function loadBook() {
        booksService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onSave(ev) {
        ev.preventDefault()
        booksService.save(book)
            .then(() => console.log('Book has successfully saved!'))
            .catch((err) => console.log(`couldn't save book -`, err))
            .finally(() => navigate('/book'))
    }

    function handleChange({ target }) {
        const { type, name: field } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;
        }
        setBook(prevBook => ({ ...prevBook, [field]: value }))
    }

    function handleChangeListPrice({ target }) {
        const { type, name: field } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;
        }

        setBook(prevBook => ({
            ...prevBook,
            listPrice: { ...prevBook.listPrice, [field]: value }
        }))
    }

    const {
        title,
        authors,
        listPrice,
        description,
        pageCount,
    } = book

    return (
        <section className='book-edit'>
            <h2>Add Book</h2>
            Add a book manually:
            <form onSubmit={onSave}>
                <label className='bold-txt' htmlFor="title">Title: </label>
                <input onChange={handleChange} value={title}
                    id='title' type="text" name='title' />

                <label className='bold-txt' htmlFor="authors">Authors: </label>
                <input onChange={handleChange} value={authors}
                    id='authors' type="text" name='authors' />

                <label className='bold-txt' htmlFor="price">Price: </label>
                <input onChange={handleChangeListPrice} value={listPrice.amount}
                    id='price' type="number" name='amount' />

                <label className='bold-txt' htmlFor="description">Description: </label>
                <textarea onChange={handleChange} value={description}
                    id='description' type="text" name='description' />

                <label className='bold-txt' htmlFor="pages">Number of pages: </label>
                <input onChange={handleChange} value={pageCount}
                    id='pages' type="number" name='pageCount' />

                <label className='bold-txt' htmlFor="isOnSale">On Sale: </label>
                <input onChange={handleChangeListPrice} checked={listPrice.isOnSale}
                    id='isOnSale' type="checkbox" name='isOnSale' />

                <button>Save</button>
            </form>
        </section>
    )
}