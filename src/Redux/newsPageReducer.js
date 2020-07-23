
import { newsAPI } from '../API/api'

/*Action Creators*/
const setArticlesData = data => ({ type: 'SET-ARTICLES-DATA', data })
const toggleLoader = val => ({ type: 'TOGGLE-LOADER', val })

/*Thunk Creators*/
export const getArticles = data => async dispatch => {
    dispatch(toggleLoader(true))
    let res = await newsAPI.getArticles()

    console.log(res.articles)
    dispatch(setArticlesData(res.articles))
    dispatch(toggleLoader(false))

}

let InitialState = {
    articles: [],
    loading: false
}

const newsPageReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'SET-ARTICLES-DATA':
            return { ...state, articles: [...action.data] }

        case 'TOGGLE-LOADER':
            return { ...state, loading: action.val }

        default:
            return state
    }
}

export default newsPageReducer