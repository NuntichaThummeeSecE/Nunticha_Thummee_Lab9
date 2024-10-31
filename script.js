//function geting data from the api//
function getArtPictures() {
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=11`)
        .then(response => response.json())
        .then(data => {
            //check data from the api//
            console.log(data);

            //using for loop to access data id in api//
            const artIds = data.objectIDs;
            for (let i = 0; i < artIds.length; i++) {
                const artId = artIds[i];

                // Get specific art objects from th API//
                fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + artId)
                    .then(response => response.json())
                    .then(data => {

                        // Get title of the image from the data
                        let imgTitle = data.title;
                        document.getElementById(`imageTitle`).textContent = imgTitle;

                        // Get image from the data
                        let imgPicture = data.image[0].urlImage; // Make sure this index exists
                        document.getElementById(`art1`).src = imgPicture;

                        // Get collection name
                        let collection = data.collection;
                        document.getElementById(`collection`).textContent = `Collection : ` + collection;

                        // Get description from the data
                        let imgDescription = data.titleComplement || `-`;
                        document.getElementById(`imageDescription`).textContent = `Description : ` + imgDescription;

                        // Get copyright info
                        let imgCopyright = data.image[0].copyright || `No copyright information available`;
                        document.getElementById(`imageCopyright`).textContent = imgCopyright;

                    })
                    .catch(error => console.error(`Error fetching data: `, error));
            }
        })
}

getArtPictures();

