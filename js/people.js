let people_html = '<div class = "current-people">'; 
people.forEach(person => {
    people_html += 
    '<div class = "people-card">' + 
        '<div class = "card-topper"></div>' +
        '<div class = "profile-img-container">' +  
            '<img src = "media/people/' + person + '.jpg" onerror="this.src=\'media/people/placeholder.jpg\'">' +
        '</div>' + 
        '<div class = "name">' + 
            '<h3>' + people_data[person].name + '</h3>' + 
        '</div>' + 
        '<div class = "titles">' +
            people_data[person].titles.map(title => {return('<p>' + title + '</p>')}).join("") +
        '</div>' + 
        '<div class = "contact-info">' + 
            (people_data[person].contact?('<p>' + people_data[person].contact + '</p>'):'') + 
        '</div>' + 
        '<div class = "links">';
            for(let i = 0; i < links.length; i++) {
                let type = links[i];
                people_html += (people_data[person][type.key]?('<a target = "_blank" href = "' + type.link + people_data[person][type.key] + '">' + type.icon + '</a>'):'');
            }
        people_html += '</div>' + 
    '</div>'; 
});
let alumni_html = '<div class = "alumni"><h1>ALUMNI</h1>' ;
alumni.forEach(person => {
    alumni_html +=
        '<div class = "alumni-card">' + 
            '<div class = "card-topper"></div>' +
            '<div class = "name">' + 
                '<h3>' + people_data[person].name + '</h3>' + 
            '</div>' + 
            '<div class = "titles">' +
                people_data[person].titles.map(title => {return('<p>' + title + '</p>')}).join("") +
                (people_data[person].hasOwnProperty("current")?('<p>Current: ' + people_data[person].current + '</p>'):'') +
            '</div>' + 
        '</div>';
});
document.getElementById("profiles-container").innerHTML = people_html + "</div>" + alumni_html + "</div>";