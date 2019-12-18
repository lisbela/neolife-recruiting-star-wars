const btn = document.getElementById("btn");
const div = document.getElementById("planet");
const filmsList = document.getElementById("films");
const residentsList = document.getElementById("residents");
const loading = `
  <div class="loader loader--style4" title="3">
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     width="24px" height="24px" viewBox="0 0 24 24" style="enable-background:new 0 0 50 50;" xml:space="preserve">
    <rect x="0" y="0" width="4" height="7" fill="#333">
      <animateTransform  attributeType="xml"
        attributeName="transform" type="scale"
        values="1,1; 1,3; 1,1"
        begin="0s" dur="0.6s" repeatCount="indefinite" />       
    </rect>

    <rect x="10" y="0" width="4" height="7" fill="#333">
      <animateTransform  attributeType="xml"
        attributeName="transform" type="scale"
        values="1,1; 1,3; 1,1"
        begin="0.2s" dur="0.6s" repeatCount="indefinite" />       
    </rect>
    <rect x="20" y="0" width="4" height="7" fill="#333">
      <animateTransform  attributeType="xml"
        attributeName="transform" type="scale"
        values="1,1; 1,3; 1,1"
        begin="0.4s" dur="0.6s" repeatCount="indefinite" />       
    </rect>
  </svg>
</div>

  `;

btn.addEventListener("click", () => {
  planet.innerHTML = loading;
  filmsList.innerHTML = "";
  residentsList.innerHTML = "";
  planets().then(response => {
  fillScreen(response.planet, response.population, response.rotation_period, response.orbital_period, response.diameter, response.gravity, response.terrain, response.surface_water, response.climate);
  });
});


async function planets() {
  let fetchPlanets = await fetch("https://swapi.co/api/planets/");
  let response1 = await fetchPlanets.json();
  let random = Math.ceil(Math.random() * response1.count);
  let fetchPlanet = await fetch("https://swapi.co/api/planets/" + random);
  let response2 = await fetchPlanet.json();
  let films = await [];
  if (response2.films.length == 0) {
    filmsList.innerHTML = `<ul>
                            <ul><h2>Filmes:</h2></ul> 
                            <ul>None</ul></ul>`;
  }
  response2.films.forEach(async function(currentValue) {
    let fetchFilms = await fetch(currentValue);
    let response = await fetchFilms.json();
    films.push(response.title);
    films.forEach(currentValue => {
      currentValue = " " + currentValue;
    });
    filmsList.innerHTML =  `<ul>
                            <ul><h2>Filmes:</h2></ul>
                            <ul>- ${films.join(" <br>- ")}</ul
                            </ul>`;
  });
  
  let residents = await [];
  if (response2.residents.length == 0) {
    residentsList.innerHTML =  `<ul>
                                <ul><h2>Habitantes:</h2></ul> 
                                <ul>None</ul>
                                </ul>`;
  }
  response2.residents.forEach(async function(currentValue) {
    let fetchResidents = await fetch(currentValue);
    let response = await fetchResidents.json();
    residents.push(response.name);
    residents.forEach(currentValue => {
      currentValue = " " + currentValue;
    });
    residentsList.innerHTML =  `<ul>
                                <ul><h2>Habitantes:</h2></ul>
                                <ul>- ${residents.join(" <br>- ")}</ul>
                                </ul>`;
  });
  
  
  return {
    planet: response2.name,
    population: response2.population,
    rotation_period: response2.rotation_period,
    orbital_period: response2.orbital_period,
    diameter: response2.diameter,
    gravity: response2.gravity,
    terrain: response2.terrain,
    surface_water:response2.surface_water,
    climate: response2.climate,
    residents: response2.residents,
    films: response2.films
  };
}

function fillScreen(name, population, rotation_period, orbital_period, diameter, gravity, terrain, surface_water, climate) {
  div.innerHTML = `<ul>
     <ul><b><h1>${name}</h1></b></ul>
     <ul><b>POPULATION:</b> ${population}</ul>
     <ul><b>ROTATION PERIOD:</b> ${rotation_period} DAYS</ul>
     <ul><b>ORBITAL PERIOD:</b> ${orbital_period} DAYS</ul>
     <ul><b>DIAMETER:</b> ${diameter} KM</ul>
     <ul><b>GRAVITY:</b> ${gravity} STANDARD</ul>
     <ul><b>TERRAIN:</b> ${terrain}</ul>
     <ul><b>SURFACE WATER:</b> ${surface_water}%</ul>
     <ul><b>CLIMATE:</b> ${climate}</ul>


     </ul>
    `;
  
}



 