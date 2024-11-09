window.onload = function() {
    cargarListado();    
};
const cargarListado = async () =>{
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
            
      const resp = await fetch("https://localhost:7269/api/Vuelos", requestOptions);     
      const { data } = await resp.json();
      console.log(data);      
      llenarTablar(data);
};

const addVuelo = () =>{
    location.href = '../html/createVuelo.html'
}

const llenarTablar = (data) =>{
    const tbody = document.getElementById('tblVuelos').getElementsByTagName('tbody')[0];
      tbody.innerHTML = '';

      // Recorrer el array de datos y agregar las filas a la tabla
      data.forEach(item => {
        // Crear una nueva fila <tr>
        const row = document.createElement('tr');
        
        const cellId = document.createElement('td');
        cellId.textContent = item.vueloId;
        row.appendChild(cellId);

        const cellCodigo = document.createElement('td');
        cellCodigo.textContent = item.codigo;
        row.appendChild(cellCodigo);

        const cellFecha = document.createElement('td');
        cellFecha.textContent = item.fecha;
        row.appendChild(cellFecha);

        const cellHora = document.createElement('td');
        cellHora.textContent = item.hora;
        row.appendChild(cellHora);

        const cellAerolinea = document.createElement('td');
        cellAerolinea.textContent = item.aerolinea;
        row.appendChild(cellAerolinea);

        const cellOrigen = document.createElement('td');
        cellOrigen.textContent = item.codigoOrigen;
        row.appendChild(cellOrigen);

        const cellDestino = document.createElement('td');
        cellDestino.textContent = item.codigoDestino;
        row.appendChild(cellDestino);

        // Agregar la fila al tbody
        tbody.appendChild(row);
    });
};