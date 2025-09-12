import React, { useState } from 'react';
import Cookies from 'js-cookie';

export const Card = ({ question, answer, questionId, titleid, option }) => {
    const [isAnswerShown, setIsAnswerShown] = useState(false);
    const [isEditPanelShow, setEditPanelShow] = useState(false);
    const [newAnswerData, setNewAnswerData] = useState({
        new_answer: ""
    });
    
    const toggleAnswer = () => {
        setIsAnswerShown(!isAnswerShown);
    }

    const handleChange = (event) => {
        setNewAnswerData({
            ...newAnswerData,
            [event.target.name]: event.target.value
        })
    }

    const EditQuestionShow = () => {
        setEditPanelShow(!isEditPanelShow); 
    }

    const EditQuestionSubmit = async () => {
        try{
            
            const token = Cookies.get('adminToken');
            if (!token) {
                throw new Error('Authentication required');
            }

            const url = "/api/admin/update";
            
            const response = await fetch(url, {
                method: 'UPDATE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newAnswerData)
            })

            if (response.status === 401) {
                // Handle token expiration
                Cookies.remove('adminToken');
                setLoggedin(false);
                setError('Session expired. Please login again.');
                return;
            }
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            
            console.log(data);
            
            if (data.message === "Запрос успешно выполнен") {
                window.location.reload();
            } else {
                throw new Error(data.error || 'Failed to delete question');
            }

        } catch(error) {
            console.error('Error while deleting:', error);
        }
    }

    const DeleteQuestion = async (id) => {
        try{
            
            const token = Cookies.get('adminToken');
            if (!token) {
                throw new Error('Authentication required');
            }

            const url = "/api/admin/delete";

            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ qid: Number(questionId) })
            })

            if (response.status === 401) {
                // Handle token expiration
                Cookies.remove('adminToken');
                setLoggedin(false);
                setError('Session expired. Please login again.');
                return;
            }
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            
            console.log(data);
            
            if (data.message === "Запрос успешно выполнен") {
                window.location.reload();
            } else {
                throw new Error(data.error || 'Failed to delete question');
            }

        } catch(error) {
            console.error('Error while deleting:', error);
        }
    }

    return (
        <>
            <div className="accordion-group" data-accordion="default-accordion">
                <div className="accordion border border-solid border-gray-300 p-4 rounded-xl transition duration-500 accordion-active:bg-indigo-50 accordion-active:border-indigo-600 mb-8 lg:p-4 active">

                    {option === 'load' && (
                        <button 
                            className='accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-whites w-full transition duration-500 hover:text-red-600 accordion-active:font-medium accordion-active:text-indigo-600'
                            aria-controls="basic-collapse-one-with-icon"
                            onClick={toggleAnswer}
                        >
                            <h5>{question}</h5>
                            {!isAnswerShown ? (
                                <svg
                                    className="w-6 h-6 text-gray-600 transition duration-500 block group-hover:text-red-600 origin-center"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6 12H18M12 18V6"
                                        stroke="currentColor"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            ) : (
                                <svg
                                    className="w-6 h-6 text-gray-600 transition duration-500 block group-hover:text-red-600"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6 12H18"
                                        stroke="currentColor"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            )}
                        </button>
                    )}

                    {option === 'edit' && (
                        <button
                            className='accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-whites w-full transition duration-500 hover:text-red-600 accordion-active:font-medium accordion-active:text-indigo-600'
                            aria-controls="basic-collapse-one-with-icon"
                            onClick={EditQuestionShow}
                        >
                            <h5>{question}</h5>
                            <h3>Edit</h3>
                        </button>
                    )}

                    {option === 'delete' && (
                        <button
                            className='accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-whites w-full transition duration-500 hover:text-red-600 accordion-active:font-medium accordion-active:text-indigo-600'
                            aria-controls="basic-collapse-one-with-icon"
                            onClick={() => DeleteQuestion(questionId)}
                        >
                            <h5>{question}</h5>
                            <h3>Delete</h3>
                        </button>
                    )}

                    {isAnswerShown && (
                        <div className="accordion-content w-full overflow-hidden pr-4">
                            {answer ? (
                                <p className="text-base text-gray-800 font-normal leading-6 dark:text-white">
                                    {answer}
                                </p>
                            ) : (
                                <p className="text-base text-gray-800 font-normal leading-6 dark:text-white">
                                    We have no answer!
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
            
            {isEditPanelShow && (
                <div className='fixed inset-0 transform bg-black/70 flex justify-center items-center z-50'>
                    <div className='bg-white dark:bg-stone-950 p-8 rounded-lg w-11/12 h-[600px] max-w-2xl relative text-black dark:text-white'>
                        <button
                            onClick={EditQuestionShow}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
                            >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        
                        <h5>Current answer: </h5>
                        <h5>{answer}</h5>
                        <h5>---</h5>
                        <h5>New answer: </h5>
                        <form action="index.html" method='POST' onSubmit={EditQuestionSubmit(questionId)}></form>
                        <div className='questionsContainer'>
                            <textarea name="new_answer" id="newanswer" onChange={handleChange} required></textarea>
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};