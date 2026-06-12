function checkPasswordMatch() {
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const passwordError = document.getElementById('matchError');

    if (confirmPassword && newPassword !== confirmPassword) {
        passwordError.classList.remove('d-none');
    } else {
        passwordError.classList.add('d-none');
    }
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
    
