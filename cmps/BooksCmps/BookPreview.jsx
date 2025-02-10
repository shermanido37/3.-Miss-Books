
export function BookPreview({ book }) {

    return (
        <article className="book-preview">
            <h4>Title: {book.title}</h4>
            <h4>Price: {book.listPrice.amount + book.listPrice.currencyCode}</h4>
            <img src={`../assets/img/${book.title}.png`} alt="book-image" />
        </article>
    )
}