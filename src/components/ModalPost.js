import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import content from '../styles/modalPost.css'
// The gray background
const backdropStyle = {
position: 'fixed',
top: 0,
bottom: 0,
left: 0,
right: 0,
backgroundColor: 'rgba(0,0,0,0.3)',
padding: 50
};

// The modal "window"
const modalStyle = {
backgroundColor: '#fff',
borderRadius: 5,
maxWidth: 800,
minHeight: 300,
maxHeight: '100%',
margin: '0 auto',
padding: 30,
position: 'relative',
overflow: 'scroll'
};
const xStyle = {
position: 'absolute',
background: 'gray',
color: 'white',
top: '0px',
right: '0px'
}

class ModalPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      data: this.props.data,
      published : this.props.published
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.handlePublishedChange = this.handlePublishedChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }
  handlePublishedChange(event) {
    this.setState({published: !this.state.published});
  }
  handleDataChange(event, editor) {
    const data = editor.getData()
    this.setState({data: data});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validate()){
      this.props.createPost(this.state)
      this.props.onClose();
    } else {
      console.log('Invalid payload')
    }
  }

  validate(){
    return this.state.title && this.state.data
  }

  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }
 
    return (
      <div style={backdropStyle}>
        <div style={modalStyle}>
            <button  style={xStyle} onClick={this.props.onClose}>
              X
            </button>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input type="text" className="form-control" id="title" value={this.state.title} placeholder={"Print title"} onChange={this.handleTitleChange}/>
              </div>
              <label className="switch">
                <input type="checkbox" onChange={this.handlePublishedChange} value={this.state.published} defaultChecked={this.state.published}/>
                <span className="slider round"></span>
              </label><b>Published</b>
              <CKEditor
                    editor={ ClassicEditor }
                    data={this.state.data}
                    onChange={ this.handleDataChange }
                />
                <button type="submit" className="btn btn-success">Post</button>
            </form>
        </div>
      </div>
    );
  }
}


export default ModalPost;