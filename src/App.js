import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SearchResultsDisplay = (props) => {

  const [activePage, setActivePage] = useState(0);

  const PageSelector = () => {

    let pageNums = Math.ceil(props.searchResult.length / props.itemsPerPage)
    let pageNumsArray = Array.from(Array(pageNums).keys())

    return (
      <div className="SearchFooter">
        {pageNumsArray.map(val=>
          <Button onClick={()=>setActivePage(val)}>{val+1}</Button>
        )}
      </div>
    )
  }

  const PageDisplay = () => {
    let pages = props.searchResult.filter((val,i)=>{
      return (i>=props.itemsPerPage*activePage) && (i<props.itemsPerPage*(activePage+1))
    })
    return (
      pages.map(val=>{
        return <div className="SearchResult">{val}</div>
      })
    )
  }

  if (props.searchResult) {
    return (
      <div>
        <PageDisplay/>
        <PageSelector/>
      </div>
    )
  } else {
    return (
      <></>
    )
  }

}

function App() {

  const [searchText, setSearchText] = useState();
  const [searchResults, setSearchResults] = useState();

  const handleSubmit = (event) => {
    event.preventDefault()

    // TODO: Insert your fetching here
    let dummySearchResults = [
      `${searchText} One`,
      `${searchText} Two`,
      `${searchText} Three`,
      `${searchText} Four`
    ]
    setSearchResults(dummySearchResults);

  }

  return (
    <div className="AppBox">
      <Form className="SearchBar"
        onSubmit={handleSubmit}
      >
        <Form.Control
          placeholder="Enter your search here"
          onChange={(e)=>setSearchText(e.target.value)}
        />
      </Form>
      <SearchResultsDisplay searchResult={searchResults} itemsPerPage={3} />
    </div>
  );
}

export default App;
