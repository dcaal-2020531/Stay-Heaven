
const signinTab = document.getElementById('signin-tab');
const signupTab = document.getElementById('signup-tab');
const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');


signinTab.addEventListener('click', () => {
  signinForm.classList.add('active');
  signupForm.classList.remove('active');
  signinTab.classList.add('active');
  signupTab.classList.remove('active');
});

signupTab.addEventListener('click', () => {
  signupForm.classList.add('active');
  signinForm.classList.remove('active');
  signupTab.classList.add('active');
  signinTab.classList.remove('active');
});

function goToDashboard(event) {
  event.preventDefault();
  const checkbox = event.target.querySelector('input[type="checkbox"]');
  if (checkbox && checkbox.checked) {
    window.location.href = "dashboard.html";
  } else {
    alert("Por favor confirma que no eres un robot.");
  }
}


document.getElementById('birthdate').addEventListener('change', function() {
  const birthdate = new Date(this.value);
  const ageInput = document.getElementById('age');
  const currentDate = new Date();
  let age = currentDate.getFullYear() - birthdate.getFullYear();
  const month = currentDate.getMonth();
  if (month < birthdate.getMonth() || (month === birthdate.getMonth() && currentDate.getDate() < birthdate.getDate())) {
    age--;  
  }
  ageInput.value = age;
});
