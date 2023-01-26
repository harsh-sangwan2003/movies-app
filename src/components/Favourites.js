import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Favourites extends Component {

  constructor() {

    super();
    this.state = {

      genres: [],
      currgenre: 'All Genres'
    }
  }

  render() {

    let movie = movies.results;
    let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };

    let temp = [];
    movie.forEach(movie => {

      if (!temp.includes(genreids[movie.genre_ids[0]]))
        temp.push(genreids[movie.genre_ids[0]])

    })
    temp.unshift('All Genres');

    return (
      <div className='main'>

        <div className='row'>

          <div className='col-3'>
            <ul class="list-group favourites-genres">
              {
                temp.map(genre => (

                  this.state.currgenre === genre ?
                    <li class="list-group-item active" aria-current="true" style={{ backgroundColor: '#3f51b5', color: '#fff', fontWeight: 'bold' }}>{genre}</li>
                    :
                    <li class="list-group-item active" aria-current="true" style={{ backgroundColor: '#fff', color: '#3f51b5', fontWeight: 'bold' }}>{genre}</li>
                ))
              }
            </ul>
          </div>

          <div className='col-9 favourites-table'>

            <div className='row'>
              <input type="text" className='input-group-text col' placeholder='Search' />
              <input type="number" className='input-group-text col' placeholder='Rows Count' />
            </div>

            <div className='row'>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Popularity</th>
                    <th scope="col">Rating</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>

                  {
                    movie.map(movieObj => (

                      <tr>
                        <th scope="row">{<img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top favourites-img" alt={movie.title} />}{movieObj.original_title}</th>
                        <td>{genreids[movieObj.genre_ids[0]]}</td>
                        <td>{movieObj.popularity}</td>
                        <td>{movieObj.vote_average}</td>
                        <td><button type="button" class="btn btn-danger">Delete</button></td>
                      </tr>

                    ))
                  }

                </tbody>
              </table>
            </div>

            <nav aria-label="Page navigation example" style={{ display: 'flex', justifyContent: 'center' }}>
              <ul class="pagination">
                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">Next</a></li>
              </ul>
            </nav>

          </div>

        </div>

      </div>
    )
  }
}