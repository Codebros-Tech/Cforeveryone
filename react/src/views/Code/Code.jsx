import PropTypes from 'prop-types';
import { useContext } from 'react';
import { StateContext } from '../../contexts/ContextProvider';
import TButton from '../../components/TButton';
import axiosClient from '../../axios';

export default function Code({code = {}}) {

    const {currentUser , showToast} = useContext(StateContext);

    const deleteCode = (id) => {
        axiosClient.delete(`/codes/${id}`)
            .then((response) => {
                console.log(response);
                window.location.reload();
                showToast('Code deleted successfully');
            })
            .catch((error) => {
                console.error(error);
                console.log("error occured during code deletion");
            })
    }

    return (
        <div className="flex  mb-2 ps-2 flex-col shadow justify-between border-b-2 border-blue-400">
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
                            <button className="text-sm font-bold border-blue-100 border-[1px] px-2 py-2 rounded bg-blue-950 text-white">
                                Copy Code.
                            </button>
                            {
                                code.user.email === currentUser.email &&
                                <div className='flex items-center justify-between gap-2'>
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
                    <div className="py-2 border-[2px] min-h-[200px] mt-2 overflow-x-auto">
                        <pre>
                            <code className="w-full">
                                <textarea  className="w-11/12 overflow-y-auto overflow-x-auto" id="" cols="30" rows="10" defaultValue={code.text}  disabled/>
                            </code>
                        </pre>
                    </div>
                </div>
            }
        </div>
    )
}

Code.propTypes = {
    code: PropTypes.object,
}
