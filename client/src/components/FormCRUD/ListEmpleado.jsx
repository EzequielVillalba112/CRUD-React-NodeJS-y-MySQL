export default function ListEmpleado({emplados}) {
  return (
    <ul className="list-group">
      {
        emplados.map((emplado, i) =>{
            console.log(emplado);
            <li key={i} className="list-group-item">{emplado.nombre}</li>
        })
      }
    </ul>
  );
}
