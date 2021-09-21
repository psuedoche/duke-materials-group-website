let courses = [
    {
        number: 'ME550.XX',
        title: 'Intermediate Materials Science',
        abstract: 'Structure and properties of solid materials: crystal structure and bonding, reciprocal space, free electron model, energy bands in solids, origin of electromagnetic, thermal and mechanical properties, concepts of thermally activated processes and characterization methods.',
        syllabus: '',
        assignments: 'reading and take home papers',
        Books: 'Schaffer - Saxena - Antolovich - Sanders - Warner, The Science and Design of Engineering Materials (2nd ed.)',
    },
    {
        number: 'ME221 (old ME83)',
        title: 'Structure and Properties of Solids, (Introduction to Materials Science)',
        abstract: 'Introduction to the structure and properties of solid materials, emphasizing the relationships between the structure of a solid and its properties. Atomic and molecular origins of electrical, mechanical, and chemical behavior are treated in some detail for metals, alloys, polymers, ceramics, glasses, and composite materials. Lectures are accompanied by laboratory work.',
        syllabus: '',
        notes: ['<a href = "http://materials.duke.edu/XCOURSES/ME83/X_ME83L.pdf"> ME83L complete notes</a>','<a href = "http://materials.duke.edu/XCOURSES/ME83/X01_Introduction.pdf">Introduction</a>','<a href = "http://materials.duke.edu/XCOURSES/ME83/X02_Mechanics.pdf">Mechanical Behavior</a>','<a href = "http://materials.duke.edu/XCOURSES/ME83/X03_Atomic_Bonding_Structure.pdf">Atomic Bonding and Structure</a>'],
        Books: 'Schaffer - Saxena - Antolovich - Sanders - Warner, The Science and Design of Engineering Materials (2nd ed.)',
        prerequisites: 'Chemistry 11L, Mathematics 31 or 33',
    },
    {
        number: 'ME550.XX (SS1)',
        title: 'Introduction to Solid State Engineering',
        syllabus: 'http://materials.duke.edu/XCOURSES/ME550.SS1/syllabus_SP2006.pdf',
        notes: ['<a href = "http://materials.duke.edu/XCOURSES/ME550.SS1/SS1a.pdf">A</a>'],
        prerequisites: 'Introduction to Materials Science, Thermodynamics',
    },
    {
        number: 'ME550.XX',
        title: 'Solid State II',
        abstract: 'This is the continuation of my course Solid State Engineering (which is practically Solid State Theory). This year course will focus on a rigorous approach to phonons, their coupling with electrons, and superconductivity',
        content: '',
        syllabus: '',
        notes: ['<a href = "http://materials.duke.edu/XCOURSES/ME550.SS2/SS2_a.pdf">Phonons 1</a>','<a href = "http://materials.duke.edu/XCOURSES/ME550.SS2/SS2_b.pdf">doing</a>'],
        books: 'Madelung: Introduction to Solid State Theory',
        prerequisites: 'Introduction to Solid State Theory/Engineering (1)',
    },  
];
let course_html = '';
courses.forEach(course => {
    course_html +=
    '<h1 class = "subtitle">' + course.number + ': <br>' + course.title + '</h1>' + 
    '<div class = "content-text"><p class = "context-text">' +
    (course.abstract? course.abstract:'') +
    (course.syllabus?'<a href = "' + course.syllabus + '">Syllabus</a>':'') +
    (course.assignments?'Assignments: ' + course.assignments :''); 
    if(course.notes) {
        course_html += 'Notes:<ul>';
        course.notes.forEach(note => {
            course_html += '<li>' + note + '</li> ';
        });
        course_html += '</ul>';
    }
    course_html +=
    (course.books?'' + course.books :'') +
    (course.prerequisites?'Prerequisites: ' + course.prerequisites:'') +
    '</p></div>';

});

document.getElementById("course-content").innerHTML = course_html;