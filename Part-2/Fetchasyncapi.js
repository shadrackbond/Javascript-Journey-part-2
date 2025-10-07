const getAllProducts = async() =>{
   try{
       const response = await fetch('https://dummyjson.com/products/1');
       const json = await response.json();
       console.log(json)
   }catch{
    console.log(console.error);
   }
}

getAllProducts()