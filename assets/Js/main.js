let arraygame = [
    [2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0],// Je declare une variable contiendra 
    [2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0],// Un tableau qui contient tou mes tableau
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],// Un tableau vaut une ligne et chaque valeur
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],// contenue dans mes tableaux représentent une cellule
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],// qui forme au total 13 colonnes
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]// j'ai donc un tableau de 6 lignes et 13 colones
]
let gameOver = false;
let shoot = false;
let shootposition = arraygame.length - 2;
let shootid = true;
let shooter;

// Je déclare une fonction grid qui va me permettre :

function grid() {
    document.querySelector('#container').innerHTML = ""
    for (let i = 0; i < arraygame.length; i++) { // parcourir mon tableau arraygame

        let row = document.createElement('div')  // a chaque fois que je parcour le tableau je creer une div qui sera = a ma variable row

        row.setAttribute('class', 'row') // J'attribue une class row a ma variable row "ma div"

        document.querySelector('#container').appendChild(row) // je selectionne mon id container qui se situe dans mon html et je dit que row devient son enfant

        for (let j = 0; j < arraygame[i].length; j++) { // parcourir chaque tableau de mon tableau arraygame
            let cell = document.createElement('div')

            cell.setAttribute('class', 'cell')

            row.appendChild(cell)
            if (gameOver) {
                let imageD = document.createElement('img')

                imageD.setAttribute('src', 'assets/image/mort.jpg')

                cell.appendChild(imageD)
            } else {
                if (arraygame[i][j] == 2) {

                    let imageM = document.createElement('img')

                    imageM.setAttribute('src', 'assets/image/monstre.png')

                    cell.appendChild(imageM)
                } else if (arraygame[i][j] == 0) {

                    let imageV = document.createElement('img')

                    imageV.setAttribute('src', '')

                    cell.appendChild(imageV)

                } else if (arraygame[i][j] == 1) {

                    let imageP = document.createElement('img')

                    imageP.setAttribute('src', 'assets/image/usopp.png')

                    cell.appendChild(imageP)
                } else if (arraygame[i][j] == 3) {
                    let imageD = document.createElement('img')

                    imageD.setAttribute('src', 'assets/image/mort.jpg')

                    cell.appendChild(imageD)
                } else if (arraygame[i][j] == 4) {
                    let imageT = document.createElement('img')

                    imageT.setAttribute('src', 'assets/image/tire.jpg')

                    cell.appendChild(imageT)
                }
            }


        }
    }
}
//------------------------------------------Assigniation des touche pour le deplacement du perso-------------------------
document.addEventListener('keyup', (event) => {

    if (event.key == "ArrowLeft") {

        moveplayer(event.key)

    } else if (event.key == "ArrowRight") {

        moveplayer(event.key)

    } else if (event.key == " ") {

        shootplayer()

    }

})

//------------------------------------------Mouvement du joueur---------------------------------------

function moveplayer(key) {

    for (let i = 0; i < arraygame[5].length; i++) {

        if (key == "ArrowRight") {

            if (arraygame[5][i] == 1 && i < arraygame[5].length - 1) {

                arraygame[5][i + 1] = 1;

                arraygame[5][i] = 0;

                break;

            }

        } else if (key == "ArrowLeft") {

            if (arraygame[5][i] == 1 && i > 0) {

                arraygame[5][i - 1] = 1;

                arraygame[5][i] = 0

                break;
            }
        }

    }
    grid()
}
//-------------------------------------------------Mouvement des Monstres----------------------------------
function movemonster() {

    for (let i = arraygame.length - 1; i >= 0; i--) {

        for (let j = arraygame[i].length - 1; j >= 0; j--) {

            if (arraygame[i][j] == 2) {

                if (j == arraygame[i].length - 1) {

                    arraygame[i][j] = 0;

                    arraygame[i + 1][0] = 2;

                } else if (arraygame[5][j] == 2) {

                    gameOver = true

                    window.clearInterval(movemonster)

                    break;

                } else {

                    arraygame[i][j] = 0;

                    arraygame[i][j + 1] = 2;

                }

            }


        }

    }
    grid()
}
let monster = window.setInterval(movemonster, 1000)

//-----------------------------------------------------Tire du joueur----------------------------------//
function shootplayer() {
    let playerposition;
    for (let i = 0; i < arraygame[arraygame.length - 1].length; i++) {
        if (arraygame[arraygame.length - 1][i] == 1) {
            arraygame[arraygame.length - 2][i] = 4
            playerposition = i
        }
    }
    grid()
    shootid = true;
    shooter = window.setInterval(() => {
        shootmoove(playerposition)
    }, 200)
}


function shootmoove(x) {
    if (shootposition == 0) {

        window.clearInterval(shooter)

        arraygame[shootposition][x] = 0;

        shootposition = arraygame.length - 2;

        shootid = false;

    }
    else if (shootid) {

        arraygame[shootposition][x] = 0;

        arraygame[shootposition - 1][x] = 4;

        shootposition--

        shootid = true;


    }
    else if (arraygame[shootposition - 1][x] == 2) {
        window.clearInterval(shooter)
        arraygame[shootposition - 1][x] = 0;
        arraygame[shootposition][x] = 0;
    }
    grid()
}
grid() // J'appelle ma fonction grid
