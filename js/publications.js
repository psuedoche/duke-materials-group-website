function closeDropdown() {
    dropdown_navigation = document.getElementsByClassName('dropdown-navigation'); 
    for(i in dropdown_navigation) {
        dropdown_navigation[i].checked = false;
    }
    
}
function showPublications(publications) {
    var publications_cards = '<div class = "cards-only">';
    let years = [];
    var current_year = 0; 
    for(let i = 0; i < publications.length; i++) {
        var odd = '';
        if(i % 2 != 0) odd = 'odd';
        if(publications[i].year != current_year) {
            years.push(publications[i].year);
            publications_cards += 

                    '<div class = "year-divider">' +
                        
                        '<a class = "year-divider-content" id = "publications-year-' + publications[i].year +'"></a>' +
                        
                    '</div>' +
                    '<div class = "year-divider-sticky">' +
                        
                        '<h1 class = "year-divider-content" >' + publications[i].year + '</h1>' +
                        
                    '</div>';
            current_year = publications[i].year;
        }
        publications_cards += 
        '<div class = "horizontal-card">' +
            '<div class = "card-top-section ' + odd + '">' + 
                '<div class = "card-text-section">' +
                    ((publications[i].new)?(
                        '<div class = "new-banner"><b>NEW ON ' + 
                            publications[i].date.substring(1,publications[i].date.length -1) + 
                        '</div>'
                    ):'') +
                    '<h1 class = "publication-title">' + 
                        publications[i].title +
                    '</h1>' + 
                    '<p class = "publication-authors">' + 
                        publications[i].authors.splice(0,10).join(", ") +
                        ((publications[i].authors.length >= 10)?(', <em>et al.</em>'):'') +  
                    '</p>' + 
                    '<p class = "publication-journal"><em>' + 
                        publications[i].journal + 
                    '</em></p>' +
                    '<div class = "publication-links">' +
                        ((publications[i].doi)?(
                            '<a target="_blank" href = "https://doi.org/' + publications[i].doi + '">DOI: ' +
                                publications[i].doi +
                            '</a>'
                        ):'') +
                        ((publications[i].arxiv)?(
                            '<br><a target="_blank" href ="' + publications[i].arxiv + '" >arXiv</a>'
                        ):'') +
                        ((publications[i].bibtex)?('<br><a target="_blank" href = "'+ publications[i].bibtex + '">BibTeX</a>'):'') +
                    '</div>' +
                '</div>' +
                '<div class = "publication-image">' +
                    '<img src = "media/placeholder-image.png">' +     
                '</div>' +
            '</div>' +
            '<div class = "publication-footer">' + 
                ((publications[i].number !== 0)?('<p>' + publications[i].number  + '.</p>'):'') +
                ((publications[i].pdf)?('<a href = "' + publications[i].pdf + '" target="_blank" class = "get-pdf">Get PDF</a>'):'') + 
            '</div>' + 
        '</div>';
    }
    publications_cards +=  '</div>';
    document.getElementById("all-publications").innerHTML = publications_cards;
    var publications_nav = '<div id = "publications-navigation" class = "">' + 
    '<h1>YEAR</h1><div class = "years-navigation">'; 
    
    for(i in years) {
        publications_nav += '<a href = "#publications-year-' + years[i] + '">' + years[i]+ '</a>'
    }
    publications_nav += '</div></div>'
    document.getElementById("all-publications").insertAdjacentHTML('afterbegin',publications_nav);

    // mobile year navigation 
    
    var dropdown_navigation = '<input type="checkbox" class = "dropdown-navigation"><label for "dropdown-navigation"></label></input><div class = "dropdown-navigation-content">'; 
    for(i in years) {
        dropdown_navigation += '<br><a onclick = "closeDropdown()" href = "#publications-year-' + years[i] + '">' + years[i] + '</a>'; 
    }
    dropdown_navigation += '</div>';
    var yearDividers = document.getElementsByClassName("year-divider-sticky"); 
    for(i in yearDividers) {
        yearDividers[i].insertAdjacentHTML('beforeend',dropdown_navigation); 
    }
   // document.getElementsByClassName("year-divider-sticky")[0].insertAdjacentHTML('beforeend',dropdown_navigation); 
    
    
   
   
    /*year_divider_sticky[0].addEventListener('change', (event) => {
        document.getElementById('publications-year-' + event.target.value).scrollIntoView();   
        
    }); */
}  
fetch("http://materials.duke.edu/marco/publications.php")
.then(function(resp) {
    return resp.json(); 
})
.then(function(data){
    document.getElementById("all-publications").style.display = "flex";
    document.getElementsByClassName("loading-spinner")[0].style.display = "none";
    showPublications(data);
}).catch(error =>{
    console.error();
});

