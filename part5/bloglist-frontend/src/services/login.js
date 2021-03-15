import axios from 'axios'

const baseUrl = '/api/login'

const login = async (credentials) => {
  const result = await axios.post(baseUrl, credentials)
  return result.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login }
