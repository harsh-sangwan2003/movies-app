import React, { Component } from 'react'

export class Favourites extends Component {

    constructor() {

        super();
        this.state = {
            genres: [],
            currGenre: 'All Genres',
            movies: [],
            currText: '',
            limit: 5,
            currPage: 1
        }
    }

    componentDidMount() {

        let data = JSON.parse(localStorage.getItem("movies-app") || "[]");

        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        }

        let temp = [];

        data.forEach(movieObj => {

            if (!temp.includes(genreids[movieObj.genre_ids[0]]))
                temp.push(genreids[movieObj.genre_ids[0]]);
        })

        temp.unshift('All Genres');

        this.setState({

            genres: [...temp],
            movies: [...data]
        })


    }

    handleGenreChange = (genre) => {

        this.setState({
            currGenre: genre
        })
    }

    sortPopularityDesc = () => {

        let temp = this.state.movies;

        temp.sort((a, b) => {

            return b.popularity - a.popularity;
        })

        this.setState({

            movies: [...temp]
        })
    }

    sortPopularityAsc = () => {

        let temp = this.state.movies;

        temp.sort((a, b) => {

            return a.popularity - b.popularity;
        })

        this.setState({

            movies: [...temp]
        })
    }

    sortRatingDesc = () => {

        let temp = this.state.movies;

        temp.sort((a, b) => {

            return b.vote_average - a.vote_average;
        })

        this.setState({

            movies: [...temp]
        })
    }

    sortRatingAsc = () => {

        let temp = this.state.movies;

        temp.sort((a, b) => {

            return a.vote_average - b.vote_average;
        })

        this.setState({

            movies: [...temp]
        })
    }

    handlePageChange = (page) => {

        this.setState({

            currPage: page
        })
    }

    handleDelete = (id) => {

        let newArr = [];

        newArr = this.state.movies.filter(movieObj => {

            return id !== movieObj.id
        });

        this.setState({
            movies: [...newArr]
        })

        localStorage.setItem("movies-app", JSON.stringify(newArr));
    }

    render() {

        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        }

        let filterArr = this.state.movies;

        if (this.state.currText === '')
            filterArr = this.state.movies;

        else {

            filterArr = this.state.movies.filter(movieObj => {

                let title = movieObj.original_title.toLowerCase();
                return title.includes(this.state.currText.toLowerCase());
            })

        }

        if (this.state.currGenre !== 'All Genres') {

            filterArr = this.state.movies.filter(movieObj => {

                return genreids[movieObj.genre_ids[0]] === this.state.currGenre
            })
        }

        let pages = Math.ceil(filterArr.length / this.state.limit);
        let pagesArr = [];

        for (let i = 1; i <= pages; i++) {

            pagesArr.push(i);
        }

        let si = (this.state.currPage - 1) * this.state.limit;
        let ei = si + this.state.limit;
        filterArr = filterArr.slice(si, ei);

        return (
            <div>
                <div className='main'>
                    <div className='row'>
                        <div className='col-lg-3 col-sm-12'>
                            <ul className="list-group favourites-genres">
                                {
                                    this.state.genres.map(genre => (

                                        this.state.currGenre === genre ?
                                            <li className="list-group-item active" style={{ backgroundColor: '#3f51b5', color: 'white', fontWeight: 'bold' }}>{genre}</li> :
                                            <li className="list-group-item" style={{ backgroundColor: 'white', color: '#3f51b5' }} onClick={() => { this.handleGenreChange(genre) }}>{genre}</li>
                                    ))
                                }
                            </ul>
                        </div>

                        <div className='col-lg-9 col-sm-12 favourites-table'>
                            <div className='row'>
                                <input type="text" className='input-group-text col' placeholder='Search' value={this.state.currText} onChange={(e) => { this.setState({ currText: e.target.value }) }} />
                                <input type="number" className='input-group-text col' placeholder='Rows Count' value={this.state.limit} onChange={(e) => { this.setState({ limit: e.target.value }) }} />
                            </div>

                            <div className='row'>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">Genre</th>
                                            <th scope="col"><i className='fas fa-sort-up' onClick={this.sortPopularityDesc}></i>Popularity<i className='fas fa-sort-down' onClick={this.sortPopularityAsc}></i></th>
                                            <th scope="col"><i className='fas fa-sort-up' onClick={this.sortRatingDesc}></i>Rating<i className='fas fa-sort-down' onClick={this.sortRatingAsc}></i></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterArr.map(movieObj => (
                                                <tr key={movieObj.id}>

                                                    <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{ width: '5rem', paddingRight: '0.5rem' }} />{movieObj.title}</td>
                                                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                    <td>{movieObj.popularity}</td>
                                                    <td>{movieObj.vote_average}</td>
                                                    <td><button className='btn btn-danger' type='button' onClick={() => { this.handleDelete(movieObj.id) }}>Delete</button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    {
                                        pagesArr.map(page => (
                                            <li className="page-item"><a className="page-link" onClick={() => this.handlePageChange(page)} key={page}>{page}</a></li>
                                        ))
                                    }
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Favourites