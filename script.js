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
            const cardGroup = document.getElementById('cardGroup');

            for (let artId of artIds) {
                // Get specific art objects from th API//
                fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + artId)
                    .then(response => response.json())
                    .then(data => {
                        const card = document.createElement('div');
                        card.className = 'card';

                        // Get title of the image from the data
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
                        document.getElementById(`imageCopyright`).textContent = imgCopyright;

                    })
                    .catch(error => console.error(`Error fetching data: `, error));
            }
        })
}

getArtPictures();

