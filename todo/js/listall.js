const posts=document.querySelector('.posts-list');
const addtodo=document.querySelector('.todo-outer');
const todo=document.getElementById('todo');
const desc=document.getElementById('desc');
const btn=document.querySelector('.btn')
let output=``

const renderPost=(todo)=>{
    todo.data.forEach(element => {
        output +=` <div class="card mt-4 col-md-6 bg-light">
        <div class="card-body" data-id=${element._id}>
            <h5 class="card-title">${element.todo}</h5>
            <p class="card-text">${element.description}</p>
            <a href="#" class="card-link" id="edit">Edit</a>
            <a href="#" class="card-link" id="delete">delete</a>
      </div>
        </div>`;
    });
    posts.innerHTML=output
}
fetch("https://todo-no92.onrender.com/todo")
.then((res)=>res.json())
.then((data)=>{     //console.log(data)
renderPost(data)    
})
const urls="https://todo-no92.onrender.com/todo/add";
addtodo.addEventListener('submit',(e)=>{
    e.preventDefault()
    fetch(urls,{
        method:'POST',
      headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        todo:todo.value,
        description:desc.value
    })
})
.then(res=>res.json())
.then(data=>{
    console.log(data)
    const dataArr=[];
    dataArr.push(data)
    console.log(dataArr)
    renderPost(dataArr)
})
//
alert('Added');
location.reload();
})
const url="https://todo-no92.onrender.com/todo";
posts.addEventListener('click',(e)=>{
    e.preventDefault();
    let delButton= e.target.id == "delete";
    let editButton= e.target.id =="edit";
    let id=e.target.parentElement.dataset.id;
    if(delButton){
        fetch(`${url}/${id}`,{
            method:'DELETE'
        })
        .then(res=>res.json())
        .then(()=>location.reload())
    }
    if(editButton){
        const parent=e.target.parentElement;
        let titleContent=parent.querySelector('.card-title').textContent;
        let bodyContent=parent.querySelector('.card-text').textContent;
        todo.value=titleContent;
        desc.value=bodyContent;
    }
    btn.addEventListener('click',(e)=>{
        e.preventDefault()
        fetch(`${url}/${id}`,{
          method:'PUT',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            todo:todo.value,
            description:desc.value
          })        
        })
        alert("Post updated")
        location.reload()
      })
})