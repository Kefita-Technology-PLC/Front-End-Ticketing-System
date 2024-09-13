function SearchCard({searchInput, handleInputChange}) {

  return (
    <div className=''>
      <form onSubmit={(e) => e.preventDefault()} className='flex items-center m-4 gap-x-3' >
        <input 
          className='p-2 rounded-lg ring-1'
          type="search"
          placeholder="Enter plate number"
          value={searchInput}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}

export default SearchCard;
