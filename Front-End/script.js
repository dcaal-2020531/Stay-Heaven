// Funcionalidad de la barra lateral (hamburguesa)
const toggleBtn = document.getElementById('toggle-sidebar');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('inactive');
  sidebar.classList.toggle('active');
  mainContent.classList.toggle('expanded');  // Ajustamos el contenido para que ocupe el espacio completo cuando la barra esté oculta
});

// Cambio de tema (claro/oscuro)
const toggleThemeBtn = document.getElementById('toggle-theme');
toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  document.body.classList.toggle('dark-theme');
});




