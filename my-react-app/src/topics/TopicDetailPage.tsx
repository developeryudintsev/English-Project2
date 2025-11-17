import {Link, useParams} from 'react-router-dom';
import {topics} from "../AppRoutes";
import {Box, IconButton, Paper} from "@mui/material";
import {useState} from "react";
import FingerprintIcon from '@mui/icons-material/Fingerprint';

export const TopicDetailPage = () => {
    const {topicId} = useParams<{ topicId: string }>();
    let [toggleIcon,setToggleIcon]=useState(false)

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
                    }}
                >
                    <h3 onClick={()=>setToggleIcon(!toggleIcon)} style={{color: '#FFF44F',marginTop:'0px',height:'7px'}}>Тема: {topic.label}</h3>
                    <IconButton
                        onClick={()=>setToggleIcon(!toggleIcon)}
                        sx={{ color: '#FFF44F', position: 'absolute', top: 10, right: 8 }}
                        size="small"
                    >
                        <FingerprintIcon/>
                    </IconButton>
                    {toggleIcon && <div style={{margin:'30px'}}>
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

            </Box>
        </Box>
    );
};