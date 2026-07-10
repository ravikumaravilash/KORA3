/* ==========================================
   KORA REMEDIES
========================================== */

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

let visibleRemedies = 9;

let selectedCategory = "All";

/* ==========================================
LOAD REMEDIES
========================================== */

async function loadRemedies(){

    try{

        const response =
        await fetch("data/remedies.json");

        remedies =
        await response.json();

        filteredRemedies = [...remedies];

        displayRemedies();

    }

    catch(error){

        console.error(

        "Unable to load remedies",

        error

        );

    }

}

loadRemedies();

/* ==========================================
DISPLAY REMEDIES
========================================== */

function displayRemedies(){

    remediesGrid.innerHTML = "";

    const currentRemedies =

    filteredRemedies.slice(

    0,

    visibleRemedies

    );

    currentRemedies.forEach(remedy=>{

        const card =

        document.createElement("div");

        card.className="remedy-card reveal";

        card.innerHTML=`

        <img

        src="${remedy.image}"

        alt="${remedy.name}">

        <div class="remedy-content">

            <span class="remedy-category">

                ${remedy.category}

            </span>

            <h3>

                ${remedy.name}

            </h3>

            <p>

                ${remedy.description}

            </p>

            <div class="remedy-tags">

                ${remedy.ingredients
                .slice(0,3)
                .map(item=>`

                <span>

                    ${item}

                </span>

                `).join("")}

            </div>

            <a

            href="pages/remedy-profile.html?id=${remedy.id}"

            class="btn btn-primary">

                Learn More

            </a>

        </div>

        `;

        remediesGrid.appendChild(card);

    });

    updateLoadButton();

}
/* ==========================================
LIVE SEARCH
========================================== */

searchInput.addEventListener("input",()=>{

    const keyword =

    searchInput.value
    .toLowerCase()
    .trim();

    filteredRemedies =

    remedies.filter(remedy=>{

        const matchesSearch =

        remedy.name.toLowerCase().includes(keyword)||

        remedy.description.toLowerCase().includes(keyword)||

        remedy.ingredients.some(item=>

            item.toLowerCase().includes(keyword)

        );

        const matchesCategory =

        selectedCategory==="All"||

        remedy.category===selectedCategory;

        return matchesSearch && matchesCategory;

    });

    visibleRemedies = 9;

    displayRemedies();

});

/* ==========================================
CATEGORY FILTER
========================================== */

categoryButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        categoryButtons.forEach(btn=>

            btn.classList.remove("active")

        );

        button.classList.add("active");

        selectedCategory=

        button.dataset.category;

        const keyword=

        searchInput.value
        .toLowerCase()
        .trim();

        filteredRemedies=

        remedies.filter(remedy=>{

            const matchesSearch=

            remedy.name.toLowerCase().includes(keyword)||

            remedy.description.toLowerCase().includes(keyword)||

            remedy.ingredients.some(item=>

                item.toLowerCase().includes(keyword)

            );

            const matchesCategory=

            selectedCategory==="All"||

            remedy.category===selectedCategory;

            return matchesSearch && matchesCategory;

        });

        visibleRemedies=9;

        displayRemedies();

    });

});

/* ==========================================
LOAD MORE
========================================== */

loadMoreBtn.addEventListener("click",()=>{

    visibleRemedies += 9;

    displayRemedies();

});

/* ==========================================
UPDATE BUTTON
========================================== */

function updateLoadButton(){

    if(filteredRemedies.length<=visibleRemedies){

        loadMoreBtn.style.display="none";

    }

    else{

        loadMoreBtn.style.display="inline-flex";

    }

}
/* ==========================================
EMPTY RESULTS
========================================== */

function showEmptyMessage(){

    remediesGrid.innerHTML = `

    <div class="no-results reveal">

        <div class="no-results-icon">

            🌿

        </div>

        <h2>

            No Remedies Found

        </h2>

        <p>

            Try another search keyword or choose a different category.

        </p>

        <button

        class="btn btn-primary"

        id="resetSearch">

            Reset Search

        </button>

    </div>

    `;

    document

    .getElementById("resetSearch")

    .addEventListener("click",()=>{

        searchInput.value="";

        selectedCategory="All";

        categoryButtons.forEach(btn=>

            btn.classList.remove("active")

        );

        categoryButtons[0].classList.add("active");

        filteredRemedies=[...remedies];

        visibleRemedies=9;

        displayRemedies();

    });

}

/* ==========================================
DISPLAY OVERRIDE
========================================== */

const originalDisplayRemedies = displayRemedies;

displayRemedies = function(){

    if(filteredRemedies.length===0){

        showEmptyMessage();

        loadMoreBtn.style.display="none";

        return;

    }

    originalDisplayRemedies();

    animateCards();

}

/* ==========================================
CARD ANIMATION
========================================== */

function animateCards(){

    const cards =

    document.querySelectorAll(".remedy-card");

    cards.forEach((card,index)=>{

        card.style.opacity="0";

        card.style.transform="translateY(30px)";

        setTimeout(()=>{

            card.style.transition=

            ".45s ease";

            card.style.opacity="1";

            card.style.transform=

            "translateY(0px)";

        },index*80);

    });

}

/* ==========================================
LOAD MORE SCROLL
========================================== */

loadMoreBtn.addEventListener("click",()=>{

    setTimeout(()=>{

        loadMoreBtn.scrollIntoView({

            behavior:"smooth",

            block:"center"

        });

    },200);

});

/* ==========================================
COUNTER ANIMATION
========================================== */

document.querySelectorAll(".counter")

.forEach(counter=>{

    const target=

    Number(counter.dataset.target);

    let count=0;

    const speed=target/80;

    function update(){

        count+=speed;

        if(count<target){

            counter.innerText=

            Math.floor(count);

            requestAnimationFrame(update);

        }

        else{

            counter.innerText=target;

        }

    }

    update();

});

/* ==========================================
END OF FILE
========================================== */