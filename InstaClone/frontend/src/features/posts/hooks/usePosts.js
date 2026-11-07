import { usePostsContext } from "../Post.context"
import { getFeedApi, likePostApi, unlikePostApi } from "../services/post.api"

export const usePost = ()=>{
    const {post, setPost, feed, setFeed, loading, setLoading}= usePostsContext()

    async function getFeed() {
        setLoading(true)
        try {
            const data = await getFeedApi()
            setFeed(data.posts)
        } catch (error) {
            console.log(error.response?.data?.message || "Failed to fetch feed");
        }finally{
            setLoading(false)
        }
    }

    async function likePost(postId) {
        // setLoading(true)
        try {
            const data = await likePostApi(postId)
            return data
        } catch (error) {
            console.log(error.response?.data?.message || "Failed to like post");
        }finally{
            // setLoading(false)
        }
    }
    
    async function unlikePost(postId) {
        // setLoading(true)
        try {
            const data = await unlikePostApi(postId)
            return data
        } catch (error) {
            console.log(error.response?.data?.message || "Failed to unlike post");
        }finally{
            // setLoading(false)
        }
    }


    return{
        getFeed,
        likePost,
        unlikePost,
        loading,
        feed,
        post,
    }
}