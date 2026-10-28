var presupuesto = 0;

function actualizarPresupuesto(valor) {
    if (!Number.isNaN(Number(valor)) && valor >= 0) {
        presupuesto = Number(valor);
        return presupuesto;
    } else {
        console.log("Presupuesto no valido")
        return -1;
    }
}

function mostrarPresupuesto() {
    let texto = `Tu presupuesto actual es de ${presupuesto} €`;
    return texto;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    if (!Number.isNaN(Number(valor)) && valor >= 0) {
        this.valor = Number(valor);
    } else {
        console.log("Gasto no valido");
        this.valor = 0;
    }
    if (!Number.isNaN(Date.parse(fecha))) {
        this.fecha = Date.parse(fecha);
    } else {
        this.fecha = Date.now();
    }
    this.etiquetas = [];
    this.anyadirEtiquetas(...etiquetas);

    this.obtenerPeriodoAgrupacion = function (periodo) {

        let fecha = new Date(this.fecha);
        let fechaTexto = fecha.toISOString();

        if (periodo === "dia") {
            return fechaTexto.substring(0, 10);
        }

        if (periodo === "mes") {
            return fechaTexto.substring(0, 7);
        }

        if (periodo === "anyo") {
            return fechaTexto.substring(0, 4);
        }
    };
}

CrearGasto.prototype.mostrarGasto = function () {
    let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    return texto;
}

CrearGasto.prototype.actualizarDescripcion = function (nuevaDescripcion) {
    this.descripcion = nuevaDescripcion;
};

CrearGasto.prototype.actualizarValor = function (nuevoValor) {
    if (!Number.isNaN(Number(nuevoValor)) && nuevoValor >= 0) {
        this.valor = Number(nuevoValor);
    } else {
        console.log("Gasto no valido");
    }
}

CrearGasto.prototype.anyadirEtiquetas = function (...nuevasEtiquetas) {
    for (let etiqueta of nuevasEtiquetas) {
        if (!this.etiquetas.includes(etiqueta)) {
            this.etiquetas.push(etiqueta);
        }
    }
}

CrearGasto.prototype.actualizarFecha = function (nuevaFecha) {
    if (!Number.isNaN(Date.parse(nuevaFecha))) {
        this.fecha = Date.parse(nuevaFecha);
    }
}

CrearGasto.prototype.borrarEtiquetas = function (...etiquetasBorrar) {
    this.etiquetas = this.etiquetas.filter(function (etiqueta) {
        return !etiquetasBorrar.includes(etiqueta);
    });
}

let gastos = [];
let idGasto = 0;

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    gastos = gastos.filter(function (gastos) {
        return gastos.id !== id;
    });
}

function calcularTotalGastos() {
    let total = 0;
    for (let gasto of gastos) {
        total += gasto.valor;
    }
    return total;
}

function calcularBalance() {
    let balance = presupuesto - calcularTotalGastos();
    return balance;
}

CrearGasto.prototype.mostrarGastoCompleto = function () {
    let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
    let fechaTexto = new Date(this.fecha).toLocaleString();
    texto += `Fecha: ${fechaTexto}\n`;
    texto += "Etiquetas:\n";
    for (let etiqueta of this.etiquetas) {
        texto += `- ${etiqueta}\n`;
    }
    return texto;
};

function filtrarGastos(filtros) {

    let resultado = gastos.filter(gasto => {

        if (filtros.fechaDesde) {
            if (gasto.fecha < Date.parse(filtros.fechaDesde)) {
                return false;
            }
        }

        if (filtros.fechaHasta) {
            if (gasto.fecha > Date.parse(filtros.fechaHasta)) {
                return false;
            }
        }

        if (filtros.valorMinimo) {
            if (gasto.valor < filtros.valorMinimo) {
                return false
            }
        }
        if (filtros.valorMaximo) {
            if (gasto.valor > filtros.valorMaximo) {
                return false
            }
        }
        if (filtros.descripcionContiene) {
            if (!gasto.descripcion.toLowerCase().includes(filtros.descripcionContiene.toLowerCase())) {
                return false;
            }
        }
        if (filtros.etiquetasTiene && filtros.etiquetasTiene.length > 0) {

            let coincidencias = gasto.etiquetas.filter(etiqueta => filtros.etiquetasTiene.includes(etiqueta));

            if (coincidencias.length === 0) {
                return false;
            }
        }

        return true;

    });

    return resultado;
}






function agruparGastos(
    periodo = "mes",
    etiquetas = [],
    fechaDesde,
    fechaHasta
) {


    let gastosFiltrados = filtrarGastos({
        etiquetasTiene: etiquetas,
        fechaDesde: fechaDesde,
        fechaHasta: fechaHasta
    });

    let resultado = gastosFiltrados.reduce((acc, gasto) => {


        let periodoGasto = gasto.obtenerPeriodoAgrupacion(periodo);


        if (acc[periodoGasto] === undefined) {
            acc[periodoGasto] = 0;
        }


        acc[periodoGasto] += gasto.valor;


        return acc;

    }, {});


    return resultado;
}



// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos,
}
