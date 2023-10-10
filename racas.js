let currentPageUrl = 'https://swapi.dev/api/species/';

window.onload = async () => {
    try {
        await loadEspecies(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)

};

async function loadEspecies(url){
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = '';

    try {

        const response = await fetch(url)
        const responseJson = await response.json();

        responseJson.results.forEach((especie) => {
            const card = document.createElement("div")
            card.style.backgroundImage = 
            `url(https://starwars-visualguide.com/assets/img/species/${especie.url.replace(/\D/g, "")}.jpg)`
            card.className = 'cards'

            const especieNameBG = document.createElement("div")
            especieNameBG.className = 'character-name-bg'

            const especieName = document.createElement("span")
            especieName.className = 'character-name'
            especieName.innerText = `${especie.name}`

            especieNameBG.appendChild(especieName)
            card.appendChild(especieNameBG)


            card.onclick = () => {
                const modal = document.getElementById('modal')
                modal.style.visibility = "visible"

                const modalContent = document.getElementById('modal-content')
                modalContent.innerHTML = '';

                const especieImage = document.createElement("div")
                especieImage.style.backgroundImage =
                `url(https://starwars-visualguide.com/assets/img/species/${especie.url.replace(/\D/g, "")}.jpg)`
                especieImage.className = "character-image"

                const name = document.createElement("span")
                name.className = "character-details"
                name.innerText = `Nome: ${especie.name}`

                const classification = document.createElement("span")
                classification.className = "character-details"
                classification.innerText = `Classificacao: ${convertClassification(especie.classification)}`

                const designation = document.createElement("span")
                designation.className = "character-details"
                designation.innerText = `Designacao: ${convertDesignation(especie.designation)}`

                const averageHeight = document.createElement("span")
                averageHeight.className = "character-details"
                averageHeight.innerText = `Altura media: ${convertHeight(especie.average_height)}`

                const hairColor = document.createElement("span")
                hairColor.className = "character-details"
                hairColor.innerText = `Cor do cabelo: ${convertHairColor(especie.hair_colors)}`

                const lifespan = document.createElement("span")
                lifespan.className = "character-details"
                lifespan.innerText = `Vida media: ${convertAge(especie.average_lifespan)}`

                modalContent.appendChild(especieImage)
                modalContent.appendChild(name)
                modalContent.appendChild(classification)
                modalContent.appendChild(designation)
                modalContent.appendChild(averageHeight)
                modalContent.appendChild(hairColor)
                modalContent.appendChild(lifespan)

            }

            mainContent.appendChild(card)

        })

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous? "visible" : "hidden"
        nextButton.style.visibility = responseJson.next? "visible" : "hidden"

        currentPageUrl = url
    }catch(error){
        alert('Erro ao carregas espécies')
        console.log(error)
    } 

}
 
async function loadNextPage() {
    if(!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json();

        await loadEspecies(responseJson.next)
    } catch (error) {
        console.log(error)
        alert('Erro ao carregar próxima página')
    }
}

async function loadPreviousPage() {
    if(!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json();

        await loadEspecies(responseJson.previous)
    } catch (error) {
        console.log(error)
        alert('Erro ao carregar página anterior')
    }
}

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

function convertHeight(height) {
    if(height === "unknown"){
        return  "desconhecida"
    }

    if(height === "n/a"){
        return  "indefinido"
    }

     const altura = (height / 100).toFixed(2) 
     return `${altura} cm`
}

function convertAge(age){
    if(age === "indefinite"){
        return "indefinido"
    } 
    
    if(age === "unknown"){
        return "desconhecida"
    }

    return `${age} anos`;

}

function  convertClassification(classification){
    if(classification === "unknown"){
        return "desconhecida"
    }

    const classificacao = {
        mammal: "mamifero",
        mammals: "mamiferos",
        artificial: "artificial",
        sentient: "autoconsciente",
        gastropod: "gastropode",
        reptile: "reptil",
        amphibian: "anfibio",
        insectoid: "insetoide",
        reptilian: "reptiliano"
    };

    return classificacao[classification] || classification;

}

function convertDesignation(designation){
    if(designation === "unknown"){
        return "desconhecida"
    }
  
    const designacao = {
        sentient: "autoconsciente",
        reptilian: "reptiliano"
    }

    return designacao[designation] || designation;

}

function convertHairColor(hairColor){
    if(hairColor === "unknown"){
        return "desconhecido"
    }

    if(hairColor === "n/a"){
        return "nao possui"
    }

    const corCabelo = {
        blonde: "loiro",
        brown: "marrom",
        black: "preto",
        red: "vermelho",
        none: "nao possui",
        white: "branco",
        "blonde, brown, black, red": "loiro, marrom, preto, vermelho",
        "black, brown": "preto, marrom",
        "brown, white": "marrom, branco",
        "white, brown, black": "branco, marrom, preto",
        "red, blond, black, white": "vermelho, loiro, preto, branco"
        
    }

    return corCabelo[hairColor] || hairColor;
}