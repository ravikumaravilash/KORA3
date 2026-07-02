/*=========================================
KORA COUNTER ANIMATION
=========================================*/

const counters = document.querySelectorAll("[data-target]");

const speed = 200;

const startCounter = (counter) => {

    const target = parseInt(counter.getAttribute("data-target"));

    const update = () => {

        const current = parseInt(counter.innerText);

        const increment = Math.ceil(target / speed);

        if(current < target){

            counter.innerText = Math.min(current + increment, target);

            requestAnimationFrame(update);

        }else{

            counter.innerText = target;

        }

    };

    update();

};

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            startCounter(entry.target);

            observer.unobserve(entry.target);

        }

    });

},{

    threshold:0.4

});

counters.forEach(counter=>{

    counter.innerText="0";

    observer.observe(counter);

});