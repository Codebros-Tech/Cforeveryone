import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { StateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../axios';
import Modal from '../../components/Modal';
import { useNavigate } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { motion } from 'framer-motion'

export default function Code({thecode, commentHide = false}) {

    const {currentUser , showToast} = useContext(StateContext);
    const [logState, setLogState ] = useState(false);
    const [code, setCode] = useState(thecode);

    const [ modalState, setModalState] = useState(false);

    const navigate = useNavigate();

    const modalTitle  = "Delete The Code";
    const modalText = "Are you sure you want to delete this Code? All of the comments related to this code will be deleted."

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
        <motion.div
            className="flex w-fit border-b-2 border-2"
            initial={{
                scale: 0,
                opacity: 0,
                rotate: "0deg"
            }}
           animate={{
               opacity: 1,
               scale: 1,
           }}
            transition={{
                duration: 1,
                type: "spring",
            }}
        >
            {
                code && code.user &&
                <div className={"ps-2"}>
                    <div>
                        <div className='flex gap-2 columns-2 items-center'>
                            <div>
                                <img className="h-[30px] w-auto rounded-full" src={code.user.profile} alt=""/>
                                <span>{code.user.name}</span>
                            </div>
                            <div>
                                <span>{code.createdAt}</span>
                            </div>
                        </div>
                        <div className='flex flex-col justify-between'>
                        <h3 className="font-semibold sm:text-lg">{code.title}</h3>
                            <p>{code.description}</p>
                            <div className='ms-auto'>
                                {
                                    code.user.email === currentUser.email &&
                                    <div className='flex gap-1'>
                                        <button onClick={() => setLogState((prev) => !prev)}>
                                            {!logState ? "View Output" : "View Code"}
                                        </button>
                                        <a href={`/codes/${code.id}`}>Edit</a>
                                        <button onClick={() => setModalState(true)}>
                                            Delete
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <CopyToClipboard text={code.text} onCopy={() => {
                        showToast("Code has been copied to clipboard");
                    }}>
                        <button className="text-[13px] bg-gray-800 text-white" title='Copy code to clipboard text-center   '>
                            Copy
                        </button>
                    </CopyToClipboard>
                    <motion.div
                        className="mt-2"
                    >
                        {
                            !logState &&
                            <textarea className="w-full relative overflow-auto" defaultValue={code.text} disabled />
                        }
                        {
                            logState &&
                                <img className='w-80' alt={"The code error image."} src={code.errorImage} />
                        }
                    </motion.div>
                    { !commentHide &&
                        <div className='grid grid-cols-3  gap-x-1'>
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
        </motion.div>
    )
}

Code.propTypes = {
    thecode: PropTypes.object,
    commentHide: PropTypes.bool,
}
