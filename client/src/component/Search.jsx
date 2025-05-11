import React, { useState, useEffect } from 'react';
function Search({ allSearchCriteria, origin, setFilter }) {
    const [searchDetails, setSearchDetails] = useState({ searchCriteria: 'id', searchTerm: '' })
    const searchItems = () => {
        if (!searchDetails.searchTerm.trim()) {
            setFilter(origin);
            return;
        }
        let filtered = origin.filter((item) => {
            switch (searchDetails.searchCriteria) {
                case 'id':
                    return item.id.toString().includes(searchDetails.searchTerm);
                case 'title':
                    return item.title.toLowerCase().includes(searchDetails.searchTerm.toLowerCase());
                case 'completed':
                    return searchDetails.searchTerm === 'true'
                        ? item.completed
                        : searchDetails.searchTerm === 'false'
                            ? !item.completed
                            : true;
                default:
                    return true;
            }
        });
        setFilter(filtered);
    };
    useEffect(() => {
        searchItems();
    }, [searchDetails]);
    return (
        <div className="search-container">
            <select
                value={searchDetails.searchCriteria}
                onChange={(e) => setSearchDetails(prevState => ({
                    ...prevState,
                    searchCriteria: e.target.value,
                }))}
            >
                {allSearchCriteria.map((criteria) => (
                    <option key={criteria} value={criteria}>Search by {criteria}</option>
                ))}
            </select>
            <input className='todo-search-input'
                type="text"
                placeholder="Search..."
                value={searchDetails.searchTerm}
                onChange={(e) => setSearchDetails(prevState => ({
                    ...prevState,
                    searchTerm: e.target.value,
                }))}
            />
        </div>
    )
}
export default Search;