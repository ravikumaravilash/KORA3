/* ======================================
   KORA Medicinal Plants
====================================== */

const plantsGrid = document.getElementById("plantsGrid");

const searchInput = document.getElementById("plantSearch");

const categoryButtons =
document.querySelectorAll(".category-btn");

const loadMoreBtn =
document.getElementById("loadMoreBtn");

let plants=[];

let filteredPlants=[];

let visiblePlants=12;

let selectedCategory="All";

/* ======================================
LOAD JSON
====================================== */

async function loadPlants(){

try{

const response=
await fetch("../data/plants.json");

plants=await response.json();

filteredPlants=[...plants];

displayPlants();

}

catch(error){

console.error(error);

}

}

loadPlants();

/* ======================================
DISPLAY
====================================== */

function displayPlants(){

plantsGrid.innerHTML="";

const currentPlants=
filteredPlants.slice(0,visiblePlants);

currentPlants.forEach(plant=>{

const card=document.createElement("div");

card.className="plant-card";

card.innerHTML=`

<img
src="${plant.image}"
alt="${plant.name}">

<div class="plant-content">

<h3>

${plant.name}

</h3>

<p class="botanical">

${plant.botanical}

</p>

<p>

${plant.uses}

</p>

<a

href="plants-profile.html?id=${plant.id}"

class="btn btn-primary">

View Details

</a>

</div>

`;

plantsGrid.appendChild(card);

});

updateLoadButton();

}
/* ======================================
LIVE SEARCH
====================================== */

searchInput.addEventListener("input", () => {

    const keyword = searchInput.value
        .toLowerCase()
        .trim();

    filteredPlants = plants.filter(plant => {

        const matchesSearch =

            plant.name.toLowerCase().includes(keyword) ||

            plant.botanical.toLowerCase().includes(keyword);

        const matchesCategory =

            selectedCategory === "All" ||

            plant.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    visiblePlants = 12;

    displayPlants();

});

/* ======================================
CATEGORY FILTER
====================================== */

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn =>

            btn.classList.remove("active")

        );

        button.classList.add("active");

        selectedCategory =

            button.dataset.category;

        const keyword = searchInput.value
            .toLowerCase()
            .trim();

        filteredPlants = plants.filter(plant => {

            const matchesSearch =

                plant.name.toLowerCase().includes(keyword) ||

                plant.botanical.toLowerCase().includes(keyword);

            const matchesCategory =

                selectedCategory === "All" ||

                plant.category === selectedCategory;

            return matchesSearch && matchesCategory;

        });

        visiblePlants = 12;

        displayPlants();

    });

});
/* ======================================
LOAD MORE
====================================== */

loadMoreBtn.addEventListener("click", () => {

    visiblePlants += 12;

    displayPlants();

});

/* ======================================
SHOW / HIDE LOAD BUTTON
====================================== */

function updateLoadButton(){

    if(filteredPlants.length <= visiblePlants){

        loadMoreBtn.style.display = "none";

    }

    else{

        loadMoreBtn.style.display = "inline-flex";

    }

}

/* ======================================
EMPTY RESULT MESSAGE
====================================== */

function showEmptyMessage(){

    plantsGrid.innerHTML = `

        <div class="no-results">

            <h2>

                No Plants Found

            </h2>

            <p>

                Try a different search term or category.

            </p>

        </div>

    `;

}

/* ======================================
OVERRIDE DISPLAY FUNCTION
====================================== */

const oldDisplayPlants = displayPlants;

displayPlants = function(){

    if(filteredPlants.length===0){

        showEmptyMessage();

        updateLoadButton();

        return;

    }

    plantsGrid.innerHTML="";

    const currentPlants=

    filteredPlants.slice(0,visiblePlants);

    currentPlants.forEach(plant=>{

        const card=document.createElement("div");

        card.className="plant-card";

        card.innerHTML=`

        <img src="${plant.image}"

        alt="${plant.name}">

        <div class="plant-content">

            <h3>${plant.name}</h3>

            <p class="botanical">

            ${plant.botanical}

            </p>

            <p>

            ${plant.uses}

            </p>

            <a

            href="plants-profile.html?id=${plant.id}"

            class="btn btn-primary">

            View Details

            </a>

        </div>

        `;

        plantsGrid.appendChild(card);

    });

    updateLoadButton();

};

/* ======================================
END
====================================== */