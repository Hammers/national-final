const columns = document.querySelectorAll('.column');
const activeCount = document.querySelector('#activeCount');
const totalCount = document.querySelector('#totalCount');
const eliminatedButton = document.querySelector('#eliminated');
const releasedButton = document.querySelector('#released');
const songButton = document.querySelector('#songButton');
const artistButton = document.querySelector('#artistButton');
const countryButton = document.querySelector('#countryButton');

let eliminated = true;
let released = true;
let sort = 'song';

fetch("./data.json")
    .then(response => {
        return response.json();
    })
    .then(data => {
        displayData(data);
        eliminatedButton.addEventListener('click',() => {
            if(eliminated) {
                eliminatedButton.classList.remove('btn-success');
                eliminatedButton.classList.add('btn-danger');
            } else {
                eliminatedButton.classList.add('btn-success');
                eliminatedButton.classList.remove('btn-danger');
            }
            eliminated = !eliminated;
            displayData(data);
        })
        releasedButton.addEventListener('click',() => {
            if(released) {
                releasedButton.classList.remove('btn-success');
                releasedButton.classList.add('btn-danger');
            } else {
                releasedButton.classList.add('btn-success');
                releasedButton.classList.remove('btn-danger');
            }
            released = !released;
            displayData(data);
        })
        songButton.addEventListener('click', () => {
            sort = 'song';
            clearButtons()
            songButton.classList.add('active');
            displayData(data);
        });
        artistButton.addEventListener('click', () => {
            sort = 'artist';
            clearButtons()
            artistButton.classList.add('active');
            displayData(data);
        });
        countryButton.addEventListener('click', () => {
            sort = 'country';
            clearButtons()
            countryButton.classList.add('active');
            displayData(data);
        });
    });

function clearButtons() {
    songButton.classList.remove('active');
    artistButton.classList.remove('active');
    countryButton.classList.remove('active');
}

function displayData(data) {
    for(let column of columns) {
        column.innerHTML = '';
    }
    let column = 0
    let active = data.reduce((acc,next) => {
        if(next.result !== 'eliminated') {
            return acc + 1;
        }
        return acc;
    },0);
    data.sort((a,b) => a[sort] > b[sort] ? 1 : -1);
    let shown = data.filter(x => {
        if(!eliminated && x.result === 'eliminated') {
            return false;
        }
        if(!released && x.released === 'N') {
            return false;
        }
        return true;
    })
    for(let i = 0; i < shown.length; i++) {
        let song = shown[i];
        if(i > (shown.length / columns.length) * (column + 1))
        {
            column++;
        }
        let divElement = document.createElement('div');
        divElement.innerText = `${song.song} - ${song.artist}`
        divElement.classList.add(song.result);
        columns[column].append(divElement);
    }
    activeCount.innerText = active;
    totalCount.innerText = data.length;
}