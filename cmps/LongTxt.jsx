const { useState } = React

export function LongTxt({ txt, length = 100 }) {
    
    const [isShowFullTxt, setIsShowFullTxt] = useState(false)

    function onToggleIsShowFullTxt() {
        setIsShowFullTxt(isShowFullTxt => !isShowFullTxt)
    }

    const isTextTooLong = txt.length > length
    const textToShow = (isShowFullTxt || !isTextTooLong) ? txt : (txt.substring(0, length)) + '...'
    return (
        <section className="long-txt">
                <p className="txt">{textToShow}</p>
                {isTextTooLong &&
                    <div>
                        <button className="show-txt-btn" onClick={onToggleIsShowFullTxt}>
                            {isShowFullTxt ? 'Show Less' : 'Read More'}
                        </button>
                    </div>
                }
        </section>
    );
}