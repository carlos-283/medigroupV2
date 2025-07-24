
"use client"

import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useParams } from 'next/navigation'

export default function SignUpPage() {

  const id = useParams().id

  let editando = false;

  if (id > 0) {
    editando = true;
  }

  const [medData, setMedData] = useState({
    nombre: '',
    categoria: '',
    cantidad: 1,
    fecha_expiracion: format(new Date(), 'yyyy-MM-dd')
  });

  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    const { name, value, type } = e.target;

    let newValue

    if (type == 'number') {
      newValue = parseInt(value, 10) || ""
    }
    else
      newValue = value;

    setMedData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const validate = () => {

    const newErrors = {};

    if (!medData.nombre.trim()) {
      newErrors.nombre = "Nombre es requerido";
    }

    if (!medData.cantidad) {
      newErrors.cantidad = "Cantidad es requerida";
    }
    else
      if (medData.cantidad < 1) {
        newErrors.cantidad = "Cantidad debe ser mayor a 1";
      }

    if (!medData.categoria) {
      newErrors.categoria = "Categoria es requerida";
    }

    if (!medData.fecha_expiracion) {
      newErrors.fecha_expiracion = "fecha es requerida";
    }
    return newErrors;
  };

  const handleSubmit = async () => {
    try {
      const validationErrors = validate();

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        alert("Campos invalidos");
        return;
      }

      alert( (editando ? "Edicion" : "Creacion") + " de medicamento exitosa");

      if (editando)
        await axios.put('/api/medicamentos/' + id, medData);
      else
        await axios.post('/api/medicamentos', medData);
      window.location.href = 'http://localhost:3000/medicamentos';
    } catch (e) {
      console.log("error")
      console.log(e);

    }

  };

  useEffect(() => {

    if (editando) {

      (async () => {
        try {
          const { data } = await axios.get('/api/medicamentos/' + id, {})
          data.fecha_expiracion = format(new Date(data.fecha_expiracion), 'yyyy-MM-dd')

          setMedData(data)
        }
        catch (e) {
          console.log(e)
        }
      })()


    }

  }, []);


  return (
    <>
      <Head>
        <title></title>
      </Head>

      <div className="bg-stone-800">
        <button
          onClick={() => { window.location.href = 'http://localhost:3000/medicamentos' }}
          className="px-4 py-2 text-white rounded hover:bg-blue-700 transition"
        >
          ⬅ Volver
        </button>
      </div>

      <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">

        <div className="relative flex flex-col rounded-xl bg-white p-8 shadow-lg max-w-md w-full">
          <h4 className="text-xl font-medium text-slate-800 mb-1">{editando ? "Editar" : "Nuevo"} medicamento</h4>
          <p className="text-slate-500 font-light mb-6">

          </p>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-6 mb-4">
              <div>
                <label className="block mb-2 text-sm text-slate-600">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={medData.nombre}
                  onChange={handleChange}
                  placeholder="Nombre del medicamento"
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                />
                {errors.nombre && <p style={{ color: "red" }}>{errors.nombre}</p>}

              </div>
              <div>
                <label className="block mb-2 text-sm text-slate-600">Categoria</label>


                <select id="countries"
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  onChange={handleChange}
                  name={"categoria"}
                  value={medData.categoria}
                >
                  <option value="">Elige una de las siguientes opciones</option>
                  <option value="Analgésico">Analgésico</option>
                  <option value="Antibiótico">Antibiótico</option>
                  <option value="Antiinflamatorio">Antiinflamatorio</option>
                  <option value="Antihistamínicos">Antihipertensivos</option>
                  <option value="Antihipertensivos">Antihipertensivos</option>
                </select>
                {errors.categoria && <p style={{ color: "red" }}>{errors.categoria}</p>}






              </div>
              <div>
                <label className="block mb-2 text-sm text-slate-600">Cantidad</label>
                <input
                  type="number"
                  min="1"
                  name="cantidad"
                  value={medData.cantidad}
                  onChange={handleChange}
                  placeholder="Cantidad de medicamentos en stock"
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                />
                {errors.cantidad && <p style={{ color: "red" }}>{errors.cantidad}</p>}

              </div>

              <div>
                <label className="block mb-2 text-sm text-slate-600">Fecha de caducidad</label>

                <input
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  type="date"
                  id="date"
                  name="fecha_expiracion"
                  value={medData.fecha_expiracion}
                  onChange={handleChange}
                />
                {errors.fecha_expiracion && <p style={{ color: "red" }}>{errors.fecha_expiracion}</p>}

              </div>


            </div>


            <button
              type="button"
              onClick={
                (e) => {
                  handleSubmit(e)
                }

              }
              className="w-full bg-slate-800 text-white text-sm py-2 px-4 mt-2 rounded-md transition-all shadow-md hover:shadow-lg focus:bg-slate-700 hover:bg-slate-700"
            >Finalizar
              {editando ? " edicion" : " creacion"}
            </button>


          </form>
        </div>
      </main>
    </>
  );
}
