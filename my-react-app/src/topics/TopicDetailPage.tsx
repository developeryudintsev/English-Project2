import {Link, useParams} from 'react-router-dom';
import {topics} from "../AppRoutes";
import {Box, IconButton, Paper} from "@mui/material";
import  {useState} from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CircularProgress from "@mui/material/CircularProgress";


export const TopicDetailPage = () => {
    const {topicId} = useParams<{ topicId: string }>();
    let [toggleIcon, setToggleIcon] = useState(false)
    let [toggleText, setToggleText] = useState(false)
    let [toggleVideo, setToggleVideo] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const ORIGINAL_W = 240;
    const ORIGINAL_H = 480;
    const GAP = 12;
    const ARROW_SIZE = 64;
    const SCALE = 0.8;

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
                    sx={{
                        padding: 2,
                        position: "relative",
                        width: "95%",
                        maxWidth: "980px",
                        textAlign: "center",
                        backgroundColor: "#444447",
                        transition: "all 1s ease",
                        animation: "blinkGreen 1s infinite",
                        marginTop: "20px",
                        marginLeft: "auto",
                        cursor: "pointer",
                        marginRight: "auto",
                    }}
                >
                    <h3
                        onClick={() => setToggleVideo(!toggleVideo)}
                        style={{
                            color: "#FFF44F",
                            marginTop: "0px",
                            height: "7px",
                        }}
                    >
                        {topic.label}-видео
                    </h3>

                    <IconButton
                        onClick={() => setToggleVideo(!toggleVideo)}
                        sx={{ color: "#FFF44F", position: "absolute", top: 10, right: 8 }}
                        size="small"
                    >
                        <InfoOutlinedIcon />
                    </IconButton>

                    {toggleVideo && (
                        <div
                            style={{
                                margin: "30px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {/* LOADER Пока iframe грузится */}
                            {isLoading && (
                                <div
                                    style={{
                                        width: ORIGINAL_W * SCALE,
                                        height: ORIGINAL_H * SCALE,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <CircularProgress sx={{ color: "#FFF44F" }} />
                                </div>
                            )}

                            {/* Видео */}
                            <div
                                style={{
                                    width: ORIGINAL_W,
                                    height: ORIGINAL_H,
                                    transform: `scale(${SCALE})`,
                                    transformOrigin: "top left",
                                    display: isLoading ? "none" : "block",
                                }}
                            >
                                <iframe
                                    src={
                                        "https://vk.com/video_ext.php?oid=885405802&id=456239188&autoplay=0"
                                    }
                                    width={ORIGINAL_W}
                                    height={ORIGINAL_H}
                                    frameBorder={0}
                                    allow="autoplay=0;mute=1; encrypted-media; fullscreen; picture-in-picture"
                                    allowFullScreen
                                    onLoad={() => setIsLoading(false)} // ⬅️ Скрываем loader после загрузки
                                    style={{
                                        display: "block",
                                        border: 0,
                                        marginLeft:'30px'
                                    }}
                                />
                            </div>

                            <Link to="/themes">
                                <button style={{ padding: "10px 20px", marginTop: "-60px" }}>
                                    Вернуться к списку тем
                                </button>
                            </Link>
                        </div>
                    )}
                </Paper>

            </Box>
        </Box>
    );
};
// <iframe src="https://vk.com/video_ext.php?oid=885405802&id=456239188&autoplay=1" width="325" height="646"
//         style="background-color: #000"
//         allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" frameBorder="0"
//         allowFullScreen></iframe>