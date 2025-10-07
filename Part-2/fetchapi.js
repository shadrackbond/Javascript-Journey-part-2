fetch('https://dummyjson.com/products/1', {
    method: 'PUT',
    headers:{
        'content-type': 'application/json'
    },
    body: JSON.stringify({
        title: 'samsung 27',
        description: 'Samsung s27',
        price: '1000',
        rating: '9/10'
    })
})

.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.log(error))