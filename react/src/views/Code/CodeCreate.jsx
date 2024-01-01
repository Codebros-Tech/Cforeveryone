import { useContext, useEffect, useState } from 'react'
import PageComponent from '../../components/PageComponent.jsx'
import {  TrashIcon } from '@heroicons/react/24/outline';
import axiosClient from '../../axios.js';
import { useNavigate, useParams } from 'react-router-dom';

import TButton from '../../components/TButton.jsx';
import { StateContext } from '../../contexts/ContextProvider.jsx';

export default function CodeCreate() {
    const navigate = useNavigate()

    const { id } = useParams()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false);
    const { showToast } = useContext(StateContext);

    const [code, setCode] = useState({
        title: "",
        text: "",
        description: "",
        errorImage: null,
    });


    const onSubmit = (e) => {
        e.preventDefault()

        const payload = { ...code }

        let res = null
        // the way to transfer the data if it was a normal code creation.
        if (id) {
            res = axiosClient.put(`/codes/${id}`, payload)

        } else {
            res = axiosClient.post('/codes', payload)
        }

        res
        .then((response) => {
            console.log(response);
            navigate('/codes');
            if (id) {
                showToast("Code updated successfully");
            } else {
                showToast("Code created successfully");
            }
        }).catch((error) => {
            if (error && error.response) {
                setError(error.response.data.message);
                console.log(error);
            }
        });
    }

    const onImageChoose = (ev) => {
        const file = ev.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setCode({
                ...code,
                errorImage: reader.result,
            });
            ev.target.value = "";
        }

        reader.readAsDataURL(file);
    }

    useEffect(() => {
        // some code that will run if we are under a particular code
        if (id) {
            setLoading(true);
            axiosClient.get(`/codes/${id}`)
                .then(({data}) => {
                    setLoading(false);
                    setCode(data.code);
                })
        }
    }, []);

    const deletecode = (code) => {
        axiosClient.delete(`/codes/${code}`)
            .then(({data}) => {
                console.log(data);
                showToast('code deleted successfully');
            }).catch((error) => {
                showToast(error.message);
            })
    }

    return (
        <PageComponent
            title={!id ?  "Post Your Code" : "Update The Code"}
            buttons={
                (   id &&
                    <div className='md:flex gap-2'>
                        <TButton onClick={() => deletecode(code)} color='red' to='/codes/create'>
                            <TrashIcon className='h-4 w-4 mr-2' />
                            Delete
                        </TButton>
                    </div>
                )
            }
            small={!id ? 'Posting your code can help you get correction or feedback which can help foster progress': ''}
        >
        <form method="POST" onSubmit={onSubmit}>
                {
                    loading &&
                        <div className='text-xl text-center'>Patience is the key to a good life....</div>
                }
                {
                    !loading &&
                    <div className='shadow sm:overflow-hidden sm:rounded-md'>

                        <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                            {
                                error && <div className='bg-red-500 text-white py-3 px-3'>
                                    {error}
                                </div>

                            }

                            {/* Title */}
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="title" className='block text-sm font-medium text-gray-700'>
                                    Code Title
                                </label>
                                <input
                                    type="text"
                                    name='title'
                                    id='title'
                                    value={code.title}
                                    placeholder='Code Title'
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50
                                    focus:ring-indigo-500 sm:text-sm"
                                    onChange={(e) => setCode({...code, title: e.target.value})}
                                    required
                                />
                            </div>
                                {/* Title */}

                            {/* Description */}
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor='description'
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Description
                                </label>
                                <textarea
                                    name='description'
                                    id="description"
                                    value={code.description}
                                    placeholder="Describe Your Code"
                                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm'
                                    onChange={(ev) => setCode({...code, description: ev.target.value})}
                                    required
                                >
                                </textarea>
                            </div>


                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor='text'
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Code Text
                                </label>
                                <textarea value={code.text} className="w-full mt-1 rounded-sm overflow-y-auto overflow-x-auto"
                                     onChange={(ev) => setCode({...code, text: ev.target.value})} id="text" cols="30" rows="15">
                                </textarea>
                            </div>
                            {/* Image */}
                            <div className='block'>
                                <label className="block text-sm font-medium text-gray-700">
                                    Error image
                                </label>
                                <div className="mt-1">
                                    <button
                                            type="button"
                                            className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4
                                            text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:indigo-500 focus:ring-offset-2 mb-3"
                                        >
                                            <input
                                                type="file"
                                                className='absolute left-0 top-0 right-0 bottom-0 opacity-0'
                                                onChange={onImageChoose}
                                            />
                                            Input Screenshot  of error message
                                        </button>
                                    {
                                        code.errorImage &&
                                            <img
                                                src={code.errorImage}
                                                alt=""
                                                className="w-full h-auto object-cover"
                                            />
                                    }
                                </div>
                                {/* Image */}

                            </div>
                            <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
                                <TButton>
                                    {!id ? 'Post the Code' : 'Update the Code'}
                                </TButton>
                            </div>
                        </div>
                    </div>
                }
            </form>
        </PageComponent>
    )
}
