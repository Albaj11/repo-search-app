import React, { Component } from "react";
import "./Table.css";

export default class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortType: "asc",
      count: 0,
      searchTerm: "",
      selectValue: "",
    };
  }

  onFilter = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  onSort = (e) => {
    this.setState({ count: this.state.count + 1 });
    if (this.state.count % 2 !== 0) {
      this.setState({ sortType: "desc" });
    } else {
      this.setState({ sortType: "asc" });
    }
  };

  render() {
    const { sortType, searchTerm } = this.state;
    const { repositories, isUsername } = this.props;

    const sorted = repositories.sort((a, b) => {
      if (document.getElementById("name")) {
        const isReversed = sortType === "asc" ? 1 : -1;
        return isReversed * a.name.localeCompare(b.name);
      }
      if (document.getElementById("star")) {
        const isReversed = sortType === "asc" ? 1 : -1;
        return (
          isReversed * a.stargazers_count.localeCompare(b.stargazers_count)
        );
      }
      if (document.getElementById("owner")) {
        const isReversed = sortType === "asc" ? 1 : -1;
        return isReversed * a.owner.login.localeCompare(b.owner.login);
      }
      if (document.getElementById("watchers")) {
        const isReversed = sortType === "asc" ? 1 : -1;
        return isReversed * a.watchers.localeCompare(b.watchers);
      }
      if (document.getElementById("oic")) {
        const isReversed = sortType === "asc" ? 1 : -1;
        return (
          isReversed * a.open_issues_count.localeCompare(b.open_issues_count)
        );
      }
      return false;
    });
    return (
      <React.Fragment>
        {isUsername ? (
          <div className="localSearch" data-testid="table-1">
            <div className="topSection">
              <h2 id="repoHeader">Repositories</h2>
              <input
                type="text"
                id="filterInput"
                onChange={this.onFilter}
                placeholder="Search for names.."
              />
            </div>
            <table id="mainTable">
              <tr>
                <th id="owner" onClick={this.onSort}>
                  <div className="ownerContainer">
                    Owner
                    <div className="icons-wrapper">
                      <i className="fa fa-sort-up"></i>
                      <i className="fa fa-sort-down"></i>
                    </div>
                  </div>
                </th>
                <th
                  id="name"
                  onClick={this.onSort}
                  style={{ cursor: "pointer" }}
                >
                  <div className="ownerContainer" style={{ marginLeft: "25%" }}>
                    Name
                    <div className="icons-wrapper">
                      <i className="fa fa-sort-up"></i>
                      <i className="fa fa-sort-down"></i>
                    </div>
                  </div>
                </th>
                <th>Description</th>
                <th
                  id="star"
                  onClick={this.onSort}
                  style={{ cursor: "pointer" }}
                >
                  <div className="ownerContainer">
                    Star
                    <div className="icons-wrapper">
                      <i className="fa fa-sort-up"></i>
                      <i className="fa fa-sort-down"></i>
                    </div>
                  </div>
                </th>
                <th
                  id="oic"
                  onClick={this.onSort}
                  style={{ cursor: "pointer" }}
                >
                  <div className="ownerContainer">
                    Open Issue Count
                    <div className="icons-wrapper">
                      <i className="fa fa-sort-up"></i>
                      <i className="fa fa-sort-down"></i>
                    </div>
                  </div>
                </th>
                <th
                  id="watchers"
                  onClick={this.onSort}
                  style={{ cursor: "pointer" }}
                >
                  <div className="ownerContainer">
                    Watchers
                    <div className="icons-wrapper">
                      <i className="fa fa-sort-up"></i>
                      <i className="fa fa-sort-down"></i>
                    </div>
                  </div>
                </th>
              </tr>
              {sorted
                .filter((val) => {
                  if (searchTerm === "") {
                    return val;
                  } else if (
                    val.name.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  }
                  return false;
                })
                .map((item, index) => (
                  <tr className="item" key={index}>
                    <div className="container">
                      <img
                        src={item.owner.avatar_url}
                        alt="Avatar"
                        className="image"
                      />
                      <div className="overlay">
                        <div className="text">{item.owner.login}</div>
                      </div>
                    </div>
                    <td style={{ textAlign: "center" }}>{item.name}</td>
                    <td>{item.description}</td>
                    <td style={{ textAlign: "center" }}>
                      {item.stargazers_count}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {item.open_issues_count}
                    </td>
                    <td style={{ textAlign: "center" }}>{item.watchers}</td>
                  </tr>
                ))}
            </table>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}
