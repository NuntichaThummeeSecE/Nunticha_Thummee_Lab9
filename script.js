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

                        //add elements in to the card//
                        card.appendChild(imgPicture);
                        card.appendChild(cardBody);
                        cardBody.appendChild(imgTitle);
                        cardBody.appendChild(artistName);
                        cardBody.appendChild(collection);
                        cardBody.appendChild(dateCreation);
                        cardGroup.appendChild(card);
                        cardGroup.appendChild(container);

                        //track number of the card display//
                        displayedCards++;

                    })
                    .catch(error => console.error(`Error fetching data: `, error));
            }
        })
}


getArtPictures();

