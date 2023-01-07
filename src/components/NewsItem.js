import React, { Component } from 'react'



export class NewsItem extends Component {

    render() {
        let { title, description, imgUrl, newsUrl } = this.props;

        return (
            <div className="card">
                <img src={!imgUrl ? "https://c.ndtvimg.com/2023-01/m1rd04io_shubman-gill-suryakumar-yadav-afp_625x300_07_January_23.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=675" : imgUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        )
    }
}

export default NewsItem