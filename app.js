const txtTarea = document.querySelector("#txtTarea");
const btnAgregar = document.querySelector("#btnAgregar");
const lista = document.querySelector("#lista");
const contador = document.querySelector("#contador");
const mensaje = document.querySelector("#mensaje");

/* VALIDACIÓN */
function validarTarea(texto) {
  return texto.trim() !== "";
}

/* CONTADOR (calculado desde el DOM) */
function actualizarContador() {
  const tareas = document.querySelectorAll("#lista li");
  const completadas = document.querySelectorAll("#lista li.completada");

  const pendientes = tareas.length - completadas.length;

  contador.textContent = pendientes;
}

/* AGREGAR TAREA */
function agregarTarea() {
  const texto = txtTarea.value;

  if (!validarTarea(texto)) {
    mensaje.textContent = "Debe ingresar una tarea válida";
    return;
  }

  mensaje.textContent = "";

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = texto;

  const btnCompletar = document.createElement("button");
  btnCompletar.textContent = "Completar";
  btnCompletar.classList.add("btn-completar");

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";
  btnEliminar.classList.add("btn-eliminar");

  /* COMPLETAR */
  btnCompletar.addEventListener("click", () => {
    li.classList.toggle("completada");

    if (li.classList.contains("completada")) {
      btnCompletar.textContent = "Deshacer";
    } else {
      btnCompletar.textContent = "Completar";
    }

    actualizarContador();
  });

  /* ELIMINAR */
  btnEliminar.addEventListener("click", () => {
    li.remove();
    actualizarContador();
  });

  li.append(span, btnCompletar, btnEliminar);
  lista.append(li);

  actualizarContador();

  txtTarea.value = "";
}

/* EVENTOS */
btnAgregar.addEventListener("click", agregarTarea);

txtTarea.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    agregarTarea();
  }
});