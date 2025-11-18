//break is used to completely stop a function from a particular set point
//1. First example is a for loop:
let brokenText = "";

for (let i = 0; i < 10; i++) {
    if (i === 3) {
        break;
    }
    brokenText += i;
}

console.log(brokenText);//expected output is (0,1,2)
