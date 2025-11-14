import {Link, Route, Routes, useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {App, HomeIcon} from "./App"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import cat from "./picture/cat.JPG";
import cat3 from "./picture/cat3.jpg";
import thems2 from "./picture/thems2.jpg";
import cubok from "./picture/klipartz.com.png";
import about from "./picture/about3.png";
import {TopicsPage} from "./topics/TopicsPage";
import {TopicDetailPage} from "./topics/TopicDetailPage";
import {AboutMyself} from "./TopicsObj/TopicsObj";

interface VocabularyWord {
    en: string;
    ru: string;
}
export interface TopicType {
    label: string;
    path: string;
    vocabulary: VocabularyWord[];
}

export const topics: TopicType[] = [
    {
        label: "About myself",
        path: "about-myself",
        vocabulary: AboutMyself
    },
    { label: "Morning routine", path: "morning-routine",vocabulary:[] },
    { label: "Public transport", path: "public-transport",vocabulary:[] },
    { label: "At a supermarket", path: "at-a-supermarket",vocabulary:[]},
    { label: "Accidents at home", path: "accidents-at-home",vocabulary:[]},
    { label: "At the department store", path: "at-the-department-store",vocabulary:[]},
    { label: "Beauty Salon", path: "beauty-salon",vocabulary:[]},
    { label: "Work", path: "work",vocabulary:[]},
    { label: "At the university", path: "at-the-university",vocabulary:[]},
    { label: "At a hotel", path: "at-a-hotel",vocabulary:[]},
    { label: "Bad habits", path: "bad-habits",vocabulary:[]},
    { label: "At a hospital", path: "at-a-hospital",vocabulary:[]},
    { label: "At the airport", path: "at-the-airport",vocabulary:[]},
    { label: "Friends", path: "friends",vocabulary:[]},
    { label: "House Cleaning", path: "house-cleaning",vocabulary:[]},
    { label: "Table manners", path: "table-manners",vocabulary:[]},
    { label: "My room", path: "my-room",vocabulary:[]},
    { label: "Why do you learn English?", path: "why-do-you-learn-english",vocabulary:[]},
    { label: "My city", path: "my-city",vocabulary:[]},
    { label: "Family problems", path: "family-problems",vocabulary:[]},
    { label: "Weather", path: "weather",vocabulary:[]},
    { label: "Sport", path: "sport",vocabulary:[]},
    { label: "Animals are in danger", path: "animals-are-in-danger",vocabulary:[]},
    { label: "Internet for and against", path: "internet-for-and-against",vocabulary:[]},
    { label: "Hobby", path: "hobby",vocabulary:[]},
    { label: "Fashion", path: "fashion",vocabulary:[]},
    { label: "At the theatre/ cinema", path: "at-the-theatre-cinema",vocabulary:[]},
    { label: "Generation gap", path: "generation-gap",vocabulary:[]},
    { label: "Travelling", path: "travelling",vocabulary:[]},
    { label: "In the army", path: "in-the-army",vocabulary:[]},
];
const Placeholder = ({title}: { title: string }) => (
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
            textAlign: "center",
        }}
    >
        <div
            style={{
                background: "#555",
                color: "#FFF44F",
                border: "2px solid black",
                padding: "40px 30px",
                borderRadius: "12px",
                maxWidth: "400px",
            }}
        >
            <h2>{title}</h2>
            <p>Здесь пока что ничего нет</p>
            <Link to="/" style={{textDecoration: "none"}}>
                <button style={{marginTop: "20px", padding: "10px 20px"}}>Назад</button>
            </Link>
        </div>
    </div>
);
export const AppRoutes = () => {
    const location = useLocation();
    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (location.pathname !== '/') {
    //         navigate('/', { replace: true });
    //     }
    // }, [navigate, location.pathname]);
    const [hoveredIndex, setHoveredIndex] = useState<number|null>(null);
    const getCardStyle = (index: number): React.CSSProperties => {
        const isHovered = hoveredIndex === index;
        return {
            background: "#555",
            color: "#FFF44F",
            border: "2px solid black",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "18px",
            flex: "0 0 auto",
            textAlign: "center",
            minWidth: "250px",
            minHeight: "430px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: isHovered ? 'scale(1.15)' : 'scale(1)',
            transition: 'transform 0.3s ease-in-out',
        };
    };
    const [visibleCount, setVisibleCount] = useState<number>(4);
    const [currentIndex, setCurrentIndex] = useState(0);
    const MIN_VISIBLE = 1;
    const MAX_VISIBLE = 4;
    const buttons = [
        {to: "/app", label: "Тренажер по временам"},
        {to: "/themes", label: "Тренажер по темам английского"},
        {to: "/about", label: "О нас и связаться с нами"},
        {to: "/achievements", label: "Мои Достижения"},
    ];
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 720) setVisibleCount(MIN_VISIBLE);
            else if (width < 890) setVisibleCount(2);
            else if (width < 1180) setVisibleCount(3);
            else setVisibleCount(MAX_VISIBLE);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const next = () => {
        if (currentIndex < buttons.length - visibleCount) {
            setCurrentIndex((prev) => prev + 1);
        }
    };
    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };
    const arrowStyle: React.CSSProperties = {
        background: "#333",
        color: "#FFF44F",
        border: "none",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        cursor: "pointer",
        fontSize: "20px",
    };
    return (
        <>
            {location.pathname !== '/app' &&
                <AppBar position="static" sx={{ backgroundColor: '#444447' }}>
                    <Container maxWidth="xl">
                        <Toolbar
                            disableGutters
                            sx={{
                                display: 'flex',
                                // На экранах меньше 600px (xs), элементы будут переноситься и
                                // центрироваться с помощью flexWrap: 'wrap' и justify-content: center в Box ниже
                                flexWrap: 'wrap',
                                gap: { xs: 2, md: 0 }, // Увеличим отступ между строками на мобильных
                                justifyContent: 'space-between', // По умолчанию разносим по краям
                                alignItems: 'center',
                                width: '100%',
                                py: 1,
                            }}
                        >
                            {/* Левая часть: Логотип и версия */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    flexWrap: 'wrap',
                                    // На экранах < 600px (xs), этот блок займет 100% ширины и центрируется
                                    width: { xs: '100%', sm: 'auto' },
                                    justifyContent: 'center',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        paddingY: { xs: 1, md: 0 },
                                    }}
                                >
                                    {/* Иконка HomeIcon с адаптивным размером */}
                                    <HomeIcon
                                        sx={{
                                            color: '#2fd300',
                                            fontSize: { xs: 35, sm: 40, md: 50 },
                                        }}
                                    />

                                    {/* Текст English Cat с адаптивным размером */}
                                    <Typography
                                        sx={{
                                            color: '#FFF44F',
                                            fontWeight: 700,
                                            fontFamily: '"South Park Ext", sans-serif',
                                            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.7rem' },
                                            textShadow: '2px 2px 0px #000, -1px -1px 0px #000',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        English cat
                                    </Typography>
                                </Box>

                                {/* Текст версии (v0.7) с адаптивным размером */}
                                <Typography
                                    sx={{
                                        color: '#FFF44F',
                                        fontWeight: 400,
                                        fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem' },
                                        whiteSpace: 'nowrap',
                                        ml: 1,
                                    }}
                                >
                                    (v0.7)
                                </Typography>
                            </Box>

                            {/* Правая часть — аватарка */}
                            <Box
                                sx={{
                                    // На экранах < 600px (xs), этот блок займет 100% ширины и центрируется
                                    width: { xs: '100%', sm: 'auto' },
                                    display: 'flex',
                                    justifyContent: 'center', // <-- Центрирование аватарки
                                    marginTop: { xs: '10px', sm: '0px' }, // Отступ сверху на мобильных
                                }}
                            >
                                <Tooltip title="Ссылка на наш сайт">
                                    <a
                                        href="https://www.kiber-rus.ru/"
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Avatar
                                            alt="User Avatar"
                                            src={cat}
                                            sx={{
                                                border: '2px solid white',
                                                width: { xs: 45, md: 55 },
                                                height: { xs: 45, md: 55 },
                                            }}
                                        />
                                    </a>
                                </Tooltip>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            }
            <Routes>
                <Route
                    path="/"
                    element={
                        <div
                            style={{
                                position: "relative",
                                padding: "40px ",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px",
                            }}
                        >
                            <button
                                onClick={prev}
                                disabled={currentIndex === 0}
                                style={{
                                    ...arrowStyle,
                                    opacity: currentIndex === 0 ? 0.5 : 1,
                                    cursor: currentIndex === 0 ? "not-allowed" : "pointer",
                                }}
                            >
                                {"<"}
                            </button>

                            {/* ИСПРАВЛЕНИЕ: Удалено overflow: "hidden" */}
                            <div style={{display: "flex", gap: "30px"}}>
                                {buttons
                                    .slice(currentIndex, currentIndex + visibleCount)
                                    .map((btn, index) => (
                                        <Link key={index} to={btn.to} style={{textDecoration: "none"}}>
                                            <div
                                                style={getCardStyle(index)}
                                                onMouseEnter={() => setHoveredIndex(index)}
                                                onMouseLeave={() => setHoveredIndex(null)} // <-- Исправлена неполная строка
                                            >
                                                {btn.to === '/app' ?
                                                    <div>
                                                        <img
                                                            src={cat3}
                                                            style={{
                                                                borderRadius: "12px",
                                                                width: "250px",
                                                                height: "434px",
                                                                marginTop: '-1px'
                                                            }}
                                                        />
                                                        <p style={{
                                                            fontFamily: 'sans-serif',
                                                            fontWeight:900,
                                                            fontSize:19,
                                                            width: "240px",
                                                            marginTop: '-80px'
                                                        }}>
                                                            {btn.label}
                                                        </p>
                                                    </div>
                                                    : btn.to == '/achievements' ?
                                                        <div>
                                                            <img
                                                                alt="achievements"
                                                                src={cubok}
                                                                style={{
                                                                    marginTop: '15%',
                                                                    width: 200,
                                                                    height: 240,
                                                                }}
                                                            />
                                                            <p style={{
                                                                fontFamily: 'sans-serif',
                                                                fontWeight:900,
                                                                fontSize:19,
                                                                width: "240px",
                                                                marginTop: '40px',
                                                            }}>
                                                                {btn.label}
                                                            </p>
                                                        </div>
                                                        : btn.to == '/themes' ?
                                                            <div >
                                                                <img
                                                                    src={thems2}
                                                                    style={{
                                                                        borderRadius: "12px",
                                                                        border:'#FFF44F 1px solid',
                                                                        width: "101%",
                                                                        height: "433px",
                                                                        marginTop: '-6px',
                                                                        marginLeft: '-2px',
                                                                    }}
                                                                />
                                                                <p style={{
                                                                    fontFamily: 'sans-serif',
                                                                    fontWeight:900,
                                                                    fontSize:19,
                                                                    width: "240px",
                                                                    marginTop: '-80px',
                                                                    marginLeft:'13px',
                                                                    color: 'black'
                                                                }}>
                                                                    {btn.label}
                                                                </p>
                                                            </div>
                                                            :
                                                            <div>
                                                                <img
                                                                    src={about}
                                                                    style={{
                                                                        borderRadius: "12px",
                                                                        width: "250px",
                                                                        height: "250px",
                                                                        marginTop: '40px'
                                                                    }}
                                                                />
                                                                <p style={{
                                                                    fontFamily: 'sans-serif',
                                                                    fontWeight:900,
                                                                    fontSize:19,
                                                                    marginTop: '55px',
                                                                    width: "250px",
                                                                }}>{btn.label}</p>
                                                            </div>
                                                }
                                            </div>
                                        </Link>
                                    ))}
                            </div>

                            <button
                                onClick={next}
                                disabled={currentIndex >= buttons.length - visibleCount}
                                style={{
                                    ...arrowStyle,
                                    opacity: currentIndex >= buttons.length - visibleCount ? 0.5 : 1,
                                    cursor:
                                        currentIndex >= buttons.length - visibleCount
                                            ? "not-allowed"
                                            : "pointer",
                                }}
                            >
                                {">"}
                            </button>
                        </div>
                    }
                />

                <Route path="/app" element={<App/>}/>
                <Route path="/themes" element={<TopicsPage/>} />
                <Route path="/themes/:topicId" element={<TopicDetailPage/>} />
                <Route path="/about" element={<Placeholder title="О нас "/>}/>
                <Route
                    path="/achievements"
                    element={<Placeholder title="Мои Достижения"/>}
                />
            </Routes>
        </>
    );
};