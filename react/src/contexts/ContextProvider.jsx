import { useState, createContext } from "react"
import PropTypes from 'prop-types';

// we initialize the variables so as to make the editor able to carry out autocomplete functionality
export const StateContext = createContext({
    currentUser: {},
    setCurrentUser: () => {},
    userToken: null,
    setUserToken: () => {},
});

export const ContextProvider = ({ children }) => {

    // this state will be used to make the user information available globally if the user is logged in
    const [ currentUser, setCurrentUser ] = useState({
        name: '',
    });
    // token is going be null if there is nothing there.
    const [ userToken, _setUserToken ] = useState(localStorage.getItem('TOKEN'));

    const setUserToken = (token) =>  {
        if (token) {
            localStorage.setItem('TOKEN', token)
        }  else  {
            localStorage.removeItem('TOKEN')
        }

        _setUserToken(token);
    }

    return (
        <StateContext.Provider value={{
            currentUser,
            setCurrentUser,
            userToken,
            setUserToken
        }}>

            {children}

        </StateContext.Provider>
    )
}

ContextProvider.propTypes  = {
    children: PropTypes.node,
}
