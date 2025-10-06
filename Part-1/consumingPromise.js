//most of the time we consume promises
// we will use then and catch

const mathNumber = new Promise((resolve, reject) => {
    const randomNumber = Math.floor(Math.random() * 10);

    setTimeout(() => {
        if (randomNumber < 4) {
            resolve("you got it");
        }
        else {
            reject("didnt get it sorry");
        }
    }, 2000);
});

promise.then((value)=>{
    console.log(value)
}).catch((error)=>{
    console.log(error)
})