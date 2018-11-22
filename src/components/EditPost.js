import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import content from '../styles/modalPost.css'


class ModalPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      data: this.props.data,
      published: this.props.published
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.handlePublishedChange = this.handlePublishedChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }
  handlePublishedChange(event) {
    this.setState({ published: !this.state.published });
  }
  handleDataChange(event, editor) {
    const data = editor.getData()
    this.setState({ data: data });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validate()) {
      this.props.createPost(this.state)
      this.props.onClose();
    } else {
      console.log('Invalid payload')
    }
  }

  validate() {
    return this.state.title && this.state.data
  }

  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="backdropStyle">
        <div className="modalStyle">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" className="form-control" id="title" value={this.state.title} placeholder={"Print title"} onChange={this.handleTitleChange} />
            </div>
            <label className="switch">
              <input type="checkbox" onChange={this.handlePublishedChange} value={this.state.published} defaultChecked={this.state.published} />
              <span className="slider round"></span>
            </label><b>Published</b>
            <CKEditor
              editor={ClassicEditor}
              data={this.state.data}
              onChange={this.handleDataChange}
            />
            <button type="submit" className="btn btn-success">Post</button>
          </form>
        </div>
      </div>
    );
  }
}


export default ModalPost;