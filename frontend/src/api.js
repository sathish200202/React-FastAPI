import axiosInstance from './axios.js'



export const fetchFruits = async() => {
    try{
    const response = await axiosInstance.get('/fruits')
    return response.data
    } catch(error) {
        console.error(error.message)
    }
}

export const postFruit = async(fruit_data) => {
    try{
    const response = await axiosInstance.post('/fruits', fruit_data)
    return response.data
    } catch(error){
     console.error(error.message)
    }
}


export const deleteFruit = async(fruit_id) => {
      try{
        const response = await axiosInstance.delete("/fruit/"+fruit_id)
      } catch(error) {
        console.error(error.message)
      }
}

export const viewFruitById = async(fruit_id) => {
    try{
        const response = await axiosInstance.get("/fruit/"+fruit_id)
        return response.data
    } catch(error) {
        console.error(error.message)
      }

}


export const updateFruitById = async(fruit_id, fruit_data) => {
    try{
        const response = await axiosInstance.put("/fruit/"+fruit_id, fruit_data)
        return response.data
    } catch(error) {
        console.error(error.message)
      }

}