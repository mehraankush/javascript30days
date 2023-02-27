const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
           
const cities =[];
const prop = fetch(endpoint)
             .then(blob => blob.json())
             .then(data => cities.push(...data))
   
 function findMatches(wordToMatch, cities) {

    return cities.filter(place => {
      // here we need to figure out if the city or state matches what was searched
      const regex = new RegExp(wordToMatch, 'gi');
      return (place.city.match(regex) || place.state.match(regex))
    });
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }


function displayMathches(){
  const matchedArray = findMatches(this.value,cities);
//   console.log(matchedArray);
 const matched =  matchedArray.map(place => {

   const regex = new RegExp(this.value, 'gi');
   const cityName = place.city.replace(regex,`<span class="hl">${this.value}</span>`)
   const stateName = place.city.replace(regex,`<span class="hl">${this.value}</span>`)

    return `
       <li>
         <span class='name'>${cityName}, ${stateName}</span>
         <span class='population'>${numberWithCommas(place.population)}</span>
       </li>
    `;
  }).join(' ');

  suggestionsList.innerHTML = matched;
}

const SearchInput = document.querySelector('.search')
const suggestionsList = document.querySelector('.suggestions')
SearchInput.addEventListener('change', displayMathches)
SearchInput.addEventListener('keyup', displayMathches)
