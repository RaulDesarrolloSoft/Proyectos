// Datos iniciales simulados (Base de datos)
let productos = [
    { id: 1, nombre: "Paracetamol 500mg", stock: 50, precio: 25.50 },
    { id: 2, nombre: "Ibuprofeno 400mg", stock: 30, precio: 35.00 },
    { id: 3, nombre: "Amoxicilina 250mg", stock: 20, precio: 80.00 }
];

// --- NAVEGACIÓN ---
function showSection(id) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.sidebar button').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(id).classList.add('active');
    event.target.classList.add('active');
}

function logout() {
    window.location.href = 'index.html';
}

// --- RENDERIZAR INVENTARIO ---
function renderInventario() {
    const tbody = document.getElementById('inventarioBody');
    const selectVenta = document.getElementById('ventaProducto');
    
    tbody.innerHTML = '';
    selectVenta.innerHTML = '<option value="">Seleccione producto...</option>';

    productos.forEach(prod => {
        // Llenar tabla
        tbody.innerHTML += `
            <tr>
                <td>${prod.id}</td>
                <td>${prod.nombre}</td>
                <td>${prod.stock}</td>
                <td>$${prod.precio.toFixed(2)}</td>
                <td><button class="btn-danger" onclick="eliminarProducto(${prod.id})">Eliminar</button></td>
            </tr>
        `;
        // Llenar select de ventas
        if(prod.stock > 0) {
            selectVenta.innerHTML += `<option value="${prod.id}">${prod.nombre} - $${prod.precio}</option>`;
        }
    });
}

// --- REGISTRAR PRODUCTO ---
document.getElementById('productoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('prodName').value;
    const stock = parseInt(document.getElementById('prodStock').value);
    const precio = parseFloat(document.getElementById('prodPrice').value);
    const newId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;

    productos.push({ id: newId, nombre, stock, precio });
    this.reset();
    renderInventario();
    alert('Producto registrado con éxito.');
});

// --- ELIMINAR PRODUCTO ---
function eliminarProducto(id) {
    if(confirm('¿Seguro que deseas eliminar este producto del sistema?')) {
        productos = productos.filter(p => p.id !== id);
        renderInventario();
    }
}

// --- REALIZAR VENTA ---
function realizarVenta() {
    const prodId = parseInt(document.getElementById('ventaProducto').value);
    const cantidad = parseInt(document.getElementById('ventaCantidad').value);
    
    if(!prodId || !cantidad || cantidad <= 0) return alert('Seleccione producto y cantidad válida.');

    const prodIndex = productos.findIndex(p => p.id === prodId);
    
    if(productos[prodIndex].stock >= cantidad) {
        productos[prodIndex].stock -= cantidad;
        const total = productos[prodIndex].precio * cantidad;
        
        // Mostrar Ticket
        const ticketDiv = document.getElementById('ticket');
        ticketDiv.style.display = 'block';
        ticketDiv.innerHTML = `
            <h3>🧾 Ticket de Venta</h3>
            <p><b>Producto:</b> ${productos[prodIndex].nombre}</p>
            <p><b>Cantidad:</b> ${cantidad}</p>
            <p><b>Total a pagar:</b> $${total.toFixed(2)}</p>
            <p style="color:green; margin-top:10px;">¡Venta realizada con éxito!</p>
        `;
        
        document.getElementById('ventaCantidad').value = '';
        renderInventario();
    } else {
        alert('No hay suficiente stock en almacén.');
    }
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', renderInventario);