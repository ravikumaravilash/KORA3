/* ==========================================
   KORA PLANT PROFILE
========================================== */

const params = new URLSearchParams(window.location.search);

const plantId = parseInt(params.get("id"));

let allPlants = [];

async function loadPlant() {

    try {

        const response = await fetch("data/plants.json");

        allPlants = await response.json();

        const plant = allPlants.find(

            item => item.id === plantId

        );

        if (!plant) {

            document.body.innerHTML = `

            <div style="padding:120px;text-align:center;color:white;">

                <h1>Plant Not Found</h1>

            </div>

            `;

            return;

        }

        populateHero(plant);

        populateFacts(plant);

        populateAbout(plant);

        populateBenefits(plant);

        populateUses(plant);

        populatePreparation(plant);

        populateResearch(plant);

        populateHabitat(plant);

        populateGallery(plant);

        populateFact(plant);

        populatePrecautions(plant);

        populateRelatedPlants(plant);

    }

    catch(error){

        console.error(error);

    }

}

loadPlant();

/* ==========================================
HERO
========================================== */

function populateHero(plant){

    document.title =

    `${plant.name} | KORA`;

    document.getElementById("plantName").textContent =

    plant.name;

    document.getElementById("botanicalName").textContent =

    plant.botanical;

    document.getElementById("family").textContent =

    plant.family;

    document.getElementById("origin").textContent =

    plant.origin;

    document.getElementById("category").textContent =

    plant.category;

    document.getElementById("plantImage").src =

    plant.image;

}

/* ==========================================
QUICK FACTS
========================================== */

function populateFacts(plant){

    document.getElementById("familyFact").textContent =

    plant.family;

    document.getElementById("habitat").textContent =

    plant.habitat;

    document.getElementById("categoryFact").textContent =

    plant.category;

    document.getElementById("partsUsed").textContent =

    plant.partsUsed.join(", ");

}

/* ==========================================
ABOUT
========================================== */

function populateAbout(plant){

    document.getElementById("description").textContent =

    plant.description;

}
/* ==========================================
HEALTH BENEFITS
========================================== */

function populateBenefits(plant){

    const grid = document.getElementById("benefitsGrid");

    grid.innerHTML = "";

    plant.benefits.forEach(benefit=>{

        grid.innerHTML += `

        <div class="benefit-card reveal">

            <h3>

                ✓ ${benefit}

            </h3>

            <p>

                ${benefit} is one of the traditional wellness properties associated with ${plant.name} in Ayurvedic literature.

            </p>

        </div>

        `;

    });

}

/* ==========================================
TRADITIONAL USES
========================================== */

function populateUses(plant){

    const timeline = document.getElementById("usesTimeline");

    timeline.innerHTML = "";

    plant.uses.forEach(use=>{

        timeline.innerHTML += `

        <div class="timeline-item reveal">

            <h3>

                ${use}

            </h3>

            <p>

                ${plant.name} has traditionally been used in Ayurveda to support ${use.toLowerCase()}.

            </p>

        </div>

        `;

    });

}

/* ==========================================
PREPARATION METHODS
========================================== */

function populatePreparation(plant){

    const grid = document.getElementById("preparationGrid");

    grid.innerHTML = "";

    plant.preparation.forEach(method=>{

        grid.innerHTML += `

        <div class="prep-card reveal">

            <i>🌿</i>

            <h3>

                ${method}

            </h3>

            <p>

                Traditional preparation method.

            </p>

        </div>

        `;

    });

}

/* ==========================================
RESEARCH
========================================== */

function populateResearch(plant){

    document.getElementById("research").textContent =

    plant.research;

}

/* ==========================================
HABITAT
========================================== */

function populateHabitat(plant){

    document.getElementById("habitatDescription").textContent =

    plant.habitat;

    document.getElementById("habitatImage").src =

    plant.image;

}
/* ==========================================
GALLERY
========================================== */

function populateGallery(plant){

    const gallery = document.getElementById("galleryGrid");

    gallery.innerHTML = "";

    plant.gallery.forEach(image=>{

        gallery.innerHTML += `

        <img
            src="${image}"
            alt="${plant.name}"
            class="gallery-image">

        `;

    });

    enableGalleryLightbox();

}

/* ==========================================
INTERESTING FACT
========================================== */

function populateFact(plant){

    document.getElementById("interestingFact").textContent =

    plant.interestingFact;

}

/* ==========================================
PRECAUTIONS
========================================== */

function populatePrecautions(plant){

    document.getElementById("precautions").textContent =

    plant.precautions;

}

/* ==========================================
RELATED PLANTS
========================================== */

function populateRelatedPlants(currentPlant){

    const grid = document.getElementById("relatedPlants");

    grid.innerHTML = "";

    const related = allPlants.filter(plant =>

        plant.category === currentPlant.category &&

        plant.id !== currentPlant.id

    ).slice(0,4);

    related.forEach(plant=>{

        grid.innerHTML += `

        <div class="related-card reveal">

            <img
                src="${plant.image}"
                alt="${plant.name}">

            <div class="related-card-content">

                <h3>

                    ${plant.name}

                </h3>

                <p>

                    ${plant.botanical}

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
GALLERY LIGHTBOX
========================================== */

function enableGalleryLightbox(){

    const images = document.querySelectorAll(".gallery-image");

    images.forEach(image=>{

        image.addEventListener("click",()=>{

            const overlay = document.createElement("div");

            overlay.className = "lightbox";

            overlay.innerHTML = `

            <div class="lightbox-content">

                <img src="${image.src}">

                <span class="close-lightbox">

                    ×

                </span>

            </div>

            `;

            document.body.appendChild(overlay);

            overlay.querySelector(".close-lightbox")

            .addEventListener("click",()=>{

                overlay.remove();

            });

            overlay.addEventListener("click",(e)=>{

                if(e.target===overlay){

                    overlay.remove();

                }

            });

        });

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