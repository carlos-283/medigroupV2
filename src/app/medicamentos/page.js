"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import SearchBar from "../../components/SearchBar"
import axios from 'axios';

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchItems();
  }, [searchQuery]);

  const fetchItems = async () => {
    try {

      let response = await axios.get('/api/medicamentos', {
        params: {
          nombre: searchQuery,
        }
      })


      const {data} = response
      setItems(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching items:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/items/${id}`, {
        method: 'DELETE',
      });
      fetchItems(); // Refresh the list
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-5 ">
      <h1 className="text-3xl font-bold mb-6">Gestor de inventario medigroup®</h1>

      <div className='flex justify-between'>

        <SearchBar 
        
        buttonAction={ (query) => {
          console.log(query)
          setSearchQuery(query)}
           }
           
           />

        <Link href="medicamentos/nuevo">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4">
            Agregar medicamento
          </button>
        </Link>
      </div>


      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <div className="overflow-x-auto">


          <table className="min-w-full bg-red border border-gray-500">
            <thead>
              <tr>
                <th className="text-left py-2 px-4 border-b">ID</th>
                <th className="text-left py-2 px-4 border-b">Nombre</th>
                <th className="text-left py-2 px-4 border-b">Categoria</th>
                <th className="text-left py-2 px-4 border-b">Cantidad</th>
                <th className="text-left py-2 px-4 border-b">Fecha expiracion</th>
                <th className="text-left py-2 px-4 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 px-4 border-b">{item.id}</td>
                  <td className="py-2 px-4 border-b">{item.nombre}</td>
                  <td className="py-2 px-4 border-b">{item.categoria}</td>
                  <td className="py-2 px-4 border-b">{item.cantidad}</td>
                  <td className="py-2 px-4 border-b">{format(new Date(item.fecha_expiracion), "PPP", { locale: es })}</td>

                  <td className="py-2 px-4 border-b">
                    <Link href={`medicamentos/${item.id}`}>
                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}