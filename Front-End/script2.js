// Cambio de pestañas entre 'signin' y 'signup'
const signinTab = document.getElementById('signin-tab');
const signupTab = document.getElementById('signup-tab');
const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');

// Cambiar a la pestaña de 'Iniciar sesión'
signinTab.addEventListener('click', () => {
  // Mostrar el formulario de iniciar sesión y ocultar el de registrarse
  signinForm.classList.add('active');
  signupForm.classList.remove('active');
  
  // Marcar la pestaña activa
  signinTab.classList.add('active');
  signupTab.classList.remove('active');
});

// Cambiar a la pestaña de 'Registrarse'
signupTab.addEventListener('click', () => {
  // Mostrar el formulario de registrarse y ocultar el de iniciar sesión
  signupForm.classList.add('active');
  signinForm.classList.remove('active');
  
  // Marcar la pestaña activa
  signupTab.classList.add('active');
  signinTab.classList.remove('active');
});

// Redirigir al dashboard si se marca el checkbox
function goToDashboard(event) {
  event.preventDefault();
  const checkbox = event.target.querySelector('input[type="checkbox"]');
  if (checkbox && checkbox.checked) {
    window.location.href = "dashboard.html";
  } else {
    alert("Por favor confirma que no eres un robot.");
  }
}

// Función para calcular la edad en base a la fecha de nacimiento
document.getElementById('birthdate').addEventListener('change', function() {
  const birthdate = new Date(this.value);
  const ageInput = document.getElementById('age');

  // Calcular la edad
  const currentDate = new Date();
  let age = currentDate.getFullYear() - birthdate.getFullYear();
  const month = currentDate.getMonth();
  if (month < birthdate.getMonth() || (month === birthdate.getMonth() && currentDate.getDate() < birthdate.getDate())) {
    age--;  // Si el cumpleaños aún no ha llegado este año, resta 1
  }

  // Coloca la edad calculada en el campo de edad
  ageInput.value = age;
});
