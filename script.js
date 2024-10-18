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

const loadingText = document.getElementById('loading-text');

setTimeout(() => {
  loadingText.style.display = 'none';
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