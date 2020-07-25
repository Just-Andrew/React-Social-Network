import * as  axios from 'axios'

const Instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'd3e69f3e-e40b-4fa3-88e0-db69dff56af3'
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
    getPosts(id) {
        return axios.get(`http://localhost:3001/posts/${id}`)
            .then(res => res.data.reverse())
    },
    createPost(id, text) {
        return axios.post(`http://localhost:3001/posts`,
            {
                "ownerId": id,
                "text": text
            })
            .then(res => res.data)
    },
    deletePost(id) {
        return axios.delete(`http://localhost:3001/posts/${id}`)
    },
    updatePost(id, text) {
        return axios.patch(`http://localhost:3001/posts/${id}`, { "text": text })
            .then(res => res.data.editedOn)
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
    },
    updateProfile(data) {
        return Instance.put(`profile`, { ...data })
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
    logIn(data) {
        return Instance.post(`auth/login`, { ...data })
    },
    logOut() {
        return Instance.delete(`auth/login`)
    }
}

export const securityAPI = {
    getCaptcha() {
        return Instance.get(`security/get-captcha-url`)
    }
}

export const newsAPI = {
    getArticles() {
        return axios.get(`http://newsapi.org/v2/top-headlines?apiKey=7b75f2d0a98e44f8a96f7933462d72ce&country=us`)
            .then(res => res.data)
    }
}