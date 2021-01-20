const columns = document.querySelectorAll('.column');
const activeCount = document.querySelector('#activeCount');
const totalCount = document.querySelector('#totalCount');

fetch("./data.json")
    .then(response => {
        return response.json();
    })
    .then(data => displayData(data));

function displayData(data) {
    let column = 0
    let active = 0;
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
            active++;
        } else {
            active++;
        }
        columns[column].append(divElement);
    }
    activeCount.innerText = active;
    totalCount.innerText = data.length;
}