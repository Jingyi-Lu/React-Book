import React from 'react';
import './App.css';
import axios from 'axios'

class App extends React.Component{
  constructor() {
    super();
    this.state = {
      inputValue: "",
      data: null,
    };
  };

  fetchData(value) {
    let app = this;
    axios({
      method: 'get',
      url: 'https://www.apiopen.top/novelInfoApi?name='+value,
    })
        .then(function (response) {
          app.setState({
            data: response.data,
          });
          console.log(response.data.code)
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  handleChange(e) {
    this.setState({
      inputValue: e.target.value
    });
    this.fetchData(e.target.value);
  }

  render() {
    return (
        <div className="App">
          <div className="left" />
          <div className="main">
            <div className="top" />
            <div className="searchBar">
              <input
                onChange={(e) => this.handleChange(e)}/>
              <button onClick={() => this.fetchData(this.state.inputValue)}>搜索</button>
            </div>
            {this.bookList()}
          </div>
          <div className="right"></div>
        </div>
    );
  }

  bookList() {
    if (this.state.data != null && this.state.data.data != null) return (
        <div className="bookList">
          {this.book(this.state.data.data.data[0])}
          {this.book(this.state.data.data.data[1])}
          <h>...</h>
        </div>
    )
  }

  book(data){
    return (
      <div className="book">
        <div className="cover">
          <img src={data.cover} alt="cover" />
        </div>
        <div className="book-right">
          <p>{data.title}</p>
          <p>作者： {data.author}   类别： {data.category}</p>
          <p>描述： {data.desc}</p>
        </div>
      </div>
    )
  }
}

export default App;
