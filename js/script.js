let productos = [
    { id: 1, nombre: "Anillo de oro", categoria: "anillo", stock: 5, precio: 5000, rutaImagen: "anillos1.jpeg" },
    { id: 2, nombre: "Aros de oro", categoria: "aros", stock: 7, precio: 2650, rutaImagen: "aros.jpeg" },
    { id: 3, nombre: "Collar de oro 1", categoria: "collar", stock: 4, precio: 4500, rutaImagen: "collar2.jpeg" },
    { id: 4, nombre: "aros", categoria: "aros", stock: 3, precio: 2800, rutaImagen: "aros2.jpeg" },
    { id: 5, nombre: "pulsera", categoria: "pulsera", stock: 3, precio: 5300, rutaImagen: "pulsera.jpeg" },
    { id: 6, nombre: "Set de oro rosado", categoria: "set", stock: 3, precio: 7600, rutaImagen: "set2.jpeg" },
    { id: 7, nombre: "collar", categoria: "collar", stock: 7, precio: 2650, rutaImagen: "collar10.jpg" },
    { id: 8, nombre: "set", categoria: "set", stock: 7, precio: 8650, rutaImagen: "set1.jpeg" },
  ];
let cartRecover = localStorage.getItem("carrito");
let cart = cartRecover ? JSON.parse(cartRecover) : []

//Nuevos Items

//Renderizar tarjetas nuevos productos
function renderizarProductos(productos){
    let contenedor = document.getElementById("contenedorProductos");
    //antes de comenzar a crear los elementos, limpio el contenedor
    contenedor.innerHTML = "";
    //aca los creo
    productos.forEach(producto => {
        let tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta"
    
        tarjeta.innerHTML = `<h3>${producto.nombre}</h3>
        <img class=imgProducto src=./images/${producto.rutaImagen} />
        <p class=precio>$${producto.precio}</p>
        <button class=btn id=${producto.id}>Agregar al carrito </button>`;

        contenedor.appendChild(tarjeta);

        

        let botonAgregarAlCarrito = document.getElementById(producto.id);
        botonAgregarAlCarrito.addEventListener("click", () => {
            agregarAlCarrito(productos, cart, producto.id);
        });
        //botonAgregarAlCarrito.addEventListener("click", (e) => agregarProductoAlCarrito(productos, carrito, e));
    });
};
//Carrousel de Nuevos Items
let indice = 0; 
function llenarCarrusel() {
  const carrousel = document.getElementById("contenedorProductos");
  carrousel.innerHTML = "";

  for (let i = indice; i < indice + 3; i++) {
    if (i >= 0 && i < productos.length) {
      const producto = productos[i];
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjeta-productos");
      //tarjeta.className = "tarjeta-productos"
      tarjeta.innerHTML = `
      <img class=imgProducto src=/img/${producto.rutaImagen} />
       <div class="tarjeta-producto-cuerpo">
         <h4 class="tarjeta-producto-titulo">${producto.nombre}</h4>
         <p class="tarjeta-produto-precio">$${producto.precio}</p>
         <button class="btn-agregar-al-carrito" id=${producto.id}>
          AGREGAR AL CARRITO </button>
       </div>`;
      carrousel.appendChild(tarjeta);

      let botonAgregarAlCarrito = document.getElementById(producto.id);
        //botonAgregarAlCarrito.addEventListener("click", agregarAlCarrito);
        botonAgregarAlCarrito.addEventListener("click", () => agregarAlCarrito(productos, cart, producto.id));
    }
  }
}
function avanzarCarrusel() {
    indice += 3;
  if (indice >= productos.length) {
    indice = 0;
  }
  llenarCarrusel();
}
function retrocederCarrusel() {
    indice -= 3;
  if (indice < 0) {
    indice = Math.floor((productos.length - 1) / 3) * 3;
  }
  llenarCarrusel();
}
document.getElementById("btn-siguiente").addEventListener("click", avanzarCarrusel);
document.getElementById("btn-anterior").addEventListener("click", retrocederCarrusel);
//Llenar el carrusel al cargar la página
llenarCarrusel();


//Tienda
//Creo las tarjetas de la tienda
function CrearTarjetas(productos, cart) {
    let productosC = document.getElementById("productos")
    productosC.innerHTML = "";

    if (productos.length === 0) {
        // No se encontraron productos, muestra el mensaje
        let noExistenProductos = document.getElementById("no-products-message");
        noExistenProductos.style.display = "block";
    } else {
        // Hay productos para mostrar, oculta el mensaje
        let noExistenProductos = document.getElementById("no-products-message");
        noExistenProductos.style.display = "none";

        productos.forEach(({ nombre, precio, categoria, rutaImagen, id }) => {
            let colDiv = document.createElement("div");
            colDiv.className = "col";

            let cardProducto = document.createElement("div");
            cardProducto.className = "card h-100 tarjeta-tienda";

            let cardImage = document.createElement("img");
            cardImage.className = "card-img-top";
            cardImage.src = `/img/${rutaImagen}`;

            let cardBody = document.createElement("div");
            cardBody.className = "card-body";

            let titulo = document.createElement("h3");
            titulo.textContent = nombre;

            let categoriaC = document.createElement("h5");
            categoriaC.textContent = categoria;

            cardBody.appendChild(titulo);
            cardBody.appendChild(categoriaC);

                let precioTexto = document.createElement("p");
                precioTexto.textContent = `$${precio}`;

                let AgregarBoton = document.createElement("button");
                AgregarBoton.className = "btn-agregar  btn-sm";
                AgregarBoton.innerHTML = `Agregar al carrito <i class="fa-solid fa-cart-shopping"></i>`;

                AgregarBoton.addEventListener("click", () => {
                    agregarAlCarrito(productos, cart, id, null);
                })

                cardBody.appendChild(precioTexto);
                cardBody.appendChild(AgregarBoton);
            

            cardProducto.appendChild(cardImage);
            cardProducto.appendChild(cardBody);

            colDiv.appendChild(cardProducto);
            productosC.appendChild(colDiv);
        })
    }
}
// Filtro para categorias laterales
function generarOpcionesCategoria(productos) {
    const categoriaFiltro = document.getElementById("categoria-filtro");
    const categorias = [...new Set(productos.map((producto) => producto.categoria))];

    categorias.forEach((categoria) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<label><input type="checkbox" value="${categoria}"> ${categoria}</label>`
        categoriaFiltro.appendChild(listItem);
    })
}
//Para cargar el filtro categorias
document.addEventListener("DOMContentLoaded", () => {
    generarOpcionesCategoria(productos);
    const aplicarFiltrosBtn = document.getElementById("aplicar-filtros")
    const limpiarFiltrosBtn = document.getElementById("limpiar-filtros")

// Para obtener los valores seleccionados para categoría y rango de precios
    aplicarFiltrosBtn.addEventListener("click", () => {
        const categoriaSeleccionada = Array.from(document.querySelectorAll("#categoria-filtro input:checked")).map(
            (checkbox) => checkbox.value
        );
        const precioMin = document.getElementById("precio-min").value;
        const precioMax = document.getElementById("precio-max").value;

        // Filtrar productos 
        const productosFiltrados = productos.filter((producto) => {
            const categoriaCoincide = categoriaSeleccionada.length === 0 || categoriaSeleccionada.includes(producto.categoria);
            const precioCoincide = (!precioMin || producto.precio >= precioMin) && (!precioMax || producto.precio <= precioMax);
            return categoriaCoincide && precioCoincide;
        });

        // Actualizar la lista de productos con los productos filtrados
        createCards(productosFiltrados, cart);
    })
    // Para limpiar los valores de categoría y rango de precios
    limpiarFiltrosBtn.addEventListener("click", () => {
        document.querySelectorAll("#categoria-filtro input:checked").forEach((checkbox) => (checkbox.checked = false));
        document.getElementById("precio-min").value = "";
        document.getElementById("precio-max").value = "";
        // Restablecer la lista de productos mostrando todos los productos
        CrearTarjetas(productos, cart);
    })
})
//


//Carrito
function updatearCarrito() {
    let btnCart = document.getElementById("cartUpdate");
    let cartCounter = btnCart.querySelector(".badge");

    if (cart.length > 0) {
        btnCart.classList.remove("d-none");
        if (!cartCounter) {
            cartCounter = document.createElement("span");
            cartCounter.className = "badge text-bg-warning";
            btnCart.appendChild(cartCounter);
        }
        cartCounter.textContent = cart.reduce((total, producto) => total + producto.unidades, 0);
    } else {
        btnCart.classList.add("d-none");
        if (cartCounter) {
            cartCounter.remove();
        }
    }

    // Función para lanzar modal con productos agregados
    btnCart.addEventListener("click", () => {
        verCarrito();
    })
}
function verCarrito() {
    let modalCart = document.getElementById("cartModal");
    let modalBody = modalCart.querySelector(".modal-body");

    // Borrar el contenido actual del modal
    modalBody.innerHTML = "";

    // Inicializamos la variable para calcular el total
    let total = 0;

    cart.forEach((producto) => {
        let productoDiv = document.createElement("div");
        productoDiv.className = "mb-2";

        // Agregar la imagen del producto
        let imagenProducto = document.createElement("img");
        imagenProducto.src = `/img/${producto.rutaImagen}`;
        imagenProducto.className = "cart-product-image";
        productoDiv.appendChild(imagenProducto);

        // Agregar el nombre del producto
        let nombreProducto = document.createElement("span");
        nombreProducto.textContent = producto.nombre;
        nombreProducto.className = "cart-product-name";
        productoDiv.appendChild(nombreProducto);

        // Agregar la cantidad
        let cantidadProducto = document.createElement("span");
        cantidadProducto.textContent = `Cantidad: ${producto.unidades}`;
        cantidadProducto.className = "cart-product-quantity";
        productoDiv.appendChild(cantidadProducto);

        // Calcular y agregar el subtotal
        let subtotalProducto = document.createElement("span");
        subtotalProducto.textContent = `Subtotal: $${producto.subtotal}`,
        subtotalProducto.className = "cart-product-subtotal";
        productoDiv.appendChild(subtotalProducto);

        // Actualizar el total
        total += producto.subtotal;

        modalBody.appendChild(productoDiv);
    })

    // Agregar el total al final
    let totalDiv = document.createElement("div");
    totalDiv.className = "cart-total";
    totalDiv.textContent = `Total: $${total}`;
    modalBody.appendChild(totalDiv);


}
function comprar() {
    let btnComprar = document.getElementById("comprar");
    btnComprar.addEventListener("click", () => {
        // Borramos los productos del carrito y localmente
        cart = []; // Borra el carrito en memoria
        localStorage.removeItem("cart");// Borra el carrito en el almacenamiento local
        updatearCarrito(); // Actualiza el contador del carrito
    
        let modalCart = document.getElementById("cartModal");
        let modalBody = modalCart.querySelector(".modal-body");
    
        // Borrar el contenido actual del modal
        modalBody.innerHTML = `Gracias por tu compra`;

        // Recargar la página
        setTimeout(() => {
            location.reload();
        }, 2000)
    })
}
//para limpiar el carrito
function resetProducts() {
    let searchInput = document.getElementById("form-imput-search");
    searchInput.value = "";
    createCards(productos, cart);
}

function agregarAlCarrito(productos, cart, id) {
    let productoBuscado = productos.find(producto => producto.id === Number(id));
    let productoEnCarrito = cart.find(producto => producto.id === productoBuscado.id);

    if (productoBuscado.stock > 0) {
        if (productoEnCarrito) {
            productoEnCarrito.unidades++;
            productoEnCarrito.subtotal = productoEnCarrito.unidades * productoEnCarrito.precioUnitario;
        } else {
            cart.push({
                id: productoBuscado.id,
                nombre: productoBuscado.nombre,
                precioUnitario: productoBuscado.precio,
                unidades: 1,
                subtotal: productoBuscado.precio,
                rutaImagen: productoBuscado.rutaImagen
            });
        }
        productoBuscado.stock--;
        localStorage.setItem("cart", JSON.stringify(cart));
        
    } else {
        alert("No hay más stock del producto seleccionado");
    }
    let carritoContenido = document.getElementById('carritoContenido');
    carritoContenido.innerHTML = 'Producto agregado al carrito.';
    // Actualizar el contador del carrito
    updatearCarrito();
    abrirCarrito();
}

 // Función para abrir el modal del carrito
 function abrirCarrito() {
    let carritoModal = document.getElementById('carritoModal');
    carritoModal.style.display = 'block';
  }
  
  // Función para cerrar el modal del carrito
  function cerrarCarrito() {
    let carritoModal = document.getElementById('carritoModal');
    carritoModal.style.display = 'none';
  }
  
  // Obtener el botón de carrito y agregar eventos para abrir y cerrar el modal
  let btnAbrirCarrito = document.getElementById('cartUpdate');
  let btnCerrarCarrito = document.querySelector('#carritoModal .close');
  
  //btnAbrirCarrito.addEventListener('click', abrirCarrito);
  btnCerrarCarrito.addEventListener('click', cerrarCarrito);
  



// Evento al botón tienda para restablecer los productos
let btnTienda = document.getElementById("tienda");
btnTienda.addEventListener("click", resetProducts);

// Iniciar contador al cargar todo el DOM
document.addEventListener("DOMContentLoaded", () => {
    updatearCarrito();
});


comprar();

CrearTarjetas(productos, cart);

  /* Lo dejo aca para mas adelante
botonBuscar.addEventListener("click", () => {
    let searchText = searchInput.value.trim().toLowerCase()
    let searchFilter = productos.filter(producto => producto.nombre.toLowerCase().includes(searchText))
    createCards(searchFilter)
})
*/
// Función para restablecer todos los productos sin filtrar
 