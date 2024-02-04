import Code from "./Code";
import PageComponent from "../../components/PageComponent";
import TButton from "../../components/TButton";
import { useContext, useEffect, useState } from "react";
import axiosClient from "../../axios";
import { StateContext } from "../../contexts/ContextProvider";
import echo from '../../echo.js'

export default function CodeIndex() {
    const [loading, setLoading ] = useState(false);

    const { allCodes, setAllCodes } = useContext(StateContext);

    useEffect(() => {
        setLoading(true);
        axiosClient.get('/codes')
            .then(({data}) => {
                setAllCodes(data.codes);
                setLoading(false);
            })
    }, []);

    echo.private('private.codes').listen('.codes', (event) => {
        if (event.id) {
            const newCodes = allCodes.filter(code => code.id !== event.id);
            setAllCodes(newCodes);
        } else if (event.code) {
            allCodes.map((code) => {
                if (code.id === event.code.id) {
                    return event.code;
                }
                return code;
            })
            setAllCodes([...allCodes, event.code]);
        }
    });


    return (
        <PageComponent title="All Codes" buttons={(
            <div className='flex gap-2'>
                <TButton color='green' to="/codes/create">
                    New
                </TButton>
                <TButton color='green' to="/codes/mycodes">
                    My Codes.
                </TButton>
            </div>
        )}>
            {
                !loading  &&
                <div className={"md:flex gap-2"}>
                {
                    allCodes &&
                        allCodes.map((code, index) => (
                            <Code key={index} thecode={code} />
                        ))
                }
                {
                    allCodes.length === 0 &&
                        <div className="flex justify-center items-center">
                            No  Codes have been posted
                        </div>
                }
            </div>
            }
            {
                loading &&
                    <div className="flex items-center justify-center">
                        Patience is the key to a good life....
                    </div>
            }
        </PageComponent>
    )
}
