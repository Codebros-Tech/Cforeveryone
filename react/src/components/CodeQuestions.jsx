import { PlusIcon } from '@heroicons/react/24/outline'
import   { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import QuestionEditor from '../components/QuestionEditor';
import PropTypes from 'prop-types';


export default function CodeQuestions({ questions, onQuestionUpdate }) {

    // this survey is not in sync with the original
    const [model, setModel] = useState([ ...questions ]);

    const addQuestion = (index) => {

        index = index != undefined  ? index : model.length;

        // models should focus on just the question schanging.
        model.splice(index, 0,
            {
                id: uuidv4(),
                type: "text",
                question: "",
                description: "",
                data: {}
            }
        );

        setModel(
            [
                ...model,
            ]
        )
    }

    const questionChange = (question) => {
        // question -> contains the question the user is currently modifying.
        if (!question) return;
        const newQuestions = model.map((q) => {
            if (q.id === question.id) {
                return { ...question }
            }
            return q
        })

        setModel([
            ...newQuestions
        ])
    }

    const deleteQuestion = (question) => {
        const newQuestions = model.filter((q) => q.id !== question.id);
        setModel([
            ...newQuestions
        ]);
    }

    useEffect(() => {
        onQuestionUpdate(model);
    }, [model]);

    return (
        <div>
            <div className="flex justify-between">
                <h3 className="text-2xl font-bold">Questions</h3>

                <button
                    type="button"
                    className="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                    onClick={() => addQuestion()}
                >
                    <PlusIcon className="w-4 mr-2" />
                    Add question
                </button>
            </div>
            {
                // this will iterate through all the question objects and create corresponding QuestionEditor components that will be used to modify these components.
                model.length ? (
                    model.map((q, ind) => (
                        <QuestionEditor
                            key={q.id}
                            index={ind}
                            question={q}
                            questionChange={questionChange}
                            addQuestion={addQuestion}
                            deleteQuestion={deleteQuestion}
                        />
                    ))
                ) : (
                    <div className="text-gray-400 text-center py-4">
                        You don&apos;t have any questions created.
                    </div>
                )
            }
        </div>
    )
}


CodeQuestions.propTypes = {
    questions: PropTypes.array,
    onQuestionUpdate: PropTypes.func,
}
