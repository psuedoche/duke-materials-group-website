//Build open positions
let positions_html = '';
iterPositions(open_positions.postdoc);
iterPositions(open_positions.grad);
iterPositions(open_positions.undergrad);
// displays all positions in a certain category: postdoc, grad, or undergrad
function iterPositions(category) {
    category.forEach(pos => {
        positions_html += 
        '<div class="content-text">' + 
            '<h2>' + pos.title + '</h2>' +
            '<br><h3>Description:</h3>' + 
            '<p class="context-text">' + 
                pos.description + 
            '</p>' + 
            '<h3>Requirements:</h3><ul>'; 
        pos.requirements.forEach(req=> {
            positions_html += '<li>' + req + '</li>'; 
        });
        positions_html += '</ul>' + 
        '<h3>Link: </h3>' +
            '<a href="' + pos.link + '">' + pos.link + '</a>' +
        '</div>';
    });
}
 // do not display open positions text if none are available
 if (positions_html.length == 0) document.getElementById("open-positions").style.display = 'none';
 document.getElementById('open-positions-content').innerHTML=positions_html; 