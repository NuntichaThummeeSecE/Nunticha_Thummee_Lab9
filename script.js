//function geting data from the api//
function getArtPictures() {
    fetch(`https://collections.louvre.fr/ark:/53355/cl010277627.json`)
        .then(response => response.json())
        .then(data => {
            //check data from the api//
            console.log(data);

            //get title of the img from the data//
            let imgTitle = data.title;
            document.getElementById(`imageTitle`).textContent = imgTitle;

            //get img from the data//
            let imgPicture = data.image[0].urlImage;
            document.getElementById(`art1`).src = imgPicture;

            let collection = data.collection;
            document.getElementById(`collection`).textContent = collection;

            //get description from the data//
            let imgDescription = data.titleComplement || `No description available`;
            document.getElementById(`imageDescription`).textContent = imgDescription;

        })
        .catch(error => console.error(`Error fretching data: `, error));
}
getArtPictures();

