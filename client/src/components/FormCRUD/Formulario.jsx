import "./Formulario.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdDelete } from "react-icons/md";
import { PiNotePencilLight } from "react-icons/pi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaSearch } from "react-icons/fa";
import ListEmpleado from "./ListEmpleado";

const notificacion = withReactContent(Swal);

export default function Formulario() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState("");
  const [id, setId] = useState("");

  const [editar, setEditar] = useState(false);

  const [empladosList, setEmpleadosList] = useState([]);
  const [busqueda, setBusqueda] = useState("");


  const add = () => {
    Axios.post(`http://localhost:3000/create`, {
      nombre: nombre,
      edad: edad,
      cargo: cargo,
      anio: anios,
    }).then(() => {
      notificacion.fire({
        title: "Se guardo de forma correcta!",
        icon: "success",
        background: "#000",
        color: "#fff",
        confirmButtonColor: "#29C716",
      });
    });
    limpiarCampos();
  };

  const update = () => {
    Axios.put(`http://localhost:3000/update`, {
      id: id,
      nombre: nombre,
      edad: edad,
      cargo: cargo,
      anio: anios,
    }).then(() => {
      notificacion.fire({
        title: "Se modifico de forma correcta!",
        icon: "success",
        background: "#000",
        color: "#fff",
        confirmButtonColor: "#29C716",
      });
    });
    limpiarCampos();
  };

  const eliminarEmpleado = (id) => {
    notificacion
      .fire({
        title: "Desea eliminar el empleado?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Si",
        denyButtonText: `no`,
        background: "#000",
        color: "#fff",
        confirmButtonColor: "#29C716",
      })
      .then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Axios.delete(`http://localhost:3000/delete/${id}`)
            .then(() => {
              Swal.fire({
                title: "Empleado Eliminado",
                icon: "success",
                background: "#000",
                color: "#fff",
                confirmButtonColor: "#29C716",
              });
            })
            .catch(function (error) {
              notificacion.fire({
                icon: "error",
                title: "Oops...",
                text: "No se pudo eliminar el empleado",
                background: "#000",
                color: "#fff",
              });
            });
        } else if (result.isDenied) {
          Swal.fire({
            title: "No se elimino ningun empleado",
            icon: "info",
            background: "#000",
            color: "#fff",
            confirmButtonColor: "#29C716",
          });
        }
      });
  };

  useEffect(() => {
    Axios.get(`http://localhost:3000/empleados`).then((response) => {
      setEmpleadosList(response.data);
    });
  }, [busqueda == ""]);

  const buscarEmpl = (empleado = "") => {
    if(empleado != ""){
      fetch(`http://localhost:3000/buscar/${empleado}`)
      .then((r) => {
        return r.json();
      })
      .then((response) => {
       setEmpleadosList(response)
      });
    }
  };

  const editarEmpleado = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setEdad(val.edad);
    setCargo(val.cargo);
    setAnios(val.anios);
    setId(val.id);
  };

  const cancelarEdit = () => {
    setEditar(!editar);
    limpiarCampos();
  };

  const limpiarCampos = () => {
    setNombre("");
    setEdad("");
    setCargo("");
    setAnios("");
  };

  return (
    <div className="container mt-2" data-bs-theme="dark">
      <div className="card text-center">
        <div className="card-header text-uppercase ">Gestión de empleados</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre:
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
              }}
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Edad:
            </span>
            <input
              type="number"
              className="form-control"
              placeholder="Edad"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={edad}
              onChange={(e) => {
                setEdad(e.target.value);
              }}
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Cargo:
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Cargo"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={cargo}
              onChange={(e) => {
                setCargo(e.target.value);
              }}
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Años de experiencia:
            </span>
            <input
              type="number"
              className="form-control"
              placeholder="Año"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={anios}
              onChange={(e) => {
                setAnios(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          {editar === true ? (
            <>
              <button onClick={update} className="btn btn-warning">
                Editar
              </button>
              <button onClick={cancelarEdit} className="btn btn-danger m-lg-2">
                Cancelar
              </button>
            </>
          ) : (
            <button onClick={add} className="btn btn-success">
              Guardar
            </button>
          )}
        </div>
      </div>

      <div className="input-group mb-3 mt-4 ">
        <input
          type="text"
          onChange={(e) => {
            buscarEmpl(e.target.value);
            setBusqueda(e.target.value);
          }}
          className="form-control"
          placeholder="Buscar por nombre"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
        />
        <button
          className="btn  btn-primary"
          type="button"
          id="button-addon2"
         
        >
          <FaSearch color="#ffff" />
        </button>
      </div>

     

      <table className="table table-striped-columns text-center mt-4 ">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">NOMBRE</th>
            <th scope="col">EDAD</th>
            <th scope="col">CARGO</th>
            <th scope="col">EXPERIENCIA</th>
            <th scope="col">OPCIONES</th>
          </tr>
        </thead>
        <tbody>
          {empladosList.map((emplado, i) => (
            <tr key={i}>
              <th scope="row">{emplado.id}</th>
              <td>{emplado.nombre}</td>
              <td>{emplado.edad}</td>
              <td>{emplado.cargo}</td>
              <td>{emplado.anios}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    editarEmpleado(emplado);
                  }}
                >
                  <PiNotePencilLight size="1.5em" />
                </button>
                <button
                  className="btn btn-danger m-lg-2 "
                  onClick={() => {
                    eliminarEmpleado(emplado.id);
                  }}
                >
                  <MdDelete size="1.5em" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="list"></div>
    </div>
  );
}
