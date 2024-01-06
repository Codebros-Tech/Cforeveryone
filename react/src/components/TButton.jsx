// The core refers to very basic components that can be reused.

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function TButton({
    children,
    color = "indigo",
    to = '',
    circle =  false,
    href = '',
    link = false,
    target = "_blank",
    onClick = () => { }
}) {
    // create a classes that will hold the different styles for the button.
    let classes = [
        "flex",
        "whitespace-nowrap",
        "items-center",
        "text-xs",
        "border",
        "border-2",
        "border-transparent",
    ];

    if (link) {
        classes = [
            ...classes,
            "transition-colors",
        ];

        switch(color) {
            case "indigo":
                classes = [
                    ...classes,
                    "text-indigo-500",
                    "focus:border-indigo-500",
                ];
                break;
            case "red":
                classes = [...classes, "text-red-500", "focus:border-red-500"];
        }
    }  else {
        //means the button is not of type link
        classes = [
            ...classes,
            "text-white",
            "focus:ring-2",
            "focus:ring-offset-2",
        ];

        switch(color) {
            case "indigo":
                classes = [
                    ...classes,
                    "bg-indigo-600",
                    "hover:bg-indigo-700",
                    "focus:bg-indigo-500",
                ];
                break;
            case "red":
                classes = [
                    ...classes,
                    "bg-red-600",
                    "hover:bg-red-700",
                    "focus:bg-red-500",
                ];
                break;
            case "green":
                classes = [
                    ...classes,
                    "bg-emerald-500",
                    "hover:bg-emerald-600",
                    "focus:bg-emerald-400",
                ];
                break;
        }
    }

    if (circle) {
        classes = [
            ...classes,
            "h-8",
            "w-8",
            "items-center",
            "justify-center",
            "rounded-full",
            "text-sm",
        ];
    } else {
        classes = [
            ...classes,
            "p-0",
            "py-2",
            "px-2",
            "rounded-md",
            "text-sm"
        ];
    }

    return (
        <>
            {href && (<a href={href} className={classes.join(" ")} target={target}>{children}</a> )}
            {to && (<Link to={to} className={classes.join(" flex justify-center ")}>{children}</Link> )}
            {!to && !href && (<button onClick={onClick} className={classes.join(" ").concat(' flex justify-center')}>{children}</button> )}
        </>
    )
}

TButton.propTypes = {
    children: PropTypes.node,
    color: PropTypes.string,
    to: PropTypes.string,
    circle: PropTypes.bool,
    href: PropTypes.string,
    link: PropTypes.bool,
    target: PropTypes.string,
    onClick: PropTypes.func,
}
