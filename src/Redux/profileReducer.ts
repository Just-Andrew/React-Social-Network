import { profileAPI } from '../API/api'
import {toggleLoader} from './appReducer'

/* Action Types */
type setPostsActionType = {
    type: 'SET-POSTS'
    posts: any
}

type addPostActionType = {
    type: 'ADD-POST'
    post: any
}

type deletePostActionType = {
    type: 'DELETE-POST'
    id: string
}

type editPostActionType = {
    type: 'EDIT-POST'
    id: string
    text: string
    updateTime: string
}

type setCurrentUserDataActionType = {
    type: 'SET-CURRENT-USER-DATA'
    data: object
}

type setCurrentUserStatusActionType = {
    type: 'SET-CURRENT-USER-STATUS'
    status: string
}

type updateStatusTextActionType = {
    type: 'UPDATE-STATUS-TEXT'
    text: string
}

type toggleAvatarEditModeActionType = {
    type: 'TOGGLE-AVATAR-EDIT-MODE'
    val: boolean
}

type setNewAvatarActionType = {
    type: 'SET-NEW-AVATAR'
    avatar: string
}

/*Action Creators */
const setPosts = (posts: any): setPostsActionType => ({ type: 'SET-POSTS', posts })
export const addPost = (post: any): addPostActionType => ({ type: 'ADD-POST', post })
const deletePost = (id: string): deletePostActionType => ({ type: 'DELETE-POST', id })
const editPost = (id: string, text: string, updateTime: string): editPostActionType => ({ type: 'EDIT-POST', id, text, updateTime })
const setCurrentUserData = (data: any): setCurrentUserDataActionType => ({ type: 'SET-CURRENT-USER-DATA', data })
const setCurrentUserStatus = (status: string): setCurrentUserStatusActionType => ({ type: 'SET-CURRENT-USER-STATUS', status })
export const updateStatusText = (text: string): updateStatusTextActionType => ({ type: 'UPDATE-STATUS-TEXT', text })
export const toggleAvatarEditMode = (val: boolean): toggleAvatarEditModeActionType => ({ type: 'TOGGLE-AVATAR-EDIT-MODE', val })
const setNewAvatar = (avatar: string): setNewAvatarActionType => ({ type: 'SET-NEW-AVATAR', avatar })

/*Thunk Creators*/
export const getUserProfile = (id: string, val: boolean = false, data: any) => async (dispatch: Function) => {
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

export const getPosts = (id: string) => async (dispatch: Function) => {
    if (id !== undefined) {
        dispatch(toggleLoader(true))
        let posts = await profileAPI.getPosts(id)
        dispatch(setPosts(posts))
        dispatch(toggleLoader(false))
    }
}

export const createPost = (id: string, text: string) => async (dispatch: Function) => {
    dispatch(toggleLoader(true))
    let post = await profileAPI.createPost(id, text)
    dispatch(addPost(post))
    dispatch(toggleLoader(false))
}

export const removePost = (id: string) => async (dispatch: Function) => {
    dispatch(toggleLoader(true))
    await profileAPI.deletePost(id)
    dispatch(deletePost(id))
    console.log(`post with id ${id} has been successfully deleted`)
    dispatch(toggleLoader(false))
}

export const updatePost = (id: string, text: string) => async (dispatch: Function) => {
    dispatch(toggleLoader(true))
    const updateTime = await profileAPI.updatePost(id, text)
    dispatch(editPost(id, text, updateTime))
    dispatch(toggleLoader(false))
}

export const setNewStatus = (status: string) => async (dispatch: Function) => {
    dispatch(toggleLoader(true))
    await profileAPI.setNewStatus(status)
    dispatch(setCurrentUserStatus(status))
    dispatch(toggleLoader(false))
}

export const updateAvatar = (file: any) => async (dispatch: Function) => {
    dispatch(toggleLoader(true))
    let res = await profileAPI.updateAvatar(file)
    dispatch(setNewAvatar(res.data.data.photos.large))
    dispatch(toggleLoader(false))
}

type InitialStateType = {
    avatarEditMode: boolean
    currentUserId: null | number
    fullName: null | string
    avatar: null | string
    status: null | string
    /* loading: boolean */
    lookingForAJob: boolean
    lookingForAJobDescription: null | string
    aboutMe: null | string
    posts: Array<object>
}

let InitialState: InitialStateType = {
    avatarEditMode: false,
    currentUserId: null,
    fullName: null,
    avatar: null,
    status: null,
   /*  loading: false, */
    lookingForAJob: false,
    lookingForAJobDescription: null,
    aboutMe: null,
    posts: []
}

let profileReducer = (state: any = InitialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'ADD-POST':
            return { ...state, posts: [action.post, ...state.posts] }

        case 'DELETE-POST':
            let newState = { ...state }
            for (let i = 0; i < newState.posts.length; i++) {
                if (newState.posts[i]._id === action.id) {
                    newState.posts.splice(i, 1)
                    break
                }
            }
            return newState

        case 'EDIT-POST':
            let copiedState = { ...state }
            for (let i = 0; i < copiedState.posts.length; i++) {
                if (copiedState.posts[i]._id === action.id) {
                    copiedState.posts[i].text = action.text
                    copiedState.posts[i].editedOn = action.updateTime
                    break
                }
            }
            return copiedState


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

        case 'UPDATE-STATUS-TEXT':
            return { ...state, status: action.text }

        case 'TOGGLE-AVATAR-EDIT-MODE':
            return { ...state, avatarEditMode: action.val }

        case 'SET-NEW-AVATAR':
            console.log(typeof (action.avatar))
            return { ...state, avatar: action.avatar }

        default:
            return state
    }
}
export default profileReducer

