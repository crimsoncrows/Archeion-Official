//REQUIRE USER TO FINISH FORMS 
// BS5 OFFICIAL CODE
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



//WORD COUNTER FOR TEXT INPUT
function countWords() {
    var text = document.getElementById('userInputText').value.trim();
    var count = text === '' ? 0 : text.split(' ').length;
    var counter = document.getElementById('wordCounter');

    counter.textContent = count + ' / 2000 words';

    if (count >= 2001) {
        counter.textContent = 'Maximum words reached.';
        counter.classList.remove('alert-secondary');
        counter.classList.add('alert-danger');
    } else {
        counter.textContent = count + ' / 2000 words';
        counter.classList.remove('alert-danger');
        counter.classList.add('alert-secondary');
    }

}




//UPDATE ALERT ERRORS
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



//VALIDATIONS
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


//TOGGLES
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





//DROPZONE
if (document.getElementById('sim-dropzone')) {
    Dropzone.autoDiscover = false;
    const myDropzone = new Dropzone("#sim-dropzone", {
        url: "/upload/",
        maxFilesize: 25,
        acceptedFiles: ".doc,.docx,.pdf,image/*",
        autoProcessQueue: true,
        addRemoveLinks: true,
        maxFiles: 1,
        dictMaxFilesExceeded: "You can only upload one file.",
        dictFileTooBig: "File is too large. Maximum file size is 25MB.",
    });

    myDropzone.on("addedfile", function () { });
    document.querySelector("#sim-dropzone .dz-message").innerHTML = `
      <i class="bi bi-inbox sim-drop-icon d-block"></i>
      <p class="sim-drop-label">Click or drag file to this area to upload</p>
      <p class="sim-drop-hint">Accepts DOC, DOCX, PDF, image files. Maximum file size 25MB.</p>
    `;

    document.querySelector(".sim-upload-btn").addEventListener("click", function () {
        myDropzone.processQueue();
    });
}



//CALLS

if (document.getElementById('confirmPassword')) {
    document.getElementById('confirmPassword').addEventListener('input', checkPasswordMatch);
}

if (document.getElementById('username')) {
    document.getElementById('username').addEventListener('input', usernameValidation);
    document.getElementById('username').addEventListener('blur', usernameValidation);
}
if (document.getElementById('userInputText')) {
  document.getElementById('userInputText').addEventListener('input', countWords);
}
