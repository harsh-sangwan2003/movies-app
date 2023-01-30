import React, { Component } from 'react'

export default class Favourites extends Component {

  constructor() {

    super();
    this.state = {

      genres: [],
      currgenre: 'All Genres',
      movies: [],
      currText: '',
      limit: 5,
      currPage: 1
    }
  }

  componentDidMount = () => {

    let data = JSON.parse(localStorage.getItem("movies-app") || "[]");

    let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };

    let temp = [];
    data.forEach(movie => {

      if (!temp.includes(genreids[movie.genre_ids[0]]))
        temp.push(genreids[movie.genre_ids[0]])

    })
    temp.unshift('All Genres');

    this.setState({

      genres: [...temp],
      movies: [...data]
    })

  }

  handleGenreChange = (genre) => {

    this.setState({

      currgenre: genre
    })
  }

  sortPopularityAsc = () => {

    let temp = this.state.movies;

    temp.sort((a, b) => {

      return a.popularity - b.popularity
    })

    this.setState({

      movies: [...temp]
    })
  }

  sortPopularityDesc = () => {

    let temp = this.state.movies;

    temp.sort((b, a) => {

      return a.popularity - b.popularity
    })

    this.setState({

      movies: [...temp]
    })
  }

  sortRatingAsc = () => {

    let temp = this.state.movies;

    temp.sort((a, b) => {

      return a.vote_average - b.vote_average
    })

    this.setState({

      movies: [...temp]
    })
  }

  sortRatingDesc = () => {

    let temp = this.state.movies;

    temp.sort((b, a) => {

      return a.vote_average - b.vote_average
    })

    this.setState({

      movies: [...temp]
    })
  }

  handlePage = (page) => {

    this.setState({

      currPage: page
    })
  }

  handleDelete = (id) => {

    let newArr = [];
    newArr = this.state.movies.filter(movie => movie.id != id);

    this.setState({

      movies: [...newArr]
    })

    localStorage.setItem("movies-app", JSON.stringify(newArr));
  }


  render() {

    let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };

    let filterArr = [];

    if (this.state.currText === '')
      filterArr = this.state.movies

    else {

      filterArr = this.state.movies.filter(movie => {

        let title = movie.original_title.toLowerCase();
        return title.includes(this.state.currText.toLowerCase())
      })

    }
    if (this.state.currgenre != 'All Genres') {

      filterArr = this.state.movies.filter(movie => {

        return genreids[movie.genre_ids[0]] === this.state.currgenre

      })

    }

    let pages = Math.ceil(filterArr.length / this.state.limit);
    let pagesArr = [];
    for (let i = 1; i <= pages; i++)
      pagesArr.push(i);

    let si = (this.state.currPage - 1) * this.state.limit;
    let ei = (si + this.state.limit);
    filterArr = filterArr.slice(si, ei);

    return (
      <div className='main'>

        <div className='row'>

          <div className='col-lg-3 col-sm-12'>
            <ul class="list-group favourites-genres">
              {
                this.state.genres.map(genre => (

                  this.state.currgenre === genre ?
                    <li class="list-group-item active" aria-current="true" style={{ backgroundColor: '#3f51b5', color: '#fff', fontWeight: 'bold' }}>{genre}</li>
                    :
                    <li class="list-group-item active" aria-current="true" style={{ backgroundColor: '#fff', color: '#3f51b5', fontWeight: 'bold' }} onClick={() => this.handleGenreChange(genre)}>{genre}</li>
                ))
              }
            </ul>
          </div>

          <div className='col-lg-9 favourites-table col-sm-12'>

            <div className='row'>
              <input type="text" className='input-group-text col' placeholder='Search' value={this.state.currText} onChange={(e) => { this.setState({ currText: e.target.value }) }} />
              <input type="number" className='input-group-text col' placeholder='Rows Count' value={this.state.limit} onChange={(e) => { this.setState({ limit: e.target.value }) }} />
            </div>

            <div className='row'>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col"><i class="fas fa-sort-up" onClick={this.sortPopularityAsc}></i>Popularity<i class="fas fa-sort-down" onClick={this.sortPopularityDesc}></i></th>
                    <th scope="col"><i class="fas fa-sort-up" onClick={this.sortRatingAsc}></i>Rating<i class="fas fa-sort-down" onClick={this.sortPopularityDesc}></i></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>

                  {
                    filterArr.map(movieObj => (

                      <tr>
                        <th scope="row">{<img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top favourites-img" alt={movieObj.title} />}{movieObj.original_title}</th>
                        <td>{genreids[movieObj.genre_ids[0]]}</td>
                        <td>{movieObj.popularity}</td>
                        <td>{movieObj.vote_average}</td>
                        <td><button type="button" class="btn btn-danger" onClick={() => { this.handleDelete(movieObj.id) }}>Delete</button></td>
                      </tr>

                    ))
                  }

                </tbody>
              </table>
            </div>

            <nav aria-label="Page navigation example" style={{ display: 'flex', justifyContent: 'center' }}>
              <ul class="pagination">

                {
                  pagesArr.map(page => (

                    <li class="page-item"><a class="page-link" onClick={() => this.handlePage(page)}>{page}</a></li>

                  ))
                }

              </ul>
            </nav>

          </div>

        </div>

      </div>
    )
  }
}