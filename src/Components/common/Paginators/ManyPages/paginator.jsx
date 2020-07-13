import React, { useEffect, useState } from 'react'
import styles from './paginator.module.css'

const Paginator = props => {
    let [currentPage, setCurrentPage] = useState(props.currentPage)
    let [currentPageInputValue, setCurrentPageInputValue] = useState(currentPage)
    let [incrementDisability, setIncrementDisabilityValue] = useState(false)
    let [decrementDisability, setDecrementDisabilityValue] = useState(false)
    let [pagesAmount, setPagesAmount] = useState(Math.ceil(props.totalCount / props.count))

    useEffect(() => {
        let pA = Math.ceil(props.totalCount / props.count)
        setPagesAmount(pA)
        if (parseInt(currentPage) < 2) {
            setDecrementDisabilityValue(true)
        } else { setDecrementDisabilityValue(false) }

        if (parseInt(currentPage) === pA) {
            setIncrementDisabilityValue(true)
        } else { setIncrementDisabilityValue(false) }


    }, [incrementDisability, decrementDisability, props.currentPage, props.totalCount])

    let changeCurrentPage = () => {
        if (currentPageInputValue !== currentPage) {
            setCurrentPage(currentPageInputValue)
            props.getNewUsers(currentPageInputValue)
        }
    }

    let onPagePrint = (e) => {
        let c = (e.currentTarget.value)
        if (c > pagesAmount) c = pagesAmount
        setCurrentPageInputValue(c)
    }

    let de_or_in__crementCurrentPage = val => {
        let c = parseInt(currentPageInputValue)
        if (val) {
            c += 1
        }
        else {
            c -= 1
        }
        setCurrentPageInputValue(c)
        props.getNewUsers(c)
    }

    return (
        <div className={styles.paginator}>
            {!decrementDisability
                ? <button className={styles.pageTubmler}
                    onClick={() => de_or_in__crementCurrentPage(false)}>◄</button>
                : ''}
            <input min='1' max='4'
                className={styles.currentPageInput}
                value={currentPageInputValue}
                onChange={onPagePrint}
                type='number'
                onFocus={() => { console.log('focus') }}
                onBlur={changeCurrentPage}
            />
            {!incrementDisability
                ? <button className={styles.pageTubmler} disabled={incrementDisability}
                    onClick={() => de_or_in__crementCurrentPage(true)}>►</button>
                : ''}
        </div>
    )
}

export default Paginator