
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
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};

