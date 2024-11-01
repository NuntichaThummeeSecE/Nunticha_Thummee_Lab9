//create an array to collect datas//
let currentArtworks = [];

//create card//
function createArtCard(data) {
    const container = document.createElement(`div`);
    container.className = "cardContainer";

    //create main card//
    const card = document.createElement(`div`);

    //get the image from the API data and store in imgPicture//
    const imgPicture = document.createElement(`img`);
    imgPicture.src = data.primaryImageSmall;
    imgPicture.alt = `Art image`;

    //create card body section//
    const cardBody = document.createElement(`div`);

    //get the title of Art from the API data and store in imgTitle//
    const imgTitle = document.createElement(`h5`);
    imgTitle.textContent = data.title;

    //get artist name of Art from the API data and store in artistName//
    const artistName = document.createElement(`p`);
    artistName.textContent = `Artist: ` + data.artistDisplayName || `Unknown`;

    //get the collection of Art from the API data and store in collection//
    const collection = document.createElement(`p`);
    collection.textContent = `Collection: ` + data.repository || `-`;

    //get date of creating art from the API data and store in dateCreation//
    const dateCreation = document.createElement(`p`);
    dateCreation.textContent = `Date of creation: ` + data.objectDate || `Unknown`;

    const classification = document.createElement(`p`);
    classification.textContent = `Classification: ` + data.classification || `Unknown`;

    //add elements in to the card//
    card.appendChild(imgPicture);
    card.appendChild(cardBody);
    cardBody.appendChild(imgTitle);
    cardBody.appendChild(artistName);
    cardBody.appendChild(collection);
    cardBody.appendChild(dateCreation);
    cardBody.appendChild(classification);
    container.appendChild(card);

    return container;
}

//function geting data from the api//
function getArtPictures() {
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=11`)
        .then(response => response.json())
        .then(data => {
            //check data from the api//
            console.log(data);
            //using for loop to access data id in api//
            const artIds = data.objectIDs;
            //create cardGroup//
            const cardGroup = document.getElementById(`cardGroup`);
            //make it display only 3 cards//
            let displayedCards = 0;

            for (let artId of artIds) {
                // Get specific art objects from th API//
                fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/` + artId)
                    .then(response => response.json())
                    .then(data => {
                        //make it return when it has 3 cards//
                        if (displayedCards >= 3) return;

                        //create createArtCard function
                        const artCard = createArtCard(data);
                        cardGroup.appendChild(artCard);

                        //track number of the card display//
                        displayedCards++;
                        //push data into an array//
                        currentArtworks.push(data);
                    })
                    .catch(error => console.error(`Error fetching data: `, error));
            }
        });
}

//create function filter data by classification//
function filterByClassification(classification) {
    const filteredArtworks = currentArtworks.filter(artwork => {
        //check artwork.classification and return to lower case or empty string//
        const artworkClassification = (artwork) => {
            if (artwork.classification) {
                return artwork.classification.toLowerCase();
            }
            return ``;
        };

        const currentClassification = artworkClassification(artwork);

        if (classification === `All`) {
            return true; //display all//
        } else if (classification.toLowerCase() === `painting`) {
            return currentClassification === `painting`; //return only painting
        } else if (classification.toLowerCase() === `miniatures`) {
            return currentClassification === `miniatures`; //return only miniatures
        } else {
            return false;
        }
    });

    //display filter//
    displayFilteredArt(filteredArtworks);

}

//function display art work that alreadt filter//
function displayFilteredArt(artwork) {
    const cardGroup = document.getElementById(`cardGroup`);
    cardGroup.innerHTML = ``;

    artwork.forEach(data => {
        const artCard = createArtCard(data);
        cardGroup.appendChild(artCard);

    });
}

//add event listener for buttons//
document.getElementById(`allArt`).addEventListener(`click`, () => {
    filterByClassification(`All`);
});

document.getElementById(`painting`).addEventListener(`click`, () => {
    console.log('Painting button clicked');
    filterByClassification(`Painting`);
});

document.getElementById(`miniatures`).addEventListener(`click`, () => {
    console.log('Miniatures button clicked');
    filterByClassification(`Miniatures`);
});

getArtPictures();
