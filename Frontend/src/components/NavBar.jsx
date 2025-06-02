import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom';
import { LogOut, MessageSquare, Settings } from 'lucide-react';

const NavBar = () => {
  const { signOut, authUser } = useAuthStore();
  return (
    <div>
      <header className='bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80'>
        <div className='px-4 h-16'>
          <div className='flex justify-between items-center h-full'>
            <div className='flex items-center gap-8'>
              <Link to="/" className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
                <div className='w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center'>
                  <MessageSquare className='w-5 h-5 text-primary'/>
                </div>
                <h1 className='text-lg font-bold'>ChatApp</h1>
              </Link>
            </div>
            
            { authUser && (
            <details className="dropdown">
              <summary className="btn btn-ghost px-4 gap-3">
                <div className="avatar">
                  <div className="w-9 rounded-full">
                    <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                  </div>
                </div>
                <span className='hidden sm:inline'>Hi, <span className='font-bold'>{ authUser.fullName }</span></span>
              </summary>
              <div className="menu dropdown-content bg-base-100 rounded-box z-1 w-2xs shadow-lg right-0 mr-6">
                <div className='flex items-center justify-start border-b border-gray-300 p-2 gap-2.5'>
                  <div className="avatar">
                    <div className="w-16 rounded">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/superperson@192.webp"
                        alt="Tailwind-CSS-Avatar-component"
                      />
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    <div className='text-gray-500'>
                      { authUser.fullName }
                    </div>
                    <div className='text-gray-400'>
                      { authUser.email }
                    </div>
                    <Link to="/profile" className='btn btn-primary m-0 btn-soft btn-xs'>
                      View profile
                    </Link>
                  </div>
                  
                </div>
                <div className='px-2 py-2 gap-2.5'>
                  <button className='btn btn-ghost w-full flex justify-start btn-sm text-gray-500'
                          onClick={signOut}>
                    Sign Out
                  </button>
                </div>
              </div>
            </details>
            )}
          </div>
        </div>
      </header>
    </div>
  )
}

export default NavBar