import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());

///Conexion db
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "empleados",
});

app.post("/create", (req, res) => {
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const cargo = req.body.cargo;
  const anio = req.body.anio;

  db.query(
    "INSERT INTO empleados(nombre, edad, cargo, anios) VALUES (?, ?, ?, ?)",
    [nombre, edad, cargo, anio],
    (error) => {
      if (error) {
        console.log(error);
      } else {
        res.send("Emplado registrado");
      }
    }
  );
});

app.get("/empleados", (req, res) => {
  db.query("SELECT * FROM empleados", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const cargo = req.body.cargo;
  const anio = req.body.anio;

  db.query(
    "UPDATE empleados SET nombre=?,edad=?,cargo=?,anios=? WHERE id=?",
    [nombre, edad, cargo, anio, id],
    (error) => {
      if (error) {
        console.log(error);
      } else {
        res.send("Emplado actualizado");
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
