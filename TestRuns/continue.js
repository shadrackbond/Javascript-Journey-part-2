//continue is used to break a piece of code at a point then continues to execute the function from the next point after the break as if to signal a new start
//1. First example is a for loop:
let text = "";

for (let i = 0; i < 10; i++) {
    if (i === 3) {
        continue;
    }
    text += i;
}

console.log(text);//expected output is (0,1,2,4,5,6,7,8,9) which doesnt have the character 3 to show that the loop temporarily broke at 3 but continued afterwards
