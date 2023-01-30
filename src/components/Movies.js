import React, { Component } from 'react'
import axios from 'axios';

// constructor -> render -> componentDidMount -> render -> componentDidUpdate -> componentWillUnmount
export default class Movies extends Component {

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

    async componentDidMount() {

        //Side effects
        let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=352ab5d55074de8f0d188679577ca0f8&language=en-US&page=${this.state.currPage}`);
        let data = res.data;

        this.setState({

            movies: [...data.results]
        })

    }

    changeMovies = async () => {

        let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=352ab5d55074de8f0d188679577ca0f8&language=en-US&page=${this.state.currPage}`);
        let data = res.data;

        this.setState({

            movies: [...data.results]
        })

    }

    handleLeft = () => {

        if (this.state.currPage !== 1) {

            this.setState({

                currPage: this.state.currPage - 1
            }, this.changeMovies)
        }
    }

    handleRight = () => {

        let temp = [];

        for (let value of this.state.parr) {

            temp.push(value);
        }
        temp.push(this.state.parr.length + 1);

        this.setState({

            parr: [...temp],
            currPage: this.state.currPage + 1
        }, this.changeMovies)

    }

    handleClick = (value) => {

        if (value != this.state.currPage) {

            this.setState({

                currPage: value
            }, this.changeMovies)
        }
    }

    handleFavourites = (movie) => {

        let oldData = JSON.parse(localStorage.getItem("movies-app") || '[]');

        if (this.state.favourites.includes(movie.id)) {

            oldData = oldData.filter(m => m != movie.id);
        }

        else {

            oldData.push(movie);
        }

        localStorage.setItem("movies-app", JSON.stringify(oldData));
        console.log(oldData);

        this.handleFavouritesState();
    }

    handleFavouritesState = () => {

        let oldData = JSON.parse(localStorage.getItem("movies-app") || '[]');
        let temp = oldData.map(movie => movie.id);

        console.log(oldData);

        this.setState({

            favourites: [...temp]
        })
    }

    render() {


        return (
            <div>
                {
                    this.state.movies === '' ?

                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> :

                        <div>
                            <h2 className='text-center'><strong>Trending</strong></h2>

                            <div className='movie-container'>{

                                this.state.movies.map(movieObj => (

                                    <div className="card movie-card" key={movieObj.id} onMouseEnter={() => { this.setState({ hover: movieObj.id }) }} onMouseLeave={() => { this.setState({ hover: '' }) }}>

                                        <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movie-img" alt={movieObj.title} />
                                        <h3 className="card-title movie-title">{movieObj.original_title}</h3>

                                        <div className='button-wrapper' style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                            {
                                                this.state.hover === movieObj.id &&
                                                <a className="btn btn-primary movie-button" onClick={() => this.handleFavourites(movieObj)}>{this.state.favourites.includes(movieObj.id) ? "Remove From Favourites" : "Add To Favourites"}</a>
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

                                            this.state.parr.map(value => (

                                                <li className="page-item" key={value}><a className="page-link" onClick={() => { this.handleClick(value) }}>{value}</a></li>
                                            ))
                                        }
                                        <li className="page-item"><a className="page-link" onClick={this.handleRight}>Next</a></li>
                                    </ul>
                                </nav>
                            </div>

                        </div>
                }
            </div>
        )
    }
}