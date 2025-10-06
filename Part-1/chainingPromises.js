const promise = new Promise ((resolve,reject)=>{
    resolve("Well Done! promise One is resolved");
})

const promise2 = new Promise((resolve, reject) => {
    resolve("Well done! promise two is resolved");
})

const promise3 = new Promise((resolve, reject) => {
    reject("promise three is rejected");
})


promise// specifies where the promise chain is starting from
.then((value) => {
    console.log(value);
    return promise2
})

.then((value) =>{
     console.log(value);
     return promise3;
})
// .catch((error)=>{
//     console.log(error)
//     return promise3
// })
.catch((error) =>{
    console.log(error);
})