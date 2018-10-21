const acc = document.getElementsByClassName('columns');
const searchbtn = document.getElementById('search-btn');
const searchInput = document.getElementById('input');
let searchOtput = document.getElementById('output');
let i;

searchbtn.addEventListener('click', findSong);

function findSong() {
  let inputValue = searchInput.value;
  inputValue = inputValue.replace(/\s/gi, '+');
  fetch(`https://itunes.apple.com/search?term=${inputValue}&limit=5`)
    .then(response => response.json())
    .then(json => appends(json));
}

function appends(json) {
  console.log(json.results);
  searchOtput.innerHTML = '';
  json.results.forEach((item, key) => {
    searchOtput.innerHTML += `<div class="search-item container has-background-light rounded">
  <div class="columns is-vcentered">
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
      <span id="icon1" class="tag is-rounded is-large has-background-dark has-text-white">+</span>
    </div>
  </div>
  <div class="panel">
    <h2 class="is-size-4">The Beatles - Here Comes The Sun <span><i class="fas fa-music"></i></span> </h2>
    <div class="columns">
      <div class="column">
        <ul class="search-item">
          <li>
            <p><strong>Collection:</strong> Abbey Road</p>
          </li>
          <li>
            <p><strong>Track Count:</strong> 17</p>
          </li>
          <li>
            <p><strong>Price:</strong> 12.99 USD</p>
          </li>
        </ul>
      </div>
      <div class="column">
        <ul class="search-item">
          <li><strong>Track durarion:</strong> 3:06 min</li>
          <li><strong>Track price:</strong> 1.29 USD</li>
        </ul>
      </div>
    </div>
  </div>
</div>
</section>`;
  });
}

// for (let i = 1; i < acc.length; i++) {
//   acc[i].addEventListener('click', function() {
//     this.classList.toggle('active');
//     let io = acc[i];
//     let icon = document.querySelector(`${io}`);
//     console.log(io);

//     if (this.classList.contains('active')) {
//       icon.innerText = '−';
//     } else {
//       icon.innerText = '+';
//     }
//     const panel = this.nextElementSibling;
//     if (panel.style.maxHeight) {
//       panel.style.maxHeight = null;
//     } else {
//       panel.style.maxHeight = panel.scrollHeight + 'px';
//     }
//   });
// }
