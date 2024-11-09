window.onload = function() {
    cargarListado();    
};
const cargarListado = async () =>{
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
            
      const resp = await fetch("https://localhost:7269/api/Itinerario", requestOptions);     
      const { data } = await resp.json();
      console.log(data);      
      llenarTablar(data);
};

const addItinerario = () =>{
    location.href = '../html/createItinerario.html'
}

const llenarTablar = (data) =>{
    const tbody = document.getElementById('tblItinerarios').getElementsByTagName('tbody')[0];
      tbody.innerHTML = '';

      // Recorrer el array de datos y agregar las filas a la tabla
      data.forEach(item => {
        // Crear una nueva fila <tr>
        const row = document.createElement('tr');
        
        const cellId = document.createElement('td');
        cellId.textContent = item.itinerarioId;
        row.appendChild(cellId);

        const cellNombre = document.createElement('td');
        cellNombre.textContent = item.nombre;
        row.appendChild(cellNombre);

        const cellFecha = document.createElement('td');
        cellFecha.textContent = item.fecha;
        row.appendChild(cellFecha);

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