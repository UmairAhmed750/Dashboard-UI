import axios from "axios";

// export likhna lazmi hai
export const getProducts = async () => {
   try {
     const res = await axios.get('https://dummyjson.com/products?limit=5');
     return res.data.products;
   } catch (error) {
     console.error(error);
     throw error; // Taake component ko pata chale error aaya hai
   }
};