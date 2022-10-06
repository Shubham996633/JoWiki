

import { clearPushListener, clearSearchText, setSearchFocus, showClearTextButton } from "./searchBar.js";
import { deleteSearchResults, buildSearchResults, clearStatsLine, setStatsLine } from "./searchResults.js"
import { getSearchTerm, retriveSearchResults } from './dataFunctions.js'



document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initApp();
  }
});

const initApp = () => {
  setSearchFocus();
  const search = document.getElementById('search')
  search.addEventListener('input', showClearTextButton)
  const clear = document.getElementById('clear')
  clear.addEventListener('click', clearSearchText)
  clear.addEventListener('keydown', clearPushListener)
  const form = document.getElementById("searchBar");
  form.addEventListener("submit", submitTheSearch);
};

// Procedural "workflow" function
const submitTheSearch = (event) => {
  event.preventDefault();
  deleteSearchResults()
  processTheSearch();
  setSearchFocus();
};

const processTheSearch = async () => {
  clearStatsLine()
  const searchTerm = getSearchTerm()
  if (searchTerm === "") return
  const resultArray = await retriveSearchResults(searchTerm)
  if(resultArray.length) buildSearchResults(resultArray)
  setStatsLine(resultArray.length)
}

// 11:11:23