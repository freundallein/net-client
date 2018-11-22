import React from 'react'
import About from '../components/About'
import Contacts from '../components/Contacts'
import Patterns from '../components/Patterns'

const page = {'text': 'blahblahblah', 'slug':'contacts'}

class StaticPages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: false,
      page: null,
      error: null
    };
  }

  componentWillMount (){
    this.getPageBySlug(this.props.match.path)
  }

  getPageBySlug(slug){
    console.log('request made')
    this.setState({ isLoading: true });
    this.setState({ page: page, isLoading: false })
    slug = slug.replace('/', '')
    console.log(`http://0.0.0.0:8002/api/v0/pages/${slug}`)
    // fetch(`http://0.0.0.0:8002/api/v0/pages/${slug}`)
    //   .then(response => {
    //     if (response.ok) {
    //       return response.json();
    //     } else {
    //       throw new Error('Something went wrong')
    //     }
    //   })
    //   .then(data => this.setState({ page: data, isLoading: false }))
    //   .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
      const {isLoading, error}  = this.state;
      const slug = this.props.match.path
      const page = this.state.page
      if (error) {
        return <p>{error.message}</p>;
      }
      if (isLoading) {
        return <p>Loading ...</p>;
      }
      if (slug === '/about'){
        return <div><About{...this.props} page={page}/></div>
      } else if (slug === '/contacts'){
        return <div><Contacts{...this.props} page={page} /></div>
      } else if (slug == '/patterns') {
        return <div><Patterns{...this.props} page={page} /></div>
      }
    }
}

export default StaticPages;
