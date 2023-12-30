import { useEffect, useState } from 'react'
import PageComponent from '../../components/PageComponent.jsx'
import { LinkIcon, PhotoIcon, TrashIcon } from '@heroicons/react/24/outline';
import TButton from '../components/core/TButton';
import axiosClient from '../../axios.js';
import { useNavigate, useParams } from 'react-router-dom';
import SurveyQuestions from './SurveyQuestions.js';
import { useStateContext } from '../../contexts/ContextProvider.jsx';

export default function CodeView() {
    // useNavigate will provide you a variable that you use to move from one route to another.
    const navigate = useNavigate()
    const { id } = useParams()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false);
    const {showToast} = useStateContext();

    const [survey, setSurvey] = useState({
        title: "",
        slug: "",
        status: false,
        description: "",
        image: null,
        image_url: null,
        expire_date: "",
        questions: [],
    })

    const onSubmit = (e) => {
        e.preventDefault()

        const payload = { ...survey }
        if (payload.image) {
            payload.image = payload.image_url;
            delete payload.image_url;
        }

        let res = null
        // the way to transfer the data if it was a normal survey creation.
        if (id) {
            res = axiosClient.put(`/surveys/${id}`, payload)

        } else {
            res = axiosClient.post('/surveys', payload)
        }

        res
        .then((response) => {
            console.log(response);
            navigate('/surveys');
            if (id) {
                showToast("Survey updated successfully");
            } else {
                showToast("Survey created successfully");
            }
        }).catch((error) => {
            if (error && error.response) {
                setError(error.response.data.message);
                console.log(error);
            }
        });
    }

    const onImageChoose = (ev) => {
        // returns the file that the user entered, in this case its an image.
        const file = ev.target.files[0];

        // this is the function that reads the image.
        const reader = new FileReader();

        // when the reader loads, it will contain a variable that contains the result.
        reader.onload = () => {
            setSurvey({
                ...survey,
                image: file, // this will contain the actual file in .
                // reader.result contains the content of the file that's in this case the image.
                image_url: reader.result, // image url will return the file in bytes.
            });

            ev.target.value = ""; // we then emptied the component containing the image.
        }

        reader.readAsDataURL(file); // this will read the content of the file as a data url and call the onload function when the image has finished loading.
    }

    const onQuestionUpdate = (questions) => {
        setSurvey(
            {
                ...survey,
                questions: [...questions]
            }
        );
    }

    useEffect(() => {
        // some code that will run if we are under a particular survey
        if (id) {
            setLoading(true);
            axiosClient.get(`/surveys/${id}`)
                .then(({data}) => {
                    setLoading(false);
                    setSurvey(data.data);
                })
        }
    }, []);

    const deleteSurvey = (survey) => {
        axiosClient.delete(`/surveys/${survey}`)
            .then(({data}) => {
                console.log(data);
                showToast('Survey deleted successfully');
            }).catch((error) => {
                showToast(error.message);
            })
    }


    return (
        <PageComponent
            title={!id ?  "Create new Survey" : "Update Survey"}
            buttons={
                (   id &&
                    <div className='flex gap-2'>
                        <TButton color='green' href={`/surveys/public/${survey.slug}`}>
                            <LinkIcon className='h-4 w-4 mr-2' />
                            Public Link
                        </TButton>
                        <TButton onClick={() => deleteSurvey(survey)} color='red' to='/surveys/create'>
                            <TrashIcon className='h-4 w-4 mr-2' />
                            Delete
                        </TButton>
                    </div>
                )
            }
        >
        <form method="POST" onSubmit={onSubmit}>
                {
                    loading &&
                        <div className='text-xl text-center'>Loading ...</div>
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
                            {/* Image */}
                            <div className='block'>
                                <label className="block text-sm font-medium text-gray-700">
                                    Photo
                                </label>
                                <div className="mt-1 flex items-center">
                                    {
                                        survey.image_url &&
                                            <img
                                                src={survey.image_url}
                                                alt=""
                                                className="w-32 h-32 object-cover"
                                            />
                                    }
                                    {
                                        !survey.image_url &&
                                            <span className="flex items-center justify-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                                <PhotoIcon className='w-8 h-8'/>
                                            </span>
                                    }
                                    <button
                                        type="button"
                                        className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4
                                        text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:indigo-500 focus:ring-offset-2"
                                    >
                                        <input
                                            type="file"
                                            className='absolute left-0 top-0 right-0 bottom-0 opacity-0'
                                            onChange={onImageChoose}
                                        />
                                        Change
                                    </button>
                                </div>
                                {/* Image */}

                                {/* Title */}
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="title" className='block text-sm font-medium text-gray-700'>
                                        Survey Title
                                    </label>
                                    <input
                                        type="text"
                                        name='title'
                                        id='title'
                                        value={survey.title}
                                        placeholder='Survey Title'
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50
                                        focus:ring-indigo-500 sm:text-sm"
                                        onChange={(e) => setSurvey({...survey, title: e.target.value})}
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
                                        value={survey.description}
                                        placeholder="Describe Your Survey"
                                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm'
                                        onChange={(ev) => setSurvey({...survey, description: ev.target.value})}
                                        required
                                    >
                                    </textarea>
                                </div>

                                {/* Expire date */}
                                <div className='col-span-6 sm:col-span-3'>
                                    <label
                                        htmlFor='expire_date'
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Expire Date
                                    </label>
                                    <input
                                        type="date"
                                        id='expire_date'
                                        name='expire_date'
                                        value={survey.expire_date.toString()}
                                        onChange={(ev) =>
                                            setSurvey({...survey, expire_date: ev.target.value})
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm" />
                                </div>

                                {/* Active */}
                                <div className="flex items-start">
                                    <div className='flex h-5 items-center'>
                                        <input
                                            type='checkbox'
                                            id='status'
                                            name='status'
                                            checked={survey.status}
                                            onChange={(ev) => setSurvey({...survey, status: ev.target.checked})}
                                            className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                        />
                                    </div>
                                    <div className='ml-3 text-sm'>
                                        <label htmlFor="comments" className='font-medium text-gray-700'>
                                            Active
                                        </label>
                                        <p className='text-gray-500'>
                                            Whether to make the Survey publicly available.
                                        </p>
                                    </div>
                                </div>
                                {/* Active */}

                                <SurveyQuestions questions={survey.questions} onQuestionUpdate={onQuestionUpdate} />
                            </div>
                            <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
                                <TButton>
                                    Save
                                </TButton>
                            </div>
                        </div>
                    </div>
                }
            </form>
        </PageComponent>
    )
}
