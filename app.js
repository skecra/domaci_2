var filmovi = [
    {naziv: "Rocky", godina: 1976, drzava: "USA", napomena: "", glumci: ["Sylvester Stallone"]},
    {naziv: "Edward Scissorhands", godina: 1990, drzava: "USA", napomena: "", glumci: ["Johny Depp"]},
    {naziv: "Goodfather III", godina: 1990, drzava: "USA", napomena: "", glumci: ["Al Pacino"]},
]   
let spChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?]+/
var tabela = document.getElementById('table')
var dugmeDodajFilm = document.getElementById('sacuvajFilmDugme')

function odgledan(id){
    id = id.trim()
    let tableData = document.getElementById(id).parentElement
    let div = tableData.parentElement
    div.classList.toggle('green')
}

function prikaziFilmove(){
    //nakon dodavanja filma inputi ostaju zeleni i zato im micem atribut style
    document.getElementById('inputNaziv').removeAttribute('style')
    document.getElementById('inputDrzava').removeAttribute('style')
    document.getElementById('inputGodina').removeAttribute('style')
    document.getElementById('inputGlumci').removeAttribute('style')
    document.getElementById('napomena').removeAttribute('style')
    tabela.innerHTML = ""
    filmovi.forEach((film, i) => {
        let lista = ""
        film.glumci.forEach( (glumac) => {
            lista += "<li>"+glumac+" </li>"
            
        });
        tabela.innerHTML += `
        <tr class="red"> 
            <td> ${film.naziv} </td>
            <td> ${film.godina} </td>
            <td> ${film.drzava} </td>
            <td> ${film.napomena} </td>
            <td> <ul> ${lista} </ul> </td>
            <td> <input id="odgledan${i}" type="checkbox" onclick="odgledan('odgledan${i}')" name="odgledan${i}"> <label for="odgledan${i}">Da</label></td>
        </tr>`
    });
}

function validacija(){
    let input_drzava = ""
    let input_glumci = ""
    let input_godina = ""
    let input_napomena = ""
    let input_naziv = ""
    let greske = 0
    if(document.getElementById('inputNaziv').value !="") {
         input_naziv = document.getElementById('inputNaziv').value
        document.getElementById('alert-naziv').classList.add('d-none')
        document.getElementById('alert-naziv').classList.remove('alert-danger')
        document.getElementById('inputNaziv').style.border = "2px solid rgb(0, 250, 0)"
    }else {
        greske++
        document.getElementById('alert-naziv').classList.remove('d-none')
        document.getElementById('alert-naziv').classList.add('alert-danger')
        document.getElementById('inputNaziv').style.border = "2px solid red"

    }

    if(document.getElementById('inputDrzava').value !=""){
         input_drzava = document.getElementById('inputDrzava').value
         document.getElementById('inputDrzava').style.border = "2px solid rgb(0, 250, 0)"
    }

    if(document.getElementById('inputGodina').value !="" && !document.getElementById('inputGodina').value.includes('.') && parseInt(document.getElementById('inputGodina').value)>=1930 && parseInt(document.getElementById('inputGodina').value)<=2021 && Number.isInteger(parseInt(document.getElementById('inputGodina').value))){
         input_godina = document.getElementById('inputGodina').value
         document.getElementById('alert-godina').classList.add('d-none')
        document.getElementById('alert-godina').classList.remove('alert-danger')
        document.getElementById('inputGodina').style.border = "2px solid rgb(0, 250, 0)"
    } else {
        greske++
        document.getElementById('alert-godina').classList.remove('d-none')
        document.getElementById('alert-godina').classList.add('alert-danger')
        document.getElementById('inputGodina').style.border = "2px solid red"
    }

    //da korisnik ne pokusa odvajati glumce nekim drugim karakterom 
    if(document.getElementById('inputGlumci').value != "" && !spChars.test(document.getElementById('inputGlumci').value)){
         input_glumci = document.getElementById('inputGlumci').value
         document.getElementById('alert-glumci').classList.add('d-none')
        document.getElementById('alert-glumci').classList.remove('alert-danger')
        document.getElementById('inputGlumci').style.border = "2px solid rgb(0, 250, 0)"
    } else {
        greske++
        document.getElementById('alert-glumci').classList.remove('d-none')
        document.getElementById('alert-glumci').classList.add('alert-danger')
        document.getElementById('inputGlumci').style.border = "2px solid red"
    }

    if(document.getElementById('napomena').value!=""){
         input_napomena = document.getElementById('napomena').value
        document.getElementById('napomena').style.border = "2px solid rgb(0, 250, 0)"

    }
    let glumci_niz = []
    glumci_niz = input_glumci.split(",")
    console.log(glumci_niz)
    if(greske == 0){
        filmovi.push( {naziv: `${input_naziv}`, godina:`${input_godina}`, drzava:`${input_drzava}`, napomena:`${input_napomena}`, glumci: glumci_niz} )
        prikaziFilmove()
        obrisiUnosPolja()

        //POKUSAO DA UKLONIM SVE KLASE I ATRIBUTE KOJE MODAL DODA NA STRANICU KAD SE OTVORI ALI NIJE PROSLO
        //PA SAM IZABRAO LAKSU METODU SA KLLIKOM NA ZATVORI DUGME
        // document.getElementById('exampleModal').classList.remove('show')
        // document.getElementById('exampleModal').style.display = "none"
        // document.getElementById('exampleModal').removeAttribute("role")
        // document.querySelector('body').classList.remove('modal-open')
        // document.querySelector('body').removeAttribute('style')
        // document.querySelector('body').removeAttribute('data-bs-overflow')
        // document.querySelector('body').removeAttribute('data-bs-padding-right')
        document.getElementById('zatvoriModal').click()
        
    }
    
}






function obrisiUnosPolja(){
    document.getElementById('inputNaziv').value = ""
    document.getElementById('napomena').value = ""
    document.getElementById('inputGlumci').value = ""
    document.getElementById('inputGodina').value = ""
    document.getElementById('inputDrzava').value = ""
}
document.getElementById('iksDugme').addEventListener('click', e => {
    obrisiUnosPolja()
})
document.getElementById('zatvoriModal').addEventListener('click', e => {
    obrisiUnosPolja()
})
dugmeDodajFilm.addEventListener('click', validacija)
dugmeDodajFilm.addEventListener('click', (e) => {
    e.preventDefault()
})
prikaziFilmove()