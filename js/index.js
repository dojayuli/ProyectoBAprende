import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-tarjetas");

  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  fetch("./data/productos.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error HTTP status ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      for (const producto of data) {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("product-card");

        const img = document.createElement("img");
        img.src = producto.img;
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

        const boton = document.createElement("button");
        boton.classList.add("btn-card");
        boton.textContent = "Comprar Ahora";

        boton.addEventListener("click", () => {
          agregarAlCarrito(producto);
        });

        info.appendChild(titulo);
        info.appendChild(descripcion);
        info.appendChild(precio);
        info.appendChild(boton);

        tarjeta.appendChild(img);
        tarjeta.appendChild(info);

        contenedor.appendChild(tarjeta);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
