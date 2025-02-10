import { BookPreview } from "./BookPreview.jsx";
const { Link } = ReactRouterDOM

export function BookList({books, onRemoveBook}){

    const className = 'book-list'

    return <ul className={className}>
            {
                books.map(book => 
                    <li key={book.id}>
                        <BookPreview book={book} />
                        <section>
                            <button onClick={() => onRemoveBook(book.id)}>Remove</button>
                            <button><Link to={`/Books/${book.id}`}>Details</Link></button>
                            <button><Link to={`/Books/edit/${book.id}`}>Edit</Link></button>
                        </section>
                    </li>
                )
            }
        </ul>
}