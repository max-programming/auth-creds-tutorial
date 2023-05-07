import Link from 'next/link';
import { FormEvent } from 'react';
import { signIn } from 'next-auth/react';

export default function Register() {
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: form.get('username'),
        password: form.get('password'),
      }),
    });
    const data = await res.json();
    if (!data.user) return null;
    await signIn('credentials', {
      username: data.user.username,
      password: form.get('password'),
      callbackUrl: '/',
    });
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <label htmlFor='username'>Username:</label>
        <input type='text' id='username' name='username' required />
        <label htmlFor='password'>Password:</label>
        <input type='password' id='password' name='password' required />
        <button type='submit'>Submit</button>
      </form>
      <p>
        Already registered? <Link href='/login'>Login here</Link>
      </p>
    </div>
  );
}
