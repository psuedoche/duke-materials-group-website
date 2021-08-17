
let people = [
        "stefano-curtarolo",
        "cormac-toher",
        "frisco-rose",
        "mike-mehl",
        "manuela-damian",
        "andriy-smolyanyuk",
        "corey-oses",
        "david-hicks",
        "hagen-eckert",
        "marco-esters",
        "simon-divilov",
        "cheryl-li",
        "harry-wang",
        "raghav-bhatt",
        "christina-patterson",
        "mana-rose" 
        ];
let alumni = [ 
        "stuart-ki",
        "rico-friedrich",
        "demet-usanmaz",
        "denise-ford","eric-gossett",
        "pranab-sarker","pinku-nath", 
        "pauline-colinet",
        "john-paul-oses",
        "geena-gomez",
        "harvey-shi",
        "jose-javier-plata-ramos",
        "eric-perim",
        "junkai-xue",
        "camillo-calderon",
        "cheng-ing-chicia",
        "kesong-yang",
        "shidong-wang",
        "roman-chepulskyy",
        "wahyu-setyawan",
        "michal-jahnatek",
        "felipe-cervantes-sodi",
        "aleksey-nkolmogorov",
        "aiqin-jiang",
        "neha-awasthi",
        "janan-hou",
        "kevin-rasch",
        "richard-taylor",
        "carlo-desanto",
        "allison-stelling",
        "luis-agapito"
    ];

function buildProfiles(data) {
    let people_html = '<div class = "current-people">'; 
    let alumni_html = '<div class = "alumni"><h1>ALUMNI</h1>' ;
    people.forEach(person => {
        people_html += 
        '<div class = "people-card">' + 
            '<div class = "card-topper"></div>' +
            '<div class = "profile-img-container">' +  
                '<img src = "media/people/' + person + '.jpg" onerror="this.src=\'media/people/placeholder.jpg\'">' +
            '</div>' + 
            '<div class = "name">' + 
                '<h3>' + data[person].name + '</h3>' + 
            '</div>' + 
            '<div class = "titles">'; 
            data[person].titles.forEach(title => {
                people_html += '<p>' + title + '</p>'; 
            })
            people_html += '</div>' + 
            '<div class = "contact-info">' + 
                '<p>' + data[person].contact + '</p>' + 
            '</div>' + 
        '</div>'; 
    });
    
    alumni.forEach(person => {
        alumni_html +=
            '<div class = "alumni-card">' + 
                '<div class = "card-topper"></div>' +
                '<div class = "name">' + 
                    '<h3>' + data[person].name + '</h3>' + 
                '</div>' + 
                '<div class = "titles">'; 
                data[person].titles.forEach(title =>{
                    alumni_html += '<p>' + title + '</p>'; 
                })
                if(data[person].current.length != 0) {
                    alumni_html += '<p>Current: ' + data[person].current + '</p>'; 
                }
                alumni_html += 
                '</div>' + 
            '</div>';
    })
    document.getElementById("profiles-container").innerHTML = people_html + "</div>" + alumni_html + "</div>";
}

