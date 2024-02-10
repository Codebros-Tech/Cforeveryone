import PropTypes from 'prop-types'
import {StateContext} from "../../contexts/ContextProvider.jsx";
import {useContext} from "react";

export default function Comment({comment}) {
    const { currentUser } = useContext(StateContext);
    return (
        <div className={`bg-blue-100 ${currentUser.id === comment.user.id ? 'ms-auto bg-blue-400' : 'me-auto' } mb-2 py-3 md:py-4 text-[15px] ps-3 w-[90%] border-gray-100 border-1 text-gray-700`}>
            <div className=''>
                <div className='flex gap-2 items-center'>
                    <img className="h-[30px] w-auto rounded-full" src={comment.user && comment.user.profile} alt="" />
                    <span>{comment.user.name}</span>
                </div>
            </div>
            <hr />
            <div className='mt-1'>
                <pre className={"whitespace-pre-wrap"}>
                    {comment.comment}
                </pre>
            </div>
            <div className='text-right text-[12px] flex items-center px-2 justify-end'>
                {comment.createdAt}
            </div>
        </div>
    )
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired
}
