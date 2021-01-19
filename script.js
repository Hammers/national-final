const columns = document.querySelectorAll('.column');

fetch("./data.json")
    .then(response => {
        return response.json();
    })
    .then(data => displayData(data));

function displayData(data) {
    let column = 0
    data.sort((a,b) => a.Song > b.Song ? 1 : -1);
    for(let i = 0; i < data.length; i++) {
        if(i > (data.length / columns.length) * (column + 1))
        {
            column++;
        }
        let song = data[i];
        let divElement = document.createElement('div');
        divElement.innerText = `${song.Song} - ${song.Artist}`
        if(song.Result === 'Eliminated') {
            divElement.classList.add('eliminated');
        } else if(song.Result === 'Selected') {
            divElement.classList.add('selected');
        }
        columns[column].append(divElement);
    }
}