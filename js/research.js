let allResearch = {
    "High-entropy Ceramics" : {
        icon: "media/icon-1.svg",
        summary: "Predicting thermodynamic stability and physical properties of high-entropy ceramics",
        content: "<a target = '_blank' href = 'https://doi.org/10.1038/s41578-019-0170-8'>High-entropy ceramics</a> are an emerging research field of materials that combine the stabilizing effects of high configurational entropy with metal-nonmetal bonding, offering promising candidates for a variety of applications ranging from hypersonics to batteries. Due to the limits of density functional theory, modeling the prominent chemical disorder in these systems is a great challenge. Our group has developed the <a target = '_blank' href = 'https://doi.org/10.1021/acs.chemmater.6b01449'>Partial OCCupation (POCC)</a> algorithm to describe disordered materials using a series of small supercells and thermodynamic averaging. The approach has been used to develop <a target = '_blank' href = 'https://doi.org/10.1038/s41467-018-07160-7'>entropy descriptors</a>, such as the entropy-forming ability (EFA), that reliably predict the synthesizability of high-entropy materials. This approach led to the discovery of new <a target = '_blank' href = 'https://doi.org/10.1038/s41467-018-07160-7'>high-entropy carbides</a>, and can greatly accelerate the discovery of new disordered materials when coupled with <a target = '_blank' href = 'https://doi.org/10.1038/s41524-020-0317-6'>machine learning</a>. Our current research focuses on the prediction of new high-entropy ceramics and their physical properties using the POCC approach.",
        images: ["media/high-entropy-ceramics-1.png"]
    },
    "Phase Stability" : {
        icon: "media/icon-2.svg",
        summary: "High-throughput discovery of thermodynamically stable phases for the engineering of novel materials.",
        content: "The discovery of new functional materials demands an efficient determination of the thermodynamically stable &mdash; and synthesizable &mdash; phases. In our group, we focus on predicting the phase stability of novel materials using a combination of <a target = '_blank' href = 'https://doi.org/10.1103/PhysRevMaterials.1.023604'>density functional theory calculations</a>, first-principles thermodynamics <a target = '_blank' href = ' https://doi.org/10.1016/j.actamat.2018.07.042'>(LTVC method)</a>, <a target = '_blank' href = 'https://doi.org/10.1038/s41467-018-07160-7'>entropy descriptors</a>, and <a target = '_blank' href = ' https://doi.org/10.1103/PhysRevMaterials.2.083802'>machine learning methods</a>. In addition, our group has created the Automatic FLOW for Materials Discovery <a href = 'aflow.html'>(AFLOW)</a> software,  a framework for high-throughput materials discovery. The modules <a target = '_blank' href = 'https://doi.org/10.1021/acs.jcim.8b00393'>AFLOW-CHULL</a> and <a target = '_blank' href = ' https://doi.org/10.1038/s41524-019-0192-1'>AFLOW-CCE</a> have been developed to perform thermodynamic stability analysis and to correct DFT formation enthalpies of polar materials based on local atomic environments, respectively.", 
        images: ["media/phase-stability-1.jpeg"], 
    },
    "Symmetry and Prototyping" : {
        icon: "media/icon-3.svg",
        summary: "Analyzing self-consistent crystallographic symmetries, identifying prototype structures, and automatically generating new materials.",
        content: "AFLOW features a wide variety of structural analysis tools to aid in automatic materials discovery. <a target = '_blank' href = 'https://doi.org/10.1107/S2053273318003066'>The AFLOW-SYM module</a> calculates a complete suite of crystallographic symmetries, including different symmetry groups, Wyckoff positions, and lattice types (real, reciprocal, and superlattice). Self-consistent routines and an adaptive tolerance scheme guarantee the results will be commensurate with crystallographic conventions. Compared to other symmetry packages, AFLOW-SYM is more consistent with experimentally resolved symmetries without the need for users to tune tolerance thresholds.<br><br>    <a target = '_blank' href = 'http://aflow.org/prototype-encyclopedia/'>The AFLOW Prototype Encyclopedia</a> is a collection of unique crystalline prototype structures that can be automatically generated with the AFLOW software. The encyclopedia features over 1,100 structure prototypes &mdash; cataloged across <a target = '_blank' href = 'https://doi.org/10.1016/j.commatsci.2017.01.017'>Part 1</a>, <a target = '_blank' href = 'https://doi.org/10.1016/j.commatsci.2018.10.043'>Part 2</a>, and <a target = '_blank' href = 'https://doi.org/10.1016/j.commatsci.2021.110450'>Part 3</a> &mdash; and is continuing to grow. Each prototype is classified by an AFLOW prototype label and its degrees of freedom.<br><br> <a target = '_blank' href = 'https://doi.org/10.1038/s41524-020-00483-4'>AFLOW-XtalFinder</a> identifies and classifies unique structural prototypes. The module symbolically maps structures into their ideal prototype designation and internal degrees of freedom consistent with the International Tables for Crystallography. This functionality enables the AFLOW database to be searched by structure-type. Built-in methods also establish uniqueness/equivalency with respect to users’ input structures, <a target = '_blank' href = 'http://aflow.org'>the aflow.org</a> repository, and the <a target = '_blank' href = 'http://aflow.org/prototype-encyclopedia/'>AFLOW Prototype Encyclopedia</a>.",
        images: ["media/symmetry-and-prototyping-1.png"],
    },
    "Autonomous Property Prediction" : {
        icon: "media/icon-4.svg",
        summary: "Development of autonomous frameworks for thermomechanical, vibrational, and thermodynamic property predictions.",
        content: "Our group has developed the Automatic FLOW for Materials Discovery (<a target = '_blank' href = 'aflow.html      '>AFLOW</a>) software, a framework for high-throughput autonomous materials properties predictions. Through <a target = '_blank' href = 'https://doi.org/10.1021/co200012w'>standardized</a>  density functional theory calculations, we have created one of the biggest, publicly available materials databases in the world, and provide APIs to <a target = '_blank' href = 'https://doi.org/10.1016/j.commatsci.2017.04.036'>search</a>  and <a target = '_blank' href = 'https://doi.org/10.1016/j.commatsci.2014.05.014'>access</a>  the data.<br><br> Modules have been developed to calculate thermomechanical (<a target = '_blank' href = 'https://doi.org/10.1103/PhysRevMaterials.1.015401'>AFLOW-AEL</a>  and <a target = '_blank' href = 'https://doi.org/10.1103/PhysRevB.90.174107'>AFLOW-AGL</a>) and vibrational (<a target = '_blank' href = 'https://doi.org/10.1007/978-3-319-42913-7_63-1'>AFLOW-APL</a>  and <a target = '_blank' href = 'https://doi.org/10.1103/PhysRevMaterials.3.073801'>AFLOW-QHA</a>) properties and lattice thermal conductivities (<a target = '_blank' href = 'https://doi.org/10.1038/s41524-017-0046-7'>AFLOW-AAPL</a>). We have further implemented <a target = '_blank' href = 'https://doi.org/10.1016/j.commatsci.2018.03.075'>machine learning</a> algorithms to predict thermomechanical and vibrational properties.",
        images: ["media/autonomous-property-prediction-1.png"],
    },
    "Metallic Glasses" : {
        icon: "media/icon-5.svg",
        summary: "Predicting the composition, stability, local structure, and properties of metallic glasses.",
        content: "Metallic glasses are a unique class of materials whose defining characteristic is the absence of the crystalline order typically found in metals. While most metals can be transformed into a glassy state from a melt when cooled quickly, generating them as a bulk material is challenging. The vast phase space creates challenges for experimental exploration, necessitating complementary <i>in silico</i> contributions to prioritize promising materials.<br><br> Our approach to predicting the Glass Forming Ability (GFA) is based on quantifying the competition of initially formed crystal nuclei in the rapidly cooled material. Our group first introduced a <a target = '_blank' href = 'https://doi.org/10.1038/ncomms12315'>spectral descriptor for GFA</a>  for binary alloys. Later, we extended the concept to alloys with three elements and incorporated <a target = '_blank' href = 'https://doi.org/10.1016/j.actamat.2019.07.008'>off-stoichiometric contributions</a>. Local atomic environments form the basis for these structural comparisons. As the systems become more complex by including more elements, developing robust atomic environment methods that work reliably for non-ideal geometries is one of our priorities. Drawing from the AFLOW material database, the GFA of new systems can be calculated efficiently, helping to prioritize the most promising material combinations.",
        images: ["media/metallic-glasses-1.png"],
    }
}
function buildResearchAcordion() {
    let research = ["High-entropy Ceramics","Phase Stability","Symmetry and Prototyping","Autonomous Property Prediction","Metallic Glasses"];
    let research_html = ""; 
    var i = 0;
    research.forEach(field =>{
        var images = allResearch[field].images;
        i++;
        research_html += 
        '<details id = "research-field-' + i + '">' +
            '<summary><h1 style="color:white;">' + field + '</h1></summary>' +
            '<div class="acordion-content"><p>' + 
                allResearch[field].content + 
            '</p>'; 
            images.forEach(img => {
                if(img != '') {
                    research_html += '<br><img src = "' + img + '"></img>'
                }
            }) 
            research_html += 
            '</div>' +
        '</details>';
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