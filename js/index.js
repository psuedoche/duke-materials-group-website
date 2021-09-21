/* 
Javascript for Homepage that loads the positions, slides, research, and recent publications
*/

/*
-------------------------------------------------------------------------------
                         Open Positions
-------------------------------------------------------------------------------
*/

let positions =[]; // object declared in open_positions.js
let types = Object.keys(open_positions);
for(let i = 0; i < 3; i++) {
  if(open_positions[types[i]].length != 0) {
    positions.push(Object.keys(open_positions)[i]);
  }
}
// if open positions object is empty, do not display open positions message
if (positions.length == 0) {
  homepage_positions.style.display = 'none';
}
let homepage_positions = document.getElementById('open-positions'); 
let content = '<h1>JOBS</h1><p> The Curtarolo Materials Group currently has open '; 
// string formatting for types of open positions
if (positions.length == 1) {
  content += positions[0]; 
}
else if (positions.length == 2) {
  content += positions[0] + ' and ' + positions[1];
}
else {
  for(p in positions) {
    if(p == positions.length - 1) {
      content += ' and ' + positions[p]; 
    }
    else {
      content += positions[p] + ', '; 
    }
  }
}
content += ' positions.</p>' +
'<div class="buttons-container">' +
    '<a href="about.html#open-positions" type="button" class="nav-btn">See All Openings &#10095;</a><br>' + 
'</div>';
homepage_positions.insertAdjacentHTML('afterbegin', content); 
/*
-------------------------------------------------------------------------------
                         Slides
-------------------------------------------------------------------------------
*/

let slideShow = "";
// array that shows slide order in slide_data.js
for(let i = 0; i < slide_order.length; i++) {
  let slide = slide_order[i];
  slideShow += 
  '<div id = "slide-' + i + '" class = "slide' +
  ((i == 0)?' active" style = "display:flex;">':'">') + // only display the first slide
    '<h2>' + slide_data[slide].title + '</h2>' +
    '<div class = "slide-content">' +
      '<p class = "content-text">' + 
        slide_data[slide].content +
      '</p>' +
      ((slide_data[slide].nav_link)?'<a target = "__blank" href = "' + slide_data[slide].nav_link + '" type = "button" class = "nav-btn second-btn">Learn More &#10095;</a><br>':'') +
    '</div>' +
  '</div>';
}

slideShow += 
  '<a class="nav-arrow" id = "previous-arrow">' +
    '&#10094;' + //previous arrow
  '</a>' +
  '<a class="nav-arrow" id = "next-arrow">' +
    '&#10095;' + //next arrow
  '</a>' + 
  //dot navigation
  '<div id="dot-navigation">';
for(let i = 0; i < slide_order.length; i++) {
  slideShow += '<span class="dot" id = "dot-' + i + '" onclick="jumpToSlide(' + i + ')"></span>';
}
slideShow += '</div>';
document.getElementById('slideshow-container').insertAdjacentHTML('afterbegin', slideShow);

// Event listeners for next/previous arrows
document.getElementById("previous-arrow").addEventListener('click', function() {changeSlideBy(-1)}); 
document.getElementById("next-arrow").addEventListener("click", function() {changeSlideBy(1)});

// Next/previous controls
function changeSlideBy(n) {
  //let current = currentSlide(); //index of current slide returned
  let current = currentSlide();
  console.log(current);
  showSlide(current + n);
}
// Thumbnail image controls
function jumpToSlide(n) {
  currentSlide();
  showSlide(n);
}
// disables current slide and dot and returns that index
function currentSlide() {
  let slides = document.querySelectorAll(".slide");
  for(let i = 0; i < slide_order.length; i++) {
    if(slides[i].classList.contains("active")) {
      console.log(i);
      slides[i].classList.remove("active");
      slides[i].style.display = "none";
      document.getElementById("dot-" + i).classList.remove("active");
      return i;
    }
  }
}

function showSlide(n) {
  console.log(n);
  let index = n;
  if (n >= slide_order.length) {
    index = 0;
  }
  if (n < 0) {
    index = slide_order.length - 1;
  }
  document.getElementById("slide-" + index).classList.add("active");
  document.getElementById("slide-" + index).style.display = "flex";
  document.getElementById("dot-" + index).classList.add("active");
} 

//Touch events for slides 
let touchstartX = 0;
let touchendX = 0;

const swipeArea = document.getElementById('slideshow-container');

swipeArea.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
}, {passive: true});

swipeArea.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    handleSwipe();
}, {passive: true}); 

function handleSwipe() {
  if (touchendX < touchstartX) {
      changeSlideBy(1);
  }
  if (touchendX > touchstartX) {
      changeSlideBy(-1);
  }
}

/*
-------------------------------------------------------------------------------
                        Research
-------------------------------------------------------------------------------
*/

let researchFields = "";
for(let i = 0; i < researchList.length; i++) {
  let k = researchList[i];
  researchFields += 
    '<div class = "research-card">' +
      '<img src = "media/research-icon-' + (i + 1) + '.svg">' +
      '<h2>' + k + '</h2>' + 
      '<p class = "content-text-center">' + 
        allResearch[k].summary + 
      '</p>'+
        '<div style="display: flex;"><a href = "research.html#research-field-' + i +
        '" type = "button" class = "nav-btn">Learn More &#10095;</a><br></div>' +
    '</div>'
}
document.getElementById("research-cards").insertAdjacentHTML('afterbegin',researchFields);

/*
-------------------------------------------------------------------------------
                         Publications
-------------------------------------------------------------------------------
*/
function showPublications(publications) {
  let publications_cards = '';
  for(let i = 0; i < 2; i++) {
    let odd = ((i % 2 !== 0 )? ' odd': '');
    publications_cards += pubCardTemplate(publications[i],odd); // in publications.js
  }
  publications_cards += 
  '<div class="buttons-container" id="publications-btn">' +
    '<a href="publications.html" type="button" class="nav-btn third-btn">All Publications &#10095;</a><br>' + 
  '</div>';
  document.getElementById("entry-page-publications").innerHTML = publications_cards;
}

fetch("http://materials.duke.edu/marco/publications.php")
  .then(function(resp) {
    return resp.json(); 
  })
  .then(function(data){
    document.getElementsByClassName("loading-spinner")[0].style.display = "none";
    showPublications(data);
  });




