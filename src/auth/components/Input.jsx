export default function InputFeild({
  handleChange, 
  value, 
  placeholder, 
  name, 
  type, 
  title, 
  error
}) {
  return (
    <div>

      <label for={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{title}</label>

      <input 
        type={type ? type : 'text'} 
        name={name} 
        id={name} 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        placeholder={placeholder} 
        required 
        value={value} 
        onChange={handleChange} 
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}