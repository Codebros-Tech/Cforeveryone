import { useContext, useEffect } from "react";
import { StateContext } from "../contexts/ContextProvider"

export default function Toast() {
    const {toast, setToast} =  useContext(StateContext);

    useEffect(() => {
        if (toast.show) {
            setTimeout(() => {
                setToast({...toast, show: false});
            }, 5000)
        }
    }, [toast]);

    return (
        toast.show &&
        <div className="py-2 px-3 text-white rounded bg-emerald-500 fixed right-2 bottom-2 z-50 animate-fade-in-down">
            {toast.message}
        </div>
    )
}
