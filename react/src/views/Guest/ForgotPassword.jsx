import { useRef } from "react";
import axiosClient from "../../axios";
import { Navigate } from 'react-router-dom'

export default function ForgotPassword() {
    const emailRef= useRef(null);

    if (localStorage.getItem('TOKEN')) {
        return <Navigate to='/' />
    }


    const submitForm = (event) => {
        event.preventDefault();
        axiosClient.post('/forgot-password', {
            email: emailRef.current.value,
        })
    }

    return (
        <>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Forgot password
            </h2>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={(ev) => submitForm(ev)}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address or Matricule
                        </label>
                        <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            ref={emailRef}
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        </div>
                    </div>
                    <div>
                        <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                        Send Verification
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
  }
