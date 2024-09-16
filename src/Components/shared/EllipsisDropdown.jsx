const { useCallback, useState } = require("react")


const EllipsisDropdown = ({ onEdit, onUpdate, id }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const handleEdit = useCallback(() => {
    onEdit(id)
    setIsOpen(false)
  }, [onEdit])

  const handleUpdate = useCallback(() => {
    onUpdate(id)
    setIsOpen(false)
  }, [onUpdate])

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none text-5xl"
        aria-label="More options"
      >
        <svg className="h-6 w-12" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-1 w-32 bg-white shadow-md rounded-md z-[200]">
          <button
            onClick={handleEdit}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Edit
          </button>
          <button
            onClick={handleUpdate}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Update
          </button>
        </div>
      )}
    </div>
  )
}

export default EllipsisDropdown