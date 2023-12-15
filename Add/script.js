const addbtn = document.querySelector('.return-btn')
addbtn.addEventListener('click', function(){
    window.location.href = '../index.html'
})

const name_recipe = document.querySelector('#nombre-recetas')
const tipo_cocina = document.querySelector('#nombre-cocina-receta')
const ingrediente_input = document.querySelector('.ingrediente-input')
const instruccion_input = document.querySelector('.instruccion-input')

const ingredientes_container = document.querySelector('.ingredientes-container')
const ingredientesadd = document.querySelector('.ingredientes-add')
ingredientesadd.addEventListener('click', function(){
    const nuevoIngrediente = document.createElement('div');
    nuevoIngrediente.classList.add('ingrediente');

    const newinput = document.createElement('input');
    newinput.type = 'text'
    newinput.classList.add('ingrediente-input')
    nuevoIngrediente.appendChild(newinput)
    ingredientes_container.appendChild(nuevoIngrediente);
})

const ing_delbtn = document.querySelector('.ingredientes-delete')
ing_delbtn.addEventListener('click', function(){
    const ingredientes_container = document.querySelector('.ingredientes-container');
    const ingredientes = ingredientes_container.querySelectorAll('.ingrediente');

    if (ingredientes.length > 0) {
        const ultimoIngrediente = ingredientes[ingredientes.length - 1];
        ingredientes_container.removeChild(ultimoIngrediente);
    }
})

const instrucciones_container = document.querySelector('.instrucciones-container')
const instruccionesadd = document.querySelector('.instrucciones-add')
instruccionesadd.addEventListener('click', function(){
    const nuevaInstruccion = document.createElement('div');
    nuevaInstruccion.classList.add('instruccion');

    const newinput = document.createElement('input');
    newinput.type = 'text'
    newinput.classList.add('instruccion-input')
    nuevaInstruccion.appendChild(newinput)
    instrucciones_container.appendChild(nuevaInstruccion);
})

const ins_delbtn = document.querySelector('.instrucciones-delete')
ins_delbtn.addEventListener('click', function(){
    const instrucciones_container = document.querySelector('.instrucciones-container')
    const instrucciones = instrucciones_container.querySelectorAll('.instruccion');

    if (instrucciones.length > 1) {
        const ultimaInstruccion = instrucciones[instrucciones.length - 1];
        instrucciones_container.removeChild(ultimaInstruccion);
    }
})

//--------------Entorno de prueba temporal--------------
/*name_recipe.value = nombre_prueba
tipo_cocina.value = tc_prueba
for(x=0;x <15; x++){
    ingredientesadd.click()
}

const alling = document.querySelectorAll('.ingrediente-input')
alling.forEach(element => {
    element.value = ingrediente_prueba
});
for(x=0;x <15; x++){
    instruccionesadd.click()
}

const allins = document.querySelectorAll('.instruccion-input')
allins.forEach(element => {
    element.value = instruccion_prueba
});*/
//------------------------------------------------------

const save_btn = document.querySelector('.save-btn')
save_btn.addEventListener('click', function(){

    //--------------Entorno de prueba temporal--------------
    /*name_recipe.value = nombre_prueba
    ingrediente_input.value = ingrediente_prueba
    instruccion_input.value = instruccion_prueba*/
    //------------------------------------------------------

    if(name_recipe.value == ''){
        alert("Escribe un Nombre")
    }
    else if(tipo_cocina.value == ''){
        alert("Escribe el tipo de cocina")
    }
    else if(ingrediente_input.value == ''){
        alert("Escribe al menos 1 ingrediente")
    }
    else if(instruccion_input.value == ''){
        alert("Escribe al menos 1 instruccion")
    }
    else{sendApiData()}
})

function sendApiData(){
    const ingrediente_inputs = document.querySelectorAll('.ingrediente-input');
    const instruccion_inputs = document.querySelectorAll('.instruccion-input');
    const ingrediente = Array.from(ingrediente_inputs).map(input => input.value).join(', ');
    const instruccion = Array.from(instruccion_inputs).map(input => input.value).join(';');
    //---------------Variables de pruebas-------------------
    /*const nombre_prueba = 'Papa Horneada'
    const tc_prueba = 'Horneado'
    const ingrediente_prueba = 'papa, zanahoria, sal, limon, azucar'
    const instruccion_prueba = 'Hierve las papas;Hierve las papas;Hierve las papas;Hierve las papas;Hierve las papas;Hierve las papas;Hierve las papas;Hierve las papas;Hierve las papas;Hierve las papas;Hierve las papas;Hierve las papas;Hierve las papas'*/
    //------------------------------------------------------
    //--------------Entorno de prueba temporal--------------
    /*const data = {
        nombre: nombre_prueba,
        tipo_cocina: tc_prueba,
        ingredientes: ingrediente_prueba,
        instrucciones: instruccion_prueba
    }*/
    //------------------------------------------------------
    const data = {
        nombre: name_recipe.value,
        tipo_cocina: tipo_cocina.value,
        ingredientes: ingrediente,
        instrucciones: instruccion
    }

    fetch('http://localhost:8080/api/recetas/post/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error de red: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Respuesta exitosa:', data);
    })
    .catch(error => {
        console.error('Error en la solicitud:', error.message);
    });
    window.location.href = '../Main-Page/index.html'
}
