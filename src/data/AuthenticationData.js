export const apiEndpoint = process.env.REACT_APP_API_ENDPOINT
const token = localStorage.getItem('token');
// Create headers with the token
export const headers = { Authorization: `Bearer ${token}` };
