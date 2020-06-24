
export const addPost = text => ({ type: 'ADD-POST', text })
export const changeCurrentPostText = text => ({ type: 'CHANGE-CURRENT-POST-TEXT', text })
export const setCurrentUserData = data => ({ type: 'SET-CURRENT-USER-DATA', data })
export const toggleLoader = val => ({ type: 'TOGGLE-LOADER', val })

let InitialState = {
    CurrentPostText: '',
    currentUserId: null,
    fullName: null,
    avatar: null,
    loading: false,
    lookingForAJob: false,
    posts: [
        {
            id: 1,
            'text': 'Here is supposed to be sth... sooo',
            'likes': 7
        },
        {
            id: 2,
            'text': 'Hi there!',
            'likes': 0
        },
        {
            id: 3,
            'text': 'The Earth is flat!!!',
            'likes': 11
        }
    ]
}

let profileReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'ADD-POST':
            let post = {
                'text': action.text,
                'likes': 0
            };
            return { ...state, posts: [post, ...state.posts], CurrentPostText: '' };

        case 'CHANGE-CURRENT-POST-TEXT':
            return { ...state, CurrentPostText: action.text };

        case 'SET-CURRENT-USER-DATA':
            return {
                ...state,
                currentUserId: action.data.userId,
                fullName: action.data.fullName,
                avatar: action.data.avatar,
                lookingForAJob: action.data.job
            }

        case 'TOGGLE-LOADER':
            return { ...state, loading: action.val }
    }
    return state
}
export default profileReducer;

