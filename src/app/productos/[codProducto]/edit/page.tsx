'use client';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProducto, updateProducto } from '@/app/lib/api';

export default function EditarProducto() {
  const router = useRouter();
  const { codProducto } = useParams<{ codProducto: string }>();
  const [form, setForm] = useState({
    nomPro: '',
    precioProducto: '',
    stockProducto: '',
  });

  useEffect(() => {
    getProducto(codProducto).then(setForm);
  }, [codProducto]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProducto(codProducto, {
      ...form,
      precioProducto: parseFloat(form.precioProducto),
      stockProducto: parseInt(form.stockProducto),
    });
    router.push('/productos');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
      <input
        className="border p-2 w-full"
        placeholder="Nombre"
        value={form.nomPro}
        onChange={(e) => setForm({ ...form, nomPro: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        placeholder="Precio"
        type="number"
        step="0.01"
        value={form.precioProducto}
        onChange={(e) => setForm({ ...form, precioProducto: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        placeholder="Stock"
        type="number"
        value={form.stockProducto}
        onChange={(e) => setForm({ ...form, stockProducto: e.target.value })}
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Guardar Cambios
      </button>
    </form>
  );
}
