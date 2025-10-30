// //This is a side mini project code where i want to get some raw json data and send them to a file
// //by doing this I want to try simulating how to send robotic signal data to a file for processing
const fs = require('fs');

const chuckJokes = async () => {
    try {
        let refinedData = [];
        const jokeCount = 20;
        console.log("Fetching the data.......")
        for (i = 0; i < jokeCount; i++) {
            let chuckNoiris = await fetch('https://api.chucknorris.io/jokes/random');
            const loopData = await chuckNoiris.json();
            refinedData.push(loopData.id);
        }

        const filename = "rawData.txt";
        refinedData = JSON.stringify(refinedData);

        fs.writeFile(filename, refinedData, (err) => {
            if (err) {
                console.error("Error Writing to file", err);
            }
            else {
                console.log("file saved successfully!")
            }
        })
    }
    catch (err) {
        console.log(err)
    }
}

chuckJokes();

