import { useContext, useRef } from "react";
import axiosClient from "../../axios";
import { StateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

export default function Contact() {

    const nameRef = useRef(null);
    const descriptionRef = useRef(null);

    const { showToast } = useContext(StateContext);

    const navigate = useNavigate();


    const submitForm = (ev) => {
        ev.preventDefault();
        console.log('form has been submitted');

        axiosClient.post('/contact', {
            name: nameRef.current.value,
            description: descriptionRef.current.value,
        }).then((response) => {
            console.log(response);
            showToast("Thanks for you feedback");
            navigate('/');
        }).catch((error) => {
            console.error(error);
            showToast("Error: " + error.message);
        });
    }

    return (
        <div className="max-w-4xl mt-[60px] flex items-center justify-center mx-auto">
            <form onSubmit={submitForm} className="w-full">
                <div className="py-5 px-5  w-full min-h-[500px]">
                    <div className="grid grid-cols-1 ms-2">
                        <label htmlFor="name">Name</label>
                        <input type="text" ref={nameRef} className="md:cols-span-1 mt-2" placeholder="Enter name here"/>
                    </div>

                    <div className="grid grid-cols-1 mt-5 ms-2">
                        <label htmlFor="name">Suggestions for improvements of the platform</label>
                        <textarea type="text" ref={descriptionRef}  rows={10} className="md:cols-span-1 mt-2" placeholder="Type the text here"/>
                    </div>

                    <div className="flex items-center">
                        <button className="bg-blue-500 py-3 px-2 rounded-lg mt-2 hover:bg-blue-600" type="submit">Submit the form.</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
