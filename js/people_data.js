// icons for profiles
let links = [
    {   key: 'cv',
        icon: '<i class="ai ai-cv-square ai-2x ai-inverse"></i>',
        link: '',
    },
    {   key: 'gscholar',
        icon: '<i class="ai ai-google-scholar-square ai-2x ai-inverse"></i>',
        link: 'https://scholar.google.com/citations?user=', 
    }, 
    {   key: 'orcid',
        icon: '<i class="ai ai-orcid-square ai-2x ai-inverse"></i>',
        link: 'https://orcid.org/', 
    },
    {   key: 'publons',
        icon: '<i class="ai ai-publons-square ai-2x ai-inverse"></i>',
        link: 'https://publons.com/researcher/', 
    },
];

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
    "mana-rose", 
];

let alumni = [ 
    "raghav-bhatt",
    "christina-patterson",
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
    "luis-agapito",
];
let people_data = {
    "stefano-curtarolo" : {
        name: "Stefano Curtarolo",
        titles: [
            "Edmund T. Pratt, Jr. Distinguished Professor Materials Science, Electrical Engineering and Physics", 
            "Director, Center for Autonomous Materials Design"
        ],
        contact: "stefano@duke.edu",
        cv: "http://materials.duke.edu/auro/cv.pdf",
        gscholar: "zuFUb-YAAAAJ",
        orcid: "0000-0003-0570-8238", 
    },
    "manuela-damian" : {
        name: "Manuela Damian",
        titles: [
            "Administrative Director"
        ],
        contact: "mdamian@duke.edu",
    },
    "mike-mehl" : {
        name: "Mike Mehl",
        titles: [
            "Assistant Research Professor"
        ],
        contact: "michael.mehl@duke.edu",
    },
    "cormac-toher" : {
        name: "Cormac Toher",
        titles: [
            "Assistant Research Professor",
            "Director, Center for Autonomous Materials Design"
        ],
        contact: "cormac.toher@duke.edu",
        gscholar: "BfiQq-4AAAAJ",
        orcid: "0000-0001-7073-8690", 
    },
    "frisco-rose" : {
        name: "Frisco Rose",
        titles: [
            "Assistant Research Professor",
            " High Performance Computing Specialist"
        ],
        contact: "frisco.rose@duke.edu",
        gscholar: "",
    },
    "hagen-eckert" : {
        name: "Hagen Eckert",
        titles: [
            "Postdoctoral Associate"
        ],
        current: "Chancellor of Germany",
        contact: "hagen.eckert@duke.edu",
        gscholar: "sgdimZ4AAAAJ", 
        orcid: "0000-0003-4771-1435", 
        publons: "2769588/hagen-eckert/",
    },
    "marco-esters" : {
        name: "Marco Esters",
        titles: [
            "Postdoctoral Associate"
        ],
        contact: "marco.esters@duke.edu",
        gscholar: "sJLfGh0AAAAJ", 
        orcid: "0000-0002-8793-2200", 
    },
    "david-hicks" : {
        name: "David Hicks",
        titles: [
            "Postdoctoral Associate"
        ],
        contact: "david.hicks@duke.edu",
        gscholar: "G6udP48AAAAJ", 
        orcid: "0000-0001-5813-6785", 
    },
    "corey-oses" : {
        name: "Corey Oses",
        titles: [
            "Postdoctoral Associate"
        ],
        contact: "corey.oses@duke.edu",
        cv: "https://coreyoses.com/",
        gscholar: "Za7m4CMAAAAJ", 
        orcid: "0000-0002-3790-1377", 
    },
    "andriy-smolyanyuk" : {
        name: "Andriy Smolyanyuk",
        titles: [
            "Postdoctoral Associate"
        ],
        contact: "andriy.smolyanyuk@duke.edu",
        gscholar: "", 
        orcid: "0000-0002-4859-5977", 
    },
    "simon-divilov" : {
        name: "Simon Divilov",
        titles: [
            "Postdoctoral Associate"
        ],
        contact: "simon.divilov@duke.edu",
        gscholar: "9LEcBjoAAAAJ", 
        orcid: "", 
    },
    "ohad-levy" : {
        name: "Ohad Levy",
        titles: [
            "Visiting Professor"
        ],
    },
    "yoav-lederer" : {
        name: "Yoav Lederer",
        titles: [
            "Visiting Researcher"
        ],
    },
    "cheryl-li" : {
        name: "Cheryl Li",
        titles: [
            "Undergraduate Student"
        ],
    },
    "harry-wang" : {
        name: "Harry Wang",
        titles: [
            "Undergraduate Student"
        ],
    },
    "christina-patterson" : {
        name: "Christina Patterson",
        titles: [
            "Visiting REU Undergraduate Student"
        ],
    },
    "raghav-bhatt" : {
        name: "Raghav Bhatt",
        titles: [
            "Visiting REU Undergraduate Student"
        ],
    },
    "mana-rose" : {
        name: "Mana Rose",
        titles: [
            "Visiting high-school Student"
        ],
    },
    "stuart-ki" : {
        name: "Stuart Ki",
        titles: [
          "Visiting Undergraduate Student"  
        ],
          },
    "rico-friedrich" : {
        name: "Rico Friedrich",
        titles: [
            "Postdoctoral Researcher"
        ],
        current: "Group Leader, Helmholtz-Zentrum Dresden-Rossendorf - HZDR, Institute of Ion Beam Physics and Materials Research",
    },
    "demet-usanmaz" : {
        name: "Demet Usanmaz",
        titles: [
            "Postdoctoral Researcher "
        ],
        current: "Professor, Kettering University",
    },
    "denise-ford" : {
        name: "Denise Ford",
        titles: [
           "Postdoctoral Researcher" 
        ], 
        current: "Program Manager, Army Research Laboratory",
    },
    "eric-gossett" : {
        name: "Eric Gossett",
        titles: [
            "Graduate Student"   
        ], 
    },
    "pranab-sarker" : {
        name: "Pranab Sarker",
        titles: [
            "Postdoctoral Researcher"
        ], 
         },
    "pinku-nath" : {
        name: "Pinku Nath",
        titles: [
            "Postdoctoral Researcher"
        ], 
    },
    "pauline-colinet" : {
        name: "Pauline Colinet",
        titles: [
            "Visiting Graduate Student"
        ], 
         },
    "john-paul-oses" : {
        name: "John Paul Oses",
        titles: [
            "Visiting Undergraduate Student"
        ], 
    },
    "geena-gomez" : {
        name: "Geena Gomez",
        titles: [
            "Visiting Undergraduate Student"
        ], 
         },
    "harvey-shi" : {
        name: "Harvey Shi",
        titles: [
            "Visiting Undergraduate Student"
        ], 
    },
    "jose-javier-plata-ramos" : {
        name: "Jose Javier Plata Ramos",
        titles: [
            "Postdoctoral Researcher"
        ], 
         },
    "eric-perim" : {
        name: "Eric Perim",
        titles: [
            "Postdoctoral Researcher"
        ], 
    },
    "junkai-xue" : {
        name: "Junkai Xue",
        titles: [
            "Graduate Student"
        ], 
    },
    "camillo-calderon" : {
        name: "Camillo Calderon",
        titles: [
            "Postdoctoral Researcher"
        ], 
         },
    "cheng-ing-chicia" : {
        name: "Cheng-Ing Chicia",
        titles: [
          "Postdoctoral Researcher"  
        ], 
    },
    "kesong-yang" : {
        name: "Kesong Yang",
        titles: [
            "Postdoctoral Researcher"
        ], 
        current: "Professor, University of California San Diego",
       },
    "shidong-wang" : {
        name: "Shidong Wang",
        titles: [
            "Postdoctoral Researcher"
        ], 
    },
    "roman-chepulskyy" : {
        name: "Roman Chepulskyy",
        titles: [
            "Postdoctoral Researcher"
        ], 
        current: "Samsung Electronics",
    },
    "wahyu-setyawan" : {
        name: "Wahyu Setyawan",
        titles: [
            "Graduate Student and Postdoctoral Researcher"
        ], 
        current: "PNNL",
    },
    "michal-jahnatek" : {
        name: "Michal Jahnatek",
        titles: [
            "Postdoctoral Researcher"
        ], 
        current: "IBM",
    },
    "felipe-cervantes-sodi" : {
        name: "Felipe Cervantes Sodi",
        titles: [
            "Visiting Graduate Student from University of Cambridge, UK"
        ], 
        current: "Professor, Universidad Iberoamericana, Mexico D. F. MEXICO",
    },
    "aleksey-nkolmogorov" : {
        name: "Aleksey N. Kolmogorov",
        titles: [
            "Postdoctoral Researcher"
        ], 
        current: "Professor, State University of New York, Binghamton",
    },
    "aiqin-jiang" : {
        name: "Aiqin Jiang",
        titles: [
            "Postdoctoral Researcher"
        ], 
    },
    "neha-awasthi" : {
        name: "Neha Awasthi",
        titles: [
            "Graduate Student"
        ], 
    },
    "janan-hou" : {
        name: "Janan Hou",
        titles: [
            "Graduate Student"
        ], 
    },
    "kevin-rasch" : {
        name: "Kevin Rasch",
        titles: [
            "Postdoctoral Researcher"
        ], 
    },
    "richard-taylor" : {
        name: "Richard Taylor",
        titles: [
            "Graduate Student and Postdoctoral Researcher"
        ], 
    },
    "carlo-desanto" : {
        name: "Carlo De Santo",
        titles: [
            "Graduate Student visiting from Politecnico di Milano"
        ], 
    },
    "allison-stelling" : {
        name: "Allison Stelling",
        titles: [
            "Postdoctoral Researcher"
        ], 
    },
    "luis-agapito" : {
        name: "Luis Agapito",
        titles: [
            "Visiting Researcher"     
        ], 
    },
}