import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const SignInPage = () => {
  const [ showPassword, setShowPassword ] = useState(false);
  const [ formData, setFormData ] = useState({
    email: "",
    password: ""
  });

  const { signIn, isSigningIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(formData);
  };

  return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
                              group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>
          
          <form onSubmit={ handleSubmit } className='space-y-6'>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={ showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button type='button'
                        className='absolute inset-y-0 right-0 pr-3 flex items-center z-10 m-0.5'
                        onClick={() => setShowPassword(!showPassword)}>
                  { !showPassword ? 
                    <Eye className='size-5 text-base-content/40' /> :
                    <EyeOff className='size-5 text-base-content/40' />}
                </button>
              </div>
            </div>
            <button type='submit'
                    className='btn btn-primary w-full'
                    disabled={isSigningIn}>
              { isSigningIn ? (
                <>
                  <Loader2 className='size-5 animate-spin'/>
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don't have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
  )
}

export default SignInPage