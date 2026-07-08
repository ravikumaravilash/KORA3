/* ==========================================
   KORA GLOBAL ANIMATIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
    REVEAL ANIMATION
    ====================================== */

    const revealElements = document.querySelectorAll(

        ".reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger"

    );

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if(entry.isIntersecting){

                    entry.target.classList.add("active");

                }

            });

        },

        {

            threshold:0.15,

            rootMargin:"0px 0px -60px 0px"

        }

    );

    revealElements.forEach(element => {

        observer.observe(element);

    });

    /* ======================================
    FLOATING ELEMENTS
    ====================================== */

    document.querySelectorAll(".floating").forEach((item,index)=>{

        item.style.animationDelay=`${index*0.4}s`;

    });

    /* ======================================
    BUTTON RIPPLE
    ====================================== */

    document.querySelectorAll(".btn").forEach(button=>{

        button.addEventListener("click",function(e){

            const circle=document.createElement("span");

            const diameter=Math.max(

                this.clientWidth,

                this.clientHeight

            );

            const radius=diameter/2;

            circle.style.width=

            circle.style.height=

            `${diameter}px`;

            circle.style.left=

            `${e.clientX-this.getBoundingClientRect().left-radius}px`;

            circle.style.top=

            `${e.clientY-this.getBoundingClientRect().top-radius}px`;

            circle.classList.add("ripple");

            const ripple=this.querySelector(".ripple");

            if(ripple){

                ripple.remove();

            }

            this.appendChild(circle);

        });

    });

});