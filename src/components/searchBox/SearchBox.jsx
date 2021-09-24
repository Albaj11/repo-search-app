import React, { Component } from "react";
import Table from "../table/Table";
import "./SearchBox.css";

let searchTerm;
export default class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repositories: [],
      isUsername: false,
    };
  }

  onClick = (e) => {
    searchTerm = this.searchBox.value;
    // let epoint = `https://api.github.com/users${searchTerm}/repos`;
    let endpoint =
      "https://api.github.com/search/repositories?sort=stars&order=desc&q=" +
      searchTerm;
    fetch(endpoint)
      .then((blob) => blob.json())
      .then((response) => {
        this.setState({ repositories: response.items, isUsername: true });
      });
    e.preventDefault();
  };

  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <div className="topSection" data-testid="searchBox-1">
          <h1 id="topHeader">Search your repository</h1>
          <p>
            A repository contains all the files of your project, including the
            revision history.
          </p>
        </div>

        <div className="content">
          <form className="mainForm">
            <input
              type="text"
              placeholder="Enter username"
              className="searchbox"
              ref={(input) => {
                this.searchBox = input;
              }}
            />
            <button onClick={this.onClick}>
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
        <Table
          repositories={this.state.repositories}
          isUsername={this.state.isUsername}
        />
      </React.Fragment>
    );
  }
}
