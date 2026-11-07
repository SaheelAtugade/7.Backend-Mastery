import React, { useEffect } from "react";
import "../styles/feed.scss";
import Post from "../components/Post";
import { usePost } from "../hooks/usePosts";

const Feed = () => {
    const {getFeed, feed, loading, post} = usePost()

    useEffect(() => {
      getFeed()
    }, [])
    
    
    if(loading || !feed){
        return(<div className="feed-page"><h2>Loading feed...</h2></div>)
    }


  return (
    <div className="feed-page">
      <div className="feed">
        <div className="posts">
          {feed.map((post)=>{
            return <Post key={post._id} user={post.user} post={post}/>
          })}
        </div>
      </div>
    </div>
  );
};

export default Feed;
