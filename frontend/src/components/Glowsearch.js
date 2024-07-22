import './Glowsearch.css';

const Glowsearch = ({ setSearchQuery }) => {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section className="webdesigntuts-workshop">
      <form action="" method="">
        <input type="search" placeholder="What are you looking for?" onChange={handleSearchChange} />
        <button type="submit"><i class="bi bi-search"></i></button>
      </form>
    </section>
  );
};

export default Glowsearch;
