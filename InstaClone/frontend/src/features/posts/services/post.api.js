import axios from "axios"
const api = axios.create({
    baseURL: "http://localhost:3000/api/posts",
    withCredentials: true
})

export async function getFeedApi() {
    try {
        const response = await api.get("/feed")
        return response.data
    } catch (error) {
        throw error
    }
}

export async function likePostApi(postId) {
    try {
        const response = await api.post(`/like/${postId}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function unlikePostApi(postId) {
    try {
        const response = await api.delete(`/like/${postId}`)
        return response.data
    } catch (error) {
        throw error
    }
}