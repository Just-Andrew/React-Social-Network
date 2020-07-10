import * as  axios from 'axios'

const Instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '723d47cc-fca2-48f1-80a1-29bb89c3ff43'
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
    },
    updateAvatar(file) {
        let formData = new FormData()
        formData.append('image', file)
        return Instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export const headerAPI = {
    getAuthorizedPersonData() {
        return Instance.get(`auth/me`)
            .then(res => res.data)
    },

    getAvatar(id) {
        return Instance.get(`profile/${id}`)
            .then(res => res.data.photos.large)
    }
}

export const authAPI = {
    logIn(email, password, rememberMe = false) {
        return Instance.post(`auth/login`, {
            email,
            password,
            rememberMe
        })
    },
    logOut() {
        return Instance.delete(`auth/login`)
    }
}