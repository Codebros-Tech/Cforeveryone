import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider"
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PropTypes } from "prop-types";
import { v4 as uuidv4 } from "uuid";

export default function QuestionEditor({
    index,
    question,
    addQuestion,
    deleteQuestion,
    questionChange,
}) {
    // we created a model variable that will contain the questions
    const [ model, setModel ] = useState({ ...question });
    const { questionTypes } = useStateContext();

    useEffect(() => {
        // the function questionChange was passed in and is used to modify the question in the real instance which is in the parent component.
        questionChange(model);
    }, [model]);

    function upperCaseFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function shouldHaveOptions(type = null) {
        type = type || model.type;
        if (type)
            return ['radio', 'checkbox', 'select'].includes(type);

        return false;
    }

    function onTypeChange(ev) {
        const newModel = {
            ...model,
            type: ev.target.value
        }

        // if the type initially had options and
        if (!shouldHaveOptions(model.type) && shouldHaveOptions(ev.target.value)) {
            if (!model.data.options) {
                newModel.data = {
                    options: [
                        {
                            uuid: uuidv4(),
                            text: '',
                        }
                    ]
                }
            }
        } else if (shouldHaveOptions(model.type) && !shouldHaveOptions(ev.target.value)) {
            // it is going to sset the array to be an empty array.
            setModel({...model, data: {...model.data, options: []}});
        }

        setModel(newModel);

    }

    function addOption() {
        model.data.options.push({
            uuid: uuidv4(),
            text: '',
        });

        setModel({...model});
    }

    function removeOption(ev, index) {
        ev.preventDefault();
        const newOptions = model.data.options.filter((option, ind) => ind != index)
        const data = {...model.data, options: newOptions};
        setModel({...model, data: data});
    }

    return (
        <div>
            <div className="flex justify-between mb-3">
                <h4>
                    {index + 1}. {model.question}
                </h4>
                {/* ON the right hand side  of each post, we have the add  and delete buttons. */}
                <div className="flex items-center">
                    <button
                        type="button"
                        className="flex items-center text-xs py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                        // click any button runs the addQuestion function
                        onClick={() => addQuestion(index + 1)}
                    >
                        <PlusIcon className="w-4" />
                        Add
                    </button>
                    {/* delete will parse as parameter the element that we want to delete. */}
                    <button
                        type="button"
                        className="flex items-center text-sm px-3 py-1 rounded-sm border border-transparent text-red-500 hover:border-red-500 font-semibold"
                        onClick={() => deleteQuestion(question)}
                    >
                        <TrashIcon className="w-4" />
                        Delete
                    </button>
                </div>
            </div>
            <div className="block sm:flex px-2 sm:px-0 gap-3 justify-between mb-3">
                {/* Question text */}
                <div className="flex-1">
                    <label
                        htmlFor="question"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Question
                    </label>
                    <input
                        type="text"
                        name="question"
                        id="question"
                        value={model.question}
                        onChange={(event) => setModel({...question, question: event.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                {/* Question type */}
                <div>
                    <label
                        htmlFor="questionType"
                        className="block text-sm font-medium text-gray-700 w-40"
                    >
                        Question Type
                    </label>
                    <select
                        name="questionType"
                        id="questionType"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        onChange={onTypeChange}
                    >
                        {
                            questionTypes.map((type, index) => (
                                <option key={index} value={type}>
                                    {upperCaseFirst(type)}
                                </option>
                            ))
                        }
                    </select>
                </div>
                {/* Question type */}

                {/* Question Description */}
                <div className="mb-3">
                    <label
                        htmlFor="questionDescription"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Description
                    </label>
                    <textarea
                        name="questionDescription"
                        id="questionDescription"
                        value={model.description}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={(event) => setModel({...model, description: event.target.value})}
                    >

                    </textarea>
                </div>
                {/* Question Description */}

                <div>
                    {
                        shouldHaveOptions() &&
                        <div>
                            <h4 className="text-sm font-semibold mb-1 flex justify-between items-center">
                                Options

                                <button onClick={() => addOption()} type="button" className="items-center text-sm py-1 px-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
                                    Add
                                </button>
                            </h4>

                            {
                                model.data.options.length === 0 &&
                                <div className="text-sm text-gray-600 text-center py-3">
                                    You don&lsquo;t have any options defined
                                </div>
                            }

                            {
                                model.data.options.length > 0 &&
                                <div>
                                    {
                                        model.data.options.map((option, index) =>  (
                                            <div key={index} className="flex items-center mb-1">
                                                <span className="w-6 text-sm">{index + 1}</span>
                                                <input
                                                    type="text"
                                                    onInput={(ev) => {option.text = ev.target.value; setModel({ ...model })}}
                                                    value={option.text}
                                                    className="w-full rounded-sm py-1 px-2 text-xs border border-gray-300 focus:border-indigo-500"
                                                />
                                                <button onClick={(ev) => removeOption(ev,index)}  className="h-6 w-6 rounded-full flex items-center justify-center border border-transparent transition-colors hover:border-red-100">
                                                    <TrashIcon className="w-5 h-5 text-red-500" />
                                                </button>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

QuestionEditor.propTypes = {
    index: PropTypes.number,
    question: PropTypes.object,
    addQuestion: PropTypes.func,
    deleteQuestion: PropTypes.func,
    questionChange: PropTypes.func
}
