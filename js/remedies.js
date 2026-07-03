/* ======================================
   KORA Remedies
====================================== */

const remediesGrid = document.getElementById("remediesGrid");

const searchInput = document.getElementById("remedySearch");

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

        const response =
        await fetch("../data/remedies.json");

        remedies =
        await response.json();

        filteredRemedies = [...remedies];

        displayRemedies();

    }

    catch(error){

        console.error("Unable to load remedies:", error);

    }

}

loadRemedies();

/* ======================================
DISPLAY REMEDIES
====================================== */

function displayRemedies(){

    remediesGrid.innerHTML = "";

    const currentRemedies =

    filteredRemedies.slice(0, visibleRemedies);

    currentRemedies.forEach(remedy => {

        const card = document.createElement("div");

        card.className = "remedy-card";

        card.innerHTML = `

        <img
        src="${remedy.image}"
        alt="${remedy.name}">

        <div class="remedy-content">

            <h3>

                ${remedy.name}

            </h3>

            <p>

                ${remedy.description}

            </p>

            <a
            href="remedies-profile.html?id=${remedy.id}"
            class="btn btn-primary">

                View Remedy

            </a>

        </div>

        `;

        remediesGrid.appendChild(card);

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

    filteredRemedies = remedies.filter(remedy => {

        const matchesSearch =

            remedy.name.toLowerCase().includes(keyword) ||

            remedy.description.toLowerCase().includes(keyword);

        const matchesCategory =

            selectedCategory === "All" ||

            remedy.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    visibleRemedies = 12;

    displayRemedies();

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

        filteredRemedies = remedies.filter(remedy => {

            const matchesSearch =

                remedy.name.toLowerCase().includes(keyword) ||

                remedy.description.toLowerCase().includes(keyword);

            const matchesCategory =

                selectedCategory === "All" ||

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

loadMoreBtn.addEventListener("click", () => {

    visibleRemedies += 12;

    displayRemedies();

});

/* ======================================
SHOW / HIDE LOAD BUTTON
====================================== */

function updateLoadButton(){

    if(filteredRemedies.length <= visibleRemedies){

        loadMoreBtn.style.display = "none";

    }

    else{

        loadMoreBtn.style.display = "inline-flex";

    }

}

/* ======================================
EMPTY RESULTS
====================================== */

function showEmptyMessage(){

    remediesGrid.innerHTML = `

        <div class="no-results">

            <h2>

                No Remedies Found

            </h2>

            <p>

                Try another keyword or category.

            </p>

        </div>

    `;

}

/* ======================================
OVERRIDE DISPLAY FUNCTION
====================================== */

const oldDisplayRemedies = displayRemedies;

displayRemedies = function(){

    if(filteredRemedies.length === 0){

        showEmptyMessage();

        updateLoadButton();

        return;

    }

    remediesGrid.innerHTML = "";

    const currentRemedies =

    filteredRemedies.slice(0, visibleRemedies);

    currentRemedies.forEach(remedy => {

        const card = document.createElement("div");

        card.className = "remedy-card";

        card.innerHTML = `

        <img
        src="${remedy.image}"
        alt="${remedy.name}">

        <div class="remedy-content">

            <h3>

                ${remedy.name}

            </h3>

            <p>

                ${remedy.description}

            </p>

            <a
            href="remedies-profile.html?id=${remedy.id}"
            class="btn btn-primary">

                View Remedy

            </a>

        </div>

        `;

        remediesGrid.appendChild(card);

    });

    updateLoadButton();

};

/* ======================================
END OF FILE
====================================== */