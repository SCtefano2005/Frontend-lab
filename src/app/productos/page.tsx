'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Producto = {
  codProducto: number;
  nomPro: string;
  precioProducto: number;
  stockProducto: number;
};

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const router = useRouter();

  const fetchProductos = async () => {
    const res = await fetch('https://backend-lab-coello.onrender.com/api/productos');
    const data = await res.json();
    setProductos(data);
  };

  const eliminarProducto = async (codProducto: number) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    const res = await fetch(`https://backend-lab-coello.onrender.com/api/productos/${codProducto}`, {
      method: 'DELETE',
    });
    if (res.status === 204) {
      alert('Producto eliminado');
      fetchProductos();
    } else {
      const data = await res.json();
      alert('Error al eliminar: ' + data.message);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1>

      <button
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => router.push('/productos/new')}
      >
        + Agregar Producto
      </button>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Código</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Precio</th>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.codProducto} className="text-center">
              <td className="p-2 border">{prod.codProducto}</td>
              <td className="p-2 border">{prod.nomPro}</td>
              <td className="p-2 border">{prod.precioProducto}</td>
              <td className="p-2 border">{prod.stockProducto}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => router.push(`/productos/${prod.codProducto}/edit`)}
                  className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarProducto(prod.codProducto)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}

          {productos.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-center">
                No hay productos disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
