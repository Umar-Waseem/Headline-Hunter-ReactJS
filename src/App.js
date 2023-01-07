import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

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

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar navBarLinks={this.navBarLinks} />
          <Routes>
            <Route path="/" element={<News key="default" pageSize={3} country="us" category="" />} />
            {
              this.navBarLinks.map((link) => {
                return <Route path={`/${link}`} element={<News key={link} pageSize={3} country="us" category={link} />} />
              })
            }
          </Routes>
        </div>
      </BrowserRouter>
    )
  }


}

export default App;
