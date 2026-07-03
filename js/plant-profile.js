/* ==========================================
KORA Plant Profile
========================================== */

const params = new URLSearchParams(window.location.search);

const plantID = Number(params.get("id"));

let plants = [];

/* ==========================================
LOAD JSON
========================================== */

async function loadPlantData(){

    try{

        const response =
        await fetch("../data/plants.json");

        plants =
        await response.json();

        const plant =
        plants.find(p => p.id === plantID);

        if(!plant){

            document.getElementById("plantContent").innerHTML=`

            <div class="info-card">

                <h2>

                    Plant Not Found

                </h2>

                <p>

                    The requested medicinal plant
                    could not be found.

                </p>

            </div>

            `;

            return;

        }

        loadHero(plant);

        loadInformation(plant);

        loadRelatedPlants(plant);

    }

    catch(error){

        console.error(error);

    }

}

loadPlantData();

/* ==========================================
HERO
========================================== */

function loadHero(plant){

document.getElementById("plantHero").innerHTML=`

<div class="plant-image">

<img

src="${plant.image}"

alt="${plant.name}">

</div>

<div class="plant-details">

<h1>

${plant.name}

</h1>

<p class="botanical">

${plant.botanical}

</p>

<p class="description">

${plant.description}

</p>

<div class="tag-container">

<span class="tag">

${plant.category}

</span>

<span class="tag">

Medicinal Plant

</span>

<span class="tag">

Ayurveda

</span>

</div>

</div>

`;

}
/* ==========================================
PLANT INFORMATION
========================================== */

function loadInformation(plant){

document.getElementById("plantContent").innerHTML=`

<div class="info-grid">

<div class="info-card">

<h2>

Scientific Classification

</h2>

<p>

<strong>Common Name:</strong> ${plant.name}

</p>

<p>

<strong>Botanical Name:</strong> ${plant.botanical}

</p>

<p>

<strong>Scientific Name:</strong> ${plant.scientificName || "Coming Soon"}

</p>

<p>

<strong>Family:</strong> ${plant.family || "Coming Soon"}

</p>

<p>

<strong>Origin:</strong> ${plant.origin || "Coming Soon"}

</p>

</div>

<div class="info-card">

<h2>

Medicinal Uses

</h2>

<p>

${plant.medicinalUses || plant.uses}

</p>

</div>

<div class="info-card">

<h2>

Parts Used

</h2>

<p>

${plant.partsUsed || "Information will be updated."}

</p>

</div>

<div class="info-card">

<h2>

Active Compounds

</h2>

<p>

${plant.activeCompounds || "Information will be updated."}

</p>

</div>

<div class="info-card">

<h2>

Traditional Ayurvedic Uses

</h2>

<p>

${plant.ayurvedicUses || "Information will be updated."}

</p>

</div>

<div class="info-card">

<h2>

Modern Scientific Research

</h2>

<p>

${plant.research || "Current scientific studies and verified references will be added here."}

</p>

</div>

<div class="info-card">

<h2>

Safety & Precautions

</h2>

<p>

${plant.precautions || "Consult a qualified healthcare professional before using medicinal plants."}

</p>

</div>

<div class="info-card">

<h2>

Interesting Facts

</h2>

<p>

${plant.facts || "Additional botanical facts will be added in future updates."}

</p>

</div>

</div>

`;

}
/* ==========================================
RELATED PLANTS
========================================== */

function loadRelatedPlants(currentPlant){

    const related = plants

        .filter(plant =>

            plant.category === currentPlant.category &&

            plant.id !== currentPlant.id

        )

        .slice(0,3);

    const container =

    document.getElementById("relatedPlants");

    container.innerHTML="";

    related.forEach(plant=>{

        container.innerHTML += `

        <div class="related-card">

            <img

            src="${plant.image}"

            alt="${plant.name}">

            <div class="related-content">

                <h3>

                    ${plant.name}

                </h3>

                <p>

                    ${plant.uses}

                </p>

                <a

                href="plants-profile.html?id=${plant.id}"

                class="btn btn-primary">

                    View Plant

                </a>

            </div>

        </div>

        `;

    });

}

/* ==========================================
SCROLL TO TOP
========================================== */

window.scrollTo({

    top:0,

    behavior:"smooth"

});

/* ==========================================
END OF FILE
========================================== */