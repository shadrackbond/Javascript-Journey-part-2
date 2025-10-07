const preHeatOven = ()=>{
    return new Promise((resolve,reject) =>{
        setTimeout(()=>{
            const preHeatOven= true;
            if(preHeatOven){
                resolve("preheat oven to 180deg");
            } else{
                reject("failed to pre heat the oven")
            }
        }, 1000)
    })
}
const addSugar = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const addSugar = true;
            if (addSugar) {
                resolve("place butter and chocolate chips till melted");
            } else {
                reject("failed to add the sugar")
            }
        }, 1000)
    })
}
const addFlour = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const addFlour = true;
            if (addFlour) {
                resolve("beat flour and salt together till mixture is smooth");
            } else {
                reject("failed adding flour")
            }
        }, 1000)
    })
}
const bakingMixture = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const bakingMixture = false;
            if (bakingMixture) {
                resolve("bake for 20 mins till centre has hardened");
            } else {
                reject("failed to bake the mixture")
            }
        }, 1000)
    })
}

// we use the async await to log out asynchronous function synchronously
// to handle errors we will use the try and catch block
const bakeChocolateBrownies = async() =>{
    try{
        const task1 = await preHeatOven();
        console.log(task1)

        const task2 = await addSugar();
        console.log(task2)

        const task3 = await addFlour();
        console.log(task3)

        const task4 = await bakingMixture();
        console.log(task4)

        console.log("Enjoy your chocolate brownies")
    }
    catch(error){
        console.log(error)
    }
}

bakeChocolateBrownies();