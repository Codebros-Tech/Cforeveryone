import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import PropTypes from 'prop-types'

export default function Paginator({meta, onPageClick}) {

    const onClick = (ev, link) => {
        ev.preventDefault();
        if (!link.url) {
            return ;
        }
        onPageClick(link);
    }

    return (
        meta.links &&
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 shadow-md mt-4">
        <div className="flex flex-1 justify-between sm:hidden">
            <a
            href="#"
            onClick={ev => onClick(ev, meta.links[0])}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
            Previous
            </a>
            <a
            href="#"
            onClick={ev => onClick(ev, meta.links[meta.links.length - 1])}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
            Next
            </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
                <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{meta.from}</span> to <span className="font-medium">{meta.to}</span> of{' '}
                    <span className="font-medium">{meta.total}</span> results
                </p>
            </div>
        <div>
            {
                meta.total > meta.per_page &&
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <a
                    href='#'
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </a>

                    {
                        meta.links.map((link, ind) =>  (
                            <a
                                href={link.url}
                                onClick={(ev) => onClick(ev, link)}
                                key={ind}
                                aria-current="page"
                                className={"relative z-10 inline-flex items-center bg-indigo-100  px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 " +
                                    (ind === 0 ? "rounded-l-md" : ' ') +
                                    (link.active ? "bg-indigo-500" : ' ') +
                                    (ind === meta.links.length - 1 ? "rounded-r-md" : ' ')
                                }
                                dangerouslySetInnerHTML={{__html: link.label}}
                            >
                            </a>
                        ))
                    }

                    <a
                    href='#'
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                </nav>
            }
            </div>
        </div>
        </div>
    )
}

Paginator.propTypes = {
    meta: PropTypes.object,
    onPageClick: PropTypes.func
}
