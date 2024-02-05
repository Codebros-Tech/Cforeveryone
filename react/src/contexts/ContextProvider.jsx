import {useState, createContext, useEffect} from "react"
import PropTypes from 'prop-types';
import Echo from "laravel-echo";

// we initialize the variables so as to make the editor able to carry out autocomplete functionality
export const StateContext = createContext({
    currentUser: {},
    setCurrentUser: () => {},
    userToken: null,
    setUserToken: () => {},
    toast: {},
    setToast: () => {},
    showToast: () => {},
    allCodes: [],
    setAllCodes: () => {},
    deleteCodeId: () => {}
});

export const ContextProvider = ({ children }) => {

    const [allCodes, setAllCodes] = useState([]);

    const [myCodes, setMyCodes] = useState([]);

    const [toast, setToast] = useState({ message: "", show: false});

    // this state will be used to make the user information available globally if the user is logged in
    const [ currentUser, _setCurrentUser ] = useState({
        name: '',
        profile: '',
    });

    const setCurrentUser = (user) => {
        _setCurrentUser(user);
        localStorage.setItem('cforeveryone_user', user);
    }

    // token is going be null if there is nothing there.
    const [ userToken, _setUserToken ] = useState(localStorage.getItem('TOKEN'));

    const showToast = (message) => {
        setToast({message: message, show: true});
    }

    const deleteCodeId = (codeId) => {
        const newAllCodes = allCodes.filter(c => c.codeId !== codeId);
        const newMyCodes = myCodes.filter(c => c.codeId !== codeId);
        setMyCodes(newMyCodes);
        setAllCodes(newAllCodes);
    }




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
            setUserToken,
            toast,
            setToast,
            showToast,
            allCodes,
            setAllCodes,
            myCodes,
            setMyCodes,
            deleteCodeId
        }}>

            {children}

        </StateContext.Provider>
    )
}

ContextProvider.propTypes  = {
    children: PropTypes.node,
}
