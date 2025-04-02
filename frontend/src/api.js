import axiosInstance from './axios.js'



export const fetchFruits = async() => {
    try{
    const response = await axiosInstance.get('/fruits')
    return response.data.fruits
    } catch(error) {
        console.error(error.message)
    }
}

export const postFruit = async(fruitName) => {
    try{
    const response = await axiosInstance.post('/fruits', {fruit: fruitName})
    return response.data.fruits
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


export const updateFruitById = async(fruit_id, fruit_name) => {
    try{
        const response = await axiosInstance.put("/fruit/"+fruit_id, {fruit: fruit_name})
        return response.data
    } catch(error) {
        console.error(error.message)
      }

}