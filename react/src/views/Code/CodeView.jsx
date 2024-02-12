import PageComponent from "../../components/PageComponent.jsx";
import TButton from "../../components/TButton.jsx";
import {useEffect, useRef, useState} from "react";
import axiosClient from "../../axios.js";
import { useParams } from "react-router-dom";
import Code from './Code.jsx'
import Comment from './Comment.jsx'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import echo from "../../echo.js";

export default function CodeView() {
    const { id } = useParams();
    const [loading, setLoading ] = useState(false);
    const [comments, setComments] = useState([]);
    const [code, setCode] = useState({});
    const [startTime, setStartTime ] = useState(0.0);
    const commentRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axiosClient.get(`/codes/${id}/comments`)
            .then(({data}) => {
                setComments(data.comments);
                setCode(data.code);
                setLoading(false);
            }).catch(() => {
                navigate('/codes');
            });

        const initialTime = performance.now();
        setStartTime(initialTime);

        return () => {
            sendRequest()
        }
    }, [id]);

    const sendRequest = () => {
        const endTime = performance.now();
        const durationFloat = (endTime - startTime) / 1000;
        const duration =  durationFloat.toFixed(0);
        axiosClient.post(`/codes/${id}/viewed`, {
            duration: duration,
        }).then(({data}) => {
            console.log(data);
        }).catch((error) => {
            console.error(error);
        });
    }

    const commentChannel = echo.channel('public.code.'+id+'.comment');
    commentChannel.listen('.comment', (event) => {
        setComments([...comments, event.comment]);
    });

    const submitComment = (ev) => {
        ev.preventDefault();
        const comment = commentRef.current.value;
        commentRef.current.value = "";
        axiosClient.post(`/codes/${id}/comments`, {
            code_id: code.id,
            comment: comment,
        }).catch((error) => {
            console.error(error);
        })
    }

    return (
        <PageComponent title={code.title ?? "Code has no title"} buttons={(
            <div className='flex gap-2'>
                <TButton color='green' to="/codes/create">
                    New
                </TButton>
                <TButton color='green' to="/codes/mine">
                    My Codes.
                </TButton>
            </div>
        )
        }
        small={`${code.description}`}
        >
            {
                !loading  &&
                <div>
                    <div className={"flex flex-col items-center sm:block"}>
                        <Code thecode={code} commentHide/>
                    </div>
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
                            <div className="max-w-[1200px] h-[70vh] overflow-auto border-2  mx-auto px-2 py-4">
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
