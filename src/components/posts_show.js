import React, {Component, PropTypes} from 'react';
import {fetchPost, deletePost} from '../actions/index';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class PostsShow extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    componentWillMount(){
        this.props.fetchPost(this.props.params.id);
    }
    
    onDelete(){
        this.props.deletePost(this.props.params.id).then(() => {
            this.context.router.push("/");
        });
    }
    
    render(){
        const post = this.props.post;
        
        if(!post){
            return (<div> loading... </div>);
        }
        
        return (
            <div>
                <Link to="/"> Back To Posts </Link>
                <button className="btn btn-danger pull-xs-right" onClick={this.onDelete.bind(this)}> Delete </button>
                <h3> {post.title} </h3>
                <h4> Categories: {post.categories} </h4>
                <p> {post.content} </p>
            </div>        
        );
    }
}

function mapStateToProps(state){
    return {
        post:state.posts.post
    }
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);
