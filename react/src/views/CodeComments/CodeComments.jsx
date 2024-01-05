import PageComponent from "../../components/PageComponent";
import TButton from "../../components/TButton";
import {  useEffect, useRef, useState } from "react";
import axiosClient from "../../axios";
import { useParams } from "react-router-dom";
import Code from '../Code/Code'
import Comment from '../Code/Comment'

export default function CodeComments() {
    const { id } = useParams();
    const [loading, setLoading ] = useState(false);
    const [comments, setComments] = useState([]);
    const [code, setCode] = useState({});

    const commentRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        axiosClient.get(`/codes/${id}/comments`)
            .then(({data}) => {
                setComments(data.comments);
                setCode(data.code);
                setLoading(false);
            })
    }, []);

    const submitComment = (ev) => {
        ev.preventDefault();
        const comment = commentRef.current.value;
        commentRef.current.value = "";
        axiosClient.post(`/codes/${id}/comments`, {
            code_id: code.id,
            comment: comment,
        })
        .then(({data}) => {
            console.log("Comment created", data);
        })
    }

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
                    <form onSubmit={submitComment}>
                        <div className="w-full grid grid-cols-12">
                            <div className="col-span-11">
                                <input type="text" ref={commentRef} className="w-full " placeholder="Type the comment here." />
                            </div>
                            <TButton>
                                Submit
                            </TButton>
                        </div>
                    </form>
                {
                    comments &&
                        comments.map((comment, index) => (
                            <div key={index}>
                                <Comment comment={comment} />
                            </div>
                        ))
                }
                {
                    comments.length === 0 &&
                        <div className="flex justify-center items-center">
                            This code does not have any comments
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
