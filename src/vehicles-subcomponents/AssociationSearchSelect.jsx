import React, { useState, useEffect } from 'react';
import { apiEndpoint, headers } from '../data/AuthenticationData';

const AssociationSearchSelect = ({ setSelectedAssociation, value, handle }) => {
    
    const [search, setSearch] = useState(value?.association_name || ''); // Set default value or empty string
    const [associations, setAssociations] = useState([]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    // Fetch associations based on search input
    const fetchAssociations = async (query) => {
        try {
            const response = await fetch(`${apiEndpoint}/v1/associations-search?q=${query}`, { headers });
            const data = await response.json();
            setAssociations(data); // Update associations with fetched data
            setDropdownVisible(true); // Show dropdown when there are results
        } catch (error) {
            console.error('Error fetching associations:', error);
        }
    };

    useEffect(() => {
        if (search) {
            fetchAssociations(search); // Fetch associations when search input changes
        } else {
            setAssociations([]); // Clear results when search is empty
            setDropdownVisible(false); // Hide dropdown
        }
    }, [search]);

    return (
        <div className="relative">
            <label className="block text-gray-700 text-sm mb-2">Choose an Association</label>
            <div className="relative">

                <input
                    type="text"
                    name='association_name'
                    value={value.association_name}
                    onChange={(e) => {
                        setSearch(e.target.value); // Update search state on input change
                        handle(e); // Trigger the handle function passed as a prop
                        // console.log(handle(e))
                    }}
                    placeholder="Search for a station"
                    className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />

                <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 9l3 3 5-5M8 15l3 3 5-5"
                        />
                    </svg>
                </button>
            </div>

            {/* Dropdown for search results */}
            {isDropdownVisible && associations.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-60 overflow-y-auto">
                    {associations.map((association) => (
                        <div
                            key={association.id}
                            className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-200 cursor-pointer"
                            onClick={() => {
                                setSearch(association.name); // Set selected station name in input
                                setSelectedAssociation(association.name); // Trigger the callback to inform parent component
                                setDropdownVisible(false); // Hide dropdown after selection
                                console.log('touched')
                            }}
                        >
                            {association.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AssociationSearchSelect;
