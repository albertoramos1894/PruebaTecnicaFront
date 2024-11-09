
window.onload = function() {
    obtenerVuelos();    
    cargarAeropuertos();
};

const listadoVuelos = [];
const listVuelosAgregados = [];

const cargarAeropuertos = async () => {

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    const respAeropuertos = await fetch("https://localhost:7269/api/Catalogos/GetAeropuertos", requestOptions)
    const { data } = await respAeropuertos.json();    

    const selectOrigen = document.getElementById("selectOrigen");
    const selectDestino = document.getElementById("selectDestino");

    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.aeropuertoId;         // Establece el valor de la opción
        option.textContent = item.codigo; // Establece el texto de la opción
        selectOrigen.appendChild(option); // Añade la opción al select        
    });
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.aeropuertoId;         // Establece el valor de la opción
        option.textContent = item.codigo; // Establece el texto de la opción        
        selectDestino.appendChild(option);
    });
};

const cargaVuelo = () =>{
    let vueloId = document.getElementById("selectVuelos").value;
    
    let vuelo = listadoVuelos.find((element) => element.vueloId == vueloId);
    console.log(vuelo);
    detalleVuelo(vuelo);
}

const obtenerVuelos = async () =>{
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
            
      const resp = await fetch("https://localhost:7269/api/Vuelos", requestOptions);     
      const { data } = await resp.json();
      console.log(data);      
      
      const selectVuelos = document.getElementById("selectVuelos");      
    data.forEach(item => {
        listadoVuelos.push(item);
        const option = document.createElement("option");
        option.value = item.vueloId;         // Establece el valor de la opción
        option.textContent = item.codigo.concat(' ',item.codigoOrigen,'-',item.codigoDestino,' ',item.fecha); // Establece el texto de la opción
        selectVuelos.appendChild(option); // Añade la opción al select        
    });
};

const detalleVuelo = (vuelo) =>{
    

    const tbody = document.getElementById('tblVuelos').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    const row = document.createElement('tr');
        
    // const cellOrden = document.createElement('td');
    // cellOrden.textContent = listVuelosAgregados.length+1;
    // row.appendChild(cellOrden);    

    const cellCodigo = document.createElement('td');
    cellCodigo.textContent = vuelo.codigo;
    row.appendChild(cellCodigo);

    const cellFecha = document.createElement('td');
    cellFecha.textContent = vuelo.fecha;
    row.appendChild(cellFecha);

    const cellHora = document.createElement('td');
    cellHora.textContent = vuelo.hora;
    row.appendChild(cellHora);

    const cellAerolinea = document.createElement('td');
    cellAerolinea.textContent = vuelo.aerolinea;
    row.appendChild(cellAerolinea);

    const cellOrigen = document.createElement('td');
    cellOrigen.textContent = vuelo.codigoOrigen;
    row.appendChild(cellOrigen);

    const cellDestino = document.createElement('td');
    cellDestino.textContent = vuelo.codigoDestino;
    row.appendChild(cellDestino);


    tbody.appendChild(row);
};

const agregarVuelo = () =>{
    let vueloId = document.getElementById("selectVuelos").value;    
    let vuelo = listadoVuelos.find((element) => element.vueloId == vueloId);
    const orden = listVuelosAgregados.length+1;

    const itinerarioVuelo ={
        itininerarioId:0,
        vueloId: vuelo.vueloId,
        orden:orden
    };    

    const tbody = document.getElementById('tblVuelosAgregados').getElementsByTagName('tbody')[0];    

    const row = document.createElement('tr');
        
    const cellOrden = document.createElement('td');
    cellOrden.textContent = orden;
    row.appendChild(cellOrden);    

    const cellCodigo = document.createElement('td');
    cellCodigo.textContent = vuelo.codigo;
    row.appendChild(cellCodigo);

    const cellFecha = document.createElement('td');
    cellFecha.textContent = vuelo.fecha;
    row.appendChild(cellFecha);

    const cellHora = document.createElement('td');
    cellHora.textContent = vuelo.hora;
    row.appendChild(cellHora);

    const cellAerolinea = document.createElement('td');
    cellAerolinea.textContent = vuelo.aerolinea;
    row.appendChild(cellAerolinea);

    const cellOrigen = document.createElement('td');
    cellOrigen.textContent = vuelo.codigoOrigen;
    row.appendChild(cellOrigen);

    const cellDestino = document.createElement('td');
    cellDestino.textContent = vuelo.codigoDestino;
    row.appendChild(cellDestino);


    tbody.appendChild(row);

    listVuelosAgregados.push(itinerarioVuelo);
};

const guardarItinerario = async () => {
    const itinerario = {
        nombre: document.getElementById("inpNombre").value,
        origenId: document.getElementById("selectOrigen").value,
        destinoId: document.getElementById("selectDestino").value,
        fecha: document.getElementById("inpFecha").value        
    }

    const requestVuelo = {
        itinerario: itinerario,
        itinerarioVuelos: listVuelosAgregados
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = JSON.stringify(requestVuelo);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: data,
        redirect: "follow"
    };

    await fetch("https://localhost:7269/api/Itinerario", requestOptions)
    .then((response) => response.text())
    .then((result) => location.href = '../html/itinerarios.html' )
    .catch((error) => console.error(error));
};