import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';
import './FullPost.css';

class FullPost extends Component {
    state ={
        loadedPost: null,
        spinning: false
    }
    
    componentWillReceiveProps(nextProps){
        console.log("componentWillReceiveProps", this.props,nextProps)
    }
    shouldComponentUpdate(nextProps, nextState){
        if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)){
            this.setState({spinning: true})
            return true;
        }
        else{
            return false
        }
       
    }
    componentWillUpdate(nextProps, nextState){
        console.log("componentWillUpdate", nextProps,nextState)
    }
    componentDidUpdate(){
        if(this.props.id){
            axios.get("/posts/" + this.props.id).then( response => {
               if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)){
                this.setState({
                    loadedPost: response.data,
                    spinning: false
                }) 
                     
               }     
            })
        }
    }
    render () {
        let post = <p style={{textAlign: "center"}}>Please select a Post!</p>;
        if(this.props.id){
             post = <Spinner />
        }
        if(this.props.id){
            if(this.state.loadedPost){
                post = (
                    <div className="FullPost">
                        <h1>{this.state.loadedPost.title}</h1>
                        <p>{this.state.loadedPost.body}</p>
                        <div className="Edit">
                            <button className="Delete">Delete</button>
                        </div>
                    </div>
        
                );
            }
           
        }
       
        return post;
    }
}

export default FullPost;