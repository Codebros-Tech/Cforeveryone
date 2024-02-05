import PageComponent from "../../components/PageComponent";
import TButton from "../../components/TButton";
import {  useEffect, useRef, useState } from "react";
import axiosClient from "../../axios";
import { useParams } from "react-router-dom";
import Code from '../Code/Code'
import Comment from '../Code/Comment'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import echo from "../../echo.js";


export default function CodeComments() {
    const { id } = useParams();
    const [loading, setLoading ] = useState(false);
    const [comments, setComments] = useState([]);
    const [code, setCode] = useState({});

    const commentRef = useRef(null);

    const navigate = useNavigate();


    useEffect(() => {
        setLoading(true);
        // this fetches all the comments for this post first .
        axiosClient.get(`/codes/${id}/comments`)
        .then(({data}) => {
            setComments(data.comments);
            setCode(data.code);
            setLoading(false);
        }).catch((error) => {
            // redirect the user back to the codes page if an error occured getting the comments
            console.log(error);
            navigate('/codes');
        });

    }, []);

    // this part will keep track of the changes in the comments.
    const commentChannel = echo.channel('public.code.'+id);
    commentChannel.subscribed(function() {
        console.log("Subscribed to the comment channel");
    })
        .listen('.comment', (event) => {
            comments.push(event.comment);
            setComments([...comments, event.comment]);
        });


    const submitComment = (ev) => {
        ev.preventDefault();
        const comment = commentRef.current.value;
        commentRef.current.value = "";
        axiosClient.post(`/codes/${id}/comments`, {
            code_id: code.id,
            comment: comment,
        });
    }

    return (
        <PageComponent title={code.title ?? "Code has no title"} buttons={(
            <div className='flex gap-2'>
                <TButton color='green' to="/codes/create">
                    New
                </TButton>
                <TButton color='green' to="/codes/mycodes">
                    My Codes.
                </TButton>
            </div>
        )
        }
        small={`Code Description ${code.description}`}
        >

            {
                !loading  &&
                <div>
                    <Code thecode={code} commentHide />
                    <form onSubmit={submitComment}>
                        <div className="w-full relative">
                            <div className="relative">
                                <textarea ref={commentRef} className="w-full py-3 pe-14" placeholder="Type the comment here." />
                            </div>
                            <button type="submit" className="flex items-center border-1 bg-blue-500 text-white py-2 rounded-[30px] text-xl absolute right-0 top-[10px]  ">
                                <PaperAirplaneIcon width={45} height={30} color="white" />
                            </button>
                        </div>
                    </form>
                {
                    comments &&
                        <div className="max-w-[1200px] border-2  mx-auto px-2 py-4">
                            {
                                comments.map((comment, index) => (
                                    <div key={index}>
                                        <Comment comment={comment} />
                                    </div>
                                ))
                            }
                        </div>
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
