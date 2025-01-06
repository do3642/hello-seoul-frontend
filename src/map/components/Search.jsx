import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Search.css'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Search() {

  return (
    <div className="search">
      <div className='search-container'> 
        <input type="search" id='search'/>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon'/>
      </div>
    </div>
  )
}

export default Search;