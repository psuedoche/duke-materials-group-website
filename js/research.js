// building the research acordions
let research_html = ""; 
researchList.forEach(function(field, i) {
    i++;
    research_html += 
    '<details id = "research-field-' + i + '">' +
        '<summary><h1>' + allResearch[field].title + '</h1></summary>' +
        '<div class="acordion-content"><p>' + 
            allResearch[field].content + 
        '</p>' +
        '<br><img src = "' + allResearch[field].image + '"></img>' +
        '</div>' +
    '</details>';
});
document.getElementById("research-acordion-menu").innerHTML = research_html;

const currentURL = window.location.href; 
if (currentURL.includes("#")) {
    const field = currentURL.split('#')[1];
    var selectedField = document.getElementById(field);
    selectedField.open = true; 
    selectedField.scrollIntoView();

}
