const list = document.querySelector('ul');

fetch("./data.json")
    .then(response => {
        return response.json();
    })
    .then(data => displayData(data));

function displayData(data) {
    data.sort((a,b) => a.Song > b.Song ? 1 : -1);
    for(let song of data) {
        let li = document.createElement('li');
        li.innerText = `${song.Song} - ${song.Artist}`
        if(song.Result === 'Eliminated') {
            li.classList.add('eliminated');
        } else if(song.Result === 'Selected') {
            li.classList.add('selected');
        }
        list.append(li);
    }
}