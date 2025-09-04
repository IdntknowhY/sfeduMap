import React, {useState, useEffect, useRef} from 'react'
import { v4 as uuidv4 } from 'uuid';
import login_icon from '../assets/login.jpg'
import Cookies from 'js-cookie';
import Ed from '../assets/Education.png';
import Fs from '../assets/Food.png';
import Dm from '../assets/Dorms.png';
import Nv from '../assets/navigation.png';
import Sl from '../assets/social_life .png';
import Sf from '../assets/safety.png';
import Dc from '../assets/doc.png';
import bell from '../assets/bell.png'
import bell1 from '../assets/bell1.png'
import home from '../assets/home.png'
import { useNavigate } from 'react-router-dom';

const categories = [
    {id: 8, name: 'Education?', image: Ed},
    {id: 10, name: 'Food?', image: Fs},
    {id: 12, name: 'Transport?', image: Nv},
    {id: 13, name: 'useful_informations?', image: Dm},
    {id: 9, name: 'Entertainment?', image: Sl},
    {id: 11, name: 'Health?', image: Sf},
    {id: 7, name: 'HomeDocuments', image: Dc},
];

export const Admin = () => {
    const navigate = useNavigate();
    const [loggedin, setLoggedin] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [showNotifications, setShowNotifications] = useState(false);

    const[isDeleteId, setDeleteId] = useState({qid: ''});
    const[isDeleteAlertVisible, setDeleteAlertVisible] = useState(false);

    const[isAddQuestion, setAddQuestion] = useState(false);
    
    const [notifications, setNotifications] = useState({
        id: '',
        email: '',
        name: '',
        question: '',
        date: ''
    });
    
    const [formData, setFormData] = useState({
        admin_login: '',
        admin_password: ''
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null);
        setIsSuccess(false);
        LoginIn();
    }

    const LoginIn = async () => {
        try{
            const url = new URL('/admin/login')
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if(response.ok && data.token){
                setIsSuccess(true);

                Cookies.set('adminToken', data.token, { 
                    expires: 1,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                });

                setTimeout(() => {
                    setLoggedin(true);
                }, 1000);

            }
            else{
                setError(data.error || 'Ошибка авторизации'); 
                console.error('Ошибка авторизации:', data.error);
            }
        }
        catch(error){
            setError('Сервер недоступен');
            console.log('Error: ', error);
        }
    }
    
    useEffect(() => {
        const token = Cookies.get('adminToken');
        if(token){
            setLoggedin(true);
        }
    }, []);

    const [activeCategory, setActiveCategory] = useState(null);

    const toggleCategory = (id) => {
        setActiveCategory(activeCategory === id ? null : id);
    };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const getUserQuestions = async () => {
        try {
            console.log("Fetching questions...");
            const response = await fetch('/get/userquestion');
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Received data:", data);
            
            const questions = Array.isArray(data) ? data : [];
            console.log("Processed questions:", questions);
            
            setNotifications(questions);
        } catch (error) {
            console.error("Failed to fetch questions:", error);
            setError("Failed to load questions");
            setNotifications([]);
        }
    };

    useEffect(() => {
        const abortController = new AbortController();

        const fetchData = async () => {
            await getUserQuestions();
        };

        fetchData();

        return () => abortController.abort();
    }, []);

    const toggleDeleteModal = () => {
        setDeleteAlertVisible(!isDeleteAlertVisible);
    }

    const handleDelete = async () => {
        try {
            
            const token = Cookies.get('adminToken');
            if (!token) {
                throw new Error('Authentication required');
            }

            const response = await fetch('/admin/deletequestion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ qid: Number(isDeleteId.qid) })
            });
            
            if (response.status === 401) {
                // Handle token expiration
                Cookies.remove('adminToken');
                setLoggedin(false);
                setError('Session expired. Please login again.');
                return;
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            console.log(data);
            
            if (data.message === "Данные успещно удалены") {
                await getUserQuestions();
                toggleDeleteModal();
            } else {
                throw new Error(data.error || 'Failed to delete question');
            }
        } catch(error) {
            console.error('Delete error:', error);
            setError(error.message || 'Failed to delete question');
        }
    }

    const toggleAddQuestion = () => {
        setAddQuestion(!isAddQuestion);
    }

    const [addqdata, setaddqdata] = useState({
        qid: 0,
        tid: 0,
        question_en: "",
        answer_en: "",
        question_ru: "",
        answer_ru: "",
    });

    const HandleChangeAddQuestions = (event) => {
        setaddqdata({
            ...addqdata,
            [event.target.name]: event.target.value
        });
    }

    const AddNewQuestion = async (event, category_id) => {
        event.preventDefault();

        const requestBody = {
            ...addqdata,
            tid: Number(category_id),
            qid: Number(Math.floor(Math.random() * 1000000)),
        }

        try{
            
            const token = Cookies.get('adminToken');
            if (!token) {
                throw new Error('Authentication required');
            }

            console.log("reqbody: ",requestBody)
            const url = new URL("/admin/insert")
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

                },
                body: JSON.stringify(requestBody)
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
                setAddQuestion(!isAddQuestion);
            } else {
                throw new Error(data.error || 'Failed to add question');
            }

        } catch(error) {
            console.error('Error while adding:', error);
            setError(error.message || 'Failed to add question');
        }
    }

    return (
        <>
            {!loggedin && (
                <>
                    <div className='loginContainer'>
                        <form action="index.html" method="post" onSubmit={handleSubmit}>
                            <img src={login_icon} alt="error" className='login_icon' />
                            <input id='login' type='text' name='admin_login' placeholder='login' className='text-black' value={formData.admin_login}  onChange={handleChange} required/>
                            <input id="password" type="password" name="admin_password" placeholder='password' className='text-black' value={formData.admin_password} onChange={handleChange} required/>
                            {error && <div className='bg-red-300 success-btn'>{error}</div>}
                            {isSuccess && (
                                <div className='bg-green-300 success-btn'>Успешный вход!</div>
                            )}
                            <button type='submit'>Login in</button>
                        </form>
                    </div>
                </>
            )}

            {loggedin && (
                <>
                    <header>
                        <nav className='admin-nav'>
                            <ul className='nav-admin-ul'>
                                <li>
                                    <button 
                                        className='w-20 dark:invert dark:brightness-150' 
                                        onClick={toggleNotifications}
                                    >
                                        <img src={showNotifications ? bell1 : bell} alt="notifications" />
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        className='w-20 dark:invert dark:brightness-150' 
                                        onClick={() => navigate('/')}
                                    >
                                        <img src={home} alt="home" />
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </header>
                    <main className={`admin-main-container ${showNotifications ? 'shifted' : ''}`}>
                        {/* Notifications Panel */}
                        <div className={`notifications-panel ${showNotifications ? 'open' : ''}`}>
                            <div className="notifications-header">
                                <h3>User Questions</h3>
                                <button onClick={toggleNotifications} className="close-btn">
                                    &times;
                                </button>
                            </div>
                            <div className="notifications-list">
                                {notifications.length > 0 ? (
                                    notifications.map(({ id, user, mail, question, date }) => (
                                    <div key={id} className="notification-item">
                                        <div className="notification-header">
                                            <span className="notification-name">{user}</span>
                                            <span className="notification-date">{date || "No date"}</span>
                                        </div>
                                            <div className="notification-email">{mail}</div>
                                            <div className="notification-question">{question}</div>
                                            <div className="notification-actions">
                                                <button className="action-btn reply-btn">Reply</button>
                                                <button className="action-btn delete-btn" onClick={() => {toggleDeleteModal(); setDeleteId({qid: id})}} >Delete</button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-notifications">No new questions</div>
                                )}
                            </div>
                        </div>
                        
                        {isDeleteAlertVisible && (
                            <div className='fixed inset-0 transform bg-black/70 flex justify-center items-center z-2000'>
                                <div className="bg-white dark:bg-stone-950 p-8 rounded-lg w-11/12 max-w-2xl relative text-balck dark:text-white">
                                    <button
                                        onClick={toggleDeleteModal}
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

                                    <p className='flex justify-center pb-4'>Are u shure wanna delete question?</p>

                                    <div className='notification-actions flex justify-center'>
                                        <button type='button' className='action-btn reply-btn' onClick={handleDelete}>yes</button>
                                        <button className='action-btn delete-btn' onClick={toggleDeleteModal}>no</button>   
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="admin-container">
                            <div className="categories-row">
                                {categories.map((category) => (
                                    <div key={category.id} className="category-wrapper">
                                        <button
                                            className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                                            onClick={() => toggleCategory(category.id)}
                                        >
                                            <img src={category.image} alt="" className="category-img" />
                                            <span className="category-title">{category.name}</span>
                                            <svg className={`dropdown-arrow ${activeCategory === category.id ? 'open' : ''}`} 
                                                viewBox="0 0 24 24">
                                                <path d="M6 9L12 15L18 9" />
                                            </svg>
                                        </button>

                                        {activeCategory === category.id && category.id !== 7 &&(
                                            <>
                                                <div className="actions-container">
                                                    <button className="action-btn edit-btn" onClick={() => navigate(`/questions/${category.name}option=edit`)}>
                                                        Edit questions
                                                    </button>
                                                    <button className="action-btn delete-btn" onClick={() => navigate(`/questions/${category.name}option=delete`)}>
                                                        Delete questions
                                                    </button>
                                                    <button className="action-btn add-btn" onClick={toggleAddQuestion}>
                                                        Add question
                                                    </button>
                                                </div>
                                                <div>
                                                    {isAddQuestion && (
                                                        <div className='fixed inset-0 transform bg-black/70 flex justify-center items-center z-2000'>
                                                            <div className='bg-white dark:bg-stone-950 p-8 rounded-lg w-11/12 max-w-2xl relative text-balck dark:text-white'>
                                                                <button
                                                                    onClick={toggleAddQuestion}
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

                                                                <h5 className='flex justify-center'>{category.name}</h5>
                                                                
                                                                <div key={category.id} className='addQuestionsContainer'>
                                                                    <form  method='post' onSubmit={(e) => AddNewQuestion(e, category.id)}>
                                                                        <input onChange={HandleChangeAddQuestions} name='question_en' type="text" placeholder='Question (en)'/>
                                                                        <input onChange={HandleChangeAddQuestions} name='answer_en' type="text" placeholder='Answer (en)'/>
                                                                        <input onChange={HandleChangeAddQuestions} name='question_ru' type="text" placeholder='Question (ru)'/>
                                                                        <input onChange={HandleChangeAddQuestions} name='answer_ru' type="text" placeholder='Answer (ru)'/>
                                                                        <button type='submit' className='action-btn reply-btn'>Add new question</button>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                        {activeCategory === category.id && category.id === 7 &&(
                                            <div className="actions-container">
                                                <button className="action-btn edit-btn" onClick={() => navigate(`/questions/${category.name}?option=edit`)}>
                                                    Edit questions
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </main>
                    <footer className="bg-gray-800 text-white py-8 px-4 admin-footer">
                        <div className="max-w-6xl mx-auto">
                            <div className="flex flex-col md:flex-row justify-between items-center">
                                <div className="mb-6 md:mb-0">
                                    <img 
                                        src="../assets/ictis.png" 
                                        alt="ICTIS Logo" 
                                        className="h-12"
                                    />
                                </div>
                                
                                <div className="text-center md:text-right">
                                    <h3 className="text-lg font-semibold mb-2">ICTIS Admin Panel</h3>
                                    <p className="text-sm text-gray-300">
                                        Institute of Computer Technologies and Information Security
                                    </p>
                                    <p className="text-xs text-gray-400 mt-2">
                                        © {new Date().getFullYear()} All rights reserved
                                    </p>
                                </div>
                            </div>
                            
                            <div className="mt-8 pt-6 border-t border-gray-700 text-center">
                                <p className="text-xs text-gray-400">
                                    Developed by DevFusionWEB Team | Version 1.0.0
                                </p>
                            </div>
                        </div>
                    </footer>
                </>
            )}
        </>
    )
}