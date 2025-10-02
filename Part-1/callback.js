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

    })
})

function output(result) {
    console.log("The result is " + result);
}
function add(x, y, callback) {
    let sum = x + y;
    callback(sum);
}

add(5, 3, output);
