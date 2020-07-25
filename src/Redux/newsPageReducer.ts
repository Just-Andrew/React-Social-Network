
import { newsAPI } from '../API/api'
import { toggleLoader } from './appReducer'

/* Action Types */
type setArticlesDataActionType = {
    type: 'SET-ARTICLES-DATA'
    data: any
}

/*Action Creators*/
const setArticlesData = (data: any): setArticlesDataActionType => ({ type: 'SET-ARTICLES-DATA', data })


/*Thunk Creators*/
export const getArticles = (data: any) => async (dispatch: Function) => {
    dispatch(toggleLoader(true))
    let res = await newsAPI.getArticles()
    dispatch(setArticlesData(res.articles))
    dispatch(toggleLoader(false))
}

type InitialStateType = {
    articles: Array<object>
}

let InitialState = {
    articles: [],
}

const newsPageReducer = (state = InitialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SET-ARTICLES-DATA':
            return { ...state, articles: [...action.data] }

        default:
            return state
    }
}

export default newsPageReducer