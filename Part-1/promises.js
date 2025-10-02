
/*
Promise is an object that holds the future value of an async operation
example: requesting some data from a server, the promise, promises us to get that data which we can use in future

........STATES OF A PROMISE.....
- Pending -> the result is not ready
-Fulfilled -> the promise has been fulfilled and the result is available
-Rejected -> an error has occurred of which has to be addressed

*/
//............promise constructor... the arrow function having the resolve and reject call backs
const promise = new Promise((resolve, Reject) =>{
     const isAllWell = true;

    if(isAllWell){
         resolve("all things went well");
     }
    else{
         Reject("oops something went wrong")
     }
})

console.log(promise);


//MOST OF THE TIMES WE CONSUME PROMISES RATHER THAN CREATING THEM
// one way of consuming a promise is using the .then and .catch


//.... this is for simulating the pending state of a promise and also reject
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


console.log(mathNumber);