import React, { useState, useContext } from 'react';
import { CurrentUser, Error } from './App';
import { useNavigate, } from "react-router-dom"
import { getRequest } from '../Requests'
import Delete from './Delete'
import Add from './Add'
import Edit from "./Edit";
import '../css/Post.css'
const Post = (props) => {
    const { currentUser } = useContext(CurrentUser);
    const { setErrorMessage } = useContext(Error);
    const navigate = useNavigate();
    const { post, shownPost, setShownPost, posts, setPosts } = props;
    const [comments, setComments] = useState([]);
    const [shownComments, setShownComments] = useState({});
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingPostId, setEditingPostId] = useState(null);
    const getAllComments = async (id) => {
        console.log(post)
        const requestResult = await getRequest(`posts/${id}/comments`);
        if (requestResult.succeeded) {
            setComments(requestResult.data);
            setShownComments((prev) => ({
                ...prev,
                [id]: !prev[id],
            }));
        } else {
            setErrorMessage(requestResult.error)
        }
    };
    return (
        <>
            {shownPost && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button
                            className="close-button"
                            onClick={() => {
                                setShownPost(false);
                                navigate(`/users/${currentUser.id}/posts`);
                            }}
                        >
                            X
                        </button>
                        <div className="post-title-container">
                            <span className="post-title">{post.title}</span>
                        </div>
                        {editingPostId !== post.id &&
                            <div className="post-body-container">
                                <span className="post-body">{post.content}</span>
                            </div>
                        }
                        {post.user_id === currentUser.id && <Edit
                            type={'post'}
                            id={post.id}
                            body={{
                                user_id: currentUser.id,
                                id: post.id,
                                title: post.title,
                                content: post.content
                            }}
                            editingId={editingPostId}
                            setEditingId={setEditingPostId}
                            arrayOfData={posts}
                            setArrayOfData={setPosts}
                            fields={['content']} />}
                        {shownComments[post.id] && (
                            <>
                                <div className="comments-list">
                                    {comments.map((comment) => (
                                        <div key={comment.id} className="comment-item">
                                            {editingCommentId !== comment.id && (<>
                                                <div>
                                                    <p>written by: {comment.user_id}</p>
                                                    <p>{comment.content}</p>
                                                </div>
                                                {comment.user_id === currentUser.id && <>
                                                    <Delete
                                                        id={comment.id}
                                                        arrayOfData={comments}
                                                        setArrayOfData={setComments}
                                                        type='comment'
                                                    />
                                                </>}
                                            </>)}
                                            {comment.user_id === currentUser.id &&
                                                (<Edit
                                                    type={'comment'}
                                                    id={comment.id}
                                                    body={{
                                                        post_id: post.id,
                                                        user_id:currentUser.id,
                                                        id: comment.id,
                                                        content: comment.content
                                                    }}
                                                    editingId={editingCommentId}
                                                    setEditingId={setEditingCommentId}
                                                    arrayOfData={comments}
                                                    setArrayOfData={setComments}
                                                    fields={['content']} />)}
                                        </div>
                                    ))}
                                </div>
                                <Add
                                    permanentInformation={{
                                        post_id: post.id,
                                        user_id: currentUser?.id,
                                    }}
                                    arrayOfData={comments}
                                    setArrayOfData={setComments}
                                    type={'comment'}
                                    arrayOfInputType={['content']}
                                />
                            </>
                        )}
                        <button
                            className="show-comments-button"
                            onClick={() => {
                                getAllComments(post.id);
                                if (shownComments[post.id]) {
                                    navigate(`/users/${currentUser.id}/posts/${post.id}`);
                                } else {
                                    navigate(`/users/${currentUser.id}/posts/${post.id}/comments`)
                                }
                            }}
                        >
                            {shownComments[post.id] ? 'Unshow Comment' : 'Show Comments'}
                        </button>
                    </div>
                </div>
            )}
        </>
    );

};

export default Post;
