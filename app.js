const form=document.querySelector("#todo-form");
const todoinput=document.querySelector("#todo");
const todolist=document.querySelector(".list-group");
const firstcardbody=document.querySelectorAll(".card-body")[0];
const secondcardbody=document.querySelectorAll(".card-body")[1];
const filter=document.querySelector("#filter");
const clearbutton=document.querySelector("#clear-todos ");
eventlisteners();
function eventlisteners(){
    form.addEventListener("submit",addtodo )
    document.addEventListener("DOMContentLoaded",loadalltodostoUI);
    secondcardbody.addEventListener("click",deletetodo);
    filter.addEventListener("keyup",filtertodos);
    clearbutton.addEventListener("click",clearall);
}
function clearall(e){
if(confirm("Tum Todolari silmek istediginize emin misiniz?"))
    todolist.innerHTML="";
    localStorage.removeItem("todos")
}
function filtertodos(e){
    const filtervalue=e.target.value.toLowerCase();
    const listitems=document.querySelectorAll(".list-group-item");

    listitems.forEach(function(listitem){
        const text=listitem.textContent.toLowerCase();
        if(text.indexOf(filtervalue)===-1){
            listitem.setAttribute("style","display:none !important");
        }else{
            listitem.setAttribute("style","display:block ")
        }
    })
}
function deletetodo(e){
    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove()
        deletetodofromstorange(e.target.parentElement.parentElement.textContent)
        showalert("success","Todo basariyla Silindi...!")
    }
}
function deletetodofromstorange(deletetodo){
    todos=gettodosfromlocalstorage();

    todos.forEach(function(todo,index){
        if(todo===deletetodo){
            todos.splice(index,1)
        };
    })
    localStorage.setItem("todos",JSON.stringify(todos));

}
function loadalltodostoUI(){
  let todos=  gettodosfromlocalstorage();
  todos.forEach(
    function(todo){
        addtodotoul(todo);
    }
  )
}
function addtodo(e){
    const newtodo=todoinput.value.trim(); // bosluklari kaldirdik
if(newtodo===""){
    showalert("danger","Eksik Yada Hatali Giris Yaptiniz...!");
}else{
    addtodotoul(newtodo);// bu bir fonsiyon ve gorevi eklemek
    addtodotostorage(newtodo)
    showalert("success","Listeye Basariyla Eklendi...!");
}
    e.preventDefault();
}
function gettodosfromlocalstorage(){// storagedan todalari almak icin kullanilir
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addtodotostorage(newtodo){
let todos = gettodosfromlocalstorage();
todos.push(newtodo);
localStorage.setItem("todos",JSON.stringify(todos));

}
function addtodotoul(newtodo){
/* <li class="list-group-item d-flex justify-content-between">
    Todo 1
    <a href = "#" class ="delete-item">
     <i class = "fa fa-remove"></i></a></li> */
     //listitem olusturma
     const listitem=document.createElement("li");
     //a elementi aolusturma 
     const link=document.createElement("a");
     link.href="#";
     link.className="delete-item";
     link.innerHTML="<i class = 'fa fa-remove'></i>";
     listitem.className="list-group-item d-flex justify-content-between";
     //textnode ekleme
     listitem.appendChild(document.createTextNode(newtodo));
     listitem.appendChild(link);
     //todoliste cocuk ekleme
     todolist.appendChild(listitem);
     todoinput.value="" 
}
function showalert(type,message){
  /*   <div class="alert alert-danger" role="alert">
  A simple danger alert—check it out!
</div> */
const alert=document.createElement("div");
alert.classList=`alert alert-${type}` 
alert.style.marginTop="20px"
alert.role="alert"
alert.innerHTML=message
form.appendChild(alert)
//alertin hep kalmamasi icin settimeout methodunu kullaniyoruz.
setTimeout(function(){
    alert.remove()
},1500)
}
