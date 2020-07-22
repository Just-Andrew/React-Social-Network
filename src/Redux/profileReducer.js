import { profileAPI } from '../API/api'

/*Action Creators */
export const addPost = post => ({ type: 'ADD-POST', post })
const setPosts = posts => ({ type: 'SET-POSTS', posts })
const setCurrentUserData = data => ({ type: 'SET-CURRENT-USER-DATA', data })
const setCurrentUserStatus = status => ({ type: 'SET-CURRENT-USER-STATUS', status })
const toggleLoader = val => ({ type: 'TOGGLE-LOADER', val })
export const updateStatusText = text => ({ type: 'UPDATE-STATUS-TEXT', text })
export const toggleAvatarEditMode = val => ({ type: 'TOGGLE-AVATAR-EDIT-MODE', val })
const setNewAvatar = avatar => ({ type: 'SET-NEW-AVATAR', avatar })

/*Thunk Creators*/
export const getUserProfile = (id, val = false, data) => async dispatch => {
    dispatch(toggleLoader(true))
    if (val) {
        profileAPI.updateProfile(data)
    }
    let res = await profileAPI.getProfile(id)
    dispatch(setCurrentUserData({
        userId: res.data.userId,
        avatar: res.data.photos.large,
        fullName: res.data.fullName,
        job: res.data.lookingForAJob,
        jobDescription: res.data.lookingForAJobDescription,
        aboutMe: res.data.aboutMe
    }))

    let status = await profileAPI.getProfileStatus(id)
    dispatch(setCurrentUserStatus(status.data))

    dispatch(getPosts(id))
}

export const getPosts = id => async dispatch => {
    dispatch(toggleLoader(true))
    let posts = await profileAPI.getPosts(id)
    dispatch(setPosts(posts))
    dispatch(toggleLoader(false))
}

export const createPost = text => async dispatch => {
    dispatch(toggleLoader(true))
    let post = await profileAPI.createPost(text)
    dispatch(addPost(post))
    dispatch(toggleLoader(false))
}

export const setNewStatus = status => async dispatch => {
    dispatch(toggleLoader(true))
    await profileAPI.setNewStatus(status)
    dispatch(setCurrentUserStatus(status))
    dispatch(toggleLoader(false))
}

export const updateAvatar = file => async dispatch => {
    dispatch(toggleLoader(true))
    let res = await profileAPI.updateAvatar(file)
    dispatch(setNewAvatar(res.data.data.photos.large))
    dispatch(toggleLoader(false))
}



let InitialState = {
    avatarEditMode: false,
    currentUserId: null,
    fullName: null,
    avatar: null,
    status: null,
    loading: false,
    lookingForAJob: false,
    lookingForAJobDescription: null,
    aboutMe: null,
    posts: []
}

let profileReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'ADD-POST':
            return { ...state, posts: [...state.posts, action.post] }

        case 'SET-POSTS':
            return { ...state, posts: [...action.posts] }

        case 'SET-CURRENT-USER-DATA':
            return {
                ...state,
                currentUserId: action.data.userId,
                fullName: action.data.fullName,
                avatar: action.data.avatar,
                lookingForAJob: action.data.job,
                lookingForAJobDescription: action.data.jobDescription,
                aboutMe: action.data.aboutMe
            }

        case 'SET-CURRENT-USER-STATUS':
            return { ...state, status: action.status }

        case 'TOGGLE-LOADER':
            return { ...state, loading: action.val }

        case 'UPDATE-STATUS-TEXT':
            return { ...state, status: action.text }

        case 'TOGGLE-AVATAR-EDIT-MODE':
            return { ...state, avatarEditMode: action.val }

        case 'SET-NEW-AVATAR':
            return { ...state, avatar: action.avatar }

        default:
            return state
    }
    return state
}
export default profileReducer

