const { useState, useEffect, useRef } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { AddReview } from "../cmps/AddReview.jsx";
import { LongTxt } from "../cmps/LongTxt.jsx";
import { booksService } from "../services/books.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

export function BookDetails() {
    const [book, setBook] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isAddReview, setIsAddReview] = useState(false)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        setIsLoading(true)
        booksService.get(params.bookId)
            .then(setBook)
            .catch(() => {
                showErrorMsg('Couldnt get book...')
                navigate(`/book`)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    function getBookDateLevel() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currYearDiff = currentYear - book.publishedDate
        if (currYearDiff > 10) return 'Vintage Book'
        if (currYearDiff <= 1) return 'New Book'
        return ''
    }

    function onClickAddReview(){
        setIsAddReview(true)
    }

    function onAddReviewFinish(review){
        if(review){
            book.reviews.unshift(review)
            showSuccessMsg("Review has been succesfully added!")
        }
        setIsAddReview(false)
    }

    function onClickDeleteReview(reviewID){
        booksService.removeReview(book.id, reviewID)
            .then(() => {
                showSuccessMsg("Review has been successfully removed!")
            })
            .catch(err => {
                showErrorMsg("There was an error saving your review.")
                console.log(err)
            })
    }

    function bookReadingLevel() {
        if (book.pageCount > 500) return 'Serious Read'
        if (book.pageCount > 200) return 'Decent Read'
        return 'Light Read'
    }

    if (isLoading) return <div className="loader"></div>

    const dateLevel = getBookDateLevel()
    const priceClass = book.listPrice.amount > 200 ? 'high-price' : 'low-price'
    const addReviewClass = isAddReview ? "" : "hidden";
    return (
        <article className={`book-details ${addReviewClass}`}>
            <nav className='book-details-nav'>
                <Link to={`/book/${book.prevBookId}`}>
                    <button><i className="fa-solid fa-arrow-left"></i></button>
                </Link>
                <Link to={`/book/${book.nextBookId}`}>
                    <button><i className="fa-solid fa-arrow-right"></i></button>
                </Link>
            </nav>
            <h2>{book.title}</h2>
            {dateLevel && <span>{dateLevel}</span>}
            <h4>{bookReadingLevel()}</h4>

            <img className='book-img' src={book.thumbnail} alt="" />

            <p className={priceClass}>
                <span className='bold-txt'>Price: </span>
                {book.listPrice.amount} {book.listPrice.currencyCode}
            </p>
            <p>
                <span className='bold-txt'>Language:</span>
                {book.language}
            </p>
            {book.categories && <p>
                <span className='bold-txt'>Categories:</span> {book.categories}
            </p>}
            {book.authors && <p>
                <span className='bold-txt'>Authors:</span> {book.authors}
            </p>}
            {book.description && <LongTxt txt={book.description} />}
            {book.listPrice.isOnSale && <img className="on-sale-icon" src="/assets/booksImages/onSale.png.png" alt="" />}
            
            <button onClick={onClickAddReview}>Add Review</button>

            {book && isAddReview && <AddReview bookID={book.id} onExit={onAddReviewFinish}/>}

            <section className="review-container">
                <h2>Reviews</h2>
                {!book.id || book.reviews.length === 0 ? <p>Be the first to write a review for this book.</p> : <div className="review-list">
                    {book.reviews.map(review => 
                        <article className="review-details" key={review.id}>
                            <h5>{review.fullName}</h5>
                            <p>Rating: {review.rating}/5, Submitted on {review.date}</p>
                            <LongTxt txt={review.txt}/>
                            <button className="fa-regular fa-trash-can close btn-remove-review" onClick={() => onClickDeleteReview(review.id)}> </button>
                        </article>
                    )}
                </div>}
            </section>

            <button className='close'>
                <Link to='/book'>X</Link>
            </button>

            
        </article>
    )
}