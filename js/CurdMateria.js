var User = [];
var currentUser = 1;
hideMateria();
function hideMateria() {
    document.getElementById("viewMateria").style.display = "none";
}
function viewUser() {
    document.getElementById("inputData").style.display = "none";
    document.getElementById("viewMateria").style.display = "block";
}

function numbersOnly(evt) {
    var myEvt = evt || window.event;
    var key = myEvt.keyCode || myEvt.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]/;
    if (!regex.test(key)) {
        myEvt.returnValue = false;
        if (myEvt.preventDefault) myEvt.preventDefault();
    }
}
function load() {
    document.getElementById("userDetails").innerHTML = "";
    if (localStorage.UserRecords) {
        User = JSON.parse(localStorage.UserRecords);
        for (var i = 0; i < User.length; i++) {
            view(i, User[i].nombreMateria, User[i].Nota1, User[i].Nota2, User[i].Nota3);
        }
    }
    Clear();
}
function store() {

    var nombreMateria = document.getElementById("nombreMateria").value;
    var Nota1 = document.getElementById("Nota1").value;
    var Nota2 = document.getElementById("Nota2").value;
    var Nota3 = document.getElementById("Nota2").value;
    var UserObj = {
        nombreMateria: nombreMateria,
        Nota1: Nota1,
        Nota2: Nota2,
        Nota3: Nota3
      
    };
    if (currentUser == 1) {
        User.push(UserObj);
    } else {
        User.splice(currentUser, 1, UserObj);
    }
    localStorage.UserRecords = JSON.stringify(User);
    load()
    Clear();
}
function view(id, nombreMateria, Nota1,Nota2,Nota3,def) {
    var view = document.getElementById("userDetails");
    var insertRows = view.insertRow();
    insertRows.insertCell(0).innerHTML = id + 1;
    insertRows.insertCell(1).innerHTML = nombreMateria;
    insertRows.insertCell(2).innerHTML = Nota1;
    insertRows.insertCell(3).innerHTML = Nota2;
    insertRows.insertCell(4).innerHTML = Nota3;
    def = ((Nota1*0.3)+(Nota2*0.3)+(Nota1*0.4));
    insertRows.insertCell(5).innerHTML = def;
    insertRows.insertCell(6).innerHTML = '<div id="action"><button class="btn btn-warning"" onclick="Editar(' + id + ')">Editar</button> </div>';
    insertRows.insertCell(7).innerHTML = '<div id="action"> <button class="btn btn-danger" onclick="Eliminar(' + id + ')">Eliminar</button></div>';
    
}
function Eliminar(id) {
    User.splice(id, 1);
    localStorage.UserRecords = JSON.stringify(User);
    load();
}
function Clear() {
    currentUser = 1;
    
    document.getElementById("nombreMateria").value = "";
    document.getElementById("Nota1").value = "";
    document.getElementById("Nota2").value = "";
    document.getElementById("Nota3").value = "";
    document.getElementById("submit").innerHTML = "Registar";
}
function Editar(id) {
    currentUser = id;
    var UserObj = User[id];
    document.getElementById("inputData").style.display = "block";
 
    document.getElementById("nombreMateria").value = UserObj.nombreMateria;
    document.getElementById("Nota1").value = UserObj.Nota1;
    document.getElementById("Nota2").value = UserObj.Nota2;
    document.getElementById("Nota3").value = UserObj.Nota3;
    document.getElementById("submit").innerHTML = "Actualizar";
}


  
