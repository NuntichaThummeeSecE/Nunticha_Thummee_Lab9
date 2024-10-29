//function geting data from the api//
function getArtPictures(){
    fetch(`https://collections.louvre.fr/ark:/53355/cl010277627.json`)
    .then(response => response.json())
    .then (data => {
        //check data from the api//
        console.log(data);
    })
    .catch(error => console.error(`Error fretching data: `, error));
}
getArtPictures();

