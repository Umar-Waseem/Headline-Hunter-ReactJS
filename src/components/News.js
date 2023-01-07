import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 4,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }


    state = {
        articles: [],
        page: 1,
        totalResults: 0,
        loading: false,
    };

    apiKey = 'e39a77c2408f4450b90d4d5638d050e7';

    constructor() {
        super();
        this.state = {
            articles: [],
            page: 1,
            totalResults: 0,
            loading: false,
        };
    }

    async componentDidMount() {
        this.setState({ loading: true });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=1&pageSize=${this.props.pageSize}`;
        const data = await fetch(url);
        const parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
    }

    handlePageChange = async (increment) => {
        const { page } = this.state;
        const newPage = increment ? page + 1 : page - 1;
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=${newPage}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        const data = await fetch(url);
        const parsedData = await data.json();
        this.setState({ articles: parsedData.articles, page: newPage, loading: false });
    }

    render() {
        const { articles, page, totalResults } = this.state;

        return (
            <div className="container my-3">
                <h1 className="text-center">News Headlines</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && articles.map((element) => {
                        const title = element.title || '';
                        const description = element.description || '';
                        return (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem
                                    title={title.substr(0, 45)}
                                    imgUrl={element.urlToImage}
                                    description={description.substr(0, 80)}
                                    newsUrl={element.url}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="container d-flex justify-content-around">
                    <button
                        disabled={page <= 1}
                        type="button"
                        className="btn btn-dark"
                        onClick={() => this.handlePageChange(false)}
                    >
                        {' '}
                        &larr; Previous
                    </button>
                    <button
                        disabled={page + 1 > Math.ceil(totalResults / this.props.pageSize)}
                        type="button"
                        className="btn btn-dark"
                        onClick={() => this.handlePageChange(true)}
                    >
                        Next &rarr;
                    </button>
                </div>
            </div>
        );
    }
}

export default News;
