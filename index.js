// h2 element s tekstom rezultata
let rezultatEl = document.getElementById("rezultat")
// p element za vpisovanje rezultatov prejsnjih setov
let entriesEl = document.getElementById("entries")
// h3 element s tekstom za sete
let setsEl = document.getElementById("seti")
// ta element bo vposteval whitespace
setsEl.style.whiteSpace = "pre"
// p element za prikaz koncnega rezultata
let koncniRezEl = document.getElementById("koncni-rezultat")
// slika zogice (trenutni servis) na levi strani
let ballImgLeftEl = document.getElementById("ball-img-left")
// slika zogice (trenutni servis) na levi strani
let ballImgRightEl = document.getElementById("ball-img-right")
// select element za izbor prvega serverja
let firstServeEl = document.getElementById("serve-select")
// input element za stevilo setov, potrebnih za zmago
let numSetsEl = document.getElementById("num-sets")
// vsi gumbi
let allButtons = document.querySelectorAll('button')

  
// hranimo tocke obeh igralcev
let tockeLevi = 0
let tockeDesni = 0
let vsotaTock = tockeDesni+tockeLevi

// hranimo dobljene sete obeh igralcev
let setLevi = 0
let setDesni = 0

// 0 pomeni da servira levi, 1 pa da servira desni
// hranimo kdo servira na zacetku niza
let serviraZacetek = 0
// hranimo kdo servira trenutno
let serviraTrenutno = serviraZacetek

// onemogoci vse gumbe
function disableButtons() {
    allButtons.forEach(function(button) {
        button.disabled = true;
    });
    console.log("gumbi so onemogoceni")
}

// ce zacetni server in stevilo setov za zmago ni izbrano, onemogoci vse gumbe
if (firstServeEl.value === "" || numSetsEl.value === "") {
    disableButtons()
}


// ce smo vnesli zacetnega serverja in imamo izbrani stevilo potrebnih setov za zmago, omogoci gumbe
firstServeEl.addEventListener('change', function() {
    if (firstServeEl.value !== "" && numSetsEl.value !== "") {
        allButtons.forEach(function(button) {
            button.disabled = false;
        });
    }
})

// ce smo vnesli stevilo potrebnih setov za zmago in imamo izbranega zacetnega serverja, omogoci gumbe
numSetsEl.addEventListener('input', function() {
    if (firstServeEl.value !== "" && numSetsEl.value !== "") {
        allButtons.forEach(function(button) {
            button.disabled = false;
        });
    }
})

// funkcija, ki nastavi servis zogico na prvega serverja
function pickFirstServe() {
    if (firstServeEl.value === "left") {
        console.log("izbrana je bila left")
        serviraZacetek = 0
        ballImgRightEl.style.opacity = 0
        ballImgLeftEl.style.opacity = 1
    }
    else {
        console.log("izbrana je bila right")
        serviraZacetek = 1
        ballImgLeftEl.style.opacity = 0
        ballImgRightEl.style.opacity = 1
    } 
}

// funkcija za povecevanje tock levega igralca
function incrementLeft() {
    tockeLevi++
    vsotaTock++
    if (tockeDesni >= 10 && tockeLevi >= 10) {
        changeServePoint()
    }
    else {
        if (tockeDesni > 0 || tockeLevi > 0) {
            if (vsotaTock % 2 == 0) {
                changeServePoint()
            }
        }
    }
    rezultatEl.textContent = resultString()
}

// funkcija za povecevanje tock desnega igralca
function incrementRight() {
    tockeDesni++
    vsotaTock++
    if (tockeDesni >= 10 && tockeLevi >= 10) {
        changeServePoint()
    }
    else {
        if (tockeDesni > 0 || tockeLevi > 0) {
            if (vsotaTock % 2 == 0) {
                changeServePoint()
            }
        }
    }
    rezultatEl.textContent = resultString()
}

function decrementLeft() {
    if (tockeLevi > 0) {
        tockeLevi--
        vsotaTock--
    }
    if (tockeDesni >= 10 && tockeLevi >= 10) {
        changeServePoint()
    }
    else {
        if (tockeDesni > 0 || tockeLevi > 0) {
            if (vsotaTock % 2 != 0) {
                changeServePoint()
            }
        }
    }
    rezultatEl.textContent = resultString()
}

function decrementRight() {
    if (tockeDesni > 0) {
        tockeDesni--
        vsotaTock--
    }
    if (tockeDesni >= 10 && tockeLevi >= 10) {
        changeServePoint()
    }
    else {
        if (tockeDesni > 0 || tockeLevi > 0) {
            if (vsotaTock % 2 != 0) {
                changeServePoint()
            }
        }
    }
    rezultatEl.textContent = resultString()
}

// vrne string rezultata
function resultString() {
    return (tockeLevi + " : " + tockeDesni)
}
// vrne string rezultata setov
function setsString() {
    return (setLevi + "       " + setDesni)
}

// trenutni rezultat prikaze pod "Rezultati prejsnjih setov"
function save() {
    console.log("save clicked")
    entriesEl.textContent += resultString() + " | "
    updateSets()
    tockeLevi = 0
    tockeDesni = 0
    rezultatEl.textContent = resultString()

}

// posodobi sete
function updateSets() {
    if (tockeDesni > tockeLevi) {
        setDesni++
    }
    else {
        setLevi++
    }
    setsEl.textContent = setsString()
    changeServeSetStart()
    if (setDesni == numSetsEl.value || setLevi == numSetsEl.value) {
        koncniRezEl.textContent += setLevi + " : " + setDesni
    }
}

// zamenja serverja na zacetku vsakega seta
function changeServeSetStart() {
    if (serviraZacetek == 1) {
        ballImgLeftEl.style.opacity = 0
        ballImgRightEl.style.opacity = 1
    }
    else {
        ballImgLeftEl.style.opacity = 1
        ballImgRightEl.style.opacity = 0
    }
    serviraZacetek = (serviraZacetek+1)%2
}

// zamenja serverja na vsake dve tocki
function changeServePoint() {
    if (serviraTrenutno == 0 ) {
        ballImgLeftEl.style.opacity = 0
        ballImgRightEl.style.opacity = 1
        serviraTrenutno = 1
    }
    else {
        ballImgLeftEl.style.opacity = 1
        ballImgRightEl.style.opacity = 0
        serviraTrenutno = 0
    }
}

function newGame() {
    firstServeEl.selectedIndex = 0
    numSetsEl.value = ""
    tockeLevi = 0
    tockeDesni = 0
    vsotaTock = 0
    rezultatEl.textContent = resultString()
    setLevi = 0
    setDesni = 0
    setsEl.textContent = setsString()
    entriesEl.textContent = ""
    koncniRezEl.textContent = ""
    disableButtons()
}




