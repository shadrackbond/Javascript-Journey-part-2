const loadJoke = async() => {

    try {
        const chuckNorrisFetch = await fetch('https://api.chucknorris.io/jokes/random',
        {
            headers:{
                Accept: "application/json"
            }
        });

        const jokeData = await chuckNorrisFetch.json();
        document.getElementById('loadingJoke').innerHTML = jokeData.value;
    }
    catch(error){
        console.log(error)
    }
    
}

document.getElementById('loadJokeBtn').addEventListener("click", loadJoke);


// next task lets see if we can use javascriot to make the icon for the page using the icon_url from the link