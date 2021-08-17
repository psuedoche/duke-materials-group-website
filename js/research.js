let allResearch = {
    "Field 1" : {
        icon: "media/icon-1.svg",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," +
            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." +
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." +
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    "Field 2" : {
        icon: "media/icon-2.svg",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," +
            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." +
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." +
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    "Field 3" : {
        icon: "media/icon-3.svg",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," +
            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." +
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." +
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    "Field 4" : {
        icon: "media/icon-4.svg",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," +
            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." +
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." +
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    "Field 5" : {
        icon: "media/icon-5.svg",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
            "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," +
            "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." +
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." +
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
}
function buildResearchAcordion() {
    let research = ["Field 1","Field 2","Field 3","Field 4","Field 5"];
    let research_html = ""; 
    var i = 0;
    research.forEach(field =>{
        i++;
        research_html += 
        '<details id = "research-field-' + i + '">' +
            '<summary><h1 style="color:white;">' + field + '</h1></summary>' +
            '<div class="acordion-content"><p>' + 
                allResearch[field].content + 
            '</p></div>' +
        '</details>'; 

        /*'<div class = "acordion-menu-item">' + 
            '<input type="checkbox"  class = "field-checkbox" id="research-field-' + i + '">' +
            '<h1><label for="research-field-' + i + '"  class = "field-collapsible" id = "research-label-' + i + '">' + field + '</label></h1>' + 
            '<div class="acordion-content"><p>' + 
                allResearch[field].content + 
            '</p></div>' + 
        '</div>'; */
    });
    document.getElementsByClassName("acordion-menu")[0].innerHTML = research_html;
}

function fetchField() {
    const currentURL = window.location.href; 
    if (!(currentURL.includes("#"))) {
       return; 
    }
    const field = currentURL.split('#')[1];
    document.getElementById(field).open = true; 
    document.getElementById(field).scrollIntoView();
}