const grid = document.getElementById("plantsGrid");

let plants = [];

fetch("../data/plants.json")

.then(response => response.json())

.then(data => {

plants = data;

displayPlants(plants);

});

function displayPlants(data){

grid.innerHTML = "";

data.forEach(plant=>{

grid.innerHTML += `

<div class="plant-card">

<img src="${plant.image}" alt="${plant.name}">

<div class="plant-content">

<h3>${plant.name}</h3>

<p class="botanical">

${plant.botanical}

</p>

<p>

${plant.uses}

</p>

<a href="${plant.page}"

class="btn btn-primary">

Learn More

</a>

</div>

</div>

`;

});

}

const search = document.getElementById("plantSearch");

search.addEventListener("keyup",()=>{

const value = search.value.toLowerCase();

const filtered = plants.filter(plant=>

plant.name.toLowerCase().includes(value) ||

plant.botanical.toLowerCase().includes(value)

);

displayPlants(filtered);

});