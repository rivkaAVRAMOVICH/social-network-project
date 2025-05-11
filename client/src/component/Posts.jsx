import React, { useState, useEffect, useContext } from 'react';
import { getRequest } from '../Requests';
import { CurrentUser,Error } from './App';
import { useNavigate,useParams } from "react-router-dom";
import '../css/Posts.css';
import Post from './Post';
import Delete from "./Delete";
import Add from "./Add";
import Search from "./Search";
function Posts() {
    const { currentUser } = useContext(CurrentUser);
    const { setErrorMessage } = useContext(Error);
    const {postId}=useParams();
    const navigate = useNavigate();
    const [shownPost, setShownPost] = useState({ post: null, show: false });
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [viewMode, setViewMode] = useState('all');
    const getPosts = async (url) => {
        const requestResult = await getRequest(url);
        if (requestResult.succeeded) {
            setPosts(requestResult.data);
            setFilteredPosts(requestResult.data);
        } else {
            setErrorMessage(requestResult.error);
        }
    };
    useEffect(() => {
        setFilteredPosts(posts);
        if (shownPost.post) {
            const matchingPost = posts.find((post) => post.id === shownPost.post.id);
            if (matchingPost) {
                setShownPost({ ...shownPost, post: matchingPost });
            }
        }
    }, [posts]);

    useEffect(() => {
        if (currentUser?.id) {
            getPosts(`posts`);
        }
    }, [currentUser]);
    useEffect(()=>{
        if(postId){
            posts.map((post)=>{post.id===postId&&setShownPost({post: post,show:true})})
        }
    },[filteredPosts,postId])
    return (
        <div className="page-container">
            <div className="posts-container">
                <div className="posts-header-buttons">
                    <button
                        className={`header-button ${viewMode === 'myPosts' ? 'active' : ''}`}
                        onClick={() => {
                            setViewMode('myPosts');
                            // getPosts(`posts?userId=${currentUser.id}`);
                        }}
                    >
                        My Posts
                    </button>
                    <button
                        className={`header-button ${viewMode === 'allPosts' ? 'active' : ''}`}
                        onClick={() => {
                            setViewMode('allPosts');
                            getPosts('posts');
                        }}
                    >
                        All Posts
                    </button>
                </div>
                <div className="search-add-container">
                    <div className='search-add-aria'>
                        <Search
                            allSearchCriteria={['id', 'title']}
                            origin={posts}
                            setFilter={setFilteredPosts}
                        />
                        <Add
                            permanentInformation={{ user_id: currentUser?.id }}
                            arrayOfData={posts}
                            setArrayOfData={setPosts}
                            type={'post'}
                            arrayOfInputType={['title', 'content']}
                        />
                    </div>
                </div>
                <div className="posts-container">
                {JSON.stringify(posts)==='[]'?<p className='no-items'> No posts found. Start by adding a new post to get started! </p>:<ul className="posts-list">
                        {filteredPosts.map((post) => (
                            <li
                                key={post.id}
                                className="post-item"
                                onClick={() => {
                                    setShownPost({ post: post, show: true });
                                    navigate(`/users/${currentUser.id}/posts/${post.id}`);
                                }}
                            >
                                <span className="post-id">#{post.id}</span>
                                <div className="post-content">
                                    <span className="post-title">{post.title}</span>
                                    {post.user_id===currentUser.id&&<Delete 
                                    id={post.id} 
                                    arrayOfData={posts} 
                                    setArrayOfData={setPosts} 
                                    types={['post', 'comment']} 
                                    />}
                                </div>
                            </li>
                        ))}
                    </ul>}
                    {shownPost.show && (
                        <Post
                            post={shownPost.post}
                            shownPost={shownPost}
                            setShownPost={setShownPost}
                            posts={posts}
                            setPosts={setPosts}
                        />
                    )}
                </div>
            </div>
        </div>
    );

}

export default Posts;
