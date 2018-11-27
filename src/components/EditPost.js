import React from 'react';
import ReactQuill from 'react-quill'
import content from '../styles/modalPost.css'


class ModalPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      data: this.props.data || "",
      published: this.props.published,
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

  handleDataChange(html) {
    this.setState({ data: html });
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
            <ReactQuill
              value={this.state.data}
              onChange={this.handleDataChange}
              modules={ModalPost.modules}
              formats={ModalPost.formats}
              placeholder={"Write your text here."}
            />
            <button type="submit" className="btn btn-success">Post</button>
          </form>
        </div>
      </div>
    );
  }
}

ModalPost.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false,
  }
}

ModalPost.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]

export default ModalPost;