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
                    All Codes
                </TButton>
            </div>
        }>
            {
                !loading  &&
                <div>
                    <div className="max-w-6xl grid grid-cols-2 gap-y-5 gap-x-3 sm:grid-cols-3 text-center font-bold">
                        <div className="shadow-sm">
                            <h3>Codes Posted</h3>
                            <h1 className="text-[40px]">{dashboardInfo.codesNum}</h1>
                        </div>

                        <div className="shadow-sm">
                            <h3>Problems Solved</h3>
                            <h1 className="text-[40px]">{dashboardInfo.solutionNum}</h1>
                        </div>

                        <div className="shadow-sm">
                            <h3>People you helped</h3>
                            <h1 className="text-[40px]">5</h1>
                        </div>

                        <div className="shadow-sm">
                            <h3>Total Likes</h3>
                            <h1 className="text-[40px]">{dashboardInfo.totalLikes}</h1>
                        </div>

                        <div className="shadow-sm">
                            <h3>Total Points</h3>
                            <h1 className="text-[40px]">{dashboardInfo.totalComments}</h1>
                        </div>

                        <div className="shadow-sm">
                            <h3>Quizes Taken</h3>
                            <h1 className="text-[40px]">{dashboardInfo.quizesTaken}</h1>
                        </div>
                    </div>

                    <div className="w-full mt-5 flex items-center justify-center">
                        <div className="w-11/12 bg-white p-5">
                            <div>
                                <h4 className="text-[25px]">Skill path</h4>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="flex flex-col gap-2">

            </div>
        </PageComponent>
    )
}
