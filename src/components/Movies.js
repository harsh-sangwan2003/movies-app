import React, { Component } from 'react'
import axios from 'axios';

export class Movies extends Component {

    constructor() {

        super();
        this.state = {

            hover: '',
            parr: [1],
            currPage: 1,
            movies: [],
            favourites: []
        }
    }

    // side effects ->

    async componentDidMount() {

        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=352ab5d55074de8f0d188679577ca0f8&language=en-US&page=${this.state.currPage}`);
        let data = res.data;

        this.setState({

            movies: [...data.results]
        })
    }

    changeMovies = async () => {


        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=352ab5d55074de8f0d188679577ca0f8&language=en-US&page=${this.state.currPage}`);
        let data = res.data;


        this.setState({

            movies: [...data.results]
        })
    }

    handleLeft = () => {

        if (this.state.currPage != 1) {

            this.setState({

                currPage: this.state.currPage - 1
            }, this.changeMovies)
        }
    }

    handleRight = () => {

        let tempArr = [];

        for (let i = 1; i <= this.state.parr.length + 1; i++)
            tempArr.push(i);

        this.setState({

            parr: [...tempArr],
            currPage: this.state.currPage + 1
        }, this.changeMovies)

    }

    handleClick = (val) => {

        if (this.state.currPage !== val) {

            this.setState({

                currPage: val

            }, this.changeMovies)
        }
    }

    handleFavourites = (movie) => {

        let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]");

        if (this.state.favourites.includes(movie.id)) {

            oldData = oldData.filter(m => m.id !== movie.id);
        }

        else {

            oldData.push(movie);
        }

        localStorage.setItem("movies-app", JSON.stringify(oldData));


        this.handleFavouritesState();

    }

    handleFavouritesState = () => {

        let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]");
        let temp = oldData.map(movie => movie.id);

        this.setState({

            favourites: [...temp]
        })
    }

    render() {

        return (
            <>
                {
                    this.state.movies.length === 0 ?
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        :

                        <div>
                            <h3 className='text-center'><strong>Trending</strong></h3>

                            <div className='movies-list'>
                                {
                                    this.state.movies.map(movieObj => (
                                        <div className="card movies-card" onMouseEnter={() => { this.setState({ hover: movieObj.id }) }} onMouseLeave={() => { this.setState({ hover: '' }) }} key={movieObj.id}>
                                            <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movies-img" alt={movieObj.title} />

                                            <h1 className="card-title movies-title">{movieObj.original_title}</h1>

                                            <div className='button-wrapper' style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                                {
                                                    this.state.hover === movieObj.id &&
                                                    <a className="btn btn-primary movies-button" onClick={() => { this.handleFavourites(movieObj) }}>{this.state.favourites.includes(movieObj.id) ? "Remove From" : "Add To"}Favourites</a>
                                                }
                                            </div>

                                        </div>
                                    ))
                                }
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item"><a className="page-link" onClick={this.handleLeft}>Previous</a></li>
                                        {
                                            this.state.parr.map(val => (
                                                <li className="page-item"><a className="page-link" key={val} onClick={() => this.handleClick(val)}>{val}</a></li>
                                            ))
                                        }
                                        <li className="page-item"><a className="page-link" onClick={this.handleRight}>Next</a></li>
                                    </ul>
                                </nav>
                            </div>

                        </div>
                }
            </>
        )
    }
}

export default Movies