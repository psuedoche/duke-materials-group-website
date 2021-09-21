/*
Main Javascript for all pages. Adds the top navigation menu, mobile navigation, and footer
*/

let menu = 
  '<div class="menu-item site-branding">' +
    '<a href = "index.html"><img id = "header-logo" src = "media/logo.svg"></a>' +
  '</div>' +
  '<div class = "menu-item">' +
    '<a href="about.html">About</a>' +
  '</div>' +
  '<div class = "menu-item">' +
    '<a href="research.html" class = "dropdown">Research</a>' +
  '</div>' +    
  '<div class = "menu-item">' +
    '<a href="publications.html">Publications</a>' +
  '</div>' +
  '<div class = "menu-item">' +
    '<a href="people.html">People</a>' +
  '</div>' +
  '<div class = "menu-item">' +
    '<a href="courses.html">Courses</a>' +
  '</div>' +
  '<div class = "menu-item">' +
    '<a href="aflow.html">AFLOW</a>' +
  '</div>' +
  '<div class = "menu-item">' +
    '<a href="contact.html">Contact</a>' +
  '</div>';

document.getElementById("top-menu").innerHTML = menu;

// side nav on mobile 
let mobile_menu = 
  '<div id="mobile-sticky-header"></div>' + 
  '<input type="checkbox" id="menu-toggle">' + 
  '<label for="menu-toggle" class="menu-icon">' + 
    '<div id="menu-bars">' +
      '<div class="menu-bar"></div>' +
      '<div class="menu-bar"></div>' +
      '<div class="menu-bar"></div>' +
    '</div>' +
  '</label>' + 
  '<a href="index.html" id="mobile-header-logo">' +
    '<img src="media/logo.svg">' + 
  '</a>';

document.getElementById("top-menu").insertAdjacentHTML('beforebegin', mobile_menu + '<div id = "mobile-menu">' + menu + '</div>');

// top menu dissappear and appear on-scroll animation
dissappearingHeader();

// build footer
let footer = '<a href = ""><img src = "media/logo.svg"></a><p>Duke University, 144 Hudson Hall, Box 90300, Durham NC 27708</p><br><a href = "contact.html" class = "nav-btn">Contact Us</a>'; 

document.getElementById("footer").innerHTML = footer; 

function dissappearingHeader() {
  let lastScroll = 0;
  let body =  document.getElementById("top-menu");
  if(window.innerWidth <= 500 || window.innerHeight >= 1000) {
    return; 
  }
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      body.classList.remove("scroll-up");
      return;
    }
    if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
      // scroll down
      body.classList.remove("scroll-up");
      body.classList.add("scroll-down");
    }
    else if (currentScroll < lastScroll && body.classList.contains("scroll-down")) {
      // scroll up
      body.classList.remove("scroll-down");
      body.classList.add("scroll-up");
    }
    lastScroll = currentScroll; 
    });
}
