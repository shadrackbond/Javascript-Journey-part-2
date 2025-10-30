/*

EVENT LOOP

synchronous -> microtask -> macrotask -> synchronous

*/

function fetchData(){
    return new Promise((resolve) => setTimeout(() => resolve("Done!"), 1000))
}


const waitingData = async () => {
    let myOutput = await fetchData();
    console.log(myOutput);
}

waitingData();

(async () => {
    const ans = await fetchData();

    console.log(ans);
})();