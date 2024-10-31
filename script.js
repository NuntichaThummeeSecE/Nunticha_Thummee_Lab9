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

            for (let artId of artIds) {
                // Get specific art objects from th API//
                fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/` + artId)
                    .then(response => response.json())
                    .then(data => {
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

                        //get the description of Art from the API data and store in imgDescription//
                        const imgDescription = document.createElement(`p`);
                        imgDescription.textContent = data.objectDescription || `-`;

                        //get the collection of Art from the API data and store in collection//
                        const collection = document.createElement(`p`);
                        collection.textContent = `Collection: ` + data.repository || `-`;

                        //get the copyright of Art from the API data and store in copyright/
                        const copyright = document.createElement(`p`);
                        copyright.textContent = data.rights || `-`;

                        //add elements in to the card//
                        card.appendChild(imgPicture);
                        card.appendChild(cardBody);
                        cardBody.appendChild(imgTitle);
                        cardBody.appendChild(imgDescription);
                        cardBody.appendChild(collection);
                        cardBody.appendChild(copyright);
                        cardGroup.appendChild(card);

                        /*// Get title of the image from the data
                        let imgTitle = data.title;
                        document.getElementById(`imageTitle`).textContent = imgTitle;

                        // Get image from the data
                        let imgPicture = data.primaryImageSmall; // Make sure this index exists
                        document.getElementById(`art1`).src = imgPicture;

                        // Get collection name
                        let collection = data.repository;
                        document.getElementById(`collection`).textContent = `Collection : ` + collection;

                        // Get description from the data
                        let imgDescription = data.objectDescription || `-`;
                        document.getElementById(`imageDescription`).textContent = `Description : ` + imgDescription;

                        // Get copyright info
                        let imgCopyright = data.rights || `No copyright information available`;
                        document.getElementById(`imageCopyright`).textContent = imgCopyright;*/

                    })
                    .catch(error => console.error(`Error fetching data: `, error));
            }
        })
}

getArtPictures();

