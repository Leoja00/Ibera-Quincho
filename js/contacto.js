const form = document.querySelector("#form-contacto")
const inputs = document.querySelectorAll("#form-contacto input")
const warning_nombre = document.getElementById("warning-nombre")
const warning_email = document.getElementById("warning-email")
const warning_telefono = document.getElementById("warning-telefono")
const warning_duda = document.getElementById("warning-duda")

const regExp = {
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	number: /^[0-9]{10,10}$/, // 6 a 20 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  todo:/^[A-Za-z0-9\s]+$/
}

let valores = {
  nombre: false,
  email: false,
  telefono: false,
  duda: false,
}

const validarInput = (input) => {
  if(input.name === "nombre")
  {
    if(input.value.length < 2) 
    {
      input.classList.add("input-warning")
      warning_nombre.innerText = "Este campo debe ser mayor a 2 caracteres"
      valores.nombre = false
    }
    else
    {
      if(!regExp.name.test(input.value))
      {
        input.classList.add("input-warning")
        warning_nombre.innerText = "Este campo solo puede contener letras"
        valores.nombre = false
      }
      else
      {
        input.classList.remove("input-warning")
        warning_nombre.innerText = ""
        valores.nombre = true
      }
    }
  }
  if(input.name === "email")
  {
    if(input.value.length < 1) 
    {
      input.classList.add("input-warning")
      warning_email.innerText = "Este campo es obligatorio"
      valores.email = false
    }
    else
    {
      if(!regExp.email.test(input.value))
      {
        input.classList.add("input-warning")
        warning_email.innerText = "El valor ingresado no es un email"
        valores.email = false
      }
      else
      {
        input.classList.remove("input-warning")
        warning_email.innerText = ""
        valores.email = true
      }
    }
  }
  if(input.name === "telefono")
  {
    if(input.value.length < 1) 
    {
      input.classList.add("input-warning")
      warning_telefono.innerText = "Este campo es obligatorio"
      valores.telefono = false
    }
    else
    {
      if(!regExp.number.test(input.value))
      {
        input.classList.add("input-warning")
        warning_telefono.innerText = "Este campo no es un numero telefonico"
        valores.telefono = false
      }
      else
      {
        input.classList.remove("input-warning")
        warning_telefono.innerText = ""
        valores.telefono = true
      }
    }
  }
  if(input.name === "duda")
  {
    if(input.value.length < 1) 
    {
      input.classList.add("input-warning")
      warning_duda.innerText = "Este campo debe ser mayor a 1 caracteres"
      valores.duda = false
    }
    else
    {
     
        input.classList.remove("input-warning")
        warning_duda.innerText = ""
        valores.duda = true
      
    }
  }
  
}



form.addEventListener("submit", (e) => {
  e.preventDefault();
  for (const input of inputs) {
    validarInput(input);
  }
  if (!valores.nombre || !valores.email || !valores.telefono || !valores.duda) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Debe completar todos los campos.',
      confirmButtonColor: '#0353A4',
      background: '#061A40',
    });
    e.stopPropagation();
  } else {
    // Creamos un objeto FormData con los datos del formulario
    const formData = new FormData(form);

    // Realizamos la petición AJAX al archivo enviar.php
    fetch("enviar.php", {
      method: "POST",
      body: formData
    })
    .then(response => response.json()) // Interpretamos la respuesta como JSON
    .then(data => {
      console.log(data);
      // Manejamos la respuesta del servidor
      if (data.success) {
        // Si el envío fue exitoso, mostramos el SweetAlert de éxito
        Swal.fire({
          icon: 'success',
          title: 'Consulta enviada exitosamente',
          text: 'Será contactado por nosotros',
          confirmButtonColor: '#0353A4',
          background: '#061A40',
        });
      } else {
        // Si hubo un error en el envío, mostramos un SweetAlert de error

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema . Por favor, intenta nuevamente más tarde. FIREEEEEEE',
          confirmButtonColor: '#0353A4',
          background: '#061A40',
        });
      }
    })
    .catch(error => {
      console.error(error); // Imprimimos el error en la consola del navegador para verificarlo
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al enviar el mensaje. Por favor, intenta nuevamente más tarde.',
        confirmButtonColor: '#0353A4',
        background: '#061A40',
      });
    })
    
    .finally(() => {
      // Limpiamos el formulario después del envío
      form.reset();
      // Reiniciamos los valores
      valores = {
        nombre: false,
        email: false,
        telefono: false,
        duda: false,
      };
    });
  }
});