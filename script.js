const addbtn = document.querySelector('.add-btn')
addbtn.addEventListener('click', function(){
    window.location.href = '../Add/index.html'
})

//----------------Timer---------------
/*const timer = document.querySelector('.timer-menu')
const timerbtn = document.querySelector('.timer')
timerbtn.addEventListener('click', function(){
    timer.style.display = 'block'
})

const hrsinc = document.querySelector('.hours-increase')
const mininc = document.querySelector('.minutes-increase')
const secinc = document.querySelector('.seconds-increase')
const hrsdec = document.querySelector('.hours-decrease')
const mindec = document.querySelector('.minutes-decrease')
const secdec = document.querySelector('.seconds-decrease')
const hrs = document.querySelector('.hrs')
const min = document.querySelector('.min')
const sec = document.querySelector('.sec')
let horas = hrs
let minutos
let segundos
console.log(horas)
hrsinc.addEventListener('click', function(){
    if(hrs.innerText == '24'){}
    else {hrs = String(parseInt(hrs) + 1)}
})*/

//-------------------------------------

let firstone = 0
let lastone = 3

const rightbtn = document.querySelector('#right')
const leftbtn = document.querySelector('#left')
rightbtn.addEventListener('click', function(){getDataS('right')})
leftbtn.addEventListener('click', function(){getDataS('left')})


async function getDataS(side){
    const response = await fetch('http://localhost:8080/api/recetas/') 
    const data = await response.json();
    console.log(data)
    if(side == 'left' && firstone != 0){firstone -= 1, lastone -=1} 
    else if(side == 'left' && firstone == 0){} 
    else if(side == 'left' && lastone == 0){}
    if(side == 'right' && lastone != data.length){firstone += 1, lastone +=1} 
    else if(side == 'right' && lastone == data.length){} else if(side == 'right' && firstone == data.length){}
    putData(data, firstone, lastone)
}
async function getData(){
    const response = await fetch('http://localhost:8080/api/recetas/') 
    const data = await response.json();
    console.log(data)
    putData(data, firstone, lastone)
}

function putData(data, firstone, lastone){
    const recetas_template = document.querySelector('#recetas-template')
    const contenedor = document.querySelector('.recetas-container')
    contenedor.innerHTML = '';
    data.slice(firstone, lastone).forEach((recipe) => {
        const template = document.importNode(recetas_template.content, true);
    
        const receta_nombre = template.querySelector('.nombre-receta');
        receta_nombre.textContent = recipe.nombre;
        const tipo_cocina = template.querySelector('.tc');
        tipo_cocina.textContent = recipe.tipo_cocina;
        const ingredientes = template.querySelector('.ingredientes');
        ingredientes.textContent = recipe.ingredientes.toLowerCase();
        console.log(template);
        
        //----------------------instrucciones---------------
        const instrucciones_button = template.querySelector('.instrucciones');
        const close_btn = template.querySelector('.close-button');
        
        instrucciones_button.addEventListener('click', function(){
            const caja = document.querySelector('.instrucciones-box');
            caja.style.display = 'block';
            const text_ins = document.querySelector('.text-ins');
            const instrucciones_num = recipe.instrucciones.split(';');
            text_ins.textContent = '';
            for(let x = 1; x <= instrucciones_num.length; x++){
                console.log(`${x}.- ${instrucciones_num[x-1]}`);
                text_ins.textContent += `${x}.- ${instrucciones_num[x-1]}\n`;
            }
        });
        
        close_btn.addEventListener('click', function(){
            const caja = document.querySelector('.instrucciones-box');
            caja.style.display = 'none';
        });

        //--------------------borrar-------------------
        const deletebtn = template.querySelector('.delete-button')
        deletebtn.addEventListener('click', function(){
            fetch(`http://localhost:8080/api/recetas/remove/${recipe.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al eliminar elemento: ${response.status}`);
                }
                console.log('Elemento eliminado exitosamente');
                location.reload()
            })
            .catch(error => {
                console.error('Error al eliminar elemento:', error);
            });
        })
        //---------------------edit-----------------------
        const editbtn = template.querySelector('.edit-button')
        editbtn.addEventListener('click', function(){
            const datasend = {recipe}
            localStorage.setItem('datasend', JSON.stringify(datasend))
            window.location.href = '../Edit/index.html'
        })
        contenedor.appendChild(template);
    });
}

getData()