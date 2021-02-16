import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAll = () => axios.get(baseURL).then((res) => res.data);

const create = (newObj) => axios.post(baseURL, newObj).then((res) => res.data);

const update = (id, newObj) =>
  axios.put(`${baseURL}/${id}`, newObj).then((res) => res.data);

const remove = (id) => axios.delete(`${baseURL}/${id}`).then((res) => res.data);

export default { getAll, create, update, remove };
