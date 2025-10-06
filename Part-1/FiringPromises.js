// this is an example of how to fire off multiple promises 
// we are checking to see if they are fulfilled and if on of 
// the promises fails then the whole thing fails

const promiseOne = new Promise((resolve,reject) =>{

    setTimeout(() =>{
        resolve("promise One Resolved")
    }, 2000)
})

const promiseTwo = new Promise((resolve, reject) => {

    setTimeout(() => {
        reject("promise Two Rejected")
    }, 1500)
})

Promise.all([promiseOne,promiseTwo])
.then((value) => console.log(value[0], value[1]))
.catch((error) => console.log(error))

//......NOTES......

/* 
. Code Explanation
Promise Definitions 📜
promiseOne: This promise is set up to resolve after 2000 milliseconds (2 seconds) with the value "promise One Resolved".

promiseTwo: This promise is set up to reject after 1500 milliseconds (1.5 seconds) with the reason "promise Two Resolved". (Note: Even though the string says "Resolved," it is passed to the reject function, making it an error reason).

Promise.all() Execution ⚡
Starts Both Promises: The Promise.all() method immediately kicks off both promiseOne and promiseTwo simultaneously.

Awaits Resolution/Rejection: It waits for the state of the promises it is monitoring.

Fail-Fast Mechanism: The rule of Promise.all() is:

It resolves only when all promises in the array resolve.

It rejects as soon as any one of the promises in the array rejects.

Rejection Trigger: promiseTwo rejects after 1500ms, which is sooner than promiseOne resolves (at 2000ms). Because promiseTwo is the first to settle into a rejected state, Promise.all() immediately rejects.

Chain Jumps to .catch(): The chain bypasses the .then() handler and jumps directly to the .catch() block.

2. Output and Timing
At 1500ms: promiseTwo rejects.

The Promise.all() wrapper promise rejects with the reason from promiseTwo: "promise Two Resolved".

The .catch() block runs and logs the error.

The .then() block is never executed. promiseOne continues running in the background until 2000ms but its resolved value is ignored by the overall Promise.all() result.

The final output is the error passed to the reject function of promiseTwo:

*/