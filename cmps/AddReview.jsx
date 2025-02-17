import { booksService } from "../services/books.service.js"

const {useState} = React

export function AddReview(props = {bookID, onExit}){

    const [review, setReview] = useState(booksService.getEmptyReview())

    function handleChange({target}){
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

        setReview(prevReview => ({...prevReview, [field]: value}))
    }
    
    function onSubmitReview(ev){
        ev.preventDefault()
        
        /**save review here */
        booksService.saveReview(props.bookID, review)
        .then(savedReview => {
            props.onExit(savedReview)
        })
    }

    function onClickX(){
        props.onExit()
    }

    const {
        fullName,
        rating,
        txt,
    } = review

    return <section className="review-add">
        <div className="review-modal">
            <form onSubmit={onSubmitReview} className="review-form">
                <h1>Add a Review</h1>
                <div>
                    <label htmlFor="fullName">Full Name: </label>
                    <input type="text" name="fullName" id="fullName" onChange={handleChange} value={fullName} placeholder="Type your name here" />
                </div>
                <div>
                    <label htmlFor="review-rating">Rating:</label>
                    <select name="rating" id="review-rating" value={rating} onChange={handleChange}>
                        <option value="">--Please choose an option--</option>
                        <option value="1">★</option>
                        <option value="2">★★</option>
                        <option value="3">★★★</option>
                        <option value="4">★★★★</option>
                        <option value="5">★★★★★</option>
                    </select>
                </div>
                <label htmlFor="txt">Description:</label>
                <textarea name="txt" id="txt" rows="8" cols="50" placeholder="Type your review here" value={txt} onChange={handleChange}></textarea>
                <button>Submit</button>
            </form>
            <button className="btn-toggle-modal close" onClick={onClickX}>X</button>
        </div>
    </section>
}