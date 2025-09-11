--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6
-- Dumped by pg_dump version 16.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: new_questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.new_questions (
    id integer NOT NULL,
    name_user text DEFAULT 'Nameless'::text,
    mail text NOT NULL,
    question text NOT NULL,
    date date DEFAULT CURRENT_DATE
);


ALTER TABLE public.new_questions OWNER TO postgres;

--
-- Name: new_questions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.new_questions ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.new_questions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    "QID" integer NOT NULL,
    "TID" integer NOT NULL,
    question_en text NOT NULL,
    answer_en text NOT NULL,
    question_ru text NOT NULL,
    answer_ru text NOT NULL
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- Name: questions_QID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.questions ALTER COLUMN "QID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."questions_QID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: type_questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.type_questions (
    "TID" integer NOT NULL,
    data_en text NOT NULL,
    data_ru text NOT NULL,
    status integer DEFAULT 2 NOT NULL
);


ALTER TABLE public.type_questions OWNER TO postgres;

--
-- Name: type_questions_TID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.type_questions ALTER COLUMN "TID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."type_questions_TID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    telegram_id bigint NOT NULL,
    auth_date timestamp with time zone NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: new_questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.new_questions (id, name_user, mail, question, date) FROM stdin;
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questions ("QID", "TID", question_en, answer_en, question_ru, answer_ru) FROM stdin;
10	7	The first step upon arrival (to live in a dormitory not in the streets). What should I do upon arrival to the dormitory?	Upon arrival at the hostel, you are required to complete a compulsory medical examination. Please visit the Commandant’s Office located in your Hostel.  When you get to the hostel, tell the security you’ve just arrived and need to meet the commandant, where you will receive information on the cost of payment for the hostel and a room will be given. You will be told to do a medical examination for the hostel go to the medpoint(медпункт) at the address ‘Октябрьская площадь, 5’(1st hostel) to and enquire necessary documents for the process, it can be done in any hospital, most students do theirs at the address ‘улица Фрунзе, 79к4’,  a hospital beside Taganrog old railway station. Medpoint(медпункт): After you’ve gotten the results of the medical tests, take the result to the medpoint(медпункт) at the 1st hostel, where you will be given two medical passes, one for the hostel and the other for sports at school. Medical insurance(медицинская страховка): A medical insurance need to be gotten at the address Украинский пер., 21, which will be needed for the dormitory. Payment for now is 5000 and might get costlier. This process can be done while already living in the dormitory, make sure to do it and take a copy to the commandant of your dormitory. Note: it will be done every year.	Первый шаг по прибытию (жить в общежитии, а не на улице). Что делать при заселении в общежитие?	По прибытии в общежитие вам необходимо пройти обязательное медицинское обследование. Пожалуйста, посетите комендатуру, которая находится в вашем общежитии. Когда вы приедете в общежитие, скажите охране, что вы только что приехали и вам нужно встретиться с комендантом, где вам сообщат стоимость оплаты общежития и предоставят комнату. Вам скажут пройти медицинское обследование для общежития, подойдите в медпункт по адресу «Октябрьская площадь, 5» (1-е общежитие) и запросите необходимые документы для процедуры, это можно сделать в любой больнице, большинство студентов проходят их по адресу «улица Фрунзе, 79к4», больница рядом со старым железнодорожным вокзалом Таганрога. Медпункт: После получения результатов медицинских анализов отнесите их в медпункт в 1-м общежитии, где вам выдадут два медицинских пропуска, один для общежития, другой для занятий спортом в школе. Медицинская страховка: Медицинскую страховку необходимо оформить по адресу Украинский пер., 21, которая понадобится для общежития. На данный момент оплата составляет 5000 и может вырасти. Эту процедуру можно осуществить, уже проживая в общежитии, обязательно сделайте это и отнесите копию коменданту вашего общежития. Примечание: это будет делаться каждый год.
11	7	The second step to know about all documents. How do I extend my visa?	Also go to the migration office at the 6th hostel, this is where you’ll be told the documents needed for registration and visa extension and also the procedure (very necessary). On the basis of the Federal Law of Russia from 01.07.2021 № 274-FZ within 90 days (if you are a student) or within 30 days (if you are an employee) from the moment of your arrival in Russia you must undergo these measures: medical examination and green Card/Fingerprint Registration (дактилоскопия).	Второй шаг, который нужно выполнить, чтобы знать все о документах. Как продлить визу?	Идите в миграционную службу в 6-м общежитии, там вам расскажут какие документы нужны для регистрации и продления визы и какова процедура (очень нужна). На основании Федерального закона России от 01.07.2021 № 274-ФЗ в течение 90 дней (если вы студент) или в течение 30 дней (если вы работающий) с момента прибытия в Россию вы должны пройти следующие мероприятия: медицинское обследование и дактилоскопию.
12	7	Medical examination. What documents do I need for the medical exam and where do I do it?	This can be done at the address Rostov region, farm Leninakan, Yuzhnaya street 1/3, passport and visa centre of the Ministry of Internal Affairs of Russia ( Ростовская область, хутор Ленинакан, улица Южная 1/3, паспортно-визовый центр МВД России). Work schedule: Tuesdays and Thursdays 9.00 to 18.00 (preferably be there two hours earlier) To undergo a medical examination you should have: passport, migration card, registration, copies of these documents, notarized translation of the passport (all pages). The cost of the examination is around ₽9200. You can take with you a fluorogram (original) and its copy, so that you do not have to do it again. You'll need to go back there in a week to get a medical examination certificate. The time slot to get it is from 8.00 am to 9.00 am. Take your passport and the examination list with you to get the certificate. Required Documents:  1. Original passport;  2. Immigration card + copy; 3. Original registration document + copy;  4. Two copies of the passport’s data page;  5. Notarized translation of the passport’s data page + two copies;  6. Fluorography results (copy of chest scan, optional but recommended to save time and costs at the medical center). Attention! You must undergo this medical examination annually after the first medical examination. This must be done 30 days before the date of the previous year. The medical certificate after the repeated medical examination should be taken to the address: Taganrog city, Osipenko street 64, office №3 or №4(г. Таганрог, улица Осипенко 64, кабинет №4) to get a police certificate that proves that you have undergone the medical examination again.	Медицинское обследование. Какие документы нужны для медицинского обследования и где его пройти?	Сделать это можно по адресу Ростовская область, хутор Ленинакан, улица Южная, дом 1/3, паспортно-визовый центр МВД России. График работы: вторник и четверг с 9.00 до 18.00 (желательно быть на месте на два часа раньше) Для прохождения медицинского осмотра при себе необходимо иметь: паспорт, миграционную карту, регистрацию, копии этих документов, нотариально заверенный перевод паспорта (всех страниц). Стоимость обследования составляет около 9200 рублей. Вы можете взять с собой флюорограмму (оригинал) и ее копию, чтобы не проходить его повторно. Вам нужно будет прийти туда через неделю, чтобы получить справку о прохождении медицинского осмотра. Время получения с 8.00 до 9.00. Для получения справки возьмите с собой паспорт и лист обследования. Необходимые документы: 1. Оригинал паспорта; 2. Иммиграционная карта + копия; 3. Оригинал регистрационного документа + копия; 4. Две копии страницы с данными паспорта; 5. Нотариально заверенный перевод страницы с данными паспорта + две копии; 6. Результаты флюорографии (копия сканирования грудной клетки, необязательно, но рекомендуется для экономии времени и средств в медицинском центре). Внимание! Данное медицинское обследование необходимо проходить ежегодно после первого медицинского осмотра. Сделать это необходимо за 30 дней до даты предыдущего года. Медицинскую справку после повторного медицинского осмотра необходимо отнести по адресу: г. Таганрог, ул. Осипенко 64, кабинет №3 или №4 (г. Таганрог, ул. Осипенко 64, кабинет №4) для получения справки из полиции о повторном прохождении медицинского осмотра.
13	7	Green Card/Fingerprint Registration (дактилоскопия). Where do I go for fingerprinting?	After receiving your medical results, you must obtain a Green Card (дактилоскопия). This is a quick and free process which will be carried out in the address Taganrog, Osipenko Street 64, Migration Department of the Department of Migration Issues of the Ministry of Internal Affairs of Russia, office №4 (г. Таганрог, улица Осипенко 64, Отдел по вопросам миграции УМВД России, кабинет №4). To undergo the process you should have: 1. Original passport ; 2. Immigration card + copy; 3. Original registration document + copy; 4. Medical certificate of medical examination(result obtained after the medical examination); 5. Notarized translation of the passport’s all pages + a copy; 6. Two passport-sized photos (3×4 cm). The notarized translation of the passport (original with a blue stamp) must be given together with copies of other documents. It will not be returned. Working hours: Wednesday from 9.00 to 13.00.	Дактилоскопия. Куда мне обратиться для снятия отпечатков пальцев?	После получения результатов медицинского обследования необходимо получить Green Card (дактилоскопию). Это быстрая и бесплатная процедура, которая проводится по адресу Таганрог, ул. Осипенко 64, Управление по вопросам миграции Департамента по вопросам миграции МВД России, кабинет №4 (г. Таганрог, ул. Осипенко 64, Отдел по вопросам миграции УМВД России, кабинет №4). Для прохождения процедуры необходимо иметь: 1. Оригинал паспорта; 2. Иммиграционную карту + копию; 3. Оригинал документа о регистрации + копию; 4. Медицинскую справку о прохождении медицинского обследования (результат медицинского обследования); 5. Нотариально заверенный перевод всех страниц паспорта + копию; 6. Две фотографии паспортного размера (3×4 см). Нотариально заверенный перевод паспорта (оригинал с синей печатью) необходимо предоставить вместе с копиями других документов. Он не возвращается. Время работы: среда с 9.00 до 13.00.
14	7	Temporary Residence Permit (Optional but Recommended). How do  get a temporary residence?	Once the above steps are completed, you may apply for a Temporary Residence Permit. This permit exempts you from annual medical examinations and visa renewals. It remains valid for the duration of your studies in Russia and extends for an additional six months after graduation. After obtaining the green card(дактилоскопия) a student can received RVPO (registration of temporary residence for the period of study) each student can do it on his/her own in Rostov-on-Don at the address: Peschanaya Street, 21 ‘Migration Department of the Main Department of the Ministry of Internal Affairs of Russia in Rostov region’(улица Песчаная, 21 ‘Управление по вопросам миграции ГУ МВД России по Ростовской области’).	Временный вид на жительство (необязательно, но рекомендуется). Как получить временное место жительства?	После выполнения вышеуказанных шагов вы можете подать заявление на получение разрешения на временное проживание. Это разрешение освобождает вас от ежегодных медицинских осмотров и продления визы. Оно остается действительным на протяжении всего периода обучения в России и продлевается еще на шесть месяцев после окончания обучения. После получения грин-карты (дактилоскопия) студент может получить РВПО (регистрацию по временному проживанию на период обучения), каждый студент может сделать это самостоятельно в Ростове-на-Дону по адресу: ул. Песчаная, 21 «Управление по вопросам прохождения ГУ МВД России по Ростовской области».
15	8	Bank card. How do I get my Centre-Invest bank card?	Every student studying at our university is given a Centre-Invest (Центр-Инвест) bank card. You can use this card to make purchases online and in shops. You can replenish it either through an ATM (банкомат) by depositing cash or by selling cryptocurrency if you want your relatives to transfer money to you. Don't forget that this card is used as a pass to the institute. You need to put it to the sensor located on the turnstile so that you can pass. Access to some offices and classrooms is done in the same way.	Банковская карта. Как получить карту банка Центр-Инвест?	Каждому студенту, обучающемуся в нашем университете, выдается банковская карта «Центр-Инвест». С помощью этой карты вы можете совершать покупки в интернете и магазинах. Пополнить ее можно как через банкомат, внеся наличные, так и продав криптовалюту, если вы хотите, чтобы ваши близкие перевели вам деньги. Не забывайте, что эта карта используется как пропуск в институт. Вам нужно приложить ее к датчику, расположенному на турникете, чтобы вы могли пройти. Доступ в некоторые кабинеты и аудитории осуществляется таким же образом.
16	9	Bars. Which bars are popular among students?	There are a huge number of different bars in the city that vary in price, decorations, style and drinks served. One nearby is called Guzzler. There is also a Heart's, where, in addition to the pleasant interior and excellent menu, there are live music events.	Бары: Какие бары популярны среди студентов?	В городе огромное количество различных баров, которые различаются по цене, оформлению, стилю и подаваемым напиткам. Один из них неподалеку называется Guzzler. Также есть Heart's, где, помимо приятного интерьера и отличного меню, проходят живые музыкальные мероприятия.
17	10	Alcohol and tobacco. Where can I buy alcohol?	In Russia, alcohol and tobacco can be purchased from the age of 18. A passport is required for purchase. If you want to buy an energy drink, you will need a passport for that too. You can buy alcohol and tobacco in Magnit (Магнит) and Pyaterochka (Пятёрочка), but there are specialized shops such as Krasnoe & Beloe (Красное & Белое). There the choice of alcohol and tobacco is often much wider and of higher quality than in ordinary grocery shops. There are also specialized tobacco shops, the popular one being ProTabak (ProТабак). Throughout the city there are many beer establishments and regular bars with a variety of cocktails. But remember, smoking and drinking in public places, near schools, kindergartens or educational institutions is prohibited by law. It is also forbidden to do so in the premises of an institute.	Алкоголь и табак. Где можно купить алкоголь?	В России алкоголь и табак можно покупать с 18 лет. Для покупки требуется паспорт. Если вы хотите купить энергетический напиток, вам также понадобится паспорт. Купить алкоголь и табак можно в «Магните» и «Пятёрочке», но есть и специализированные магазины, такие как «Красное и Белое». Там выбор алкоголя и табака зачастую гораздо шире и качественнее, чем в обычных продуктовых магазинах. Есть также специализированные табачные магазины, самый популярный из которых — «ПроТабак». По всему городу расположено множество пивных заведений и обычных баров с разнообразными коктейлями. Но помните, курение и распитие спиртных напитков в общественных местах, около школ, детских садов или учебных заведений запрещено законом. Также запрещено делать это в помещениях институтов.
18	11	Headache. Where is the nearest 24-hour pharmacy?	In case of headache the best purchases will be - ‘Spasmalgon’(Metamizolum natrium+ Pitofenonum+ Fenpiverini bromidum), ‘Ketoprofen’(Ketoprophenum), ‘Ibuprofen’(Ibuprophenum), 'Novigan’(Ibuprophenum), ‘Nurofen’(Ibuprophenum). The last three drugs contain ibuprofen in different dosages, which is quite successful in producing analgesic effects. Note: when you get to the pharmacist you should also ask for advice on the medicine to buy, they usually recommend better.	Головная боль. Где находится ближайшая круглосуточная аптека?	При головной боли лучшими покупками будут - «Спазмалгон» (Metamizolum natrium + Pitofenonum + Fenpiverini bromidum), «Кетопрофен» (Ketoprophenum), «Ибупрофен» (Ibuprophenum), «Новиган» (Ibuprophenum), «Нурофен» (Ibuprophenum). Последние три препарата содержат ибупрофен в разных дозировках, который довольно успешно оказывает обезболивающее действие. Примечание: когда вы придете к фармацевту, вам также следует спросить совета о том, какое лекарство купить, они обычно порекомендуют лучше.
19	12	Buses. How do I pay for public transport?	The city has a public transport system. There are only a few buses, their numbers are 31, 34, 35, the bus fare is ₽37. The main number of bus for most people is 31. Its route is from New station to Russkoe Pole (от Нового Вокзала до Русского поля)  i.e. from one end of the city to the other. For a more detailed route, see our Map. Route 34 from New station to Primorsky Park (от Нового Вокзала до Приморского парка). Route 35 from PMK to Primorsky Park (от ПМК до Приморского парка).	Автобусы. Как оплатить проезд в общественном транспорте?	В городе имеется система общественного транспорта. Автобусов всего несколько, их номера 31, 34, 35, стоимость проезда 37 ₽. Основной номер автобуса у большинства людей — 31. Его маршрут — от Новой станции до Русского поля (от Нового Вокзала до Русского поля), т. е. от одного конца города до другого. Более подробный маршрут смотрите на нашей карте. Маршрут 34 от Новой станции до Приморского парка (от Нового Вокзала до Приморского парка). Маршрут 35 от ПМК до Приморского парка (от ПМК до Приморского парка).
20	13	Expulsion. What happens if I fail too many subjects and get expelled?	Don't forget important information, if you are permanently expelled from the university for any reason, you are not allowed to stay in the country for nothing. You must leave the country within 3 days. Otherwise it will be considered as illegal presence on the territory of the country.	Исключение. Что произойдёт, если я провалю слишком много предметов и меня отчислят?	Не забывайте важную информацию, если вас навсегда исключили из университета по любой причине, вам не разрешается оставаться в стране просто так. Вы должны покинуть страну в течение 3 дней. В противном случае это будет считаться незаконным нахождением на территории страны.
\.


--
-- Data for Name: type_questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.type_questions ("TID", data_en, data_ru, status) FROM stdin;
7	Documents	Документы	1
8	Education	Образование	2
9	Entertainment	Развлечение	2
10	Food	Еда	2
11	Health	Здоровье	2
12	Transport	Транспорт	2
13	Useful informations	Полезная информация	2
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, telegram_id, auth_date, is_active, created_at) FROM stdin;
\.


--
-- Name: new_questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.new_questions_id_seq', 5, true);


--
-- Name: questions_QID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."questions_QID_seq"', 25, true);


--
-- Name: type_questions_TID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."type_questions_TID_seq"', 13, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: new_questions new_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.new_questions
    ADD CONSTRAINT new_questions_pkey PRIMARY KEY (id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY ("QID");


--
-- Name: type_questions type_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_questions
    ADD CONSTRAINT type_questions_pkey PRIMARY KEY ("TID");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_telegram_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_telegram_id_key UNIQUE (telegram_id);


--
-- Name: questions questions_TID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT "questions_TID_fkey" FOREIGN KEY ("TID") REFERENCES public.type_questions("TID") NOT VALID;


--
-- Name: TABLE new_questions; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.new_questions TO qadmin;
GRANT SELECT,INSERT ON TABLE public.new_questions TO qdb;


--
-- Name: TABLE questions; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.questions TO qdb;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.questions TO qadmin;


--
-- Name: TABLE type_questions; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT ON TABLE public.type_questions TO qdb;
GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.type_questions TO qadmin;


--
-- PostgreSQL database dump complete
--

