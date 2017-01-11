import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';
import {createPost} from '../actions/index';

class PostsNew extends Component {
    static contextTypes = {
      router: PropTypes.object
    };
    
    onSubmit(props){
        this.props.createPost(props).then(() => {
            this.context.router.push("/");
        });
    }

    render(){
        const {fields:{title, categories, content}, handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div className={`form-group ${title.touched && title.invalid?'has-danger':''}`}>
                    <label> Title </label>
                    <input type="text" className="form-control" {...title}/>
                    <div className="form-control-feedback">
                        {title.touched?title.error:''}
                    </div>
                </div>
                
                <div className={`form-group ${categories.touched && categories.invalid?'has-danger':''}`}>
                    <label> Categories </label>
                    <input type="text" className="form-control" {...categories}/>
                    <div className="form-control-feedback">
                        {categories.touched?categories.error:''}
                    </div>
                </div>
            
                <div className={`form-group ${content.touched && content.invalid?'has-danger':''}`}>
                    <label> Content </label>
                    <textarea className="form-control" {...content}/>
                    <div className="form-control-feedback">
                        {content.touched?content.error:''}
                    </div>
                </div>
            
                <div>
                    <button type="submit" className="btn btn-primary"> Submit </button> 
                    <Link to="/" className="btn btn-danger"> Cancel </Link>
                </div>
            </form>
        
        );
    }
}

function validate(values){
    const errors = {};
    
    if(!values.title){
        errors.title = "title is required";
    }
    if(!values.categories){
        errors.categories = "categories is required";
    }
    if(!values.content){
        errors.content = "content is required";
    }
    return errors;
}

export default reduxForm({
    form: "PostsNewForm",
    fields: ['title', 'categories', 'content'],
    validate
}, null, {createPost})(PostsNew);
