import { profileAPI } from '../API/api'

/*Action Creators */
export const addPost = text => ({ type: 'ADD-POST', text })
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
    dispatch(toggleLoader(false))


}

export const setNewStatus = status => async dispatch => {
    dispatch(toggleLoader(true))
    await profileAPI.setNewStatus(status)
    dispatch(setCurrentUserStatus(status))
    dispatch(toggleLoader(false))
}

export const updateAvatar = file => async dispatch => {
    toggleLoader(true)
    let res = await profileAPI.updateAvatar(file)
    dispatch(setNewAvatar(res.data.data.photos.large))
    toggleLoader(true)
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
    posts: [
        {
            id: 1,
            text: 'Here is supposed to be sth... sooo',
            likes: 7
        },
        {
            id: 2,
            text: 'Hi there!',
            likes: 0
        },
        {
            id: 3,
            text: 'The Earth is flat!!!',
            likes: 11
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
            return { ...state, posts: [post, ...state.posts] }

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
    }
    return state
}
export default profileReducer;

