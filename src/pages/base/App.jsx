import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button>
            <Link to='/hello'>
              IR A HELLO
            </Link>
          </button>
        </header>
      </div>
    );
  }
}

export default App;
