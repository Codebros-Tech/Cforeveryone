import PageComponent from "../../components/PageComponent";
import TButton from "../../components/TButton";
import {  useEffect, useState } from "react";
import axiosClient from "../../axios";
import { useParams } from "react-router-dom";
import Code from '../Code/Code'

export default function CodeComments() {
    const { id } = useParams();
    const [loading, setLoading ] = useState(false);
    const [comments, setComments] = useState([]);
    const [code, setCode] = useState({});

    useEffect(() => {
        setLoading(true);
        axiosClient.get(`/codes/${id}/comments`)
            .then(({data}) => {
                setComments(data.comments);
                setCode(data.code);
                setLoading(false);
            })
    }, []);

    return (
        <PageComponent title={code.title ?? "Code has no title"} buttons={
            <div className='flex gap-2'>
                <TButton color='green' to="/codes/create">
                    New
                </TButton>
                <TButton color='green' to="/codes/mycodes">
                    My Codes.
                </TButton>
            </div>
        }
        small={`Code Description ${code.description}`}
        >

            {
                !loading  &&
                <div>
                    <Code code={code} commentHide />
                {
                    comments &&
                        comments.map((comment, index) => (
                            <div key={index}>
                                { comment.comment }
                            </div>
                        ))
                }
                {
                    comments.length === 0 &&
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
