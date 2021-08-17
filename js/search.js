// Global variables
var aapi_schema = {};
var db_stats = {};
var touchEventsCache = [];
var nresults_max = 1000;
var preselected_properties = [];

/*****************************************************************************/
/*                                                                           */
/*                                CATALOGS                                   */
/*                                                                           */
/*****************************************************************************/

function switchCatalog(catalog_data) {
    document.getElementById('dat_count_wrap').innerHTML = '(' + catalog_data.count + ' entries)';
    let elements = document.getElementById('periodic_table').querySelectorAll('.element_card');
    let symbol = '';
    for (let element of elements) {
        symbol = element.getAttribute('data-symbol');
        if (catalog_data['species'].includes(symbol)) {
            if (element.classList.contains('element_unavailable')) {
                element.classList.remove('element_unavailable');
                element.classList.add('element_available');
            }
        } else {
            if (element.classList.contains('element_available')) {
                element.classList.remove('element_available');
                element.classList.add('element_unavailable');
            }
        }
    }

    // Update nspecies dropdown and retain selected value (if available)
    let dropdown = '<option value="0"></option>';
    catalog_data['columns']['nspecies']['set'].forEach(n => {
        dropdown += '<option value="' + parseInt(n, 10) + '">' + parseInt(n, 10) + '</option>';
    });
    let dropdowns = ['equal', 'min', 'max'];
    dropdowns.forEach(key => {
        let drop = document.getElementById('nspecies_' + key);
        let val = null;
        if (drop.selectedOptions.length > 0) {
            val = drop.selectedOptions[0].value;
        }
        drop.innerHTML = dropdown;
        if (val !== null) {
            selectOptionByValue(drop, val);
        }
    });

    let columns = document.getElementById('property_add_column').querySelectorAll('.property_add_column_card');
    for (let col of columns) {
        let property = col.id.replace('_add', '');
        let stats = catalog_data['columns'][property];
        if (stats['set'] !== null) {
            let option = '';
            let dropdown = document.getElementById(property + '_set');
            let val = dropdown.value;
            stats['set'].forEach(opt => {
                option += '<option value="' + opt + '">'  + opt + '</option>';
            });
            dropdown.innerHTML = option;
            selectOptionByValue(dropdown, val);
        } else if (stats['min'] !== null && stats['max'] !== null) {
            let min = document.getElementById(property + '_min');
            let min_val = parseFloat(min.value);
            let max = document.getElementById(property + '_max');
            let max_val = parseFloat(max.value);
            if (isNaN(min_val) || (min_val < stats['min'])) {
                min.value = stats['min'];
            }
            if (isNaN(max_val) || (max_val > stats['max'])) {
                max.value = stats['max'];
            }
        }
    }
}

function switchCatalogEvent(event, catalog_data) {
    if (event.target.classList.contains('selected')) {
        return;
    }
    document.querySelector('.catalog_selector.selected').classList.remove('selected');
    event.target.classList.add('selected');
    switchCatalog(catalog_data);
}

/*****************************************************************************/
/*                                                                           */
/*                                 SLIDES                                    */
/*                                                                           */
/*****************************************************************************/

function updateScrollLabels() {
    let dots = document.getElementById('search_slide_indicators').querySelectorAll('.search_slides_dot');
    let i = 0;
    let ndots = dots.length;
    for (i = 0; i < ndots; i++) {
        if (dots[i].classList.contains('active')) {
            break;
        }
    }
    let index_left = i - 1;
    while (index_left < 0) {
        index_left = ndots + index_left;
    }
    let index_right = (i + 1) % ndots;
    document.getElementById('search_slides_scroll_left_label').innerText = dots[index_left].getAttribute('data-label');
    document.getElementById('search_slides_scroll_right_label').innerText = dots[index_right].getAttribute('data-label');
}

const scrollSearchSlide = async(increment) => {
    if (increment === 0) {
        return;
    }
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    let active = document.getElementById('search_slide_indicators').querySelector('.active');
    let next, active_slide, next_slide;
    let left = (increment < 0);
    increment = Math.abs(increment);
    for (let i = 0; i < increment; i++) {
        if (left) {
            next = (active.previousElementSibling?active.previousElementSibling:active.parentNode.lastElementChild);
        } else {
            next = (active.nextElementSibling?active.nextElementSibling:active.parentNode.firstElementChild);
        }
        active_slide = document.getElementById(active.getAttribute('data-slide') + '_slide');
        next_slide = document.getElementById(next.getAttribute('data-slide') + '_slide');
        next_slide.style.left = (left?'-':'') + '100%';
        active_slide.classList.add('search_slide_item_anim');
        next_slide.classList.add('search_slide_item_anim');
        next_slide.hidden = false;
        active.classList.remove('active');
        next.classList.add('active');

        await sleep(50);
        
        active_slide.style.transform = 'translateX(' + (left?'':'-') + '100%)';
        next_slide.style.transform = 'translateX(' + (left?'':'-') + '100%)';

        await sleep(500);

        active_slide.hidden = true;
        active_slide.classList.remove('search_slide_item_anim');
        active_slide.style.left = '';
        active_slide.style.transform = '';
        next_slide.classList.remove('search_slide_item_anim');
        next_slide.style.left = '';
        next_slide.style.transform = '';
        active = next;
        await sleep(50);
    }
    updateScrollLabels();
}

function switchToSearchSlide(event) {
    if (event.target.classList.contains('active')) {
        return;
    }
    let dots = document.getElementById('search_slide_indicators').querySelectorAll('.search_slides_dot');
    let ndots = dots.length;
    let startIndex = 0, endIndex = 0;
    for (i = 0; i < ndots; i++) {
        if (dots[i].classList.contains('active')) {
            startIndex = i;
        } else if (event.target.getAttribute('data-slide') === dots[i].getAttribute('data-slide')) {
            endIndex = i;
        }
    }
    let increment = endIndex - startIndex;
    let steps_reverse = ndots - Math.abs(increment);
    if (steps_reverse < Math.abs(increment)) {
        scrollSearchSlide(-Math.sign(increment) * steps_reverse, true)
    } else {
        scrollSearchSlide(increment, true);
    }
    updateScrollLabels();
}

/*****************************************************************************/
/*                                                                           */
/*                                 SPECIES                                   */
/*                                                                           */
/*****************************************************************************/

function prepareSpeciesQuery(query) {
    // Remove spaces and convert old notation to Aflux
    query = query.replace(/ /g, '')
                 .replace(/&/g, ',')
                 .replace(/\|/g, ':')
                 .replace(/~/g, '!');
    if (validateSpeciesQuery(query)) {
        // Parse XOR
        if (query.includes('^')) {
            query = parseXOR(query);
        }
    } else {
        console.error('Query invalid');
        query = null;
    }
    return query;
}

function validateSpeciesQuery(query) {
    // An empty species query is valid
    if (query.length === 0) {
        return true;
    }

    // If something is inside, it has to have a letter somewhere
    if (!(/[A-Za-z]/).test(query)) {
        return false;
    }

    query = query.replace(/ /g, '')
                 .replace(/&/g, ',')
                 .replace(/\|/g, ':')
                 .replace(/~/g, '!');
    // Check for bad operators at beginning and end
    if (/[,:^\)]/.test(query[0])) {
        return false;
    }
    if (/[,:^!\(]/.test(query.slice(-1))) {
        return false;
    }

    // Parentheses count - closed must never be larger than open
    let count_open = 0, count_closed = 0;
    for (let i = 0; i < query.length; i++) {
        if (query[i] === '(') {
            // ( cannot be preceeded by ) or a letter
            if ((i > 0) && (/[A-Za-z)]/.test(query[i-1]))) {
                return false;
            }
            count_open++;
        } else if (query[i] === ')') {
            // operators or ( cannot follow )
            if (/[\(,:!^]/.test(query[i-1])) {
                return false;
            }
            count_closed++;
            if (count_open < count_closed) {
                return false;
            }
        } else if (/[A-Za-z]/.test(query[i])) {
            // Only ) not allowed before letter
            if ((i > 0) && (query[i-1] === ')')) {
                return false;
            }
        } else if (/[,:^!]/.test(query[i])) {
            // Non-parentheses operators cannot follow an identical operator
            if (query[i-1] === query[i]) {
                return false;
            }
            // Binary operators cannot follow NOT, (, or another binary operator
            let slc = query.slice(i-1, i+1);
            if (/[!,:^(][,:^]/.test(slc)) {
                return false;
            }
        } else {
            // Invalid character
            return false;
        }
    }
    // Last check: are all parentheses closed?
    return (count_open === count_closed);
}

function parseXOR(query) {
    function xorExpressionAflux(x, y) {
        return '((' + x + ',!' + y + '):(!' + x + ',' + y + '))';
    }
    let ii = 0;
    while (query.includes('^') && (ii < 3)) {
        let xorpos = query.indexOf('^');
        let left = xorpos - 1, right = xorpos + 1;
        if (query[left] === ')') {
            let count_open = 0, count_closed = 1;
            while (count_open != count_closed) {
                left--;
                if (query[left] === ')') {
                    count_closed++;
                } else if (query[left] === '(') {
                    count_open++;
                }
            }
        } else {
            while ((left > 0) && (/[A-Za-z]/.test(query[left - 1]))) {
                left--;
            }
        }
        if (query[right] === '(') {
            let count_open = 1, count_closed = 0;
            while (count_open != count_closed) {
                right++;
                if (query[right] === ')') {
                    count_closed++;
                } else if (query[right] === '(') {
                    count_open++;
                }
            }
        } else {
            while ((right < query.length) && (/[A-Za-z]/.test(query[right]))) {
                right++;
            }
        }
        let left_operand = query.substring(left, xorpos);
        let right_operand = query.substring(xorpos + 1, right);
        query = query.substring(0, left) + xorExpressionAflux(left_operand, right_operand) + query.substring(right);
        ii++;
    }
    return query;
}

/*****************************************************************************/
/*                                                                           */
/*                               PROPERTIES                                  */
/*                                                                           */
/*****************************************************************************/

function getSearchProperties() {
    let properties = {'compound': null};
    let species_query = document.getElementById('species_search_text').value.trim();
    let species = prepareSpeciesQuery(species_query);
    // Get species
    if (species === null) {
        document.getElementById('species_search_wrap').style.backgroundColor = '#ff000044';
        return null;
    } else if (species !== '') {
        properties['species'] = species;
    }

    // Get catalog
    let selector = document.querySelector('.catalog_selector.selected');
    if (selector.id !== 'select_catalog_total') {
        properties['catalog'] = selector.id.replace('select_catalog_', '');
    }

    // Get nspecies
    let nspecies_string = '';
    if (document.getElementById('nspecies_selector').value === 'equal') {
        let val = document.getElementById('nspecies_equal').value;
        if (parseInt(val, 10) > 0) {
            properties['nspecies'] = val;
        }
    } else {
        let min = parseInt(document.getElementById('nspecies_min').value, 10);
        let max = parseInt(document.getElementById('nspecies_max').value, 10);
        if ((min > 0) && (max > 0)) {
            // Sanitize input
            if (min === max) {
                properties['nspecies'] = min.toString();
            } else if (min < max) {
                properties['nspecies'] = [min.toString(), max.toString()];
            } else {
                properties['nspecies'] = [max.toString(), min.toString()];
            }
        } else if (min > 0) {
            properties['nspecies'] = [min.toString(), null];
        } else if (max > 0) {
            properties['nspecies'] = [null, max.toString()];
        }
    }

    let default_properties = ['auid', 'aurl', 'compound', 'Pearson_symbol_relax', 'spacegroup_relax', 'species'];
    let columns = document.getElementById('property_add_column').querySelectorAll('.property_add_column_card');
    for (let col of columns) {
        let prop = col.id.replace('_add', '');
        // nspecies is handled spearately, but may still be in the column
        // list if the user wants it in the final table
        if (prop === 'nspecies') {
            if (!properties.hasOwnProperty('nspecies')) {
                properties['nspecies'] = null;
            }
            continue;
        }
        let restrict = document.getElementById(prop + '_restrict');
        if (aapi_schema[prop].expression === 'correlated') {
            aapi_schema[prop].correlated.forEach(p => {
                properties[p] = '*';
            });
        } else if (restrict !== null && restrict.checked) {
            if (document.getElementById(prop + '_equal') !== null) {
                properties[prop] = document.getElementById(prop + '_equal').value;
            } else if (document.getElementById(prop + '_min') !== null) {
                let min = parseFloat(document.getElementById(prop + '_min').value);
                let max = parseFloat(document.getElementById(prop + '_max').value);
                if (!isNaN(min) && !isNaN(max)) {
                    // Sanitize input
                    if (min === max) {
                        properties[prop] = min.toString();
                    } else if (min < max) {
                        properties[prop] = [min.toString(), max.toString()];
                    } else {
                        properties[prop] = [max.toString(), min.toString()];
                    }
                } else if (!isNaN(min)) {
                    properties[prop] = [min.toString(), null];
                } else if (!isNaN(max)) {
                    properties[prop] = [null, max.toString()];
                }
            }
        } else {
            if (!default_properties.includes(prop)) {
                properties[prop] = '*';
            }
        }
    }
    return properties;
}

function propertyToAflux(name, data) {
    let aflux = name;
    if (data !== null) {
        if (Array.isArray(data)) {
            if (data[0] === null) {
                aflux += '(*' + data[1] + ')';
            } else if (data[1] === null) {
                aflux += '(' + data[0] + '*)';
            } else {
                aflux += '(' + data[0] + '*,*' + data[1] + ')';
            }
        } else {
            aflux += '(' + data + ')';
        }
    }
    return aflux;
}

/*****************************************************************************/
/*                                                                           */
/*                                 SUBMIT                                    */
/*                                                                           */
/*****************************************************************************/

function getMatchbook(properties) {
    let matchbook = [];
    let prop_sort = 'compound';
    if (properties.hasOwnProperty(prop_sort)) {
        matchbook.push(propertyToAflux(prop_sort, properties[prop_sort]));
    }

    Object.keys(properties).forEach(key => {
        if (key !== prop_sort) {
            matchbook.push(propertyToAflux(key, properties[key]));
        }
    });
    return matchbook.join(',');
}

function submitQuery() {
    //Check if auid/icsd first
    let species_query = document.getElementById('species_search_text').value.trim();
    if(species_query.match(/^([0-9A-Fa-f]{16})$/) || // match auid hexidecimal part only
       species_query.match(/^aflow:[0-9A-Fa-f]{16}/) || // match full auid
       species_query.match(/^[0-9]{1,6}/) || // match ICSD number
       species_query.match(/^icsd:[0-9]{1,6}/)) { //match ICSD scoped number
        window.open('../material/?id=' + encodeURIComponent(species_query), '_blank');
        return;
    }

    let properties = getSearchProperties();
    if (properties === null) {
        return;
    }

    let matchbook = getMatchbook(properties);
    let directive = '$paging(1,' + nresults_max + ')';
    let aflux_query = matchbook + ',' + directive;
    let API_root = '../API/aflux/';
    let aflux_version = 'v1.1/';
    let aflux_link = API_root + aflux_version + '?' + aflux_query;
    let aflux_summons = document.getElementById('logo').querySelector('a').href + 'API/aflux/' + aflux_version + '?' + aflux_query;  // Trick to get the absolute URL

    let search_query = {columns: []};
    let columns = document.getElementById('property_add_column').querySelectorAll('.property_add_column_card');
    for (let col of columns) {
        let property = col.id.replace('_add', '');
        search_query.columns.push(property);
        if (!document.getElementById(property + '_visible').checked) {
            aflux_summons = toggleVisibilitySummons(aflux_summons, property, false);
        }
    }
    // Always make catalog invisible
    aflux_summons = toggleVisibilitySummons(aflux_summons, 'catalog', false);

    document.getElementById('main_submit').classList.remove('glow');
    document.getElementById('paging_current').selectedIndex = 0;
    let results_wrapper = document.getElementById('results_wrapper');
    results_wrapper.hidden = false;
    let loader = document.getElementById('results_loader_animation');
    loader.hidden = false;
    let results_warning = document.getElementById('results_warning')
    results_warning.hidden = true;
    let search_results = document.getElementById('search_results');
    search_results.hidden = true;
    document.getElementById('aflux_summons').innerHTML =
        '<div class="results_aflux_wrapper_label">Aflux summons:</div>'
      + '<pre><a href="' + aflux_summons + '" target="_blank">' + aflux_summons + '</a></pre>';

    scrollToTarget(results_wrapper, 2000, 'easeOutSine');
    let queries = [aflux_link, API_root + aflux_version + '?' + matchbook + ',paging(0,0)'];
    Promise.all(queries.map(query => loadResourceAsync(query, {returntype: 'json'})))
    .then(data => {
        search_query.results = data[0];
        search_query.nresults = parseInt(data[1], 10);
        loader.hidden = true;
        buildTable(search_query);
    })
    .catch(err => {
        results_warning.innerHTML =
            '<p>'
          +     'The Aflux search encountered an error. Please try again later. '
          +     'If the problem persists, please contact us in our forum.'
          + '</p>'
        results_warning.hidden = false;
        console.error(err);
    });
}

/*****************************************************************************/
/*                                                                           */
/*                               BUILD PAGE                                  */
/*                                                                           */
/*****************************************************************************/

function buildSearch() {
    buildPeriodicTable(periodic_table_elements, periodic_table_groups);

    const stats_path = 'http://aflowlib.duke.edu/AFLOWDATA/aflowlib.json';
    let request_options = {returntype: 'json', method: 'GET'};
    let requests = [{url: stats_path, options: request_options}];
    const api_root = '../API/';

    let api_name = 'aapi-schema';
    let api_version = '1.3';
    let api_url = api_root + api_name + '/v' + api_version + '/';
    requests.push({url: api_url, options: request_options});

    api_name = 'entry-hierarchy';
    api_version = '1.1';
    api_url = api_root + api_name + '/v' + api_version + '/';
    requests.push({url: api_url, options: request_options});

    Promise.all(requests.map(req => loadResourceAsync(req.url, req.options)))
    .then(data => {
        // data[0]: stats; data[1]: schema; data[2]: hierarchy

        // Get searchable properties
        let property_categories = [];
        const href = window.location.href;
        if (href.includes('?') && href.includes('lib=')) {
            property_categories = decodeURIComponent(href.split('lib=')[1].split('&')[0]).trim().split(',');
        }

        let default_properties = {
            'crystal': ['spacegroup_relax', 'Pearson_symbol_relax'],
            'mechanical': ['ael_bulk_modulus_vrh', 'ael_elastic_anisotropy', 'ael_poisson_ratio', 'ael_shear_modulus_vrh'],
            'thermodynamics': ['agl_acoustic_debye', 'agl_debye', 'agl_gruneisen',
                               'agl_heat_capacity_Cp_300K', 'agl_heat_capacity_Cv_300K',
                               'agl_thermal_conductivity_300K', 'agl_thermal_expansion_300K'],

        };

        preselected_properties = [];
        let loops = [];
        if (property_categories.length === 0) {
            // No library requested, so get default
            property_categories = [
                'electronics',
                'magnetics',
                'mechanical',
                'thermodynamics',
                'crystal',
                'chemistry',
                'calculation',
            ];
            preselected_properties = default_properties['crystal'];
        } else {
            let categories_loops = {
                'chemistry': 'bader',
                'electronics': 'bands',
                'mechanical': 'ael',
                'thermodynamics': 'agl',
            }
            property_categories.forEach(cat => {
                preselected_properties = preselected_properties.concat(default_properties[cat]);
                if (categories_loops.hasOwnProperty(cat)) {
                    loops.push(categories_loops[cat]);
                }
            });
        }
        let properties = [];
        property_categories.forEach(cat => {
            data[2][cat]['subclasses'].forEach(subclass => {
                subclass['properties'].forEach(prop => {
                    properties.push(prop);
                });
            });
        });

        // Get schema
        // Make sure properties to create mandatory columns and stats
        // are in the schema (even if not searchable)
        let required_properties = preselected_properties.concat(['auid', 'aurl', 'nspecies', 'compound']);
        properties = [...new Set([...properties, ...required_properties])];
        properties.forEach(prop => {
            aapi_schema[prop] = data[1]['AAPI_schema'][prop];
            if (aapi_schema[prop]['expression'] === 'correlated') {
                aapi_schema[prop]['correlated'].forEach(p => {
                    if (!aapi_schema.hasOwnProperty(p)) {
                        aapi_schema[p] = data[1]['AAPI_schema'][p];
                    }
                });
            }
        });

        // Get stats
        let catalogs = ['ICSD', 'total'];
        catalogs.forEach(catalog => {
            db_stats[catalog] = {};
            db_stats[catalog].count = data[0]['Aflow_DBs'][catalog]['count'];
            loops.forEach(loop => {
                if (data[0]['Aflow_DBs'][catalog][loop] < db_stats[catalog].count) {
                    db_stats[catalog].count = data[0]['Aflow_DBs'][catalog][loop];
                }
            });
            db_stats[catalog].species = data[0]['Aflow_DBs'][catalog]['species'];
            db_stats[catalog].columns = {};
            Object.keys(aapi_schema).forEach(key => {
                if (data[0]['Aflow_DBs'][catalog]['columns'].hasOwnProperty(key)) {
                    db_stats[catalog].columns[key] = data[0]['Aflow_DBs'][catalog]['columns'][key];
                }
            });

            let button = document.getElementById('select_catalog_' + catalog);
            button.addEventListener('click', function(event) {
                switchCatalogEvent(event, db_stats[catalog]);
            });
        });
        // Property selectors have to be built first because
        // switchCatalog addresses the column cards
        buildPropertySelectors(property_categories, data[2]);
        switchCatalog(db_stats[catalogs[0]]);

        preselected_properties.forEach(property => {
            addProperty(property);
        });

        // Process the search string after the DOM elements are built
        // because submitQuery() checks the property columns
        if (href.includes('?') && href.includes('search=')) {
            let search_text = decodeURIComponent(href.split('search=')[1].split('&')[0]).trim();
            if (search_text !== '') {
                document.getElementById('species_search_text').value = search_text;
                submitQuery();
            }
        }
    });
    updateScrollLabels();

    // Add top bar events
    document.getElementById('main_submit').addEventListener('click', submitQuery);
    document.getElementById('scroll_top').addEventListener('click', function() {scrollToY(0, 6000, 'easeOutSine');});

    document.getElementById('search_slides_scroll_left').addEventListener('click', function() {scrollSearchSlide(-1, true);});
    document.getElementById('search_slides_scroll_right').addEventListener('click', function() {scrollSearchSlide(1, true);});
    for (let dot of document.getElementById('search_slide_indicators').querySelectorAll('.search_slides_dot')) {
        dot.addEventListener('click', switchToSearchSlide);
    }
    document.getElementById('species_search_text').addEventListener('click', function(event) {
        document.getElementById('species_search_wrap').style.backgroundColor = '';
    });
    document.getElementById('species_search_text').addEventListener('input', function() {
        if ((document.getElementById('species_search_text').value === '')
            && (document.getElementById('property_add_column').firstChild === null)) {
            document.getElementById('main_submit').classList.remove('glow');
        } else if (!document.getElementById('results_wrapper').hidden) {
            document.getElementById('main_submit').classList.add('glow');
        }
    });
    document.getElementById('species_search_clear').addEventListener('click', function(event) {
        document.getElementById('species_search_text').value = '';
        document.getElementById('species_search_wrap').style.backgroundColor = '';
        if (document.getElementById('property_add_column').firstChild === null) {
            document.getElementById('main_submit').classList.remove('glow');
        } else if (!document.getElementById('results_wrapper').hidden) {
            document.getElementById('main_submit').classList.add('glow');
        }
    });

    // Add results wrapper events
    document.getElementById('search_reset').addEventListener('click', resetSearch);
    document.getElementById('paging_results').addEventListener('click', changePageSize);
    document.getElementById('paging_current').addEventListener('change', function(event) {goToResultsPage(parseInt(event.target.value, 10));});
    document.getElementById('paging_first').addEventListener('click', function() {goToResultsPage(1)});
    document.getElementById('paging_prev').addEventListener('click', function() {shiftResultsPages(-1)});
    document.getElementById('paging_next').addEventListener('click', function() {shiftResultsPages(1)});
    document.getElementById('paging_last').addEventListener('click', function() {goToResultsPage(-1)});

    // Add touch events
    let search_slides = document.getElementById('search_slides');
    document.addEventListener('touchstart', function(event) {
        touchEventsCache.push(event);
    });
    search_slides.addEventListener('touchend', function(event) {
        if (touchEventsCache.length !== 1) {
            touchEventsCache = [];
            return;
        }
        let deltaX = event.changedTouches[0].pageX - touchEventsCache[0].changedTouches[0].pageX;
        let threshold = 10;
        if (deltaX < -threshold) {
            scrollSearchSlide(1);
        } else if (deltaX > threshold) {
            scrollSearchSlide(-1);
        }
        touchEventsCache = [];
    });
}
