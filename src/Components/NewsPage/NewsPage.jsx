import React, { useEffect, useState } from 'react'
import styles from './NewsPage.module.css'
import { connect } from 'react-redux'
import { getArticles } from '../../Redux/newsPageReducer'
import preloader from '../../assets/Pictures/preloader.gif'

const NewsCard = props => {
    return (
        <div className={styles.cardWrapper}>
            <div className={styles.post}>
                <div className={styles.headerPost}>
                    <img src={props.img !== null ?
                        props.img
                        : `https://images.pexels.com/photos/2529973/pexels-photo-2529973.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`} alt='' />
                </div>

                <div className={styles.bodyPost}>
                    <div className={styles.postContent}>
                        <div>
                            <h1>{props.title.substr(0, 29)}...</h1>
                            <p>{props.description !== null ? props.description : 'No description'}</p>
                        </div>
                        <div className={styles.infoContainer}>
                            <div className={styles.postedBy}>
                                <span>author</span>
                                {props.author !== null ? props.author : 'anonymous'}
                            </div>
                            <div className={styles.originalSrc}>
                                <a href={props.full}>Read</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const NewsPage = props => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        props.getArticles()
    }, [])

    useEffect(() => {
        setLoading(false)
    }, [props.articles])


    let cards = props.articles.map(a =>
        <NewsCard key={props.articles.indexOf(a)}
            author={a.author}
            title={a.title}
            description={a.description}
            full={a.url}
            img={a.urlToImage} />
    )

    return (
        <div className={styles.ContentWrapper}>

            {loading ?
                <div>
                    <img src={preloader} alt="" />
                </div>
                : <div className={styles.cardsWrapper}>
                    {cards}
                </div>}

        </div >

    )
}

const mapStateToProps = state => ({
    articles: state.news.articles
})

export default connect(mapStateToProps, { getArticles })(NewsPage)