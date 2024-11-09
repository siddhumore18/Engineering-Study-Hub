document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = {
        type: document.getElementById('type').value,
        name: document.querySelector('input[name="Name"]').value,
        password: document.querySelector('input[name="Passward"]').value,
        prn: document.querySelector('input[name="PRN"]').value,
    };
    
    try {
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (data.token) {
            alert('Registration successful!');
            // Optionally, redirect to login page
        } else {
            alert('Error: ' + data.msg);
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred during registration');
    }
});