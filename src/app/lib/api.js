const BASE_URL = 'http://localhost:3001/api/productos';

export async function getProductos() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function getProducto(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
}

export async function createProducto(producto) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'Error al crear producto');
  }
  return res.json();
}

export async function updateProducto(id, producto) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  });
  return res.json();
}

export async function deleteProducto(id) {
  await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
}
