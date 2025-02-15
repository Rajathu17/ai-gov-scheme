import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { signIn, signUp, resetPassword } from '../lib/auth';
import type { AuthError } from '../lib/auth';

type AuthMode = 'sign-in' | 'sign-up' | 'forgot-password';

export function Auth() {
  const [mode, setMode] = useState<AuthMode>('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (mode === 'sign-in') {
        await signIn(email, password);
      } else if (mode === 'sign-up') {
        await signUp(email, password);
        setMessage('Please check your email to verify your account.');
      } else if (mode === 'forgot-password') {
        await resetPassword(email);
        setMessage('Password reset instructions have been sent to your email.');
      }
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              {mode === 'sign-in' ? 'Welcome back' :
               mode === 'sign-up' ? 'Create an account' :
               'Reset your password'}
            </CardTitle>
            <CardDescription>
              {mode === 'sign-in' ? 'Sign in to access your account' :
               mode === 'sign-up' ? 'Enter your email to create your account' :
               'Enter your email to receive reset instructions'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
              
              {mode !== 'forgot-password' && (
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    required
                  />
                </div>
              )}

              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}

              {message && (
                <div className="text-green-500 text-sm">{message}</div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Loading...' :
                 mode === 'sign-in' ? 'Sign In' :
                 mode === 'sign-up' ? 'Sign Up' :
                 'Send Reset Instructions'}
              </Button>

              <div className="space-y-2">
                {mode === 'sign-in' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setMode('forgot-password')}
                      className="text-sm text-primary-500 hover:underline"
                    >
                      Forgot your password?
                    </button>
                    <div className="text-sm text-gray-500">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setMode('sign-up')}
                        className="text-primary-500 hover:underline"
                      >
                        Sign up
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-gray-500">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('sign-in')}
                      className="text-primary-500 hover:underline"
                    >
                      Sign in
                    </button>
                  </div>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}