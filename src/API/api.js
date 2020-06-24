import * as  axios from 'axios'

const Instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '69a84a29-fda8-47e5-9730-61a55a5fcdd2'
    }
})

export const usersAPI = {
    getUsers(friend, count, page) {
        return Instance.get(`users/?friend=${friend}&count=${count}&page=${page}`)
    },

    follow(id) {
        return Instance.post(`follow/${id}`)
    },
    unfollow(id) {
        return Instance.delete(`follow/${id}`)
    }
}

export const profileAPI = {
    getProfile(id) {
        return Instance.get(`profile/${id}`)
    }
}

export const headerAPI = {
    getAuthStatus() {
        return Instance.get(`auth/me`)
    },

    getAvatar(id) {
        return Instance.get(`profile/${id}`)
            .then(res => res.data.photos.large)
    }
}