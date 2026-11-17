import * as gestion from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    let contenedor = document.getElementById(idElemento);
    let divGasto = document.createElement("div");
    divGasto.className = "gasto";

    let divDescripcion = document.createElement("div");
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.textContent = gasto.descripcion;

    divGasto.append(divDescripcion);

    let divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";

    let fecha = new Date(gasto.fecha);
    divFecha.textContent = fecha.toISOString().substring(0, 10);

    divGasto.append(divFecha);

    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.textContent = gasto.valor;

    divGasto.append(divValor);

    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";

    gasto.etiquetas.forEach(etiqueta => {

        let spanEtiqueta = document.createElement("span");
        spanEtiqueta.className = "gasto-etiquetas-etiqueta";
        spanEtiqueta.textContent = etiqueta;

        divEtiquetas.append(spanEtiqueta);
    });

    divGasto.append(divEtiquetas);

    let botonEditar = document.createElement("button");
    botonEditar.type = "button";
    botonEditar.className = "gasto-editar";
    botonEditar.textContent = "Editar";
    let manejadorEditar = new EditarHandle();
    manejadorEditar.gasto = gasto;

    botonEditar.addEventListener("click", manejadorEditar);

    divGasto.append(botonEditar);

    contenedor.append(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let contenedor = document.getElementById(idElemento);

    let divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";

    let h1 = document.createElement("h1")
    divAgrupacion.append(h1);

    Object.entries(agrup).forEach(([clave, valor]) => {

        let divDato = document.createElement("div");
        divDato.className = "agrupacion-dato";
        divAgrupacion.append(divDato);

        let spanDatoClave = document.createElement("span");
        spanDatoClave.className = "agrupacion-dato-clave";
        spanDatoClave.textContent = clave;

        divDato.append(spanDatoClave);

        let spanDatoValor = document.createElement("span");
        spanDatoValor.className = "agrupacion-dato-valor";
        spanDatoValor.textContent = valor;

        divDato.append(spanDatoValor);
    });
    let nombrePeriodo = periodo;

    if (periodo === "dia") {
        nombrePeriodo = "día";
    } else if (periodo === "anyo") {
        nombrePeriodo = "año";
    }

    h1.textContent = "Gastos agrupados por " + nombrePeriodo;

    contenedor.append(divAgrupacion);
}
function repintar() {
    mostrarDatoEnId("presupuesto", gestion.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gestion.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gestion.calcularBalance());

    let contenedorGastos = document.getElementById('listado-gastos-completo');
    contenedorGastos.innerHTML = '';

    let gastos = gestion.listarGastos();

    gastos.forEach(gasto => {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    });
}

function nuevoGastoWeb() {
    let descripcion = prompt("Descripción del gasto");
    let valor = prompt("Valor del gasto");
    let valorNumerico = Number(valor);
    let fecha = prompt("Introduzaca la fecha (yyyy-mm-dd)");
    let etiquetasTexto = prompt("Etiquetas del gasto");
    let etiquetas = etiquetasTexto.split(",");

    let nuevoGasto = new gestion.CrearGasto(descripcion, valorNumerico, fecha, ...etiquetas);
    gestion.anyadirGasto(nuevoGasto);

    repintar();
}

function actualizarPresupuestoWeb() {
    let nuevoPresupuesto = prompt("Introduce el nuevo presupuesto:");
    let presupuestoNumerico = Number(nuevoPresupuesto);
    gestion.actualizarPresupuesto(presupuestoNumerico);

    repintar();
}


function EditarHandle() {
    this.handleEvent = function () {
        console.log(this.gasto.descripcion);
        let nuevaDescripcion = prompt("Descripcion", this.gasto.descripcion);
        console.log(this.gasto.valor);
        let nuevoValor = prompt("Valor", this.gasto.valor);
        let nuevoValorNumerico = Number(nuevoValor);
        console.log(this.gasto.fecha);
        let fechaActual = new Date(this.gasto.fecha).toISOString().substring(0, 10);
        let nuevaFecha = prompt("Fecha (yyyy-mm-dd)", fechaActual);
        console.log(this.gasto.etiquetas)
        let etiquetasActuales = this.gasto.etiquetas.join(",");
        let nuevasEtiquetasTexto = prompt("Etiquetas", etiquetasActuales);
        let nuevasEtiquetas = nuevasEtiquetasTexto.split(",");

        this.gasto.actualizarDescripcion(nuevaDescripcion);
        this.gasto.actualizarValor(nuevoValorNumerico);
        this.gasto.actualizarFecha(nuevaFecha);
        this.gasto.anyadirEtiquetas(...nuevasEtiquetas);

        repintar();
    };
    
}

let botonPresupuesto = document.getElementById("actualizarpresupuesto");

botonPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

let botonNuevoGasto = document.getElementById("anyadirgasto");

botonNuevoGasto.addEventListener("click", nuevoGastoWeb);


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};

