import React, { Component } from 'react'

export class Spinner extends Component {
    render() {
        return (
            <div className="spinner-border text-danger" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
    }
}

export default Spinner