import PropTypes from 'prop-types'

export default function Comment({comment}) {
    return (
        <div>
            {comment.comment}
        </div>
    )
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired
}
