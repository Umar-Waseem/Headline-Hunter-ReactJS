import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 4,
        category: 'general',
        loading: false,
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


    constructor() {
        super();
        this.state = {
            articles: [],
            page: 1,
            totalResults: 0,
            loading: false,
        };
        // document.title = this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)
    }

    async componentDidMount() {
        console.log("did mount 1")
        this.props.setProgress(10);
        this.setState({ loading: true });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
        const data = await fetch(url);
        const parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
        this.props.setProgress(100);
    }

    // handlePageChange = async (increment) => {
    //     const { page } = this.state;
    //     const newPage = increment ? page + 1 : page - 1;
    //     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=${newPage}&pageSize=${this.props.pageSize}`;
    //     this.setState({ loading: true });
    //     const data = await fetch(url);
    //     const parsedData = await data.json();
    //     this.setState({ articles: parsedData.articles, page: newPage, loading: false });
    // }

    fetchMoreData = async () => {
        console.log("fetch 1");
        const { page } = this.state;

        const newPage = page + 1;
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${newPage}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        const data = await fetch(url);
        const parsedData = await data.json();
        this.setState({ articles: this.state.articles.concat(parsedData.articles), page: newPage, loading: false });
    }

    render() {
        const { articles } = this.state;

        return (
            <>
                <h1 className="text-center">Top Headlines {this.props.category ? `- ${this.props.category.charAt(0).toUpperCase()}` + this.props.category.slice(1) : ""}</h1>
                {/* {this.state.loading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {
                                articles.map((element) => {
                                    const title = element.title || '';
                                    const description = element.description || '';
                                    return (
                                        <div className="col-md-4" key={element.url}>
                                            <NewsItem
                                                title={title.substr(0, 45)}
                                                imgUrl={element.urlToImage}
                                                description={description.substr(0, 80)}
                                                newsUrl={element.url}
                                                author={element.author}
                                                date={element.publishedAt}
                                                source={element.source.name}
                                            />
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        );
    }
}

export default News;
