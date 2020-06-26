import * as  axios from 'axios'

const Instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'c70c260a-5c73-4e6d-9655-c160f6b791e0'
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
    getAuthorizedPersonData() {
        return Instance.get(`auth/me`)
    },

    getAvatar(id) {
        return Instance.get(`profile/${id}`)
            .then(res => res.data.photos.large)
    }
}