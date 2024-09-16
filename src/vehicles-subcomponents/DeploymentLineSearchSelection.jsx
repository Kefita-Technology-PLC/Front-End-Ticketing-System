import React, { useState } from 'react'

function DeploymentLineSearchSelection({setselectedDeploymentLine, value, handle}) {

  // console.log(value.station_name)
  const [search, setSearch] = useState(value?.station_name || ''); // Set default value or empty string
  const [deploymentLines, setDeploymentLines] = useState([]);
  const [deploymentLineId, setDeploymentLineId] = useState('')
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // Fetch DeploymentLines based on search input
  const fetchDeploymentLines = async (query) => {
      try {
          const response = await fetch(`${apiEndpoint}/v1/deployment-lines-search?q=${query}`, { headers });
          const data = await response.json();
          setDeploymentLines(data); // Update DeploymentLines with fetched data
          setDropdownVisible(true); // Show dropdown when there are results
      } catch (error) {
          console.error('Error fetching DeploymentLines:', error);
      }
  };

  useEffect(() => {
      if (search) {
          fetchDeploymentLines(search); // Fetch DeploymentLines when search input changes
      } else {
          setDeploymentLines([]); // Clear results when search is empty
          setDropdownVisible(false); // Hide dropdown
      }
  }, [search]);

  return (
    <div className="relative">
      <label className="block text-gray-700 text-sm mb-2">Choose a Deploymnet Line</label>
      <div className="relative">

          <input
              type="text"
              name='deployment_line'
              value={value.deployment_line}

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
      {isDropdownVisible && deploymentLines.length > 0 && (
          <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-60 overflow-y-auto">
              {deploymentLines.map((deploymentLine) => (
                  <div
                      key={deploymentLine.id}
                      className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-200 cursor-pointer"
                      onClick={() => {
                          setSearch(deploymentLine.name); // Set selected station name in input
                          setSelectedAssociation(deploymentLine.id); // Trigger the callback to inform parent component
                          setDropdownVisible(false); // Hide dropdown after selection
                          console.log('touched')
                      }}
                  >
                      {deploymentLine.origin} - {deploymentLine.destination}
                  </div>
              ))}
          </div>
      )}
  </div>
  )
}

export default DeploymentLineSearchSelection
