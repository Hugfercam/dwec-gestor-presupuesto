var presupuesto = 0;// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global


function actualizarPresupuesto(valor) {
    if(!Number.isNaN(Number(valor)) && valor >= 0) {
        presupuesto = Number(valor);
        return presupuesto;
    } else {
        console.log("Prespuesto no valido")
        return -1;
    }    
}

function mostrarPresupuesto() {
    let texto = `Tu presupuesto actual es de ${presupuesto} €`;
    return texto;
}

function CrearGasto(descripcion, valor) {
    this.descripcion = descripcion;
    if(!Number.isNaN(Number(valor)) && valor >= 0) {
        this.valor = Number(valor);
    } else {
        console.log("Gasto no valido");
        this.valor = 0;
    }
}

CrearGasto.prototype.mostrarGasto = function() {
    let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    return texto;
}

CrearGasto.prototype.actualizarDescripcion = function(nuevaDescripcion) {
    this.descripcion = nuevaDescripcion;
}

CrearGasto.prototype.actualizarValor = function(nuevoValor) {
    if(!Number.isNaN(Number(nuevoValor)) && nuevoValor >= 0) {
        this.valor = Number(nuevoValor);
    } else {
        console.log("Gasto no valido");
    }
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
