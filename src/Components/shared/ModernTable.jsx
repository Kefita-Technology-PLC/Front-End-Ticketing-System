 const ModernTable = ({ headers, data, loading }) => {
  return (
    <div className="w-full max-w-[1800px] mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={headers.length} className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full animate-spin border-t-blue-600"></div>
                    <span className="ml-2 text-sm text-gray-500">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((item, index) => (
                <tr 
                  key={index} 
                  className="transition-colors duration-200 ease-in-out hover:bg-gray-50"
                >
                  {Object.values(item).map((value, idx) => (
                    <td key={idx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {value}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ModernTable