import React, { useState } from "react";

interface LoginFormProps {
    onSubmit: (data: { email: string; password: string }) => void;
}

function LoginForm({ onSubmit }: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Butun saheleri doldurun!')
            return;
        }

        if (password.length < 6) {
            setError('Sifre min 6 simvol olmalidir!');
            return;
        }
        setError('');
        onSubmit({ email, password });

    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Daxil ol</h2>
            <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@numune.com"
                />
            </div>
            <div className="form-field">
                <label htmlFor="password">Sifre</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 simvol"
                />
            </div>
            {error && <p role="alert" className="error-message">{error}</p>}

            <button type="submit" disabled={!email && !password}>
                Daxil ol
            </button>
        </form>
    );
}

export default LoginForm;