import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import './index.css';
import Button from '../Button';
import Search from '../Search';
import Table from '../Table';
//
import {
     DEFAULT_QUERY,
     DEFAULT_HPP,
     PATH_BASE,
     PATH_SEARCH,
     PARAM_SEARCH,
     PARAM_PAGE,
     PARAM_HPP,
} from '../../constants';

class App extends Component {

   _isMounted = false;
   _callcnt = 0;

   constructor(props) {

      super(props);

      this.state = {
         results: null,
         searchKey: DEFAULT_QUERY,
         searchTerm: DEFAULT_QUERY,
         error: null,
      };

      this.onSearchSubmit = this.onSearchSubmit.bind(this);
      this.onDismiss = this.onDismiss.bind(this);
      this.onSearchChange = this.onSearchChange.bind(this);
      this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
  }

   needsToSearchTopStories(searchTerm) {
      return !this.state.results[searchTerm];
   }

   setSearchTopStories(result) {
      const { hits, page } = result;
      const { searchKey, results } = this.state;
      const oldHits = results && results[searchKey]
            ? results[searchKey].hits
            : [];
      const updatedHits = [
            ...oldHits,
            ...hits
      ];
      this.setState({
         results: {
            ...results,
            [searchKey]: { hits: updatedHits, page }
         }
      });
   }


   onDismiss(id) {
      const { searchKey, results } = this.state;
      const { hits, page } = results[searchKey];
      const isNotId = item => item.objectID !== id;
      const updatedHits = hits.filter(isNotId);
      this.setState({
         results: {
            ...results,
            [searchKey]: { hits: updatedHits, page }
         }
      });
   }

   onSearchSubmit(event) {
    event.preventDefault();
     const { ...searchTerm } = this.state;
     this.setState({ searchKey: searchTerm });
      if(this.needsToSearchTopStories(searchTerm)) {
         this.fetchSearchTopStories(searchTerm);
      }
  }

   onSearchChange(event) {
       this.setState({searchTerm: event.target.value })
   }


  componentWillUnmount() {
    this._isMounted = false;
   }

   componentDidMount() {
      this._isMounted = true;
      const { searchTerm } = this.state;
      this.fetchSearchTopStories(searchTerm);
   }


  fetchSearchTopStories(searchTerm, page=0) {
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({ error }));
  }

  render() {
     const {
            searchTerm,
            results,
            searchKey,
            error
     } = this.state;

     console.log(++this._callcnt);
     console.log("render");
     const page = (
          results &&
          results[searchKey] &&
          results[searchKey].page
     ) || 0;

     const list = (
          results &&
          results[searchKey] &&
          results[searchKey].hits
     ) || [];

    return (
      <div className="page">
         <Search
           value={searchTerm}
           onChange={this.onSearchChange}
           onSubmit={this.onSearchSubmit}
         >
           Search
         </Search>
         {
            error
            ?

             <div className="interactions">
               <p>Something went wrong.</p>
               <h> i think it is very good.</h>
             </div>
            :
               <Table
                 list={list}
                 onDismiss={this.onDismiss}
               />
         }
         <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1) }>
            More
         </Button>
      </div>
    );
  }
}

if (module.hot) {
  module.hot.accept();
}

export default App;

export {
  Button,
  Search,
  Table
};
