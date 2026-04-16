const txtTarea = document.querySelector("#txtTarea");
const btnAgregar = document.querySelector("#btnAgregar");
const lista = document.querySelector("#lista");
const contador = document.querySelector("#contador");
const mensaje = document.querySelector("#mensaje");

let pendientes = 0;

function validarTarea(texto) {
  return texto.trim() !== "";
}

function actualizarContador() {
  contador.textContent = pendientes;
}

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

  btnCompletar.addEventListener("click", () => {
    li.classList.toggle("completada");

    if (li.classList.contains("completada")) {
      pendientes--;
      btnCompletar.textContent = "Deshacer";
    } else {
      pendientes++;
      btnCompletar.textContent = "Completar";
    }

    actualizarContador();
  });

  btnEliminar.addEventListener("click", () => {
    if (!li.classList.contains("completada")) {
      pendientes--;
    }

    li.remove();
    actualizarContador();
  });

  li.append(span, btnCompletar, btnEliminar);
  lista.append(li);

  pendientes++;
  actualizarContador();

  txtTarea.value = "";
}

btnAgregar.addEventListener("click", agregarTarea);

txtTarea.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    agregarTarea();
  }
});