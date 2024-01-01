import Code from "./Code";
import PageComponent from "../../components/PageComponent";
import { LinkIcon} from '@heroicons/react/24/outline';
import TButton from "../../components/TButton";
import { useEffect, useState } from "react";
import axiosClient from "../../axios";

export default function MyCodes() {
    const [codes, setCodes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosClient.get('/codes')
            .then(({data}) => {
                setCodes(data.codes);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            })
    }, []);


    return (
        <PageComponent title="My Codes page." buttons={
            <div className='flex gap-2'>
                <TButton color='green' to="/codes/create">
                    <LinkIcon className='h-4 w-4 mr-2' />
                    Post Code
                </TButton>
                <TButton color='green' to="/codes/mycodes">
                    <LinkIcon className='h-4 w-4 mr-2' />
                    My Codes
                </TButton>
                <TButton color='green' to="/codes">
                    <LinkIcon className='h-4 w-4 mr-2' />
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
                    codes &&
                        codes.map((code, index) => (
                            <Code key={index} code={code} />
                        ))
                }
                {
                    codes.length === 0 &&
                        <div className="flex justify-center items-center">
                            You have not posted Any codes yet.
                        </div>
                }
            </div>
            }
        </PageComponent>
    )
}
