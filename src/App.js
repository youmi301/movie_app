import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Movie from "./Movie";

class App extends Component {
  //props:
  //state : 리액트 컴포넌트 안에 있는 오브젝트, state가 바뀔때마다 컴포넌트는 다시 render됨
  state = {
    //greeting: "Hello"
  };

  componentDidMount() {
    this._getMovies();

    //    setTimeout( () => {
    //this.state.greeting = 'something'
    //      this.setState({
    /*         
        movies: [
          ...this.state.movies,
          {
            title: "Transformer",
            poster: ""
          }
        ]
 */
    /* 
        movies : [
          {
            title: "Metrix",
            poster: ""
          },
          {
            title: "Full Metal Jacket",
            poster: ""
          },
          {
            title: "Oldboy",
            poster: ""
          },
          {
            title: "Star words",
            poster: ""
          }
        ]
 */
    //      })
    //    }, 1000);
    //state가 바뀌면 다시 new state와 함께 render된다.
  }
  //important 설명
  //Render : ComponentWillMount() => render() => ComponentDidMount()
  //Update: ComponentWillReceiveProps() => ShouldComponentUpdate() => ComponentWillUpdate() => render() => componentDidMount()
  // ShoundComponentUpadate() : old와 new props를 보고 변경여부 결정 update = true or false
  // ComponentWilllUpdate() : 업데이트 할 것을 표시 spinner

  _renderMovies = () => {
    /*     
    const  movies = this.state.movies.map((movie, index) => {
      return    <Movie title={movie.title} poster={movie.large_cover_image} key={index} />
    }) */
    const movies = this.state.movies.map(movie => {
      return (
        <Movie
          title={movie.title_english}
          poster={movie.medium_cover_image}
          genres={movie.genres}
          synopsis = {movie.synopsis}
          key={movie.id}
        />
      );
    });
    return movies;
  };

  _getMovies = async () => {
    const movies = await this._callApi();
    this.setState({
      movies
    });
  };

  _callApi = () => {
    return fetch("https://yts.lt/api/v2/list_movies.json?sort_by=download_count")
      .then(response => response.json())
      .then(json => json.data.movies)
      .catch(err => console.log(err));
  };

  render() {
    const {movies} = this.state;
    return (
      <div className={movies? "App":"App-loading"}>
        {movies ? this._renderMovies() : "Loading....."}
        {/* 
        {this.state.greeting}
        {movies.map((movie, index) => {
          return (
            <Movie title={movie.title} poster={movie.poster} key={index} />
          );
        })}
 */}
      </div>
    );
  }
}

export default App;
