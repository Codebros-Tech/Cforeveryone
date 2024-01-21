import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../contexts/ContextProvider';
import TButton from '../../components/TButton';
import axiosClient from '../../axios';
import Modal from '../../components/Modal';
import { useNavigate } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard'

export default function Code({thecode, commentHide = false}) {

    const {currentUser , showToast} = useContext(StateContext);
    const [logState, setLogState ] = useState(false);
    const [code, setCode] = useState(thecode);

    const [ modalState, setModalState] = useState(false);

    const navigate = useNavigate();

    const modalTitle  = "Delete The Code";
    const modalText = "Are you sure you want to delete this Code? All of the comments related to this code will be deleted."

    useEffect(() => {
        // going to re fetch the user data every 5 seconds
        const interval = setInterval(() => {
            axiosClient.get(`/codes/${code.id}`)
                .then(({data}) => {
                    setCode(data.code);
                })
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const { deleteCodeId } = useContext(StateContext);

    const likeComment = (id) => {
        axiosClient.post(`/codes/${id}/like`)
            .then(() => {
            setCode({...code, 'userLikeStatus': {...code.userLikeStatus, 'state': !code.userLikeStatus.state}});
            }).catch((error) => {
                console.error("Error occured liking code ", error);
            })
    }

    const deleteCode = (id) => {
        axiosClient.delete(`/codes/${id}`)
            .then(() => {
                deleteCodeId(id);
                showToast('Code deleted successfully');
                navigate(`/codes/`);
            })
            .catch((error) => {
                console.error(error);
                console.log("error occured during code deletion");
                navigate(`/codes/`);
            })
    }


    if (modalState) {
        return <Modal yesFunction={() => deleteCode(code.id)} text={modalText} title={modalTitle} />
    }

    return (
        <div className="flex  mb-2 ps-2 flex-col max-w-6xl shadow-lg justify-between">
            {
                code && code.user &&
                <div>
                    <div>
                        <div className='flex gap-2 items-center'>
                            <img className="h-[30px] w-auto rounded-full" src={code.user && code.user.profile} alt="" />
                            <span>{code.user.name}</span>
                        </div>
                        <div className='flex flex-col items-center gap-5 justify-between'>
                            <h3 className="font-semibold sm:text-lg">{code.title}</h3>
                            <p>{code.description}</p>
                            <div className='w-full'>
                                {
                                    code.user.email === currentUser.email &&
                                    <div className='grid grid-cols-2 gap-4 md:grid-cols-4 w-full justify-between'>
                                        <CopyToClipboard text={code.text} onCopy={() => {
                                            showToast("Code has been copied to clipboard");
                                        }}>
                                            <button className="text-sm font-bold border-blue-100 border-[1px] px-2 py-2 rounded bg-blue-950 text-white" title='Copy code to clipboard text-center   '>
                                                Copy Code.
                                            </button>
                                        </CopyToClipboard>
                                        <TButton  onClick={() => setLogState((prev) => !prev)}>
                                            {!logState ? "View Output" : "View Code"}
                                        </TButton>
                                        <TButton to={`/codes/${code.id}/edit`}>
                                            Edit
                                        </TButton>
                                        <TButton color='red' onClick={() => setModalState(true)}>
                                            Delete
                                        </TButton>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                    <div>
                        <span>{code.createdAt}</span>
                    </div>

                    <div className="py-2  min-h-[150px] mt-2 overflow-x-auto">
                        {
                            !logState &&
                            <textarea  className="w-full overflow-y-auto overflow-x-auto" id="" cols="30" rows="10" defaultValue={code.text}  disabled/>
                        }
                        {
                            logState &&
                                <img className='w-full ' src={code.errorImage} />
                        }
                    </div>
                    { !commentHide &&
                        <div className='grid grid-cols-3 pb-3 rounded-l-full gap-x-1'>
                        <button onClick={() => likeComment(code.id)} className={`flex py-2 bg-gray-200 items-center justify-center text-sm border-2 focus:ring-2 hover:bg-indigo-700 ${code.userLikeStatus && code.userLikeStatus.state && 'bg-indigo-800'}`}>
                             Like <div className='w-10 h-5 ml-2 bg-gray-400 text-center rounded-3xl'>{code.likes} </div>
                        </button>
                        <a href={`/codes/${code.id}/comments`} className='flex py-2 bg-gray-200 items-center justify-center text-sm border-2 focus:ring-2 hover:bg-indigo-700'>
                            Comments
                            <div className='w-10 h-5 ml-2 bg-gray-400 text-center rounded-3xl'>{code.comments}</div>
                        </a>
                        <a href='/codes/id/suggestion' className='flex py-2 bg-gray-200 items-center justify-center border-2 text-sm focus:ring-2 hover:bg-indigo-700'>
                            Suggestions
                            <div className='w-10 h-5 ml-2 bg-gray-400 text-center rounded-3xl'>{code.suggestions}</div>
                        </a>
                    </div>
                    }
                </div>
            }
        </div>
    )
}

Code.propTypes = {
    thecode: PropTypes.object,
    commentHide: PropTypes.bool,
}
