import PropTypes from 'prop-types'

export default function DashboardCard({title, children}) {
    return (
        <div className="bg-white shadow-md p-3 text-center flex flex-col animate-fade-in-down">
            {title && <h3 className="text-2xl font-semibold">{title}</h3>}
            {children}
        </div>
    )
}

DashboardCard.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node
}
