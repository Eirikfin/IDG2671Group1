// loginService.js

export async function loginUser(email, password, navigate, setError) {
    try {

        if (!email || !password) {
            setError('Email and password are required');
            return;
        }

        const response = await fetch('http://localhost:4202/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
        });

        if (!response.ok) {
            const { message } = await response.json();
            throw new Error(message || 'Login failed');
        }

        const { token, id } = await response.json();
        if (!token) {
            throw new Error('Login failed');
        } else {
            localStorage.setItem('token', token);
            navigate('/dashboard');
        }
    } catch (err) {
        setError(err.message);
    }
}