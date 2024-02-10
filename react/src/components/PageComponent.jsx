import PropTypes from 'prop-types'

export default function PageComponent({small = "" ,title, buttons, children}) {
    return (
        <>
            <header className="bg-white shadow">
                <div className="sm:flex ms-auto items-center justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-gray-900">
                        {title}
                        {small && <span className='w-full text-sm font-normal mt-1 block text-gray-800'>{small}</span>}
                    </h1>

                    {buttons}
                </div>
            </header>
            <main>
            <div className="mx-auto max-w-7xl min-h-screen py-6 sm:px-6 lg:px-8">
                {children}
            </div>
            </main>
        </>
    )
}
PageComponent.propTypes = {
    small: PropTypes.string,
    title: PropTypes.string,
    buttons: PropTypes.node,
    children: PropTypes.node
}
