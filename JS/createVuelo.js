window.onload = function() {    
    cargarAeropuertos();
    cargarCategorias();
    cargarAerolineas();
};

const costosVuelo = [];

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

const cargarAerolineas = async () => {

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    const respAerolineas = await fetch("https://localhost:7269/api/Catalogos/GetAerolineas", requestOptions)
    const { data } = await respAerolineas.json();    

    const selectAerolineas = document.getElementById("selectAerolinea");    

    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.aerolineaId;         // Establece el valor de la opción
        option.textContent = item.nombre; // Establece el texto de la opción
        selectAerolineas.appendChild(option); // Añade la opción al select        
    });
};

const cargarCategorias = async () => {

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    const respCategorias = await fetch("https://localhost:7269/api/Catalogos/GetCategorias", requestOptions)
    const { data } = await respCategorias.json();
    

    const selectCategorias = document.getElementById("selectCategoria");

    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.categoriaId;         // Establece el valor de la opción
        option.textContent = item.nombre; // Establece el texto de la opción
        selectCategorias.appendChild(option); // Añade la opción al select        
    });
};

const agregarCosto = () =>{

    const selectElement = document.getElementById("selectCategoria");
    const selectedText = selectElement.options[selectElement.selectedIndex].text;
    const costoPlaza = {
        NumeroPlazas: document.getElementById("inpNumPlazas").value,
        CategoriaId: selectElement.value,
        Costo: document.getElementById("inpCosto").value,
    }
    costosVuelo.push(costoPlaza);

    const tbody = document.getElementById('tblCostos').getElementsByTagName('tbody')[0];

    const row = document.createElement('tr');
        
    const cellNumPlazas = document.createElement('td');
    cellNumPlazas.textContent = costoPlaza.NumeroPlazas;
    row.appendChild(cellNumPlazas);    

    const cellCategoria = document.createElement('td');
    cellCategoria.textContent = selectedText;
    row.appendChild(cellCategoria);

    const cellCosto = document.createElement('td');
    cellCosto.textContent = costoPlaza.Costo;
    row.appendChild(cellCosto);

    tbody.appendChild(row);
};

const guardarVuelo = async () => {
    const vuelo = {
        aeropuertoOrigenId: document.getElementById("selectOrigen").value,
        aeropuertoDestinoId: document.getElementById("selectDestino").value,
        fecha: document.getElementById("inpFecha").value,
        hora: document.getElementById("inpHora").value+':00.0000',
        aerolineaId: document.getElementById("selectAerolinea").value,
    }

    const requestVuelo = {
        vuelo: vuelo,
        costos: costosVuelo
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

    await fetch("https://localhost:7269/api/Vuelos", requestOptions)
    .then((response) => response.text())
    .then((result) => location.href = '../html/vuelos.html' )
    .catch((error) => console.error(error));
};