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
import free from "./picture/free.jpg";
import thems2 from "./picture/thems2.jpg";
import cubok from "./picture/klipartz.com.png";
import about from "./picture/about3.png";
import {TopicsPage} from "./topics/TopicsPage";
import {TopicDetailPage} from "./topics/TopicDetailPage";
import {AboutMyself, Text, TextAbout} from "./TopicsObj/TopicsObj";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {Free} from "./free/Free";

interface VocabularyWord {
    en: string;
    ru: string;
}
export interface TopicType {
    label: string;
    path: string;
    vocabulary: VocabularyWord[];
    text:any
    id:number
}

export const topics: TopicType[] = [
    {
        label: "About myself",
        path: "about-myself",
        vocabulary: AboutMyself,
        text:TextAbout,
        id:1
    },
    { label: "Morning routine", path: "morning-routine",vocabulary:[],text:Text,id:2 },
    { label: "Public transport", path: "public-transport",vocabulary:[],text:Text,id:3 },
    { label: "At a supermarket", path: "at-a-supermarket",vocabulary:[],text:Text,id:4},
    { label: "Accidents at home", path: "accidents-at-home",vocabulary:[],text:Text,id:5},
    { label: "At the department store", path: "at-the-department-store",vocabulary:[],text:Text,id:6},
    { label: "Beauty Salon", path: "beauty-salon",vocabulary:[],text:Text,id:7},
    { label: "Work", path: "work",vocabulary:[],text:Text,id:8},
    { label: "At the university", path: "at-the-university",vocabulary:[],text:Text,id:9},
    { label: "At a hotel", path: "at-a-hotel",vocabulary:[],text:Text,id:10},
    { label: "Bad habits", path: "bad-habits",vocabulary:[],text:Text,id:11},
    { label: "At a hospital", path: "at-a-hospital",vocabulary:[],text:Text,id:12},
    { label: "At the airport", path: "at-the-airport",vocabulary:[],text:Text,id:13},
    { label: "Friends", path: "friends",vocabulary:[],text:Text,id:14},
    { label: "House Cleaning", path: "house-cleaning",vocabulary:[],text:Text,id:14},
    { label: "Table manners", path: "table-manners",vocabulary:[],text:Text,id:15},
    { label: "My room", path: "my-room",vocabulary:[],text:Text,id:16},
    { label: "Why do you learn English?", path: "why-do-you-learn-english",vocabulary:[],text:Text,id:17},
    { label: "My city", path: "my-city",vocabulary:[],text:Text,id:18},
    { label: "Family problems", path: "family-problems",vocabulary:[],text:Text,id:19},
    { label: "Weather", path: "weather",vocabulary:[],text:Text,id:20},
    { label: "Sport", path: "sport",vocabulary:[],text:Text,id:21},
    { label: "Animals are in danger", path: "animals-are-in-danger",vocabulary:[],text:Text,id:22},
    { label: "Internet for and against", path: "internet-for-and-against",vocabulary:[],text:Text,id:23},
    { label: "Hobby", path: "hobby",vocabulary:[],text:Text,id:24},
    { label: "Fashion", path: "fashion",vocabulary:[],text:Text,id:25},
    { label: "At the theatre/ cinema", path: "at-the-theatre-cinema",vocabulary:[],text:Text,id:26},
    { label: "Generation gap", path: "generation-gap",vocabulary:[],text:Text,id:27},
    { label: "Travelling", path: "travelling",vocabulary:[],text:Text,id:28},
    { label: "In the army", path: "in-the-army",vocabulary:[],text:Text,id:29},
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

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 600);
    const [visibleCount, setVisibleCount] = useState<number>(1);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const buttons = [
        { to: "/free", label: "Выйграй бесплатный английский" },
        { to: "/app", label: "Тренажер по временам" },
        { to: "/themes", label: "Тренажер по темам английского" },
        { to: "/about", label: "О нас и связаться с нами" },
        { to: "/achievements", label: "Мои Достижения" },
    ];

    /** 📱 responsive logic */
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            setIsMobile(width < 600);

            if (width < 720) setVisibleCount(1);
            else if (width < 890) setVisibleCount(2);
            else if (width < 1180) setVisibleCount(3);
            else setVisibleCount(4);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    /** 🛡 защита currentIndex */
    useEffect(() => {
        const maxIndex = Math.max(0, buttons.length - visibleCount);
        if (currentIndex > maxIndex) {
            setCurrentIndex(maxIndex);
        }
    }, [visibleCount, buttons.length, currentIndex]);

    const next = () => {
        if (currentIndex + visibleCount < buttons.length) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const getCardStyle = (index: number): React.CSSProperties => {
        const isHovered = hoveredIndex === index && !isMobile;

        return {
            background: "#555",
            color: "#FFF44F",
            border: "2px solid black",
            borderRadius: "12px",
            cursor: "pointer",
            minWidth: 250,
            minHeight: 430,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: isHovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.25s ease",
        };
    };

    const arrowStyle: React.CSSProperties = {
        background: "#333",
        color: "#FFF44F",
        border: "none",
        borderRadius: "50%",
        width: 40,
        height: 40,
        fontSize: 20,
        cursor: "pointer",
        flexShrink: 0,
        zIndex: 5,
    };

    return (
        <>
            {location.pathname !== "/app" && (
                <AppBar position="static" sx={{ backgroundColor: "#444447" }}>
                    <Container maxWidth="xl">
                        <Toolbar
                            sx={{
                                flexDirection: isMobile ? "column" : "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                {location.pathname !== "/" && (
                                    <HomeIcon sx={{ color: "#2fd300", fontSize: isMobile ? 32 : 48 }} />
                                )}
                                <Typography
                                    sx={{
                                        color: "#FFF44F",
                                        fontWeight: 700,
                                        fontSize: isMobile ? "1.5rem" : "2.7rem",
                                        fontFamily: '"South Park Ext", sans-serif',
                                    }}
                                >
                                    English cat
                                </Typography>
                                <Typography sx={{ color: "#FFF44F", fontSize: isMobile ? "1rem" : "2rem" }}>
                                    (v0.7)
                                </Typography>
                            </Box>

                            <Tooltip title="Ссылка на наш сайт">
                                <a href="https://www.kiber-rus.ru/" target="_blank" rel="noreferrer">
                                    <Avatar src={cat} sx={{ width: 45, height: 45 }} />
                                </a>
                            </Tooltip>
                        </Toolbar>
                    </Container>
                </AppBar>
            )}

            <Routes>
                <Route
                    path="/"
                    element={
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: isMobile ? 6 : 15,
                                padding: isMobile ? "30px 5px" : "40px",
                                overflow: "hidden",
                            }}
                        >
                            <button
                                onClick={prev}
                                disabled={currentIndex === 0}
                                style={{ ...arrowStyle, opacity: currentIndex === 0 ? 0.4 : 1 }}
                            >
                                {"<"}
                            </button>

                            <div style={{
                                display: "flex",
                                gap: window.innerWidth < 600 ? "15px" : "30px",
                                flexWrap: "nowrap", // Запрещаем перенос строк
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                {buttons
                                    .slice(currentIndex, currentIndex + visibleCount)
                                    .map((btn, index) => (
                                        <Link
                                            key={index}
                                            to={btn.to}
                                            style={{
                                                textDecoration: "none",
                                                flexShrink: 0 // ГЛАВНОЕ: запрещает сплющивание карточки
                                            }}
                                        >
                                            <div
                                                style={{
                                                    ...getCardStyle(index),
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    position: 'relative'
                                                }}
                                                onMouseEnter={() => setHoveredIndex(index)}
                                                onMouseLeave={() => setHoveredIndex(null)}
                                            >
                                                {btn.to === '/free'?
                                                    <div
                                                        style={{
                                                            position: 'relative',
                                                            cursor: 'pointer',
                                                            width: "250px",
                                                            height: "434px", // Ограничиваем высоту контейнера
                                                            borderRadius: "12px",
                                                            overflow: 'hidden' // Чтобы градиент не вылезал за скругления
                                                        }}
                                                    >
                                                        <img
                                                            src={free}
                                                            style={{
                                                                width: "250px",
                                                                height: "434px",
                                                                display: "block",
                                                                transition: "all 0.3s ease",
                                                            }}
                                                        />

                                                        {/* Слой градиентного затемнения */}
                                                        <div style={{
                                                            position: 'absolute',
                                                            bottom: 0,
                                                            left: 0,
                                                            width: '100%',
                                                            height: '50%', // Затемняем нижнюю половину
                                                            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                                                            pointerEvents: 'none' // Чтобы клики проходили сквозь слой
                                                        }} />

                                                        <p style={{
                                                            fontFamily: 'sans-serif',
                                                            fontWeight: 900,
                                                            fontSize: 19,
                                                            width: "240px",
                                                            position: 'absolute', // Позиционируем точно над низом
                                                            bottom: '20px',       // Отступ от края
                                                            left: '50%',
                                                            transform: 'translateX(-50%)', // Центрируем по горизонтали
                                                            margin: 0,
                                                            textAlign: 'center',
                                                            zIndex: 2
                                                        }}>
                                                            {btn.label}
                                                        </p>
                                                    </div>
                                                    :btn.to === '/app' ?
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
                                                                marginTop: '-80px',
                                                                textAlign:'center'
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
                                                                    textAlign:'center'
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
                                                                        color: 'black',
                                                                        textAlign:'center'
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
                                                                        textAlign:'center'
                                                                    }}>{btn.label}</p>
                                                                </div>
                                                }
                                            </div>
                                        </Link>
                                    ))}
                            </div>

                            <button
                                onClick={next}
                                disabled={currentIndex + visibleCount >= buttons.length}
                                style={{
                                    ...arrowStyle,
                                    opacity:
                                        currentIndex + visibleCount >= buttons.length ? 0.4 : 1,
                                }}
                            >
                                {">"}
                            </button>
                        </div>
                    }
                />

                <Route path="/free" element={<Free />} />
                <Route path="/app" element={<App />} />
                <Route path="/themes" element={<TopicsPage />} />
                <Route path="/themes/:topicId" element={<TopicDetailPage />} />
                <Route path="/about" element={<Placeholder title="О нас" />} />
                <Route path="/achievements" element={<Placeholder title="Мои Достижения" />} />
            </Routes>
        </>
    );
};

// export const AppRoutes = () => {
//     const location = useLocation();
//     const [hoveredIndex, setHoveredIndex] = useState<number|null>(null);
//     const [isMobile, setIsMobile] = useState<boolean>(() => window.innerWidth < 600);
//     const getCardStyle = (index: number): React.CSSProperties => {
//         const isHovered = hoveredIndex === index;
//         return {
//             background: "#555",
//             color: "#FFF44F",
//             border: "2px solid black",
//             borderRadius: "12px",
//             cursor: "pointer",
//             fontSize: "18px",
//             flex: "0 0 auto",
//             textAlign: "center",
//             minWidth: "250px",
//             minHeight: "430px",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             transform: isHovered ? 'scale(1.15)' : 'scale(1)',
//             transition: 'transform 0.3s ease-in-out',
//         };
//     };
//     const [visibleCount, setVisibleCount] = useState<number>(1);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const MIN_VISIBLE = 1;
//     const MAX_VISIBLE = 4;
//     const buttons = [
//         {to: "/free", label: "Выйграй бесплатный английский"},
//         {to: "/app", label: "Тренажер по временам"},
//         {to: "/themes", label: "Тренажер по темам английского"},
//         {to: "/about", label: "О нас и связаться с нами"},
//         {to: "/achievements", label: "Мои Достижения"},
//     ];
//     useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth < 600);
//         };
//
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);
//     useEffect(() => {
//         const handleResize = () => {
//             const width = window.innerWidth;
//             if (width < 720) setVisibleCount(MIN_VISIBLE);
//             else if (width < 890) setVisibleCount(2);
//             else if (width < 1180) setVisibleCount(3);
//             else setVisibleCount(MAX_VISIBLE);
//         };
//         handleResize();
//
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);
//     const next = () => {
//         if (currentIndex < buttons.length - visibleCount) {
//             setCurrentIndex((prev) => prev + 1);
//         }
//     };
//     const prev = () => {
//         if (currentIndex > 0) {
//             setCurrentIndex((prev) => prev - 1);
//         }
//     };
//     const arrowStyle: React.CSSProperties = {
//         background: "#333",
//         color: "#FFF44F",
//         border: "none",
//         borderRadius: "50%",
//         width: "40px",
//         height: "40px",
//         cursor: "pointer",
//         fontSize: "20px",
//     };
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//     return (
//         <>
//             {location.pathname !== '/app' &&
//                 <AppBar position="static" sx={{ backgroundColor: '#444447' }}>
//                     <Container maxWidth="xl">
//                         <Toolbar
//                             disableGutters
//                             sx={{
//                                 display: 'flex',
//                                 flexDirection: { xs: 'column', sm: 'row' },
//                                 justifyContent: { xs: 'center', sm: 'space-between' },
//                                 alignItems: 'center',
//                                 width: '100%',
//                                 py: 1,
//                                 gap: { xs: 1, sm: 0 },
//                             }}
//                         >
//                             {isMobile ? (
//                                 <Box
//                                     sx={{
//                                         display: 'flex',
//                                         flexDirection: 'column',
//                                         alignItems: 'start',
//                                         justifyContent: 'start',
//                                         width: '100%',
//                                     }}
//                                 >
//                                     <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
//                                         <Typography
//                                             sx={{
//                                                 color: '#FFF44F', fontWeight: 700, fontFamily: '"South Park Ext", sans-serif',
//                                                 fontSize: '1.5rem',
//                                                 textShadow: '2px 2px 0px #000, -1px -1px 0px #000',
//                                             }}
//                                         >
//                                             English cat
//                                         </Typography>
//                                         <Typography sx={{ color: '#FFF44F', fontWeight: 400, fontSize: '1rem', ml: 1 }}>
//                                             (v0.7)
//                                         </Typography>
//                                     </Box>
//                                     <Box
//                                         sx={{
//                                             position: { xs: 'absolute', sm: 'static' },
//                                             right: { xs: 10, sm: 'auto' },
//                                             top: { xs: 10, sm: 'auto' },
//                                         }}
//                                     >
//                                         <Tooltip title="Ссылка на наш сайт">
//                                             <a
//                                                 href="https://www.kiber-rus.ru/"
//                                                 target="_blank"
//                                                 rel="noreferrer"
//                                                 style={{ textDecoration: 'none' }}
//                                             >
//                                                 <Avatar
//                                                     alt="User Avatar"
//                                                     src={cat}
//                                                     sx={{
//                                                         border: '2px solid white',
//                                                         width: { xs: 45, md: 55 },
//                                                         height: { xs: 45, md: 55 },
//                                                     }}
//                                                 />
//                                             </a>
//                                         </Tooltip>
//                                     </Box>
//
//                                     {location.pathname !== '/' && (
//                                         <HomeIcon
//                                             sx={{
//                                                 color: '#2fd300',
//                                                 fontSize: 35,
//                                                 mt: 1,
//                                             }}
//                                         />
//                                     )}
//                                 </Box>
//
//                             ) : (
//
//                                 <Box
//                                     sx={{
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'start',
//                                         gap: 1,
//                                         width: '100%',
//                                     }}
//                                 >
//                                     {location.pathname !== '/' && (
//                                         <HomeIcon
//                                             sx={{
//                                                 color: '#2fd300',
//                                                 fontSize: 50,
//                                                 mt: '-10px',
//                                             }}
//                                         />
//                                     )}
//                                     <Typography
//                                         sx={{
//                                             color: '#FFF44F',
//                                             fontWeight: 700,
//                                             fontFamily: '"South Park Ext", sans-serif',
//                                             fontSize: '2.7rem',
//                                             textShadow: '2px 2px 0px #000, -1px -1px 0px #000',
//                                             whiteSpace: 'nowrap',
//                                         }}
//                                     >
//                                         English cat
//                                     </Typography>
//
//                                     <Typography
//                                         sx={{
//                                             color: '#FFF44F',
//                                             fontWeight: 400,
//                                             fontSize: '2rem',
//                                             whiteSpace: 'nowrap',
//                                         }}
//                                     >
//                                         (v0.7)
//                                     </Typography>
//                                 </Box>
//                             )}
//                             <Box
//                                 sx={{
//                                     position: { xs: 'absolute', sm: 'static' },
//                                     right: { xs: 10, sm: 'auto' },
//                                     top: { xs: 10, sm: 'auto' },
//                                 }}
//                             >
//                                 <Tooltip title="Ссылка на наш сайт">
//                                     <a
//                                         href="https://www.kiber-rus.ru/"
//                                         target="_blank"
//                                         rel="noreferrer"
//                                         style={{ textDecoration: 'none' }}
//                                     >
//                                         <Avatar
//                                             alt="User Avatar"
//                                             src={cat}
//                                             sx={{
//                                                 border: '2px solid white',
//                                                 width: { xs: 45, md: 55 },
//                                                 height: { xs: 45, md: 55 },
//                                             }}
//                                         />
//                                     </a>
//                                 </Tooltip>
//                             </Box>
//
//
//                         </Toolbar>
//                     </Container>
//                 </AppBar>
//             }
//
//             <Routes>
//                 <Route
//                     path="/"
//                     element={
//                         <div
//                             style={{
//                                 position: "relative",
//                                 padding: isMobile ? "40px 5px" : "40px", // Меньше отступов на мобилке
//                                 display: "flex",
//                                 justifyContent: "center",
//                                 alignItems: "center",
//                                 gap: isMobile  ? "5px" : "15px",
//                                 width: "100%",
//                                 boxSizing: "border-box",
//                                 overflow: "hidden" // Предотвращает горизонтальный скролл страницы
//                             }}
//                         >
//                             <button
//                                 onClick={prev}
//                                 disabled={currentIndex === 0}
//                                 style={{
//                                     ...arrowStyle,
//                                     opacity: currentIndex === 0 ? 0.5 : 1,
//                                     cursor: currentIndex === 0 ? "not-allowed" : "pointer",
//                                     zIndex: 10,
//                                     flexShrink: 0 // Стрелка тоже не должна сплющиваться
//                                 }}
//                             >
//                                 {"<"}
//                             </button>
//
//                             <div style={{
//                                 display: "flex",
//                                 gap: window.innerWidth < 600 ? "15px" : "30px",
//                                 flexWrap: "nowrap", // Запрещаем перенос строк
//                                 justifyContent: "center",
//                                 alignItems: "center"
//                             }}>
//                                 {buttons
//                                     .slice(currentIndex, currentIndex + visibleCount)
//                                     .map((btn, index) => (
//                                         <Link
//                                             key={index}
//                                             to={btn.to}
//                                             style={{
//                                                 textDecoration: "none",
//                                                 flexShrink: 0 // ГЛАВНОЕ: запрещает сплющивание карточки
//                                             }}
//                                         >
//                                             <div
//                                                 style={{
//                                                     ...getCardStyle(index),
//                                                     display: "flex",
//                                                     flexDirection: "column",
//                                                     alignItems: "center",
//                                                     position: 'relative'
//                                                 }}
//                                                 onMouseEnter={() => setHoveredIndex(index)}
//                                                 onMouseLeave={() => setHoveredIndex(null)}
//                                             >
//                                                 {btn.to === '/free'?
//                                                     <div
//                                                         style={{
//                                                             position: 'relative',
//                                                             cursor: 'pointer',
//                                                             width: "250px",
//                                                             height: "434px", // Ограничиваем высоту контейнера
//                                                             borderRadius: "12px",
//                                                             overflow: 'hidden' // Чтобы градиент не вылезал за скругления
//                                                         }}
//                                                     >
//                                                         <img
//                                                             src={free}
//                                                             style={{
//                                                                 width: "250px",
//                                                                 height: "434px",
//                                                                 display: "block",
//                                                                 transition: "all 0.3s ease",
//                                                             }}
//                                                         />
//
//                                                         {/* Слой градиентного затемнения */}
//                                                         <div style={{
//                                                             position: 'absolute',
//                                                             bottom: 0,
//                                                             left: 0,
//                                                             width: '100%',
//                                                             height: '50%', // Затемняем нижнюю половину
//                                                             background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
//                                                             pointerEvents: 'none' // Чтобы клики проходили сквозь слой
//                                                         }} />
//
//                                                         <p style={{
//                                                             fontFamily: 'sans-serif',
//                                                             fontWeight: 900,
//                                                             fontSize: 19,
//                                                             width: "240px",
//                                                             position: 'absolute', // Позиционируем точно над низом
//                                                             bottom: '20px',       // Отступ от края
//                                                             left: '50%',
//                                                             transform: 'translateX(-50%)', // Центрируем по горизонтали
//                                                             margin: 0,
//                                                             textAlign: 'center',
//                                                             zIndex: 2
//                                                         }}>
//                                                             {btn.label}
//                                                         </p>
//                                                     </div>
//                                                     :btn.to === '/app' ?
//                                                         <div>
//                                                             <img
//                                                                 src={cat3}
//                                                                 style={{
//                                                                     borderRadius: "12px",
//                                                                     width: "250px",
//                                                                     height: "434px",
//                                                                     marginTop: '-1px'
//                                                                 }}
//                                                             />
//                                                             <p style={{
//                                                                 fontFamily: 'sans-serif',
//                                                                 fontWeight:900,
//                                                                 fontSize:19,
//                                                                 width: "240px",
//                                                                 marginTop: '-80px'
//                                                             }}>
//                                                                 {btn.label}
//                                                             </p>
//                                                         </div>
//                                                         : btn.to == '/achievements' ?
//                                                             <div>
//                                                                 <img
//                                                                     alt="achievements"
//                                                                     src={cubok}
//                                                                     style={{
//                                                                         marginTop: '15%',
//                                                                         width: 200,
//                                                                         height: 240,
//                                                                     }}
//                                                                 />
//                                                                 <p style={{
//                                                                     fontFamily: 'sans-serif',
//                                                                     fontWeight:900,
//                                                                     fontSize:19,
//                                                                     width: "240px",
//                                                                     marginTop: '40px',
//                                                                 }}>
//                                                                     {btn.label}
//                                                                 </p>
//                                                             </div>
//                                                             : btn.to == '/themes' ?
//                                                                 <div >
//                                                                     <img
//                                                                         src={thems2}
//                                                                         style={{
//                                                                             borderRadius: "12px",
//                                                                             border:'#FFF44F 1px solid',
//                                                                             width: "101%",
//                                                                             height: "433px",
//                                                                             marginTop: '-6px',
//                                                                             marginLeft: '-2px',
//                                                                         }}
//                                                                     />
//                                                                     <p style={{
//                                                                         fontFamily: 'sans-serif',
//                                                                         fontWeight:900,
//                                                                         fontSize:19,
//                                                                         width: "240px",
//                                                                         marginTop: '-80px',
//                                                                         marginLeft:'13px',
//                                                                         color: 'black'
//                                                                     }}>
//                                                                         {btn.label}
//                                                                     </p>
//                                                                 </div>
//                                                                 :
//                                                                 <div>
//                                                                     <img
//                                                                         src={about}
//                                                                         style={{
//                                                                             borderRadius: "12px",
//                                                                             width: "250px",
//                                                                             height: "250px",
//                                                                             marginTop: '40px'
//                                                                         }}
//                                                                     />
//                                                                     <p style={{
//                                                                         fontFamily: 'sans-serif',
//                                                                         fontWeight:900,
//                                                                         fontSize:19,
//                                                                         marginTop: '55px',
//                                                                         width: "250px",
//                                                                     }}>{btn.label}</p>
//                                                                 </div>
//                                                 }
//                                             </div>
//                                         </Link>
//                                     ))}
//                             </div>
//
//                             <button
//                                 onClick={next}
//                                 disabled={currentIndex + visibleCount >= buttons.length}
//                                 style={{
//                                     ...arrowStyle,
//                                     opacity: currentIndex + visibleCount >= buttons.length ? 0.5 : 1,
//                                     cursor: currentIndex + visibleCount >= buttons.length ? "not-allowed" : "pointer",
//                                     zIndex: 10,
//                                     flexShrink: 0
//                                 }}
//                             >
//                                 {">"}
//                             </button>
//                         </div>
//                     }
//                 />
//                 <Route path="/free" element={<Free/>}/>
//                 <Route path="/app" element={<App/>}/>
//                 <Route path="/themes" element={<TopicsPage/>} />
//                 <Route path="/themes/:topicId" element={<TopicDetailPage/>} />
//                 <Route path="/about" element={<Placeholder title="О нас "/>}/>
//                 <Route
//                     path="/achievements"
//                     element={<Placeholder title="Мои Достижения"/>}
//                 />
//             </Routes>
//
//         </>
//     );
// };
