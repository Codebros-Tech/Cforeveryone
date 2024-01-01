import PropTypes from 'prop-types'
import TButton from '../../components/TButton'
// import { LinkIcon } from '@heroicons/react/24/outline'

export default function User({ user }) {
    return (
        <div className='flex flex-col border-gray-200 border-2 mt-2 py-3 px-2 shadow w-11/12 mx-auto gap-2'>
            <div className="grid grid-cols-3">
                <img src={user.profile} className="rounded-lg w-[100px] h-auto" alt="" />

                <div className='col-span-2'>
                    <h5>{user.name}</h5>
                    <h5>{user.email}</h5>
                    <h5>{user.matricule}</h5>
                    <div className='flex items-center mt-2 justify-between'>
                        <TButton color='green' to="/codes/create">
                            {/* <LinkIcon className='h-4 w-4 mr-2' />   */}
                            View Profile
                        </TButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

User.propTypes  = {
    user: PropTypes.object.isRequired
}
