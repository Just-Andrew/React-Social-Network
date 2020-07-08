import React from 'react'
import styles from './paginator.module.css'

const Paginator = props => {
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

export default Paginator