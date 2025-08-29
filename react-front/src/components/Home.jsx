import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from "react-i18next";
import { Yandexmap } from './Yandexmap';
import { Carousel } from './Carousel';
import { ExpandableRow } from './ExpandableRow';
import { data, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import a from '../assets/a.jpg';
import b from '../assets/b.jpg';
import d from '../assets/d.jpg';
import e from '../assets/ee.jpg';
import ee from '../assets/e.jpg';
import g from '../assets/g.jpg';
import k from '../assets/k.jpg';
import Ed from '../assets/Education.png';
import Fs from '../assets/Food.png';
import Dm from '../assets/Dorms.png';
import Nv from '../assets/navigation.png';
import Sl from '../assets/social_life .png';
import Sf from '../assets/safety.png';


export const Home = () => {
    
    const navigate = useNavigate();
    const [lang, setLang] = useState("EN");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isHelpVisible, setHelpVisible] = useState(false);
    const [isSubSecces, setSubSecces] = useState(false);
    const [mainData, setMainData] = useState({ titles: [], questions: [] });
    
    const [questionData, setQuestionData] = useState({
        id: '',
        user: '',
        mail: '',
        question: '',
        date: ''
    });

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { t, i18n } = useTranslation();
    const [currentLang, setCurrentLang] = useState(i18n.language.toUpperCase());

    const changeLang = (lng) => {
        const langCode = lng.toLowerCase();
        i18n.changeLanguage(langCode)
            .then(() => {
                setCurrentLang(lng);
                localStorage.setItem('language', langCode);
                setIsDropdownOpen(false);
            })
            .catch(err => console.error("Error changing language:", err));
    };

  useEffect(() => {
        const savedLang = localStorage.getItem('language') || 'en';
        i18n.changeLanguage(savedLang);
        setLang(savedLang.toUpperCase());
        
        const handleLanguageChanged = (lng) => {
            setLang(lng.toUpperCase());
        };
        
        i18n.on('languageChanged', handleLanguageChanged);
        
        return () => {
            i18n.off('languageChanged', handleLanguageChanged);
        };
    }, [i18n]);

    const scrollTo = (option) => {
        const Elements = {
            1: 'documents',
            2: 'questions',
            3: 'panoramas',
            4: 'map'
        };

        const elementId = Elements[option];
        if (elementId) {
            const element = document.getElementById(elementId);
            if (element) {
                const yOffset = -80;
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
            }
        }
    };

    const [showNav, setShowNav] = useState(false);
    const [activeSection, setActiveSection] = useState(null);
    const sectionsRef = useRef({
        documents: null,
        questions: null,
        panoramas: null,
        map: null
    });

    useEffect(() => {
        sectionsRef.current = {
            documents: document.getElementById('documents'),
            questions: document.getElementById('questions'),
            panoramas: document.getElementById('panoramas'),
            map: document.getElementById('map')
        };

        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100;
            
            setShowNav(scrollPosition > 100);
            
            let newActiveSection = null;
            const sections = ['documents', 'questions', 'panoramas', 'map'];
            
            for (const section of sections) {
                const element = sectionsRef.current[section];
                if (element) {
                    const sectionTop = element.offsetTop;
                    const sectionBottom = sectionTop + element.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        newActiveSection = section;
                        break;
                    }
                }
            }
            
            setActiveSection(newActiveSection);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        handleScroll();
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleHelpmodal = () => {
        setHelpVisible(!isHelpVisible);
    }

    const getMainData = async () => {
        try {
            setLoading(true);
            setMainData({ titles: [], questions: [] });
            setError(null);

            const url = new URL('api/data');

            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            
            setMainData({
                titles: data.titles || [],
                questions: data.questions || []
            });

        } catch (error) {
            console.error("Fetch error:", error);
            setError('Failed to load data');
        } finally {
            setLoading(false);
        }
    }

    const items = mainData.questions.map((question, index) => ({
        title: lang.toLowerCase() === 'ru' ? question.question_ru : question.question_en || t(`Вопрос ${index + 1}`),
        content: lang.toLowerCase() === 'ru' ? question.answer_ru : question.answer_en || t('Ответ не предоставлен'),
    }));

    useEffect(() => {
        getMainData();
    }, []);

    const handleChange = (event) => {
        setQuestionData({
            ...questionData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
       event.preventDefault();

       const currentDate = new Date().toISOString();

       const formData = {
        ...questionData,
        id: uuidv4(),
       };

       sendUserQuestion(formData);
 
        setQuestionData({
            id: '',
            user: '',
            mail: '',
            question: '',
        });
    }

    const sendUserQuestion = async (formData) => {
        try{

            const url = new URL('api/post/addquestion')

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json();

            if(response.ok && data.message === 'Данные успещно добавлены'){
                setSubSecces(true);
                setTimeout(() => {
                    setSubSecces(false);
                }, 2000);
            }
            else{
                setError('Ошибка отправки!');
                console.log('Error: ', error);
            }

        } catch(error) {
            setError(error);
        }
    }   

  return (
    <>
        <header className="header">

            <nav className={`navbar ${showNav ? 'visible' : 'hidden'}`}>
                <ul className="nav-list">
                    <li>
                        <button 
                            onClick={() => scrollTo(1)} 
                            className={activeSection === 'documents' ? 'active' : ''}
                        >
                            {t("Documents")}
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => scrollTo(2)} 
                            className={activeSection === 'questions' ? 'active' : ''}
                        >
                            {t("Questions")}
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => scrollTo(3)} 
                            className={activeSection === 'panoramas' ? 'active' : ''}
                        >
                            {t("Panoramas")}
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => scrollTo(4)} 
                            className={activeSection === 'map' ? 'active' : ''}
                        >
                            {t("Map")}
                        </button>
                    </li>
                </ul>
            </nav>

            <div className="container">
                <img className='max-w-[160px] dark:invert dark:brightness-150' src="../assets/image.png" alt="error" />
                <nav>
                    <ul className="nav-list">
                    <li>
                        <button 
                            className="help-btn"
                            onClick={toggleHelpmodal}
                            >{t("Help")}</button> 
                    </li>

                    <li className="language-selector">
                        <button
                        className="lang-btn"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                        {lang}
                        </button>
                        {isDropdownOpen && (
                        <ul className="dropdown">
                            <li onClick={() => changeLang("EN")}>EN</li>
                            <li onClick={() => changeLang("RU")}>RU</li>
                        </ul>
                        )}
                    </li>
                    </ul>
                </nav>
            </div>
                <div className='content'>
                    <div className='text-container'>
                        <h2 className='h2_header'>
                            {t("You can find")} <br /> {t("everything")} <br /> 
                            <span className='highlight'>{t("you need here.")}</span>
                        </h2>
                        <h4 className='h4_header'>
                            {t("website_guide")}
                        </h4>
                        <div className='routes-buttons'>
                            <ul className='nav-list'>
                                <li><button
                                    onClick={ () => scrollTo(1)} 
                                    className="lang-btn">{t("Documents")}</button></li>
                                <li><button
                                    onClick={ () => scrollTo(2)}
                                    className='lang-btn'>{t("Questions")}</button></li>
                                <li><button
                                    onClick={ () => scrollTo(3)}
                                    className="lang-btn">{t("Panoramas")}</button></li>
                                <li><button 
                                    id='map_btn'
                                    onClick={ () => scrollTo(4)} 
                                    className="lang-btn">{t("Map")}</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
        </header>

        
        {isHelpVisible && (
            <div className="fixed inset-0 transform bg-black/70 flex justify-center items-center z-50">
                <div className="bg-white dark:bg-stone-950 p-8 rounded-lg w-11/12 max-w-2xl relative text-black dark:text-white">
                    <button
                        onClick={toggleHelpmodal}
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

                    <h2 className="text-2xl font-bold mb-4">{t("Help menu")}</h2>
                    <p className="text-black dark:text-gray-300 mb-4">
                       {t("You can find answers to all your questions in the Questions section. Also, if you can't find an answer, you can ask it in the Questions section.")}
                    </p>
                    <p className="text-black dark:text-gray-300 mb-2">
                        {t("If you have a special situation, please contact us via email only in case of emergency (for foreigners only).")}
                    </p>
                    <ul className="list-disc list-inside text-black dark:text-gray-300 mb-4">
                        <li>{t("opryshkoaa@sfedu.ru")}</li>
                    </ul>

                    <button
                        onClick={toggleHelpmodal}
                        className="w-full bg-black dark:bg-white black:bg-white text-white hover:bg-gray-300 dark:text-black px-6 py-2 rounded-lg transition duration-300 ease-in-out"
                        >
                        Закрыть
                    </button>
                </div>
            </div>
        )}

        <main className='mainContainer'>
            <div className='arti_text' id='documents'>
                <h4 className='arti_h4'>{t("DOCUMENTS")}</h4>
                <h4 className='arti_h2'>{t("doc_info")}</h4>
            </div>
            <div className='docContainer'>
                <ExpandableRow items={items} t={t} />
            </div>

            <div className='arti_text' id='questions'>
                <h4 className='arti_h4'>{t("QUESTIONS")}</h4>
                <h4 className='arti_h2'>{t("question_info")}</h4>
            </div>
            <div className='questionsContainer'>
                <ul className='questionsUl'>
                    <li><button onClick={() => navigate(`/questions/education?option=load&lang=${lang.toLowerCase()}`)}><img class="max-w-[100px] dark:invert dark:brightness-150 m-auto" src={Ed} alt="error"/>{t("Education?")}</button></li>
                    <li><button onClick={() => navigate(`/questions/entertainment?option=load&lang=${lang.toLowerCase()}`)}><img className='max-w-[100px] dark:invert dark:brightness-150 m-auto' type="submit" src={Sl} alt="error" />{t("Entertainment?")}</button></li>
                    <li><button onClick={() => navigate(`/questions/transport?option=load&lang=${lang.toLowerCase()}`)}><img className='max-w-[100px] dark:invert dark:brightness-150 m-auto' type="submit" src={Nv} alt="error" />{t("Transport and navigation?")}</button></li>
                    <li><button onClick={() => navigate(`/questions/food?option=load&lang=${lang.toLowerCase()}`)}><img className='max-w-[100px] dark:invert dark:brightness-150 m-auto' type="submit" src={Fs} alt="error" />{t("Food?")}</button></li>
                    <li><button onClick={() => navigate(`/questions/useful_informations?option=load&lang=${lang.toLowerCase()}`)}><img className='max-w-[100px] dark:invert dark:brightness-150 m-auto' type="submit" src={Dm} alt="error" />{t("Useful informations?")}</button></li>
                    <li><button onClick={() => navigate(`/questions/health?option=load&lang=${lang.toLowerCase()}`)}><img className='max-w-[100px] dark:invert dark:brightness-150 m-auto' type="submit" src={Sf} alt="error" />{t("Safety and emergency care?")}</button></li>
                </ul>

                <form action="index.html" method="post" onSubmit={handleSubmit}>
                    <textarea id="new_question" name="question" placeholder={t("Ask your question here")} onChange={handleChange} required></textarea>
                    <input id="name" name="user" placeholder={t("Enter your name")} onChange={handleChange} required/>
                    <input type="email" id="email" name="mail" placeholder={t("Enter your email")} onChange={handleChange} required/>
                    {error && (<div className='bg-red-300 success-btn'>{error}</div>)}
                    {isSubSecces && (
                        <div className='bg-green-300 success-btn'>{t("Sent!")}</div>
                    )}
                    <button type="submit">Submit</button>
                </form>
            </div>

            <div className='arti_text' id='panoramas'>
                <h4 className='arti_h4'>{t("PANORAMAS")}</h4>
                <h4 className='arti_h2'>{t("ps_info")}</h4>
            </div>

            <Carousel 
                images={[a, b, d, g, ee, e, k]} 
                descriptions={[
                    t("Building - A"), 
                    t("Building - B"),
                    t("Building - D"),
                    t("Building - G"),
                    t("Building - I"),
                    t("Building - E"),
                    t("Building - K")
                ]}
                buttons={[
                    { text: t("To view panoramas"), url: "/a360" },
                    { text: t("To view panoramas"), url: "/b360" },
                    { text: t("To view panoramas"), url: "/d360" },
                    { text: t("To view panoramas"), url: "/g360" },
                    { text: t("To view panoramas"), url: "/i360" },
                    { text: t("To view panoramas"), url: "/e360" },
                    { text: t("To view panoramas"), url: "/k360" }
                ]}
            />

            <div className='arti_text' id='map'>
                <h4 className='arti_h4'>{t("MAP")}</h4>
                <h4 className='arti_h2'>{t("map_info")}</h4>
            </div>
            <div>
                <Yandexmap lang={lang} />
            </div>

        </main>
        <footer className="bg-black dark:bg-gray-200 py-6 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:items-start md:text-left">
                    <div className="mb-4 md:mb-0 md:mr-6 flex justify-center">
                        <img 
                        className="max-w-[160px] md:max-w-[180px]" 
                        src="../assets/ictis.png" 
                        alt="ICTIS Logo" 
                        />
                    </div>
                    <div className="text-white dark:text-gray-800 mb-4 md:mb-0 md:flex-1">
                        <p className="text-sm leading-tight mb-2">
                        Developed by DevFusionWEB Team<br/>
                        For Institute of Computer Technologies and Information Security
                        </p>
                        <p className="text-xs italic text-gray-300 dark:text-gray-600">
                        Разработано командой DevFusionWEB<br/>
                        Для Института компьютерных технологий и информационной безопасности
                        </p>
                    </div>

                    {/* Кнопка админа*/}
                    <div className="w-full md:w-auto mt-4 md:mt-0 md:self-center">
                        <a у
                        href="/admin" 
                        className="inline-block w-full md:w-auto bg-transparent text-white dark:text-gray-800 border border-white dark:border-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 opacity-80 hover:opacity-100 text-center"
                        >
                        Admin Panel
                        </a>
                    </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-700 dark:border-gray-300 text-center text-xs text-gray-400 dark:text-gray-500">
                    © {new Date().getFullYear()} ICTIS. All rights reserved.
                    </div>
                </div>
            </footer>
    </>
  )
}
