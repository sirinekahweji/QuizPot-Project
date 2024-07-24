import React, { useContext } from 'react';
import './Glowsearch.css';
import { LangContext } from '../context/LangContext';

const Glowsearch = ({ setSearchQuery }) => {
  const { currentLangData } = useContext(LangContext);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section className="webdesigntuts-workshop">
      <form action="" method="">
        <input type="search" placeholder={currentLangData.search.placeholder} onChange={handleSearchChange} />
        <button type="submit"><i class="bi bi-search"></i></button>
      </form>
    </section>
  );
};

export default Glowsearch;
