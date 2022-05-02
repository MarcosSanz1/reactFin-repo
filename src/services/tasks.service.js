// const baseURL: '';
// Giffy
const apiKey = 'YFoMBn0Pb82L1PtCEV5MHwuuH6f3F5tg'

export default function getGifs ({ keyword = 'morty' } = {}) {
    const apiURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${keyword}&limit=10&offset=0&rating=g&lang=en`

    return fetch(apiURL)
      .then(res => res.json())
      .then(response => {
        const {data} = response
        const gifs = data.map(image => {
            const {images, title, id} = image
            const { url } = images.downsized_medium
            return { title, id, url }
        })
        return gifs
      })
}

/**
 * Registro
 * */
export const register = (email, pass) => {
  const data = {
    email: email,
    password: pass,
  }
  return new Promise((resolve, reject) => {
    axiosInstance.post('signup.json', data, ).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * Iniciar sesion
 * */
export const login = (email, pass) => {
  return new Promise((resolve, reject) => {
    axiosInstance.post('login.json', {user: {email: email, password: pass}}).then(async res => {
      await AsyncStorage.setItem('token', res.headers.authorization);
      await AsyncStorage.setItem('USER', JSON.stringify(res.data.id));
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}

/**
 * Cerrar sesion
 * */
export const logout = () => {
  return new Promise((resolve, reject) => {
    axiosInstance.get('logout.json', {headers}).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}