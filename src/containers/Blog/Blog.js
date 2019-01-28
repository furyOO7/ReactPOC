import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import Spinner from '../../components/Spinner/Spinner';

import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPost: null,
        spinning: false
    }
    componentDidMount(){
        this.setState({spinning: true})
        axios.get("/posts").then(response => {
            // this.setState({spinning: false})
            this.setState({spinning: false})
            const posts = response.data.slice(0,4)
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: "Adarsh"
                }
            })
            this.setState({
                posts: updatedPosts
            })
        })
        
    }
    postSelectedHandler = (id) => {
        this.setState({
            selectedPost: id
        })
    }
    render () {
        let posts = this.state.posts.map((post,i) => {
            return <Post key={post.id} title={post.title} author={post.author} 
            selected={() => this.postSelectedHandler(post.id)}
            />
        })
        if(this.state.spinning){
             posts = <Spinner />
        }        
        return (
            <div>
                <section className="Posts">
                   {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPost}> /</FullPost>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;