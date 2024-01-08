export default function Contact() {
    const submitForm = (ev) => {
        ev.preventDefault();
        console.log('form has been submitted');
    }

    return (
        <div className="max-w-4xl mt-[60px] flex items-center justify-center mx-auto">
            <form onSubmit={submitForm} className="w-full">
                <div className="py-5 px-5  w-full min-h-[500px]">
                    <div className="grid grid-cols-1 ms-2">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="md:cols-span-1 mt-2" placeholder="Enter name here"/>
                    </div>

                    <div className="grid grid-cols-1 mt-5 ms-2">
                        <label htmlFor="name">Email</label>
                        <input type="text" className="md:cols-span-1 mt-2" placeholder="Enter email here"/>
                    </div>


                    <div className="grid grid-cols-1 mt-5 ms-2">
                        <label htmlFor="name">Email</label>
                        <textarea type="text" rows={10} className="md:cols-span-1 mt-2" placeholder="Enter email here"/>
                    </div>

                    <div className="flex items-center">
                        <button className="bg-blue-500 py-3 px-2 rounded-lg mt-2 hover:bg-blue-600" type="submit">Submit the form.</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
