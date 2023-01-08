import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

import { BrowserRouter, Routes, Route } from "react-router-dom";
class App extends Component {

  
  navBarLinks = [
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ]
  
  apiKey = process.env.REACT_APP_NEWS_API;
  
  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar navBarLinks={this.navBarLinks} />
          <LoadingBar
            color='red'
            progress={this.state.progress}
            height={3}
          />
          <Routes>
            <Route path="/" element={<News key="default" pageSize={3} country="us" category="" />} />
            {
              this.navBarLinks.map((link) => {
                return <Route key={link} path={`/${link}`} element={
                  <News apiKey={this.apiKey} key={link} setProgress={this.setProgress} pageSize={3} country="us" category={link} />}
                />
              })
            }
          </Routes>
        </div>
      </BrowserRouter>
    )
  }


}

export default App;
