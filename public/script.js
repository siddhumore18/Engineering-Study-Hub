let menuIcon=document.querySelector(".menu-icon");
let sidebar=document.querySelector(".sidebar");
let container=document.querySelector(".container");

menuIcon.onclick =function(){
    sidebar.classList.toggle("small-sidebar");
    container.classList.toggle("large-container");
}

const container1 = document.getElementById("container");
const ragistation = document.getElementById("register");


// You can optionally add JavaScript code here if needed
// For example, to hide the loading animation after a certain delay:

let loadingText = document.getElementById('loading-text');

setTimeout(() => {
    loadingText.style.display='none';
}, 3000); // Hide after 6 seconds


// Selection part
document.addEventListener('DOMContentLoaded', function() {
  const select = document.getElementById('options');
  
  select.addEventListener('click', function() {
      const selectedOption = this.options[this.selectedIndex];
      const selectedValue = selectedOption.value;

      if (selectedValue) {
          if (selectedValue.startsWith('#')) {
              // It's an anchor link (same page)
              window.location.hash = selectedValue;
          } else if (selectedValue.startsWith('http')) {
              // It's an external link
              window.open(selectedValue, '_blank');
          } else {
              // It's a relative link
              window.location.href = selectedValue;
          }
          
          // Reset the select to the default option
          this.selectedIndex = 0;
      }
  });
});


// Animation part

let robot = document.getElementById("robot");
let particles = [];

function createParticles() {
    for (let i = 0; i < 20; i++) {
        let particle = document.createElement("div");
        particle.classList.add("particle");
        container1.appendChild(particle);

        particles.push(particle);
    }
}

function animateRobot() {
    robot.classList.toggle("moving");
}

function animateParticles() {
    particles.forEach((particle, index) => {
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;
        let z = Math.random() * 1000 - 500;
        let speed = Math.random() * 0.5 + 0.25;
        let directionX = Math.random() * 0.2 - 0.1;
        let directionY = Math.random() * 0.2 - 0.1;
        let directionZ = Math.random() * 0.2 - 0.1;
        
        gsap.to(particle.style, {
            x: x,
            y: y,
            z: z,
            duration: speed,
            ease: "linear",
            repeat: -1,
            onRepeat: function() {
                particle.style.transform = `rotateX(${directionX * 360}deg) rotateY(${directionY * 360}deg) rotateZ(${directionZ * 360}deg)`;
            }
        });
        
        gsap.to(particle.style, {
            opacity: 0,
            duration: 2,
            ease: "power1.inOut",
            repeat: -1
        });
        
        gsap.to(particle.style, {
            z: -1000,
            duration: 5,
            ease: "power1.inOut",
            repeat: -1
        });
        
        gsap.to(particle.style, {
            scale: 0,
            duration: 5,
            ease: "power1.inOut",
            repeat: -1
        });
        
        gsap.to(particle.style, {
            opacity: 0,
            duration: 5,
            ease: "power1.inOut",
            repeat: -1
        });
    
        gsap.to(particle.style, {
            x: x + Math.random() * 100 - 50,
            y: y + Math.random() * 100 - 50,
            z: z + Math.random() * 100 - 50,
            duration: 5,
            ease: "power1.inOut",
            repeat: -1
        });
    });
    
    gsap.to(robot.style, {
        scale: 1.1,
        duration: 0.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true
    });
}
    