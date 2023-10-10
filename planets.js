let currentPageUrl = 'https://swapi.dev/api/planets/';

window.onload = async () => {

    try {
    await loadPlanets(currentPageUrl);
} catch (error) {
    console.log(error);
    alert('Erro ao carregar cards')
    }

    const nextButton = document.getElementById('next-button-planet')
    const backButton = document.getElementById('back-button-planet')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
    
};

async function loadPlanets(url) {
    const mainContent = document.getElementById('main-content-planets')
    mainContent.innerHTML = '';

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((planets) => {
            const card = document.createElement("div")
            card.style.backgroundImage = 
            `url(https://starwars-visualguide.com/assets/img/planets/${planets.url.replace(/\D/g, "")}.jpg)`
            card.className = 'cards'

            const planetNameBG = document.createElement("div")
            planetNameBG.className = 'planet-name-bg'

            const planetName = document.createElement("span")
            planetName.className = 'planet-name'
            planetName.innerText = `${planets.name}`

            planetNameBG.appendChild(planetName)
            card.appendChild(planetNameBG)

            card.onclick = () => {
                const modal = document.getElementById('modal-planet')
                modal.style.visibility = "visible"

                const modalContent = document.getElementById('modal-content-planet')
                modalContent.innerHTML = ''

                const planetImage = document.createElement("div")
                planetImage.style.backgroundImage = 
                `url(https://starwars-visualguide.com/assets/img/planets/${planets.url.replace(/\D/g, "")}.jpg)`
                planetImage.className = "planet-image"

                const name = document.createElement("span")
                name.className = "planets-details"
                name.innerText = `Nome: ${planets.name}`

                const rotation = document.createElement("span")
                rotation.className = "planets-details"
                rotation.innerText = `Periodo de Rotacao: ${convertRotation(planets.rotation_period)}`

                const orbital = document.createElement("span")
                orbital.className = "planets-details"
                orbital.innerText = `orbita: ${convertOrbital(planets.orbital_period)}`

                const diametro = document.createElement("span")
                diametro.className = "planets-details"
                diametro.innerText = `Diâmetro: ${convertDiametro(planets.diameter)}`

                const gravidade = document.createElement("span")
                gravidade.className = "planets-details"
                gravidade.innerText = `Gravidade: ${convertGravity(planets.gravity)}`

                const population = document.createElement("span")
                population.className = "planets-details"
                population.innerText = `Populacao: ${convertPopulation(planets.population)}`


                modalContent.appendChild(planetImage)
                modalContent.appendChild(name)
                modalContent.appendChild(rotation)
                modalContent.appendChild(orbital)
                modalContent.appendChild(diametro)
                modalContent.appendChild(gravidade)
                modalContent.appendChild(population)

                
            }

            mainContent.appendChild(card)
        })


        const nextButton = document.getElementById('next-button-planet')
        const backButton = document.getElementById('back-button-planet')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous


        backButton.style.visibility = responseJson.previous? "visible" : "hidden"
        nextButton.style.visibility = responseJson.next? "visible" : "hidden"
        
        currentPageUrl = url

    } catch(error){
         alert('Erro ao carregar os planetas')
         console.log(error)
    }
}


async function loadNextPage() {
     if(!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json();

       
            await loadPlanets(responseJson.next)
        

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a próxima página')
    }
}

async function loadPreviousPage() {
    if(!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json();

        
            await loadPlanets(responseJson.previous)
        
        

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a página anterior')
    }
}

function hideModal() {
    const modal = document.getElementById("modal-planet")
    modal.style.visibility = "hidden"
}

function convertGravity(gravity){
    if(gravity === "N/A"){
        return "nenhuma"
    }

    if(gravity == "unknown"){
        return "desconhecida"
    }

    return `${gravity}`
}

function convertPopulation(population) {
    if(population === "unknown"){
        return "desconhecida"
    }

    return `${population} habitantes`
}

function convertRotation(rotation){
    if(rotation === "unknown"){
        return "desconhecida"
    }

    return `${rotation} dias`
}

function convertOrbital(orbital){
    if(orbital === "unknown"){
        return "desconhecida"
    }

    return `${orbital} dias`
}
 

function convertDiametro(diametro){
    if(diametro === "unknown"){
        return "desconhecido"
    }

    if(diametro == 0){
        return "desconhecido"
    }

    return `${diametro} km`
}