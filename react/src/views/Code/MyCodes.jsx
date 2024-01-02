import Code from "./Code";
import PageComponent from "../../components/PageComponent";
import TButton from "../../components/TButton";
import { useContext, useEffect, useState } from "react";
import axiosClient from "../../axios";
import { StateContext } from "../../contexts/ContextProvider";

export default function MyCodes() {
    const [loading, setLoading] = useState(false);
    const { myCodes, setMyCodes } = useContext(StateContext);

    useEffect(() => {
        setLoading(true);
        axiosClient.get('/codes')
            .then(({data}) => {
                setMyCodes(data.codes);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            })
    }, []);


    return (
        <PageComponent title="My Codes" buttons={
            <div className='flex gap-2'>
                <TButton color='green' to="/codes/create">
                    New
                </TButton>
                <TButton color='green' to="/codes">
                    All Codes
                </TButton>
            </div>
        }>
            {
                loading &&
                    <div className="flex items-center justify-center">
                        Patience is the key to a good life...
                    </div>
            }
            {
                !loading &&
                <div>
                {
                    myCodes &&
                        myCodes.map((code, index) => (
                            <Code key={index} code={code} />
                        ))
                }
                {
                    myCodes.length === 0 &&
                        <div className="flex justify-center items-center">
                            You have not posted Any codes yet.
                        </div>
                }
            </div>
            }
        </PageComponent>
    )
}