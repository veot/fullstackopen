import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (blogObj) => {
  const config = { headers: { Authorization: token } }
  const result = await axios.post(baseUrl, blogObj, config)
  return result.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken }