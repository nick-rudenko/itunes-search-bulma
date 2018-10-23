const acc = document.getElementsByClassName('header');
let show = document.getElementsByClassName('show');
let active = document.getElementsByClassName('active');
const searchbtn = document.getElementById('search-btn');
const searchInput = document.getElementById('input');
let searchOtput = document.getElementById('output');
let i;

searchbtn.addEventListener('click', findSong);

function findSong() {
  let inputValue = searchInput.value;
  inputValue = inputValue.replace(/\s/gi, '+');
  console.log(inputValue);
  let url = `https://itunes.apple.com/search?term=${inputValue}&limit=10&entity=musicTrack`;

  fetch(url)
    .then(function(response) {
      if (response.status !== 200) {
        console.log(response.status);
        return;
      }
      return response.json();
    })
    .then(json => showResults(json));
}

function showResults(json) {
  console.log(json.results);
  searchOtput.innerHTML = '';
  json.results.forEach((item, key) => {
    searchOtput.innerHTML += `<div id="item${key}" class="search-item container 
    ${key % 2 === 0 ? 'has-background-light' : ''} 
    rounded">
  <div class="header columns is-vcentered">
    <div class="column has-text-centered is-2">
      <img src=${item.artworkUrl100}
        alt="cover">
    </div>
    <div class="column">
      ${item.artistName}
    </div>
    <div class="column">
      ${item.trackName}
    </div>
    <div class="column">
      ${item.collectionName}
    </div>
    <div class="column">
      ${item.primaryGenreName}
    </div>
    <div class="column has-text-centered is-1">
      <span id="icon${key}" class="tag is-rounded is-large has-background-dark has-text-white">+</span>
    </div>
  </div>
  <div class="panel">
    <h2 class="is-size-4">${item.artistName} - ${item.trackName} 
    <span><i class="fas fa-music"></i></span> </h2>
    <div class="columns">
      <div class="column">
        <ul class="search-item">
          <li>
            <p><strong>Collection:</strong> ${item.collectionName}</p>
          </li>
          <li>
            <p><strong>Track Count:</strong> ${item.trackCount}</p>
          </li>
          <li>
            <p><strong>Price:</strong> ${item.collectionPrice} USD</p>
          </li>
        </ul>
      </div>
      <div class="column">
        <ul class="search-item">
          <li>
            <strong>Track durarion:</strong> 
            ${millisToMinutesAndSeconds(item.trackTimeMillis)} min
          </li>
          <li><strong>Track price:</strong> ${item.trackPrice} USD</li>
        </ul>
      </div>
    </div>
  </div>
</div>
</section>`;
  });

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener('click', function() {
      const panel = this.nextElementSibling;

      const button = this.childNodes[11];
      const sign = button.childNodes[1];
      sign.textContent = '+';
      if (this.classList.contains('active')) {
        this.classList.remove('active');
      }

      collapseOtherTabs();

      if (!this.classList.contains('active')) {
        sign.textContent = '-';
        panel.classList.add('show');
        this.classList.add('active');
      }
    });
  }
}

function millisToMinutesAndSeconds(millis) {
  let minutes = Math.floor(millis / 60000);
  let seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function collapseOtherTabs() {
  if (show[0]) {
    show[0].classList.remove('show');
    const button = active[0].childNodes[11];
    const sign = button.childNodes[1];
    sign.textContent = '+';
    active[0].classList.remove('active');
  }
}
