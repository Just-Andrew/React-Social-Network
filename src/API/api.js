import * as  axios from 'axios'

const Instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '84a98476-73b8-436c-94fd-fcbe4cfe10a2'
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
    },

    getProfileStatus(id) {
        return Instance.get(`profile/status/${id}`)
    },

    setNewStatus(status) {
        return Instance.put(`profile/status`, { status: status })
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

export const loginAPI = {
    logIn(email, password, rememberMe) {
        return Instance.post(`auth/login`, {
            email,
            password,
            rememberMe
        })
            .then(res => console.log(res.data))
    },
    logOut() {
        return Instance.delete(`auth/login`)
    }
}