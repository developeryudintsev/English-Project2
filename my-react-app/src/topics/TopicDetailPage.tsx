import {Link, useParams} from 'react-router-dom';
import {topics} from "../AppRoutes";
import {Box, IconButton, Paper} from "@mui/material";
import {useEffect,  useState} from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CircularProgress from "@mui/material/CircularProgress";

const ORIGINAL_W = 240;
const ORIGINAL_H = 480;
const SCALE = 0.8;

const MIN_VISIBLE = 1;
const MAX_VISIBLE = 4;
const videos=[
    {id: 1, src:"https://vk.com/video_ext.php?oid=885405802&id=456239188&autoplay=0"},
    {id: 2, src:"https://vk.com/video_ext.php?oid=885405802&id=456239189&autoplay=0"},
    {id: 3, src:"https://vk.com/video_ext.php?oid=885405802&id=456239190&autoplay=0"},
    {id: 4, src:"https://vk.com/video_ext.php?oid=885405802&id=456239193&autoplay=0"},
    {id: 5, src:"https://vk.com/video_ext.php?oid=885405802&id=456239195&autoplay=0"},
    {id: 6, src:"https://vk.com/video_ext.php?oid=885405802&id=456239196&autoplay=0"},
    {id: 7, src:"https://vk.com/video_ext.php?oid=885405802&id=456239200&autoplay=0"},
    {id: 8, src:"https://vk.com/video_ext.php?oid=885405802&id=456239201&autoplay=0"},
    {id: 9, src:"https://vk.com/video_ext.php?oid=885405802&id=456239216&autoplay=0"},
    {id: 10, src:"https://vk.com/video_ext.php?oid=885405802&id=456239217&autoplay=0"},
    {id: 11, src:"https://vk.com/video_ext.php?oid=885405802&id=456239218&autoplay=0"},
    {id: 12, src:"https://vk.com/video_ext.php?oid=885405802&id=456239220&autoplay=0"},
    {id: 13, src:"https://vk.com/video_ext.php?oid=885405802&id=456239221&autoplay=0"},
    {id: 14, src:"https://vk.com/video_ext.php?oid=885405802&id=456239222&autoplay=0"},
    {id: 15, src:"https://vk.com/video_ext.php?oid=885405802&id=456239224&autoplay=0"},
    {id: 16, src:"https://vk.com/video_ext.php?oid=885405802&id=456239225&autoplay=0"},
    {id: 17, src:"https://vk.com/video_ext.php?oid=885405802&id=456239226&autoplay=0"},
    {id: 18, src:"https://vk.com/video_ext.php?oid=885405802&id=456239227&autoplay=0"},
    {id: 19, src:"https://vk.com/video_ext.php?oid=885405802&id=456239229&autoplay=0"},
    {id: 20, src:"https://vk.com/video_ext.php?oid=885405802&id=456239232&autoplay=0"},
    {id: 21, src:"https://vk.com/video_ext.php?oid=885405802&id=456239233&autoplay=0"},
    {id: 22, src:"https://vk.com/video_ext.php?oid=885405802&id=456239234&autoplay=0"},
    {id: 23, src:"https://vk.com/video_ext.php?oid=885405802&id=456239235&autoplay=0"},
    {id: 24, src:"https://vk.com/video_ext.php?oid=885405802&id=456239236&autoplay=0"},
    {id: 25, src:"https://vk.com/video_ext.php?oid=885405802&id=456239237&autoplay=0"},
    {id: 26, src:"https://vk.com/video_ext.php?oid=885405802&id=456239243&autoplay=0"},
    {id: 27, src:"https://vk.com/video_ext.php?oid=885405802&id=456239244&autoplay=0"},
    {id: 28, src:"https://vk.com/video_ext.php?oid=885405802&id=456239245&autoplay=0"},
    {id: 29, src:"https://vk.com/video_ext.php?oid=885405802&id=456239246&autoplay=0"},
    {id: 30, src:"https://vk.com/video_ext.php?oid=885405802&id=456239247&autoplay=0"},
    {id: 31, src:"https://vk.com/video_ext.php?oid=885405802&id=456239248&autoplay=0"},
    {id: 32, src:"https://vk.com/video_ext.php?oid=885405802&id=456239249&autoplay=0"},

]

export const TopicDetailPage = () => {
    const {topicId} = useParams<{ topicId: string }>();
    let [toggleIcon, setToggleIcon] = useState(false)
    let [toggleText, setToggleText] = useState(false)
    const [visibleCount, setVisibleCount] = useState(MAX_VISIBLE);
    const [startIndex, setStartIndex] = useState(0);
    const [loaded, setLoaded] = useState<Record<number, boolean>>({});
    const [toggleVideo, setToggleVideo] = useState(false);

    // responsive logic
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

    const visibleVideos = videos.slice(startIndex, startIndex + visibleCount);

    const canGoLeft = startIndex > 0;
    const canGoRight = startIndex + visibleCount < videos.length;

    const handleLeft = () => {
        if (canGoLeft) setStartIndex(prev => prev - 1);
    };

    const handleRight = () => {
        if (canGoRight) setStartIndex(prev => prev + 1);
    };

    const topic = topics.find(f => f.path === topicId);
    if (!topic) {
        return (
            <div style={{padding: '40px', textAlign: 'center'}}>
                <h1>Тема не найдена</h1>
                <p>Извините, мы не можем найти эту тему.</p>
                <Link to="/themes">
                    <button style={{padding: '10px 20px', marginTop: '20px'}}>
                        Вернуться к списку тем
                    </button>
                </Link>
            </div>
        );
    }
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: '20px',
                boxSizing: 'border-box',
            }}
        >
            <Box
                sx={{
                    textAlign: 'center',
                    width: '100%',
                }}
            >
                <Paper
                    elevation={3}
                    onClick={() => setToggleIcon(!toggleIcon)}
                    sx={{
                        padding: 2,
                        position: "relative",
                        width: "95%",
                        maxWidth: "980px",
                        textAlign: "center",
                        backgroundColor: "#444447",
                        transition: "all 1s ease",
                        animation: "blinkGreen 1s infinite",
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        cursor: 'pointer',
                    }}
                >
                    <h3 onClick={() => setToggleIcon(!toggleIcon)}
                        style={{color: '#FFF44F', marginTop: '0px', height: '7px'}}>{topic.label}-слова</h3>
                    <IconButton
                        onClick={() => setToggleIcon(!toggleIcon)}
                        sx={{color: '#FFF44F', position: 'absolute', top: 10, right: 8}}
                        size="small"
                    >
                        <InfoOutlinedIcon />
                    </IconButton>
                    {toggleIcon && <div style={{margin: '30px'}}>
                        {topic.vocabulary.length > 0 ? (
                            <div style={{marginTop: '20px', display: 'flex', justifyContent: 'center'}}>
                                <table style={{borderCollapse: 'collapse', width: '60%', margin: '0 auto'}}>
                                    <thead>
                                    <tr style={{background: '#444447', color: '#FFF44F'}}>
                                        <th style={{padding: '10px', border: '1px solid black'}}>English</th>
                                        <th style={{padding: '10px', border: '1px solid black'}}>Russian</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {topic.vocabulary.map((word, index) => (
                                        <tr key={index} style={{background: index % 2 === 0 ? '#ddd' : '#eee'}}>
                                            <td style={{
                                                padding: '10px',
                                                border: '1px solid black',
                                                textAlign: 'left'
                                            }}>{word.en}</td>
                                            <td style={{
                                                padding: '10px',
                                                border: '1px solid black',
                                                textAlign: 'left'
                                            }}>{word.ru}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p style={{marginTop: '20px'}}>
                                Здесь пока что ничего нет. Материалы находятся в разработке.
                            </p>
                        )}

                        <Link to="/themes">
                            <button style={{padding: '10px 20px', marginTop: '40px'}}>
                                Вернуться к списку тем
                            </button>
                        </Link>
                    </div>}
                </Paper>
                <Paper
                    elevation={3}
                    onClick={() => setToggleText(!toggleText)}
                    sx={{
                        padding: 2,
                        position: "relative",
                        width: "95%",
                        maxWidth: "980px",
                        textAlign: "center",
                        backgroundColor: "#444447",
                        transition: "all 1s ease",
                        animation: "blinkGreen 1s infinite",
                        marginTop: '20px',
                        marginLeft: 'auto',
                        cursor: 'pointer',
                        marginRight: 'auto',
                    }}
                >
                    <h3 onClick={() => setToggleText(!toggleText)} style={{
                        color: '#FFF44F',
                        marginTop: '0px',
                        height: '7px'
                    }}>{topic.label}-тема </h3>
                    <IconButton
                        onClick={() => setToggleText(!toggleText)}
                        sx={{color: '#FFF44F', position: 'absolute', top: 10, right: 8}}
                        size="small"
                    >
                        <InfoOutlinedIcon />
                    </IconButton>
                    {toggleText && <div style={{margin: '30px'}}>
                        {topic.vocabulary.length > 0 ? (
                            <>
                                {topic.text()}
                            </>
                        ) : (
                            <p style={{marginTop: '20px'}}>
                                Здесь пока что ничего нет. Материалы находятся в разработке.
                            </p>
                        )}

                        <Link to="/themes">
                            <button style={{padding: '10px 20px', marginTop: '40px'}}>
                                Вернуться к списку тем
                            </button>
                        </Link>
                    </div>}
                </Paper>

                    <Paper
                        elevation={3}
                        onClick={() =>{if (!toggleVideo) { setToggleVideo(!toggleVideo)}}}
                        sx={{
                            padding: 2,
                            position: "relative",
                            width: "95%",
                            maxWidth: "980px",
                            textAlign: "center",
                            backgroundColor: "#444447",
                            transition: "all 1s ease",
                            animation: "blinkGreen 1s infinite",
                            marginTop: '20px',
                            marginLeft: 'auto',
                            cursor: 'pointer',
                            marginRight: 'auto',
                        }}
                    >
                        <h3
                            onClick={() => setToggleVideo(!toggleVideo)}
                            style={{
                                color: '#FFF44F',
                                marginTop: '0px',
                                height: '7px' }}
                        >
                            Видео-уроки
                        </h3>

                        <IconButton
                            onClick={() => setToggleVideo(!toggleVideo)}
                            sx={{ color: "#FFF44F", position: "absolute", top: 10, right: 8 }}
                            size="small"
                        >
                            <InfoOutlinedIcon />
                        </IconButton>

                        {toggleVideo && (
                            <div style={{ marginTop: "30px", position: "relative" }}>
                                {/* LEFT BUTTON */}
                                <button
                                    onClick={handleLeft}
                                    disabled={!canGoLeft}
                                    style={{
                                        position: "absolute",
                                        left: 0,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        padding: "10px 15px",
                                        opacity: canGoLeft ? 1 : 0.3,
                                        background: "none",
                                        border: "none",
                                        fontSize: 90,
                                        color: "#FFF44F",
                                        cursor: canGoLeft ? "pointer" : "default",
                                    }}
                                >
                                    ‹
                                </button>

                                {/* VIDEO ROW */}
                                {/*<div*/}
                                {/*    style={{*/}
                                {/*        width: ORIGINAL_W,*/}
                                {/*        height: ORIGINAL_H,*/}
                                {/*        transform: `scale(${SCALE})`,*/}
                                {/*        transformOrigin: "top left",*/}
                                {/*    }}*/}
                                {/*>*/}
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        gap: "15px",
                                        width: "100%",
                                        transform: `scale(${SCALE})`,
                                        overflow: "hidden", // NO SCROLL
                                        padding: "0 0px",
                                    }}
                                >
                                    {visibleVideos.map(video => (
                                        <div
                                            key={video.id}
                                            style={{
                                                width: ORIGINAL_W ,
                                                height: ORIGINAL_H ,
                                                position: "relative",

                                            }}
                                        >
                                            {!loaded[video.id] && (
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        background: "#333",
                                                        borderRadius: "6px",
                                                    }}
                                                >
                                                    <CircularProgress />
                                                </div>
                                            )}

                                            <iframe
                                                src={video.src}
                                                width={ORIGINAL_W }
                                                height={ORIGINAL_H }
                                                frameBorder={0}
                                                allow="autoplay=0; encrypted-media; fullscreen"
                                                allowFullScreen
                                                style={{
                                                    display: loaded[video.id] ? "block" : "none",
                                                    borderRadius: "6px",
                                                }}
                                                onLoad={() =>
                                                    setLoaded(prev => ({ ...prev, [video.id]: true }))
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* RIGHT BUTTON */}
                                <button
                                    onClick={handleRight}
                                    disabled={!canGoRight}
                                    style={{
                                        position: "absolute",
                                        right: 0,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        padding: "10px 15px",
                                        opacity: canGoRight ? 1 : 0.3,
                                        background: "none",
                                        border: "none",
                                        fontSize: 90,
                                        color: "#FFF44F",
                                        cursor: canGoRight ? "pointer" : "default",
                                    }}
                                >
                                    ›
                                </button>

                                <Link to="/themes">
                                    <button style={{ padding: "10px 20px", marginTop: "0px" }}>
                                        Вернуться к темам
                                    </button>
                                </Link>
                            </div>
                        )}
                    </Paper>
                {/*</div>*/}

            </Box>
        </Box>
    );
};
// <iframe src="https://vk.com/video_ext.php?oid=885405802&id=456239188&autoplay=1" width="325" height="646"
//         style="background-color: #000"
//         allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" frameBorder="0"
//         allowFullScreen></iframe>