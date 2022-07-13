import algoliasearch from "algoliasearch/lite";
import React, { Component } from "react";
import {
  InstantSearch,
  Hits,
  Stats,
  SortBy,
  Pagination,
  Highlight,
  connectSearchBox,
  RefinementList,
} from "react-instantsearch-dom";

const searchClient = algoliasearch(
  "M8VYFLBKJM",
  "de67302e56ffb53902d15685a3cf67dd"
);

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
  <form noValidate action="" role="search">
    <input
      type="search"
      placeholder="Search your products"
      value={currentRefinement}
      onChange={(event) => refine(event.currentTarget.value)}
      className="ais-InstantSearch__root"
    />
    <button className="submitButton" onClick={() => refine("")}>
      Reset query
    </button>
    {isSearchStalled ? "My search is stalled" : ""}
  </form>
);

const CustomSearchBox = connectSearchBox(SearchBox);

const SideBar = () => {
  return (
    <div className="sidebar">
      <h5>Brand</h5>
      <RefinementList attribute="brand" />
      <h5>Categories</h5>
      <RefinementList attribute="type" />
    </div>
  );
};
class App extends Component {
  render() {
    return (
      <InstantSearch indexName="cx_assignment" searchClient={searchClient}>
        <header id="header">
          <img src="instant_search_logo@2x.png" />
          <CustomSearchBox />
        </header>
        <div className="Info">
          <Stats />
        </div>
        <main>
          <div className="container">
            <div>
              {" "}
              <SideBar />
            </div>
            <div>
              {" "}
              <Hits hitComponent={Hit} />
            </div>
          </div>
        </main>
        <div className="pagination">
          <Pagination showLast />
        </div>
      </InstantSearch>
    );
  }
}

function Hit(props) {
  return (
    <div className="hit-content">
      <div className="hit">
        <div className="hit-image">
          <img src={props.hit.image} alt={props.hit.name} />
        </div>
        <div className="hit-content">
          <div className="hit-price">${props.hit.price}</div>
          <div className="hit-name">
            <Highlight hit={props.hit} attribute="name" />
          </div>
          <div className="hit-description">
            <Highlight hit={props.hit} attribute="description" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
