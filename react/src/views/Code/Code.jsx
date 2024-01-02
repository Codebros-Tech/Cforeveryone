import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { StateContext } from '../../contexts/ContextProvider';
import TButton from '../../components/TButton';
import axiosClient from '../../axios';

export default function Code({code = {}, commentHide = false}) {

    const {currentUser , showToast} = useContext(StateContext);
    const [logState, setLogState ] = useState(false);

    const { deleteCodeId } = useContext(StateContext);

    const likeComment = () => {

    }

    const deleteCode = (id) => {
        axiosClient.delete(`/codes/${id}`)
            .then(() => {
                deleteCodeId(id);
                showToast('Code deleted successfully');
            })
            .catch((error) => {
                console.error(error);
                console.log("error occured during code deletion");
            })
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
                        <div className='flex items-center gap-5'>
                            <h3 className="font-semibold sm:text-lg">{code.title}</h3>
                            <button className="text-sm font-bold border-blue-100 border-[1px] px-2 py-2 rounded bg-blue-950 text-white" title='Copy code to clipboard'>
                                Copy Code.
                            </button>
                            {
                                code.user.email === currentUser.email &&
                                <div className='flex items-center justify-between gap-1'>
                                    <TButton onClick={() => setLogState((prev) => !prev)}>
                                        {!logState ? "View Output" : "View Code"}
                                    </TButton>
                                    <TButton to={`/codes/${code.id}/edit`}>
                                        Edit
                                    </TButton>
                                    <TButton color='red' onClick={() => deleteCode(code.id)}>
                                        Delete
                                    </TButton>
                                </div>
                            }
                        </div>
                    </div>
                    <p>{code.description}</p>
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
                        <button onClick={() => likeComment(1)} className='flex py-2 bg-gray-200 items-center justify-center border-2 focus:ring-2 hover:bg-indigo-700'>
                             Like
                        </button>
                        <a href={`/codes/${code.id}/comments`} className='flex py-2 bg-gray-200 items-center justify-center border-2 focus:ring-2 hover:bg-indigo-700'>
                            Check Comments
                        </a>
                        <a href='/codes/id/suggestion' className='flex py-2 bg-gray-200 items-center justify-center border-2 focus:ring-2 hover:bg-indigo-700'>
                            Write Suggestions
                        </a>
                    </div>
                    }
                </div>
            }
        </div>
    )
}

Code.propTypes = {
    code: PropTypes.object,
    commentHide: PropTypes.bool,
}
