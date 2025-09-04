import React, { useState, useEffect} from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Card } from './Cards';

const ITEMS_PER_PAGE = 8;

export const Questions = () => {
    const { category } = useParams();
    const [searchParams] = useSearchParams();
    const lang = searchParams.get('lang') || 'en';
    const option = searchParams.get('option') || 'load';
    
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [questionsData, setQuestionsData] = useState({
        documents: [],
        education: [],
        entertainment: [],
        food: [],
        health: [],
        transport: [],
        useful_informations: []
    });

    const getCategoryKey = (categoryEn) => {
        const categoryMap = {
            "Education": "education",
            "Entertainment": "entertainment",
            "Food": "food",
            "Health": "health",
            "Transport": "transport",
            "Useful informations": "useful_informations",
            "HomeDocuments": "documents"
        };
        return categoryMap[categoryEn] || categoryEn.toLowerCase();
    };

    const GetData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/alldata', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            
            const categorizedQuestions = {
                education: [],
                entertainment: [],
                food: [],
                health: [],
                transport: [],
                useful_informations: [],
                documents: []
            };

            data.questions.forEach(question => {
                const categoryKey = getCategoryKey(question.category_en);
                if (categorizedQuestions[categoryKey]) {
                    categorizedQuestions[categoryKey].push({
                        qid: question.qid,
                        tid: question.tid,
                        question: (lang === 'en') ? question.question_en : question.question_ru,
                        answer: (lang === 'en') ? question.answer_en : question.answer_ru,
                    });
                }
            });

            setQuestionsData(categorizedQuestions);
        } catch (error) {
            console.error("Fetch error:", error);
            setError('Failed to load data');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        GetData();
    }, []);

    const currentCategoryKey = getCategoryKey(category);
    const allQuestions = questionsData[currentCategoryKey] || [];

    useEffect(() => {
        const calculatedTotalPages = Math.ceil(allQuestions.length / ITEMS_PER_PAGE);
        setTotalPages(calculatedTotalPages);
        setCurrentPage(1);
    }, [currentCategoryKey, allQuestions.length]);
    
    const getCurrentPageQuestions = () => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return allQuestions.slice(startIndex, endIndex);
    };
    
    const currentQuestions = getCurrentPageQuestions();

    if(isLoading){
        return <div className='questions-page'>Loading..</div>
    }

    if (error) {
        return <div className='questions-page'>Error: {error}</div>;
    }

    return (
        <div className='questions-page'>
            <h1 className='p-15 text-4xl font-manrope text-center font-bold dark:text-white leading-[3.25rem]'>
                {(category === 'useful_informations') ? 'useful informations' : category} questions {(option !== 'load') ? `(${option})` : ''}
            </h1>
            
            {allQuestions.length === 0 ? (
                <p className='display flex justify-center'>No questions found for this category</p>
            ) : (
                <>
                    <div className='questions-card'>
                        {currentQuestions.map((item, index) => (
                            <Card 
                                key={index}
                                question={item.question}
                                answer={item.answer}
                                questionId={item.qid}
                                titleid={item.tid}
                                option={option}
                            />
                        ))}
                    </div>
                    
                    {/* Пагинация */}
                    {totalPages > 1 && (
                        <div className="pagination flex justify-center mt-8">
                            <button 
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="mx-1 px-4 py-2 border rounded disabled:opacity-50"
                            >
                                Previous
                            </button>
                            
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`mx-1 px-4 py-2 border rounded ${currentPage === page ? 'bg-blue-500 text-white' : ''}`}
                                >
                                    {page}
                                </button>
                            ))}
                            
                            <button 
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="mx-1 px-4 py-2 border rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};