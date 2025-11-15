import { obtenerCarrito } from "./storage.js";
import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";

const renderizarCarrito = () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  const contenedor = document.getElementById("contenedor-carrito");
  const divAcciones = document.getElementById("acciones-carrito");

  contenedor.innerHTML = "";
  divAcciones.innerHTML = "";

  if (!carrito.length) {
    const mensaje = document.createElement("p");
    mensaje.classList.add("mensaje-carrito-vacio");
    mensaje.textContent = "No hay productos en el carrito";
    contenedor.appendChild(mensaje);

    // Actualizar resumen a 0
    document.getElementById("subtotal").textContent = "$0";
    document.getElementById("total").textContent = "$0";
    return;
  }

  for (const [indice, producto] of carrito.entries()) {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("product-card");

    const img = document.createElement("img");
    img.src = `../${producto.img}`;
    img.alt = producto.nombre;

    const info = document.createElement("div");
    info.classList.add("product-info");

    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;

    const descripcion = document.createElement("p");
    descripcion.classList.add("description");
    descripcion.textContent = producto.descripcion;

    const precio = document.createElement("p");
    precio.classList.add("price");
    precio.textContent = `$${producto.precio.toLocaleString()}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn-card");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => {
      eliminarProducto(indice);
      renderizarCarrito();
    });

    info.appendChild(titulo);
    info.appendChild(descripcion);
    info.appendChild(precio);
    info.appendChild(btnEliminar);

    tarjeta.appendChild(img);
    tarjeta.appendChild(info);

    contenedor.appendChild(tarjeta);
  }

  // Calcular total DENTRO de la función
  const total = carrito.reduce((sum, prod) => sum + prod.precio, 0);

  // Actualizar resumen
  document.getElementById(
    "subtotal"
  ).textContent = `$${total.toLocaleString()}`;
  document.getElementById("total").textContent = `$${total.toLocaleString()}`;

  // Botón finalizar compra
  const btnFinalizar = document.getElementById("btn-finalizar");
  if (btnFinalizar) {
    // Remover event listeners anteriores clonando el botón
    const nuevoBtn = btnFinalizar.cloneNode(true);
    btnFinalizar.parentNode.replaceChild(nuevoBtn, btnFinalizar);

    nuevoBtn.addEventListener("click", () => {
      const mensaje = `Hola! Quiero comprar:\n${carrito
        .map((p) => `- ${p.nombre} ($${p.precio.toLocaleString()})`)
        .join("\n")}\nTotal: $${total.toLocaleString()}`;
      window.open(
        `https://wa.me/5493513910797?text=${encodeURIComponent(mensaje)}`,
        "_blank"
      );
    });
  }

  const btnVaciar = document.createElement("button");
  btnVaciar.classList.add("btn-primary");
  btnVaciar.textContent = "Vaciar carrito";
  btnVaciar.addEventListener("click", () => {
    vaciarCarrito();
    renderizarCarrito();
  });

  divAcciones.appendChild(btnVaciar);
};

document.addEventListener("DOMContentLoaded", renderizarCarrito);
