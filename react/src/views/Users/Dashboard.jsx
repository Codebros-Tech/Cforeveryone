import Code from "../Code/Code";
import PageComponent from "../../components/PageComponent";
import TButton from "../../components/TButton";
import { useEffect, useState } from "react";
import axiosClient from '../../axios';

export default function Dashboard() {

    const [dashboardInfo, setDashboardInfo] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosClient.get('/dashboard')
            .then(({data}) => {
                setDashboardInfo(data)
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            })
    }, []);

    return (
        <PageComponent title="Dashboard"  buttons={
            <div className='flex gap-2'>
                <TButton color='green' to="/codes/mycodes">
                    All My Codes
                </TButton>
                <TButton color='green' to="/codes">
                    Browse Codes
                </TButton>
            </div>
        }>
            {
                !loading  &&
                <div>
                    <div className="block sm:flex sm:columns-3 max-w-7xl justify-between items-center">
                        <div className="w-80 flex flex-col justify-center shadow-md h-[80px] mx-auto text-center text-dark font-bold">
                            <h3>Number of Codes you Posted</h3>
                            <h1>{dashboardInfo.codesNum}</h1>
                        </div>

                        <div className="w-80 flex flex-col justify-center shadow-md h-[80px] mx-auto text-center text-dark font-bold">
                            <h3>Number of Problems Solved</h3>
                            <h1>{dashboardInfo.solutionNum}</h1>
                        </div>

                        <div className="w-80 flex flex-col  justify-center shadow-md h-[80px] mx-auto text-center text-dark font-bold">
                            <h3>Number of People you have helped</h3>
                            <h1>Still to work on this number:  5</h1>
                        </div>
                    </div>

                    <div className="block w-full mt-5">
                        <Code code={{title : 'title', text: "The codes."}} />
                    </div>
                </div>
            }
            <div className="flex flex-col gap-2">

            </div>
        </PageComponent>
    )
}
