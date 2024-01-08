import PropTypes from 'prop-types'

export default function Comment({comment}) {
    return (
        <div className='bg-blue-100 mb-2 py-3 md:py-4 text-[15px] ps-3 w-full border-gray-100 border-1 text-gray-700'>
            <div className=''>
                <div className='flex gap-2 items-center'>
                    <img className="h-[30px] w-auto rounded-full" src={comment.user && comment.user.profile} alt="" />
                    <span>{comment.user.name}</span>
                </div>
            </div>
            <hr />
            <div className='mt-2'>
                {comment.comment}
            </div>
            <div className='text-right text-[16px] flex items-center px-2 pt-2 justify-end'>
                {comment.createdAt}
            </div>
        </div>
    )
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired
}
