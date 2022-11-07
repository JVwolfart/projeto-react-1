import { Component } from 'react';
import "./styles.css"
import { loadPosts } from '../../utils/loadPosts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button/Button';
import { TextInput } from "../../components/TextInput"

class Home extends Component{
  
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: "",
  }

  loadPosts = async () => {
    const {page, postsPerPage} = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage), 
      allPosts: postsAndPhotos
    });
  }

  loadMorePosts = () =>{
    const {
          page,
          postsPerPage,
          allPosts,
          posts
          } = this.state;
    const nextPage = page+postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    this.setState({posts, page: nextPage});
  }
 
  async componentDidMount(){
    await this.loadPosts();
  }

  componentDidUpdate(){
  }

  componentWillUnmount(){
  }

  handleChange = (e) =>{
    const {value} = e.target
    this.setState({searchValue: value})
  }


  render(){
    const {posts, page, postsPerPage, allPosts, searchValue} = this.state;
    const filteredPosts = !!searchValue ? allPosts.filter(post =>{
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    }) : posts;
    const noMorePosts = (page + postsPerPage) > allPosts.length;
    return (
      <section className='container'>
        <div className='search-container'>
          {!!searchValue && (
            <h1>Pesquisa por: {searchValue}</h1>
          )}
          <TextInput handleChange={this.handleChange} searchValue={searchValue}/>
        </div>
        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts}/>
        )}

        {filteredPosts.length === 0 && (
          <p>Não existem posts :(</p>
        )}
        {!searchValue &&(
          <div className='button-container'>
            <Button text="Load more posts"
            onClick={this.loadMorePosts}
            disabled={noMorePosts}/>
          </div>
        )}
      </section>
      
    );
  }
}

export default Home;
