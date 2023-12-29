import PropTypes from 'prop-types';
import { ArrowTopRightOnSquareIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import TButton from './core/TButton';

export default function PersonListItem({ person, onDeleteClick }) {
    return (
        <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
            <img
                src={person.image_url}
                alt={person.title}
                className="w-full h-48 object-cover"
            />
            <h4 className="mt-4 font-bold text-lg">{person.title}</h4>
            <div
            // this means the content is set to some save html that is stored in the person.description.
                dangerouslySetInnerHTML={{ __html: person.description }}
                className='overflow-hidden flex-1'
            >
            </div>

            {/* Then we will add something that will look like the footer of each person item. */}
            <div className="flex items-center justify-between mt-3">
                {/* this button allows logged in users to view more information about a person. */}
                <TButton to={`/persons/${person.id}`}>
                    <PencilIcon className="w-5 h-5 mr-2" />
                    Edit
                </TButton>
                <div className='flex items-center'>
                    {/* This is to view it publicly as a guest user. */}
                    <TButton href={`/persons/public/${person.slug}`}  circle link>
                        {/* link: not having any buttons styles (just link) and circle: it's completely circular */}
                        <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                    </TButton>

                    {/* We are going to add the delete button only if the person has an Id */}
                    {
                        person.id &&
                        <TButton onClick={onDeleteClick} circle link color="red">
                            {/* link: not having any buttons styles (just link) and circle: it's completely circular */}
                            <TrashIcon className="w-5 h-5" />
                        </TButton>
                    }
                </div>
            </div>
        </div>
    )
}

PersonListItem.propTypes =
{
    person: PropTypes.object,
    onDeleteClick: PropTypes.func,
}
