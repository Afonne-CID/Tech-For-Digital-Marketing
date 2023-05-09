import React, { useState, useRef, useEffect } from 'react'
import { LoginForm, RegisterForm } from './AuthForms'


const AuthButtons = () => {

    const [formStatus, setFormStatus] = useState({ success: false, error: null });

    const formRef = useRef(null)
    const handleClickOutside = (event) => {
        if (formRef.current && !formRef.current.contains(event.target)) {
          setShowLoginForm(false)
          setShowRegisterForm(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    const [showLoginForm, setShowLoginForm] = useState(false)
    const [showRegisterForm, setShowRegisterForm] = useState(false)

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue;
    }
    
    const csrfToken = getCookie('csrftoken');
    
    const isAuthenticated = () => {
        return localStorage.getItem("token") !== null;
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

    const handleLogin = async (username, password) => {
        const response = await fetch('/api/login/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify({
                'username': username,
                'password': password,
            }),
            credentials: 'include',
        })

        const data = await response.json()
        setShowLoginForm(false)
        if(response.ok) {
            setFormStatus({ success: true, error: null })
        } else {
            setFormStatus({ success: false, error: data.detail })
        }
        if (data.token) {
            localStorage.setItem("token", data.token);
            // localStorage.setItem("username", data.username);
            window.location.reload();
        }
        console.log('Data', data)        
        return data
    }
    
    const handleRegister = async (username, password) => {
        const response = await fetch('/api/register/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify({
                'username': username,
                'password': password,
            }),
            credentials: 'include',
        })

        const data = await response.json()
        setShowRegisterForm(false)
        if(response.ok) {
            setFormStatus({ success: true, error: null })
        } else {
            setFormStatus({ success: false, error: data.detail })
        }
        return data
    }

    return (
        <div>
            {isAuthenticated() ? (
                <>
                    <div className="flex flex-row">
                        <div className="flex items-center mr-4 text-white">
                            Welcome
                        </div>
                        <div
                            className="flex justify-center ml-2 px-4 py-2 w-[120px] rounded-full bg-red-500 text-white font-bold"
                            onClick={handleLogout}
                        >
                            Logout
                        </div>
                    </div>
                </>
            ) : (<div><div className='flex flex-row'>
                    <div className='flex justify-center ml-2 px-4 py-2 w-[120px] rounded-full bg-black text-red-500 font-bold' onClick={() => setShowLoginForm(!showLoginForm)}>Login</div>
                    {showLoginForm && (
                        <div ref={formRef} className="absolute mt-2 right-0">
                            <LoginForm onLogin={handleLogin} onCloseForm={() => setShowLoginForm(false)} />
                        </div>
                    )}
                    <div className='flex justify-center ml-2 px-4 py-2 w-[120px] rounded-full bg-white text-green-500 font-bold' onClick={() => setShowRegisterForm(!showRegisterForm)}>Register</div>
                    {showRegisterForm && (
                        <div ref={formRef} className="absolute mt-2 right-0">
                            <RegisterForm onRegister={handleRegister} onCloseForm={() => setShowRegisterForm(false)} />
                        </div>
                    )}
                </div> 
                <small className='justify-center'>Login to see your tasks on next visit</small>
            </div>
            )}
            {formStatus.success && (
                <div className="text-green-500 mt-2">Successfully logged in / registered.</div>
            )}
            {formStatus.error && (
                <div className="text-red-500 mt-2">Error: {formStatus.error}</div>
            )}
        </div>
    )
}

export default AuthButtons