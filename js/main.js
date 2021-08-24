// dynamically adds the top navigation to every page

let menu = 
  "<div class='menu-item site-branding'>" +
    "<a href = 'index.html'><img id = 'header-logo' src = 'media/logo.svg'></a>" +
  "</div>" +
  "<div class = 'menu-item'>" +
    "<a href='about.html'>About</a>" +
  "</div>" +
  "<div class = 'menu-item dropdown'>" +
    "<a href='research.html' class = 'dropdown'>Research</a>" +

  "</div>" +    
  "<div class = 'menu-item'>" +
    "<a href='publications.html'>Publications</a>" +
  "</div>" +
  "<div class = 'menu-item'>" +
    "<a href='people.html'>People</a>" +
  "</div>" +
  "<div class = 'menu-item'>" +
    "<a href='aflow.html'>AFLOW</a>" +
  "</div>" +
  "<div class = 'menu-item'>" +
    "<a href='contact.html'>Contact</a>" +
  "</div>"; 
  document.getElementById("top-menu").innerHTML = menu;
  document.getElementById("top-menu").insertAdjacentHTML('beforebegin', '<div id = "mobile-menu">' + menu + '</div>');

function headerBehavior() {
  var lastScroll = 0;
  var body =  document.getElementById("top-menu");
  if(window.innerWidth <= 500) {
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
    })
}

headerBehavior(); 

let footer = '<a href = ""><img src = "media/logo.svg"></a><p>Duke University, 144 Hudson Hall, Box 90300, Durham NC 27708</p><br><a href = "contact.html" class = "nav-btn">Contact Us</a>'; 

document.getElementById("footer").innerHTML = footer; 
