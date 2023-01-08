import React, { Component } from 'react'

export class Spinner extends Component {
    render() {
        return (
            <div className="spinner-border text-success text-center" role="status">
                <span className="sr-only"></span>
            </div>
        )
    }
}

export default Spinner;