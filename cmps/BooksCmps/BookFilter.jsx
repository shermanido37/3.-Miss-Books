

const { useState, useEffect } = React

export function BookFilter({filterBy, onSetFilter}){
    
    const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field } = target
        switch (target.type) {
            case 'range':
            case 'number':
                value = +target.value
                break
            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    const { txt, listPrice } = filterByToEdit
    return (
        <section className="book-filter">
            <h2>What book do you fancy?</h2>
            <form>
                <label htmlFor="txt">Title / Description</label>
                <input onChange={handleChange} value={txt} type="text" name="txt" id="txt" />

                <label htmlFor="listPriceAmount">Price</label>
                <input onChange={handleChange} value={listPrice.amount || ''} type="number" name="listPriceAmount" id="listPriceAmount" />

                <button>Submit</button>
            </form>
        </section>
    )
}
