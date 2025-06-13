import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { signupEvent } from '../api/events';

export default function SignupForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signupEvent(Number(id), { name, email });
      const signed = JSON.parse(localStorage.getItem('signedUpEvents') || '[]');
      if (!signed.includes(Number(id))) {
        localStorage.setItem(
          'signedUpEvents',
          JSON.stringify([...signed, Number(id)])
        );
      }
      alert('Sign-up successful! Please check your emails for more information');
      navigate('/');
    } catch (err: unknown) {
      console.error('Signup error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Signup failed');
      }
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Sign up for the event</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          required
          placeholder="Full name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          required
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Confirm Sign Up
        </button>
      </form>
    </div>
  );
}
