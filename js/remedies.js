/* ======================================
   KORA REMEDIES
====================================== */

const remediesGrid =
document.getElementById("remediesGrid");

const searchInput =
document.getElementById("remedySearch");

const categoryButtons =
document.querySelectorAll(".category-btn");

const loadMoreBtn =
document.getElementById("loadMoreBtn");

let remedies = [];

let filteredRemedies = [];

let visibleRemedies = 12;

let selectedCategory = "All";

/* ======================================
LOAD JSON
====================================== */

async function loadRemedies(){

    try{

        const response = await fetch("../data/remedies.json");

        remedies = await response.json();

        filteredRemedies = [...remedies];

        displayRemedies();

    }

    catch(error){

        console.error(error);

    }

}

loadRemedies();
/* ======================================
DISPLAY REMEDIES
====================================== */

function displayRemedies(){

    remediesGrid.innerHTML = "";

    const visible = filteredRemedies.slice(0, visibleRemedies);

    if(visible.length === 0){

        remediesGrid.innerHTML = `

        <div class="no-results">

            <div class="no-results-icon">🌿</div>

            <h2>No Remedies Found</h2>

            <p>
                Try searching with another keyword
                or choose another category.
            </p>

        </div>

        `;

        loadMoreBtn.style.display = "none";

        return;

    }

    visible.forEach(remedy=>{

        remediesGrid.innerHTML += `

        <div class="remedy-card reveal">

            <img
            src="../${remedy.image}"
            alt="${remedy.name}">

            <div class="remedy-content">

                <span class="remedy-category">

                    ${remedy.category}

                </span>

                <h3>${remedy.name}</h3>

                <p>${remedy.description}</p>

                <div class="remedy-tags">

                    ${remedy.ingredients.map(i=>`

                    <span>${i}</span>

                    `).join("")}

                </div>

                <a
                href="remedy-profile.html?id=${remedy.id}"
                class="btn btn-primary">

                Learn More

                </a>

            </div>

        </div>

        `;

    });

    if(visibleRemedies >= filteredRemedies.length){

        loadMoreBtn.style.display = "none";

    }

    else{

        loadMoreBtn.style.display = "inline-flex";

    }

}
/* ======================================
SEARCH
====================================== */

searchInput.addEventListener("input",()=>{

    const query =
    searchInput.value.toLowerCase();

    filteredRemedies = remedies.filter(remedy=>{

        const matchesSearch =

            remedy.name
            .toLowerCase()
            .includes(query)

            ||

            remedy.description
            .toLowerCase()
            .includes(query)

            ||

            remedy.ingredients
            .join(" ")
            .toLowerCase()
            .includes(query);

        const matchesCategory =

            selectedCategory === "All"

            ||

            remedy.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    visibleRemedies = 12;

    displayRemedies();

});

/* ======================================
CATEGORY FILTER
====================================== */

categoryButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        categoryButtons.forEach(btn=>{

            btn.classList.remove("active");

        });

        button.classList.add("active");

        selectedCategory =
        button.dataset.category;

        const query =
        searchInput.value.toLowerCase();

        filteredRemedies = remedies.filter(remedy=>{

            const matchesSearch =

                remedy.name
                .toLowerCase()
                .includes(query)

                ||

                remedy.description
                .toLowerCase()
                .includes(query)

                ||

                remedy.ingredients
                .join(" ")
                .toLowerCase()
                .includes(query);

            const matchesCategory =

                selectedCategory === "All"

                ||

                remedy.category === selectedCategory;

            return matchesSearch && matchesCategory;

        });

        visibleRemedies = 12;

        displayRemedies();

    });

});

/* ======================================
LOAD MORE
====================================== */

loadMoreBtn.addEventListener("click",()=>{

    visibleRemedies += 12;

    displayRemedies();

});