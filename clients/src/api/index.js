import axios from 'axios'
const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile'))
        req.headers.Authorization = `bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    return req
})

export const fetchPosts = () => API.get(`/posts`)
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}`)
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const updateLike = (id) => API.patch(`/posts/${id}/updatePost`)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
