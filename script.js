(() => {
  'use strict'
  const forms = document.querySelectorAll('.needs-validation')
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    }, false)
  })
})()

const errors = new Set();

function updateError() {
    const error = document.getElementById('infoError');
    const errorMsg = document.getElementById('infoErrorMsg');
    if (errors.size > 0) {
        error.classList.remove('d-none');
        errorMsg.innerHTML = '<strong>Error/s:</strong> ' + [...errors].join(' ');
    } else {
        error.classList.add('d-none');
        errorMsg.innerHTML = '';
    }
}

function checkPasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword');

    if (confirmPassword.value && password !== confirmPassword.value) {
        errors.add('Passwords do not match.');
        confirmPassword.setCustomValidity('mismatch');
    } else {
        errors.delete('Passwords do not match.');
        confirmPassword.setCustomValidity('');
    }
    updateError();
}

function usernameValidation() {
    const value = document.create_acc.username.value;
    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    if (value === '' || usernameRegex.test(value)) {
        errors.delete('Invalid username.');
    } else {
        errors.add('Invalid username.');
    }
    updateError();
}

function togglePass(inputId, span) {
    const input = document.getElementById(inputId);
    const icon = span.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('bi-eye', 'bi-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('bi-eye-slash', 'bi-eye');
    }
}

document.getElementById('confirmPassword').addEventListener('input', checkPasswordMatch);
document.getElementById('username').addEventListener('input', usernameValidation);
document.getElementById('username').addEventListener('blur', usernameValidation);