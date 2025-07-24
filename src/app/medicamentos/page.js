"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { formatInTimeZone } from "date-fns-tz";
import { es } from 'date-fns/locale';
import SearchBar from "../../components/SearchBar"
import axios from 'axios';

import DeleteModal from '../../components/DeleteModal'

export default function Home() {

  const [currentId, setCurrentId] = useState(0);
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    categoria: null,
    fecha_expiracion: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [searchQuery, filters]);

  const fetchItems = async () => {
    try {
      let response = await axios.get('/api/medicamentos', {
        params: {
          nombre: searchQuery,
          categoria: filters.categoria,
          fecha_expiracion: filters.fecha_expiracion,
        }
      })


      const { data } = response
      setItems(data);
    } catch (error) {
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete('/api/medicamentos/' + currentId, {})
      fetchItems()
    } catch (error) {
    }
  };

  const handleChangeFilters = (e) => {
    const { name, value, type } = e.target;

    let newValue = value;

    setFilters((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };
  

  return (
    <><div className="container mx-auto px-4 py-8 space-y-5 h-full bg-stone-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Gestor de inventario medigroup®</h1>

      <div className='flex justify-between'>

        <div className='flex space-x-4'>
          <SearchBar

            buttonAction={(query) => {
              console.log(query);
              setSearchQuery(query);
            }} />

          <select
            onChange={handleChangeFilters}
            name="categoria" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-9">
            <option value="">Categoria</option>
            <option value="Analgésicos">Analgésicos</option>
            <option value="Antibiótico">Antibiótico</option>
            <option value="Antiinflamatorio">Antiinflamatorio</option>
            <option value="Antihistamínicos">Antihistamínicos</option>
            <option value="Antihipertensivos">Antihipertensivos</option>
          </select>


          <input
            className="w-full max-h-9 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            type="date"
            id="date"
            name="fecha_expiracion"
            onChange={handleChangeFilters} />
        </div>



        <Link href="medicamentos/0">
          <button className="bg-slate-800 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4">
            Agregar medicamento
          </button>
        </Link>
      </div>

      {items.length === 0 ? (
        <p>No hay medicamentos en existencia</p>
      ) : (
        <div>
          <div className="rounded-sm overflow-x-auto max-h-90">
            <table className="rounded-sm bg-gray-300 min-w-full border border-gray-500">
              <thead className="bg-blue-500 text-white uppercase text-xs tracking-wider">
                <tr>
                  <th className="text-left py-2 px-4 border-b">ID</th>
                  <th className="text-left py-2 px-4 border-b">Nombre</th>
                  <th className="text-left py-2 px-4 border-b">Categoria</th>
                  <th className="text-left py-2 px-4 border-b">Cantidad</th>
                  <th className="text-left py-2 px-4 border-b">Fecha expiracion</th>
                  <th className="text-left py-2 px-4 border-b"></th>
                </tr>
              </thead>
              <tbody >
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2 px-4 border-b">{item.id}</td>
                    <td className="py-2 px-4 border-b">{item.nombre}</td>
                    <td className="py-2 px-4 border-b">{item.categoria}</td>
                    <td className="py-2 px-4 border-b">{item.cantidad}</td>
                    <td className="py-2 px-4 border-b">{formatInTimeZone(item.fecha_expiracion, "UTC", "PPP", { locale: es })}</td>

                    <td className="py-2 px-4 border-b">
                      <Link href={`medicamentos/${item.id}`}>
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2">
                          Editar
                        </button>
                      </Link>
                      <button
                        onClick={() => {setIsModalOpen(true);setCurrentId(item.id)}}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div><DeleteModal
        isOpen={isModalOpen}
        acceptButton={() => {handleDelete(currentId);setIsModalOpen(false);}}
        closeButton={() => {setIsModalOpen(false); setCurrentId(0)} }
        cancelButtton={() => { setIsModalOpen(false);setCurrentId(0)}}
      /></>

  );
}