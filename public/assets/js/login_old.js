document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = {
        email: email,
        password: password
    };

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('jwtToken', data.token);
            localStorage.setItem('userId', data.userId);

            document.getElementById('message').textContent = 'Login exitoso. Redirigiendo...';
            document.getElementById('message').style.color = '#28a745';

            setTimeout(() => {
                window.location.href = '/dashboard'; 
            }, 2000);
        } else {

            document.getElementById('message').textContent = data.error || 'Error en el login';
            document.getElementById('message').style.color = '#dc3545';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'Error en la conexión';
        document.getElementById('message').style.color = '#dc3545';
    });
});