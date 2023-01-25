import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';

export default function Posts() {
    const { user } = useContext(AppContext);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
            const json = await response.json();
            setPosts(json);
        }
        getData()
    }, [])

    const focusPost = (index) => {
        let newPosts = [...posts];
        newPosts[index].focus = !newPosts[index].focus;
        setPosts(newPosts)
    }

    const getComments = async (index) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${posts[index].id}`);
        const json = await response.json();
        setComments(json)
    }

    return (
        <div>
            <ol>
                {posts.map((post, index) =>
                    <li style={post.focus ? { fontSize: 35 } : { fontSize: 20 }} key={post.id}>{post.title}
                        <button onClick={() => focusPost(index)}>Focus Post</button>
                        <button onClick={() => getComments(index)}>Show posts comments</button>
                    </li>
                )}
            </ol>
            <ul>
                {comments.length > 1 ? <button onClick={() => setComments([])}>Hide comments</button> : null}
                {comments.map((comment, index) =>
                    <li key={index}>
                        User comments : <br></br>{comment.body}

                    </li>
                )}
            </ul>
        </div>
    )

}