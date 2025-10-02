//setTime out is a simple way of simulating async programs by allocating a specific amount of time in miliseconds
//that the piece of code is to execute after the set time

 setTimeout(() => {
     console.log("1. hello there")
}, 1000)

setTimeout(() => {
     console.log("2. I am the second task")
}, 200)

// in normal programming synchronous method its expected that hello there will be executed first then I am the second task the last
//but due to the set time for execution in both the second code will be executed first
