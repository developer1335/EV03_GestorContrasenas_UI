// Base de datos simulada
let usuarios = [];
let usuarioActivo = null;

// Referencia al contenedor
const app = document.getElementById("app");

// Render inicial
mostrarMenuPrincipal();

// === FUNCIONES DE INTERFAZ ===

// Menú principal
function mostrarMenuPrincipal() {
  app.innerHTML = `
    <h1 class="text-2xl font-bold text-center mb-4">🔐 GESTOR DE CONTRASEÑAS</h1>
    <div class="space-y-2">
      <button onclick="mostrarRegistro()" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">1. Registrarse</button>
      <button onclick="mostrarLogin()" class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">2. Iniciar sesión</button>
      <button onclick="salir()" class="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600">3. Salir</button>
    </div>
  `;
}

// Registro
function mostrarRegistro() {
  app.innerHTML = `
    <h2 class="text-xl font-semibold mb-4">📝 Registro</h2>
    <form onsubmit="registrar(event)" class="space-y-3">
      <input id="regUsuario" placeholder="Nombre de usuario" class="w-full p-2 border rounded-lg" required>
      <input id="regPass" type="password" placeholder="Contraseña" class="w-full p-2 border rounded-lg" required>
      <button class="w-full bg-blue-500 text-white py-2 rounded-lg">Registrarse</button>
    </form>
    <button onclick="mostrarMenuPrincipal()" class="mt-4 text-sm text-gray-500">⬅ Volver</button>
  `;
}

function registrar(e) {
  e.preventDefault();
  const usuario = document.getElementById("regUsuario").value.trim();
  const pass = document.getElementById("regPass").value.trim();

  if (usuarios.find(u => u.usuario === usuario)) {
    alert("❌ Ese usuario ya existe.");
    return;
  }

  usuarios.push({ usuario, pass, contrasenas: [] });
  alert("✅ Usuario registrado con éxito.");
  mostrarMenuPrincipal();
}

// Login
function mostrarLogin() {
  app.innerHTML = `
    <h2 class="text-xl font-semibold mb-4">🔑 Iniciar Sesión</h2>
    <form onsubmit="login(event)" class="space-y-3">
      <input id="logUsuario" placeholder="Usuario" class="w-full p-2 border rounded-lg" required>
      <input id="logPass" type="password" placeholder="Contraseña" class="w-full p-2 border rounded-lg" required>
      <button class="w-full bg-green-500 text-white py-2 rounded-lg">Iniciar sesión</button>
    </form>
    <button onclick="mostrarMenuPrincipal()" class="mt-4 text-sm text-gray-500">⬅ Volver</button>
  `;
}

function login(e) {
  e.preventDefault();
  const usuario = document.getElementById("logUsuario").value.trim();
  const pass = document.getElementById("logPass").value.trim();

  const user = usuarios.find(u => u.usuario === usuario && u.pass === pass);
  if (!user) {
    alert("❌ Usuario o contraseña incorrectos.");
    return;
  }

  usuarioActivo = user;
  alert(`✅ Bienvenido, ${usuarioActivo.usuario}`);
  mostrarMenuUsuario();
}

// Menú de usuario
function mostrarMenuUsuario() {
  app.innerHTML = `
    <h2 class="text-xl font-bold mb-4">🔐 Menú de ${usuarioActivo.usuario}</h2>
    <div class="space-y-2">
      <button onclick="mostrarGuardar()" class="w-full bg-blue-500 text-white py-2 rounded-lg">1. Guardar nueva contraseña</button>
      <button onclick="mostrarTodas()" class="w-full bg-green-500 text-white py-2 rounded-lg">2. Ver todas las contraseñas</button>
      <button onclick="mostrarBuscar()" class="w-full bg-yellow-500 text-white py-2 rounded-lg">3. Buscar contraseña por servicio</button>
      <button onclick="mostrarEliminar()" class="w-full bg-red-500 text-white py-2 rounded-lg">4. Eliminar una contraseña</button>
      <button onclick="cerrarSesion()" class="w-full bg-gray-500 text-white py-2 rounded-lg">5. Cerrar sesión</button>
    </div>
  `;
}

// Guardar contraseña
function mostrarGuardar() {
  app.innerHTML = `
    <h2 class="text-xl font-semibold mb-4">➕ Guardar Contraseña</h2>
    <form onsubmit="guardarContrasena(event)" class="space-y-3">
      <input id="servicio" placeholder="Servicio (ej: Gmail)" class="w-full p-2 border rounded-lg" required>
      <input id="userServicio" placeholder="Usuario del servicio" class="w-full p-2 border rounded-lg" required>
      <input id="passServicio" placeholder="Contraseña del servicio" class="w-full p-2 border rounded-lg" required>
      <button class="w-full bg-blue-500 text-white py-2 rounded-lg">Guardar</button>
    </form>
    <button onclick="mostrarMenuUsuario()" class="mt-4 text-sm text-gray-500">⬅ Volver</button>
  `;
}

function guardarContrasena(e) {
  e.preventDefault();
  const servicio = document.getElementById("servicio").value.trim();
  const user = document.getElementById("userServicio").value.trim();
  const pass = document.getElementById("passServicio").value.trim();

  usuarioActivo.contrasenas.push({ servicio, user, pass });
  alert("✅ Contraseña guardada con éxito.");
  mostrarMenuUsuario();
}

// Ver todas
function mostrarTodas() {
  let lista = usuarioActivo.contrasenas.map((c, i) => `
    <li class="border p-2 rounded-lg">
      <strong>${i+1}. Servicio:</strong> ${c.servicio} <br>
      <strong>Usuario:</strong> ${c.user} <br>
      <strong>Contraseña:</strong> ${c.pass}
    </li>`).join("");

  if (!lista) lista = "<p>No hay contraseñas guardadas.</p>";

  app.innerHTML = `
    <h2 class="text-xl font-semibold mb-4">📋 Contraseñas guardadas</h2>
    <ul class="space-y-2">${lista}</ul>
    <button onclick="mostrarMenuUsuario()" class="mt-4 text-sm text-gray-500">⬅ Volver</button>
  `;
}

// Buscar
function mostrarBuscar() {
  app.innerHTML = `
    <h2 class="text-xl font-semibold mb-4">🔍 Buscar Contraseña</h2>
    <form onsubmit="buscar(event)" class="space-y-3">
      <input id="busqueda" placeholder="Servicio a buscar" class="w-full p-2 border rounded-lg" required>
      <button class="w-full bg-yellow-500 text-white py-2 rounded-lg">Buscar</button>
    </form>
    <button onclick="mostrarMenuUsuario()" class="mt-4 text-sm text-gray-500">⬅ Volver</button>
  `;
}

function buscar(e) {
  e.preventDefault();
  const servicio = document.getElementById("busqueda").value.trim();
  const encontrada = usuarioActivo.contrasenas.find(c => c.servicio.toLowerCase() === servicio.toLowerCase());

  if (!encontrada) {
    alert("❌ No se encontró el servicio.");
    mostrarMenuUsuario();
    return;
  }

  alert(`✅ Servicio: ${encontrada.servicio}\nUsuario: ${encontrada.user}\nContraseña: ${encontrada.pass}`);
  mostrarMenuUsuario();
}

// Eliminar
function mostrarEliminar() {
  let lista = usuarioActivo.contrasenas.map((c, i) => `
    <li class="border p-2 rounded-lg flex justify-between items-center">
      <span>${i+1}. ${c.servicio} (${c.user})</span>
      <button onclick="eliminar(${i})" class="text-red-500 hover:underline">Eliminar</button>
    </li>`).join("");

  if (!lista) lista = "<p>No hay contraseñas para eliminar.</p>";

  app.innerHTML = `
    <h2 class="text-xl font-semibold mb-4">🗑️ Eliminar Contraseña</h2>
    <ul class="space-y-2">${lista}</ul>
    <button onclick="mostrarMenuUsuario()" class="mt-4 text-sm text-gray-500">⬅ Volver</button>
  `;
}

function eliminar(index) {
  const eliminado = usuarioActivo.contrasenas[index].servicio;
  usuarioActivo.contrasenas.splice(index, 1);
  alert(`🗑️ Contraseña de '${eliminado}' eliminada.`);
  mostrarMenuUsuario();
}

// Cerrar sesión
function cerrarSesion() {
  alert("🔒 Cerrando sesión...");
  usuarioActivo = null;
  mostrarMenuPrincipal();
}

// Salir
function salir() {
  app.innerHTML = `<h2 class="text-xl font-bold text-center">👋 Gracias por usar el Gestor de Contraseñas</h2>`;
}
