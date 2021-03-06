import React, {Component} from 'react';
import {Link} from 'react-router';
import {fetchPosts} from '../actions/index';
import {connect} from 'react-redux';

class PostsIndex extends Component {
    componentWillMount(){
        this.props.fetchPosts();
    }
    
    renderPosts(){
        return this.props.posts.map(post => {
            return (
                <li className="list-group-item" key={post.id} >
                    <Link to={`posts/${post.id}`}>
                        <span className="pull-xs-right"> {post.categories} </span>
                        <strong> {post.title} </strong>
                    </Link>
                </li>
            );
        })
    }
    
    render(){
        return (
            <div>
                <div>
                    <Link to="posts/new" className="btn btn-primary pull-xs-right"> Add Post </Link>
                </div>
                <div>
                    <h3> Posts </h3>
                    <ul className="list-group">
                        {this.renderPosts()}
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        posts: state.posts.all
    };
}

export default connect(mapStateToProps, {fetchPosts})(PostsIndex);
