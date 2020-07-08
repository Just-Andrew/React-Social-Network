import React, { useState, useEffect } from 'react';
import styles from './UsersPage.module.css';
import { Redirect } from 'react-router-dom'
import User from './User';

const Title = props => {
    return (
        <div className={styles.title}><b>{props.title}</b></div>
    )
}

const Users = props => {
    let users = props.users.map(u =>
        <User
            toggleFollowStatus={props.toggleFollowStatus}
            photo={u.photos.large}
            isButtonDisabled={u.isButtonDisabled}
            id={u.id}
            status={u.status}
            name={u.name}
            followed={u.followed}
        />)

    return (
        <div className={styles.users}>
            {users}
        </div>
    )
}

const PaginatorForLowNumbers = props => {
    let pagesAmount = Math.ceil(props.totalCount / props.count)
    let pagesSwitches = []
    if (pagesAmount !== 1) {
        for (let i = 1; i <= pagesAmount; i++) {
            pagesSwitches[i] =
                <i key={i}
                    className={props.currentPage === i ? styles.selectedPage : ''}
                    onClick={(e) => { props.getNewUsers(i) }}>{i + ' '}
                </i>
        }
    } else {
        pagesSwitches = null
    }
    return (
        <div className={styles.pages}>
            {pagesSwitches === null ? '' : pagesSwitches}
        </div>
    )
}


const UsersPage = props => {
    return (
        !props.isAuth ? <Redirect to='/login' />
            : <div className={styles.UsersPageWrapper} >
                <Title
                    title={props.title}
                />

                <Users
                    users={props.users}
                    toggleFollowStatus={props.toggleFollowStatus}
                />
                {props.friend
                    ? <PaginatorForLowNumbers
                        totalCount={props.totalCount}
                        count={props.count}
                        currentPage={props.currentPage}
                        getNewUsers={props.getNewUsers}
                    />
                    : <PaginatorForHugeNumbers
                        totalCount={props.totalCount}
                        count={props.count}
                        currentPage={props.currentPage}
                        getNewUsers={props.getNewUsers}
                    />
                }
            </div>
    );
}

const PaginatorForHugeNumbers = props => {
    let [currentPage, setCurrentPage] = useState(props.currentPage)
    let [currentPageInputValue, setCurrentPageInputValue] = useState(currentPage)
    let [incrementDisability, setIncrementDisabilityValue] = useState(false)
    let [decrementDisability, setDecrementDisabilityValue] = useState(false)
    let pagesAmount = Math.ceil(props.totalCount / props.count)


    useEffect(() => {
        console.log('sth has been changed')
        if (parseInt(currentPage) < 2) {
            setDecrementDisabilityValue(true)
        }

        if (parseInt(currentPage) === pagesAmount) {
            setIncrementDisabilityValue(true)
        }
    }, [incrementDisability, decrementDisability])

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

export default UsersPage;