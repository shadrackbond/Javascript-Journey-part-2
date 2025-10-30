function fizzBuzz(n) {
    // Write your code here

    for (let i=0; i < n; i++) {
        let z;
        let i = z;
        let divisible3 = z % 3;
        let divisible5 = z % 5;
        if (divisible3 || divisible5) {
            console.log("FizzBuzz");
        } else if (divisible3 || !divisible5) {
            console.log("Fizz");
        } else if (!divisible3 || divisible5) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    }

}

fizzBuzz(15)