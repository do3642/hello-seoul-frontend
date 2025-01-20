import React, { useState } from "react";
import '../styles/Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Search({ onSearch }) {
  const [keyword, setKeyword] = useState(''); // 검색어 상태 관리

  const handleSearchChange = (e) => {
    setKeyword(e.target.value); // 입력된 검색어를 상태에 반영
  };

  const handleSearchClick = () => {
    // 검색어가 변경되면 onSearch 호출
    onSearch(keyword);
  };

  return (
    <div className="search">
      <div className="search-container">
        <input
          type="search"
          id="search"
          value={keyword}
          onChange={handleSearchChange}
          placeholder="구 이름이나 관광지 이름 검색"
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="search-icon"
          onClick={handleSearchClick} // 클릭 시 검색어 전달
        />
      </div>
    </div>
  );
}

export default Search;
