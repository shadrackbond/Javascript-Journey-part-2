function task1(callback){
    setTimeout(() =>{
        console.log("1.I am the first output to be written");
        callback();
    }, 2000);
}

function task2(callback){
    setTimeout(() => {
        console.log("2. I am the second output to be written");
        callback();  
    }, 1000);
}

function task3 (callback){
    setTimeout(() => {
        console.log("2. I am the last output to be written");
        callback();
    }, 1500);
}

task1(()=>{
    task2(()=>{
        task3(()=>{
            
        })
    })
})