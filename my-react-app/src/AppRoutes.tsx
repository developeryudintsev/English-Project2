import {Link, Route, Routes, useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {App} from "./App"
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
import {TopicsPage} from "./topics/TopicsPage";
import {TopicDetailPage} from "./topics/TopicDetailPage";

export const topics = [
    { label: "About myself", path: "about-myself" },
    { label: "Morning routine", path: "morning-routine" },
    { label: "Public transport", path: "public-transport" },
    { label: "At a supermarket", path: "at-a-supermarket" },
    { label: "Accidents at home", path: "accidents-at-home" },
    { label: "At the department store", path: "at-the-department-store" },
    { label: "Beauty Salon", path: "beauty-salon" },
    { label: "Work", path: "work" },
    { label: "At the university", path: "at-the-university" },
    { label: "At a hotel", path: "at-a-hotel" },
    { label: "Bad habits", path: "bad-habits" },
    { label: "At a hospital", path: "at-a-hospital" },
    { label: "At the airport", path: "at-the-airport" },
    { label: "Friends", path: "friends" },
    { label: "House Cleaning", path: "house-cleaning" },
    { label: "Table manners", path: "table-manners" },
    { label: "My room", path: "my-room" },
    { label: "Why do you learn English?", path: "why-do-you-learn-english" },
    { label: "My city", path: "my-city" },
    { label: "Family problems", path: "family-problems" },
    { label: "Weather", path: "weather" },
    { label: "Sport", path: "sport" },
    { label: "Animals are in danger", path: "animals-are-in-danger" },
    { label: "Internet for and against", path: "internet-for-and-against" },
    { label: "Hobby", path: "hobby" },
    { label: "Fashion", path: "fashion" },
    { label: "At the theatre/ cinema", path: "at-the-theatre-cinema" },
    { label: "Generation gap", path: "generation-gap" },
    { label: "Travelling", path: "travelling" },
    { label: "In the army", path: "in-the-army" },
];
// export const topicsMap = Map(topics.map(topic => [topic.path, topic.label]));
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
            if (width < 620) setVisibleCount(MIN_VISIBLE);
            else if (width < 820) setVisibleCount(2);
            else if (width < 1050) setVisibleCount(3);
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
                <AppBar position="static" sx={{backgroundColor: '#444447'}}>
                    <Container maxWidth="xl">
                        <Toolbar
                            disableGutters
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                py: 1,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: '#FFF44F',
                                        fontWeight: 700,
                                        fontFamily: '"South Park Ext", sans-serif',
                                        fontSize: '2.7rem',
                                        textShadow: '2px 2px 0px #000, -1px -1px 0px #000',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    English cat
                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#FFF44F',
                                        fontWeight: 400,
                                        fontSize: '2rem',
                                        whiteSpace: 'nowrap',
                                        ml: 1,
                                    }}
                                >
                                    (v0.7)
                                </Typography>
                            </Box>

                            {/* Правая часть — аватарка */}
                            <Tooltip title="Ссылка на наш сайт">
                                <a
                                    href="https://www.kiber-rus.ru/"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{textDecoration: 'none'}}
                                >
                                    <Avatar
                                        alt="User Avatar"
                                        src={cat}
                                        sx={{
                                            border: '2px solid white',
                                            width: 55,
                                            height: 55,
                                        }}
                                    />
                                </a>
                            </Tooltip>
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
                                                            : <span style={{
                                                                fontFamily: 'sans-serif',
                                                                fontWeight:900,
                                                                fontSize:19,
                                                                marginTop: '330px',
                                                                width: "250px",
                                                            }}>{btn.label}</span>
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