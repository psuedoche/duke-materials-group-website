// Display open positions
function displayPositions() {
  // if open positions object is empty, do not display open positions message
  if (Object.keys(open_positions).length == 0) {
    document.getElementById('open-positions').style.display = 'none';
  }
}

// Dynamically build slides
function buildSlides(slide_data) {
  var slideShow = "";
  for(slide in slide_data) {
    slideShow += 
    '<div class = "slide"'; 
    if(slide != 'slide1') slideShow += 'style = "display:none;"';
    slideShow += '>' +
      '<h2>' + slide_data[slide].title + '</h2>' +
      '<div class = "slide-content">' +
        '<p class = "content-text">' + 
          slide_data[slide].content +
        '</p>';  
    if(slide_data[slide].nav_link) {
      slideShow += '<a href = "' + slide_data[slide].nav_link +
      '" type = "button" class = "nav-btn second-btn">Learn More &#10095;</a><br>';
    }
      slideShow += '</div>' + 
    '</div>';
  }

  document.getElementById('slideshow-container').insertAdjacentHTML('afterbegin', slideShow);
}

let slideIndex = 1;

// Next/previous controls
function changeSlideBy(n) {
  showSlide(slideIndex += n);
}

// Thumbnail image controls
function jumpToSlide(n) {
  showSlide(slideIndex = n);
}

function showSlide(n) {
  var i;
  var slides = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "flex";
  dots[slideIndex-1].className += " active";
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

//Dynamically displays research
function buildResearchMain(research) {
  var researchFields = "";
  var i = 0; 
  for(field in research) {
    i++;
    researchFields += 
      '<div class = "research-card">' +
        '<img src =' + research[field].icon + '>' +
        '<h2>' + field + '</h2>' + 
        '<p class = "content-text-center">' + 
          research[field].summary + 
        '</p>'+
          '<div style="display: flex;"><a href = "research.html#research-field-' + i +
          '" type = "button" class = "nav-btn">Learn More &#10095;</a><br></div>' +
      '</div>'
  }
  document.getElementById("research-cards").insertAdjacentHTML('afterbegin',researchFields);
}

// Dynamically shows publications
function showPublications(publications) {
  var publications_cards = '';
  var i = 0; 
  var count = 0; 
  while(count < 2) {
    if(publications[i].new) {
      var odd = '';
      if(count % 2 != 0) odd = 'odd';
      count++; 
      publications_cards += 
        '<div class = "horizontal-card">' +
        
          '<div class = "card-top-section ' + odd + '">' + 
          '<div class = "card-text-section">';
          if(publications[i].new) {
            publications_cards += '<div class = "new-banner"><b>NEW ON ' + publications[i].date.substring(1,publications[i].date.length -1) + '</div>';
          }
          publications_cards += 
              '<h1 class = "publication-title">' + 
                  publications[i].title +
              '</h1>' + 
              
              '<p class = "publication-authors">' + 
                  publications[i].authors.splice(0,10).join(", "); 
                  if(publications[i].authors.length >= 10) {
                      publications_cards += ', <em>et al.</em>';
                  }
              publications_cards += '</p>' + 
              '<p class = "publication-journal"><em>' + 
                  publications[i].journal + 
              '</em></p>' + 
              '<div class = "publication-links">';
              if(publications[i].doi) {
                  publications_cards += 
                      '<a target="_blank" href = "https://doi.org/' + 
                          publications[i].doi +
                      '">DOI: ' + publications[i].doi +'</a>';
              }
              if(publications[i].arxiv) {
                  publications_cards += '<br><a  target="_blank" href ="' + publications[i].arxiv + '" >arXiv</a>';
              }
              if(publications[i].bibtex) {
                  publications_cards += 
                  '<br><a target="_blank" href = "'+ publications[i].bibtex + '">Bibtex</a>'; 
              }
              publications_cards +=
              '</div></div>' +
              '<div class = "publication-image">' +
                '<img src = "media/placeholder-image.png">' + 
              '</div></div>' +
              '<div class = "publication-footer">';
          
          // pdf link if there is one
          if(publications[i].pdf) {
            publications_cards += '<a href = "' + publications[i].pdf + 
            '" target="_blank" class = "get-pdf">Get PDF</a>'; 
          }
          publications_cards += 
          '</div>' + 
        '</div>';
    } 
    i++; 
  }
 
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

  




