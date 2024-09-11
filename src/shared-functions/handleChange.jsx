export const handleChange = (event, data, setFormData) => {
  setFormData({ ...data, [event.target.name]: event.target.value });
};