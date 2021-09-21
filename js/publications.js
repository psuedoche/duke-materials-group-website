function closeDropdown() {
    dropdown_navigation = document.getElementsByClassName('dropdown-navigation'); 
    for (i in dropdown_navigation) {
        dropdown_navigation[i].checked = false;
    }
}
function pubCardTemplate(pub,odd) {
    return '<div class = "horizontal-card">' +
            '<div class = "card-top-section' + odd + '">' + 
                '<div class = "card-text-section">' +
                    ((pub.new)?(
                        '<div class = "new-banner"><b>NEW [' + 
                            pub.date.substring(1, pub.date.length - 1) + 
                        ']</b></div>'
                    ):'') +
                    '<h1 class = "publication-title">' + 
                        pub.title +
                    '</h1>' + 
                    '<p class = "publication-authors">' + 
                        pub.authors.slice(0,20).join(", ") +
                        ((pub.authors.length > 20)?(' <em>et al.</em>'):'') +  
                    '</p>' + 
                    '<p class = "publication-journal"><em>' + 
                        pub.journal + 
                    '</em></p>' +
                    '<div class = "publication-links">' +
                        ((pub.doi)?(
                            '<a target="_blank" href = "https://doi.org/' + pub.doi + '">DOI: ' +
                                pub.doi +
                            '</a>'
                        ):'') +
                        ((pub.arxiv)?(
                            '<br><a target="_blank" href ="' + pub.arxiv + '" >arXiv</a>'
                        ):'') +
                        ((pub.bibtex)?('<br><a target="_blank" href = "'+ pub.bibtex + '">BibTeX</a>'):'') +
                    '</div>' +
                '</div>' +
                '<div class = "publication-image">' +
                    '<img src = "media/publications/placeholder-image.png">' +     
                '</div>' +
            '</div>' +
            '<div class = "publication-footer">' + 
                ((pub.number)?('<p>' + pub.number  + '.</p>'):'<p>Chapter.</p>') +
                ((pub.pdf)?('<a href = "' + pub.pdf + '" target="_blank" class = "get-pdf">Get PDF</a>'):'') + 
            '</div>' + 
        '</div>';
}

function showPublications(publications) {
    document.getElementsByClassName("loading-spinner")[0].style.display = "none";
    // back to top arrow
    let backToTop = document.getElementById("back-to-top");  
    window.addEventListener('scroll', function(){
        const scroll = window.pageYOffset; 
        if (scroll > 300) {
            backToTop.classList.add('show'); 
        }
        else {
            backToTop.classList.remove('show');
        }
    })
    backToTop.addEventListener('click', function() {
        window.scrollTo(0,0); 
    });
    // sort the publications by year then by number in descending order
    publications.sort(function(pub1, pub2) {
        if(pub1.year != pub2.year) return pub2.year- pub1.year; 
        else return pub2.number - pub1.number;
    });
    // build all the publications
    let publications_cards = '<div class = "cards-only">';
    let years = [];
    let current_year = 0; 
    
    publications.forEach(function (publication, i) {
        let odd = ((i % 2 !== 0 )? ' odd': '');
        if (publication.year != current_year) {
            years.push(publication.year);
            publications_cards += 
                '<div class = "year-divider">' +
                    '<a class = "year-divider-content" id = "publications-year-' + publication.year +'"></a>' +
                '</div>' +
                '<div class = "year-divider-sticky">' +
                    '<h1 class = "year-divider-content" >' + publication.year + '</h1>' +
                '</div>';
            current_year = publication.year;
        }
        publications_cards += pubCardTemplate(publication, odd);
    });
    publications_cards +=  '</div>';
    document.getElementById("all-publications").innerHTML = publications_cards;
    let publications_nav = '<div id = "publications-navigation" class = "">' + 
    '<h1>YEAR</h1><div class = "years-navigation">'; 
    for(var i = 0; i < years.length; i++) {
        publications_nav += '<a href = "#publications-year-' + years[i] + '">' + years[i]+ '</a>';
    }
    publications_nav += '</div></div>'
    document.getElementById("all-publications").insertAdjacentHTML('afterbegin' ,publications_nav);

    // mobile year navigation
    let dropdown_navigation = '<input type="checkbox" class = "dropdown-navigation"><label for  "dropdown-navigation"></label></input><div class = "dropdown-navigation-content">'; 
    for(var i = 0; i < years.length; i++) {
        dropdown_navigation += '<br><a onclick = "closeDropdown()" href = "#publications-year-' + years[i] + '">' + years[i] + '</a>'; 
    }
    dropdown_navigation += '</div>';
    let yearDividers = document.querySelectorAll(".year-divider-sticky"); 
    for (var i = 0; i < yearDividers.length; i++) {
        yearDividers[i].insertAdjacentHTML('beforeend' ,dropdown_navigation); 
    }
    document.getElementsByClassName("loading-spinner")[0].style.display = "none";
}

function fetchPublications() {
    fetch("http://materials.duke.edu/marco/publications.php")
    .then(function(resp) {
        return resp.json(); 
    })
    .then(function(data){
        document.getElementById("all-publications").style.display = "flex";
        showPublications(data);
    }).catch(error =>{
        console.error(error);
        // display something for error
    });
}

