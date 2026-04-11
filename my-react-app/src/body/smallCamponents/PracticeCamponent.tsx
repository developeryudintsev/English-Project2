import React, {useEffect, useRef, useState} from "react";
import {
    Box,
    Button,
    FormControl,
    IconButton,
    LinearProgress,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import type {DataType, QuestionType} from "../../Data/Data";
import {addQuestions, data, getQuestions, updateQuestion, updateRatingFor,} from "../../Data/Data";
import {VideoCat} from "../../camponent/VideoCat";
import {ModalCamponent} from "../../modal/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Rating from '@mui/material/Rating';
import type {timeType} from "../../App";

export type changeType = "." | "?" | "!"|'.?!';
type PracticeComponentProps = {
    time: timeType;
    toggle: boolean;
    openTheory: (theory: boolean) => void;
    toggleTheory: (togglePractice: boolean) => void;
    setShowPractice: (showPractice: boolean) => void;
    showPractice: boolean
    setToggleVC: (toggleVC: boolean) => void
    setStar: (star: number) => void
    star: number
};

export const PracticeComponent: React.FC<PracticeComponentProps> = ({
                                                                        time,
                                                                        toggle = false,
                                                                        openTheory,
                                                                        toggleTheory,
                                                                        setShowPractice,
                                                                        setToggleVC,
                                                                        setStar,
                                                                        star
                                                                    }) => {
    const [type, setType] = useState<changeType>(".");
    const [currentIndex, setCurrentIndex] = useState<Record<changeType, number>>({
        ".": 0,
        "?": 0,
        "!": 0,
        '.?!': 0,
    });
    const [fullData, setFullData] = useState<DataType | null>(null);
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(null);
    const [answerStatus, setAnswerStatus] = useState<"none" | "correct" | "wrong">("none");
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [russianVoice, setRussianVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [englishVoice, setEnglishVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [congratulation, setCongratulation] = useState(false);
    const [videoLoading, setVideoLoading] = useState(true);
    const isFinished = congratulation;
    let [toggelModal, setToggelModal] = useState<0 | 1 | 2>(0)
    let [toggelVideoCat, setToggelVideoCat] = useState<0 | 1 | 2 | 3>(0)
    let typeSentence =type ==='.?!' ?'микс':
        type === "."
            ? "утвердительное"
            : type === "?"
                ? "вопросительное"
                : "отрицательное";
    const [page, setPage] = useState(0);
    const itemsPerPage = 9;
    const startIndex = page * itemsPerPage;
    const visibleQuestions = questions.slice(startIndex, startIndex + itemsPerPage);
    const [progress, setProgress] = useState<{ done: number, total: number }>({done: 0, total: 0});

    useEffect(() => {
        setStar(progress.done)
        if (fullData) {
            // 1. Собираем все TimeData (Simple Past, Present, Future)
            const times = Object.values(fullData.simple);

            // 2. Из каждого TimeData достаем массивы вопросов (., ?, !, ?!)
            const allQuestions = times.flatMap(timeData =>
                Object.values(timeData).flat()
            );

            // 3. Проверяем, все ли задачи выполнены
            const allDone = allQuestions.every(q => q.isDone);
            setCongratulation(allDone);

            // 4. Считаем количество выполненных и обновляем звезды
            const doneCount = allQuestions.filter(q => q.isDone).length;
            console.log(doneCount,allQuestions)

            setStar(doneCount + 1);
        }
    }, [fullData,questions, type]);
    useEffect(() => {
        const timer = setTimeout(() => {
            setVideoLoading(false);
        }, 2000); // 2 секунды загрузки

        return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
        if (toggle) {
            setVideoLoading(false);
        }
    }, [toggle]);
    useEffect(() => {
        const loadVoices = () => {
            // Получаем все голоса
            let voices = window.speechSynthesis.getVoices();

            // 1. Ищем РУССКИЙ (сначала мужской, если нет — любой русский)
            const ruMale = voices.find(v => v.lang.includes("ru") && /male|dmitry|pavel|yuri/i.test(v.name));
            const ruAny = voices.find(v => v.lang.includes("ru"));

            // 2. Ищем АНГЛИЙСКИЙ (сначала мужской, если нет — любой английский)
            const enMale = voices.find(v => v.lang.includes("en") && /male|google/i.test(v.name));
            const enAny = voices.find(v => v.lang.includes("en"));

            // Если голоса еще не загрузились (бывает в Chrome), пробуем снова через 100мс
            if (voices.length === 0) {
                setTimeout(loadVoices, 100);
                return;
            }

            setRussianVoice(ruMale || ruAny || voices[0]); // Если русского вообще нет, берем самый первый системный
            setEnglishVoice(enMale || enAny || voices[0]);
        };

        // Обязательно вешаем обработчик для Chrome
        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }, []);
    useEffect(() => {
        const loadProgress = async () => {
            const stored = await getQuestions();
            if (!stored) return;
            const timeData = stored.simple[time];
            let done = 0;
            let total = 0;

            Object.values(timeData).forEach((questionsArr) => {
                if (!questionsArr) return;
                total += questionsArr.length;
                done += questionsArr.filter((q) => q.isDone).length;
            });

            setProgress({done, total});
        };

        loadProgress();
    }, [time]);
    useEffect(() => {
        const init = async () => {
            const stored = await getQuestions();
            if (!stored || !stored.simple) {
                await addQuestions(data, "none");
                const fresh = await getQuestions();
                if (fresh) {
                    const loaded = fresh.simple[time][type];
                    setFullData(fresh);
                    setQuestions(loaded);

                    const firstUnfinishedIndex = loaded.findIndex((q) => !q.isDone);
                    const idx = firstUnfinishedIndex === -1 ? 0 : firstUnfinishedIndex;

                    setCurrentQuestion(loaded[idx] ?? null);
                    setCurrentIndex((prev) => ({...prev, [type]: idx}));
                    setCongratulation(firstUnfinishedIndex === -1);

                    setPage(Math.floor(idx / itemsPerPage));
                }
            } else {
                const loaded = stored.simple[time][type];
                setFullData(stored);
                setQuestions(loaded);
                const firstUnfinishedIndex = loaded.findIndex((q) => !q.isDone);
                const idx = firstUnfinishedIndex === -1 ? 0 : firstUnfinishedIndex;

                setCurrentQuestion(loaded[idx] ?? null);
                setCurrentIndex((prev) => ({...prev, [type]: idx}));
                setCongratulation(false);
                console.log(congratulation)
                setPage(Math.floor(idx / itemsPerPage));
            }
            setAnswerStatus("none");
            setSelectedAnswer(null);
        };
        init();
    }, [time, type]);
    useEffect(() => {
        const allDone = questions.every((q) => q.isDone);
        if (allDone) {
            (async () => {
                // time передается в updateRatingFor, все ОК
                await updateRatingFor(time, type);
                // ...
            })();
        }
    }, [questions, type, time]);
    const handleAnswer = async (answerText: string, id: string) => {

        if (answerStatus !== "none") return;
        setSelectedAnswer(answerText);
        setToggelModal(1);

        if (currentQuestion && fullData) {
            const correctAnswer = currentQuestion.answers.find((ans) => ans.isCorrect);
            if (correctAnswer && correctAnswer.text === answerText) {

                setAnswerStatus("correct");
                setToggelVideoCat(2)
                const updatedQuestion = {...currentQuestion, isDone: true};
                setQuestions((prev) => prev.map((q) => (q.id === id ? updatedQuestion : q)));
                setCurrentQuestion(updatedQuestion);
                const updatedData: DataType = {
                    ...fullData,
                    simple: {
                        ...fullData.simple,
                        [time]: {
                            ...fullData.simple[time],
                            [type]: questions.map((q) => (q.id === id ? updatedQuestion : q)),
                        },
                    },
                };
                const exest = updatedData['simple'][time][type].find((q) => !q.isDone);
                if (!exest) {
                    setToggelVideoCat(3)
                }
                if (!exest) {
                    setToggelVideoCat(3); // 👈 победа
                }
                setFullData(updatedData);
                await updateQuestion(updatedData);
            } else {
                setAnswerStatus("wrong");
                setToggelVideoCat(1)
            }
        }
    };
    const newData = () => {
        const init = async () => {
            await addQuestions(data, 'reload');
        }
        init()
        setToggelModal(0)
        const newQuestion = data.simple[time][type];
        setFullData(data);
        setQuestions(newQuestion);
        setCurrentQuestion(newQuestion[0])
        setPage(0);
        wordFoo(newQuestion[0].id)
        console.log(newQuestion[0])
    }
    useEffect(()=>{
        const loadProgress = async () => {
            const stored = await getQuestions();
            if (!stored) return;
            if(!stored.simple[time]){
                newData()
            }
        };

        loadProgress();

    },[questions])
    const handleNextQuestion = () => {
        const next = questions.find((q) => !q.isDone);
        if (next) {
            const nextIndex = questions.indexOf(next);
            const nextPage = Math.floor(nextIndex / itemsPerPage);

            // Обновляем страницу на ту, где находится неотвеченный вопрос
            setPage(nextPage);

            setCurrentQuestion(next);
            setCurrentIndex((prev) => ({
                ...prev,
                [type]: nextIndex,
            }));
        } else {
            setCongratulation(false);
        }
        setAnswerStatus("none");
        setSelectedAnswer(null);
    };
    const speakText = (text: string, lang: "ru" | "en") => {
        if (!text) return;
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
        const utterance = new SpeechSynthesisUtterance(text);
        if (lang === "ru" && russianVoice) {
            utterance.voice = russianVoice;
            utterance.lang = russianVoice.lang;
            utterance.rate = 0.7;
        } else if (lang === "en" && englishVoice) {
            utterance.voice = englishVoice;
            // utterance.lang = englishVoice.lang;
            utterance.rate = 0.65;
            utterance.pitch = 1;
        } else {
            utterance.lang = lang === "ru" ? "ru-RU" : "en-US";
        }
        // utterance.rate = 1;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
    };
    const tryAgain = () => {
        setAnswerStatus("none");
        setSelectedAnswer(null);
    };
    const gobackFoo = () => {
        setShowPractice(false);
        setToggleVC(true)
        openTheory(false);
    };
    const ButtonFoo = (toggle: boolean) => {
        openTheory(false)
        toggleTheory(!toggle);
        setShowPractice(!toggle)
        setAnswerStatus('none')
    };
    const wordFoo = (id: string) => {
        const found = questions.find((f) => f.id === id);
        if (found) {
            setCurrentQuestion(found);
            setCurrentIndex((prev) => ({
                ...prev,
                [type]: questions.indexOf(found),
            }));
        }

        setAnswerStatus("none");
    };
    const videoRef = useRef<HTMLVideoElement | null>(null);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.pause();
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, []);
    const CloseButton = () => {
        setToggelModal(0)
        setAnswerStatus("none")
    }
    const GoToTheorya = () => {
        setToggelModal(0)
        setAnswerStatus("none")
        toggleTheory(true);
        openTheory(true)
        setShowPractice(false);
    }
    const LeftSlider = () => {
        setPage((p) => Math.max(p - 1, 0))
        const index = (page - 1) * itemsPerPage;
        const questionsWithOutDelay = questions.slice(index, index + itemsPerPage);
        const findQestion = questionsWithOutDelay.find((f) => f.isDone == false)
        const result = findQestion == undefined ? questionsWithOutDelay[0] : findQestion
        setCurrentQuestion(result)
        wordFoo(result.id)
    }
    const RightSlider = () => {
        setPage((p) => Math.max(p + 1))
        const index = (page + 1) * itemsPerPage;
        const questionsWithOutDelay = questions.slice(index, index + itemsPerPage);
        const findQestion = questionsWithOutDelay.find((f) => f.isDone == false)
        const result = findQestion == undefined ? questionsWithOutDelay[0] : findQestion
        setCurrentQuestion(result)
        wordFoo(result.id)
    }
    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    padding: 2,
                    position: "relative",
                    width: "95%",
                    maxWidth: "980px",
                    textAlign: "center",
                    backgroundColor: "#444447",
                    cursor: 'pointer',
                    transition: "all 1s ease",
                    ...(answerStatus === "correct"
                        ? {
                            border: "4px solid #00ff00",
                            animation: "blinkGreen 1s infinite",
                            ...blinkAnimation,
                        }
                        : answerStatus === "wrong"
                            ? {
                                border: "4px solid red",
                                animation: "blinkRed 1s infinite",
                                ...blinkAnimation,
                            }
                            : { border: "2px solid transparent" }),
                }}
            >
                {toggelModal === 1 && answerStatus === 'wrong' && (
                    <ModalCamponent open={toggelModal === 1} onClose={CloseButton}>
                        <Box sx={{minHeight: '350px'}}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#444447",
                                    color: "#fff",
                                    padding: "6px",
                                    position: "relative",
                                }}
                            >
                                <IconButton
                                    onClick={CloseButton}
                                    sx={{
                                        position: "absolute",
                                        right: "10px",
                                        top: "6px",
                                        color: "#fff",
                                        backgroundColor: "red",
                                        "&:hover": {
                                            backgroundColor: "#cc0000",
                                        },
                                    }}
                                >
                                    <CloseIcon/>
                                </IconButton>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        color: '#FFF44F',
                                        width: "100%",
                                        px: 6,
                                    }}
                                >
                                    {typeSentence} предложение в Simple строится так:
                                </Typography>
                            </Box>

                            <Box sx={{marginTop: "6px"}}>
                                <Button
                                    onClick={GoToTheorya}
                                    variant="contained"
                                    sx={{color: 'white'}}
                                >
                                    Подробнее правила в теории
                                </Button>
                            </Box>

                            <Box
                                sx={{
                                    padding: 0,
                                    marginTop: "-18px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    position: "relative",
                                }}
                            >
                                <div style={{textAlign: "center", marginTop: '22px', width: "100%"}}>
                                    <Box sx={{width: "100%", maxWidth: 800}}>
                                        <TableContainer component={Paper} sx={{my: 1}}>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center">Русский</TableCell>
                                                        <TableCell align="center">Английский (Утверждение)</TableCell>
                                                        <TableCell align="center">Отрицание</TableCell>
                                                        <TableCell align="center">Вопрос</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell
                                                            align="center">Я {time === 'Simple Present' ? 'люблю' :
                                                            time === 'Simple Past' ? 'любил' : 'буду любить'}</TableCell>
                                                        <TableCell
                                                            align="center">I {time === 'Simple Present' ? 'love' :
                                                            time === 'Simple Past' ? 'loved' : 'will love'}</TableCell>
                                                        <TableCell
                                                            align="center">I {time === 'Simple Present' ? 'don\'t love' :
                                                            time === 'Simple Past' ? 'didn\'t love' : 'won\'t love'}</TableCell>
                                                        <TableCell
                                                            align="center">{time === 'Simple Present' ? 'Do I love?' :
                                                            time === 'Simple Past' ? 'Did I love?' : 'Will I love?'}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{backgroundColor: "#FFF44F", color: "#000"}}>
                                                            Он/Она/Оно {time === 'Simple Present' ? 'любит' :
                                                            time === 'Simple Past' ? 'любил' : 'будет любить'}
                                                        </TableCell>
                                                        <TableCell
                                                            sx={{backgroundColor: "#FFF44F", color: "#000", px: '10%'}}
                                                        >
                                                            He/She/It {time === 'Simple Present' ? 'loves' :
                                                            time === 'Simple Past' ? 'loved' : 'will love'}
                                                        </TableCell>
                                                        <TableCell
                                                            sx={{backgroundColor: "#FFF44F", color: "#000", px: 1}}
                                                        >
                                                            He/She/It {time === 'Simple Present' ? 'does not (doesn\'t) love' :
                                                            time === 'Simple Past' ? 'did not (didn\'t) love' : 'will not (won\'t) love'}
                                                        </TableCell>
                                                        <TableCell sx={{backgroundColor: "#FFF44F", color: "#000"}}>
                                                            {time === 'Simple Present' ? 'Does he/she/it love?' :
                                                                time === 'Simple Past' ? 'Did he/she/it love?' : 'Will he/she/it love?'}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Мы/Ты/Они {time === 'Simple Present' ? 'любим' :
                                                            time === 'Simple Past' ? 'любили' : 'будут любить'}</TableCell>
                                                        <TableCell
                                                            sx={{px: '10%'}}>We/You/They {time === 'Simple Present' ? 'love' :
                                                            time === 'Simple Past' ? 'loved' : 'will love'}</TableCell>
                                                        <TableCell
                                                            sx={{px: 1}}>We/You/They {time === 'Simple Present' ? 'don\'t love' :
                                                            time === 'Simple Past' ? 'didn\'t love' : 'won\'t love'}</TableCell>
                                                        <TableCell>{time === 'Simple Present' ? 'Do we/you/they love?' :
                                                            time === 'Simple Past' ? 'Did we/you/they love?' : 'Will we/you/they love?'}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                </div>
                                {toggelVideoCat === 1 && (
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: "70%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            zIndex: 2,
                                            pointerEvents: "none",
                                        }}
                                    >
                                        <VideoCat
                                            src={"/wrong4.mp4"}
                                            setToggelVideoCatFoo={() => setToggelVideoCat(0)}
                                            toggelVideoCat={toggelVideoCat}
                                            showCondition={toggelModal === 1}
                                        />
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </ModalCamponent>
                )}
                {toggelModal === 2 && (
                    <ModalCamponent open={toggelModal === 2 ? true : false} onClose={CloseButton}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#444447",
                                color: "#fff",
                                padding: "12px",
                                position: "relative",
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    color: '#FFF44F',
                                    width: "100%",
                                    px: 6,
                                }}
                            >
                                Вы действительно хотите обнулить результаты?
                            </Typography>
                        </Box>
                        <Box sx={{
                            padding: 2,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 2,
                            width: "100%",
                        }}>
                            <Button sx={{backgroundColor: "#d20000", color: 'white'}}
                                    onClick={() => setToggelModal(0)}>нет</Button>
                            <Button sx={{backgroundColor: "#00d300", color: 'white'}}
                                    onClick={() => newData()}>да</Button>
                        </Box>
                    </ModalCamponent>
                )}
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexWrap: "wrap",
                                gap: "10px",
                                padding: "0px 0",
                                position: "relative",
                                cursor: "pointer"
                            }}
                            onClick={() => ButtonFoo(toggle)}
                        >
                            <Typography
                                sx={{
                                    color: "#FFF44F",
                                    fontFamily: "Roboto, sans-serif",
                                    userSelect: "none"
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {!toggle ? (
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            flexWrap: "wrap",
                                            gap: "10px",
                                            maxWidth: "980px",
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <span onClick={() => ButtonFoo(toggle)}>Практика – {time} ({progress.done}/{progress.total})</span>
                                    </div>
                                ) : (
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexWrap: "wrap",
                                                gap: 2,
                                                marginTop: "-5px",
                                                pr: 3,
                                                maxWidth: "100%",
                                            }}
                                        >
                                            {isFinished && (
                                                <Box sx={{ position: "relative", width: 56, height: 56 }}>
                                                    <Rating
                                                        name="done-star"
                                                        value={1}
                                                        max={1}
                                                        readOnly
                                                        sx={{ fontSize: 56, color: "#FFF44F" }}
                                                    />
                                                </Box>
                                            )}
                                            <FormControl
                                                onClick={(e) => e.stopPropagation()}
                                                sx={{ minWidth: 160 }}
                                                size="small"
                                            >
                                                <Select
                                                    value={type}
                                                    onChange={(e) => {
                                                        const newType = e.target.value as changeType;
                                                        setType(newType);
                                                    }}
                                                    displayEmpty
                                                    inputProps={{ "aria-label": "Select tense" }}
                                                    sx={{
                                                        backgroundColor: "white",
                                                        borderRadius: 1,
                                                        width: "100%",
                                                    }}
                                                >
                                                    <MenuItem value=".">утвердительное</MenuItem>
                                                    <MenuItem value="?">вопросительное</MenuItem>
                                                    <MenuItem value="!">отрицательное</MenuItem>
                                                    <MenuItem value=".?!">микс</MenuItem>
                                                </Select>
                                            </FormControl>

                                            <Button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setToggelModal(2);
                                                }}
                                                sx={{
                                                    backgroundColor: "#ff0202",
                                                    color: "black",
                                                    textTransform: "none",
                                                    height: "40px",
                                                }}
                                            >
                                                очистить результаты
                                            </Button>
                                        </Box>

                                        <div style={{ margin: 3 }}>Выбери глагол или просто иди по порядку</div>

                                        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    gap: 2,
                                                    width: "100%",
                                                }}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {questions.length > itemsPerPage && (
                                                    <Button
                                                        variant="outlined"
                                                        disabled={page === 0}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            LeftSlider();
                                                        }}
                                                        sx={{
                                                            fontSize: 40,
                                                            border: "#FFF44F",
                                                            color: "#FFF44F",
                                                            minWidth: "40px",
                                                        }}
                                                    >
                                                        {`<`}
                                                    </Button>
                                                )}

                                                <Box
                                                    sx={{
                                                        display: "grid",
                                                        gridTemplateColumns: "repeat(3, 1fr)",
                                                        gap: 1,
                                                        width: "70%",
                                                    }}
                                                >
                                                    {visibleQuestions.map((m) => {
                                                        const isCurrent = currentQuestion?.id === m.id;
                                                        return (
                                                            <Button
                                                                key={m.id}
                                                                variant={m.isDone ? "contained" : "outlined"}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    wordFoo(m.id);
                                                                }}
                                                                size="medium"
                                                                sx={{
                                                                    backgroundColor: isCurrent
                                                                        ? "#1976d2"
                                                                        : m.isDone
                                                                            ? "#FFF44F"
                                                                            : "transparent",
                                                                    borderColor: "#FFF44F",
                                                                    color: isCurrent ? "white" : "black",
                                                                    textTransform: "none",
                                                                    paddingY: 2,
                                                                    fontSize: "1.1rem",
                                                                    "&:hover": {
                                                                        backgroundColor: isCurrent
                                                                            ? "#1565c0"
                                                                            : m.isDone
                                                                                ? "#ffea00"
                                                                                : "#555",
                                                                        color: "white",
                                                                    },
                                                                }}
                                                            >
                                                                {m.word}
                                                            </Button>
                                                        );
                                                    })}
                                                </Box>

                                                {questions.length > itemsPerPage && (
                                                    <Button
                                                        variant="outlined"
                                                        disabled={startIndex + itemsPerPage >= questions.length}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            RightSlider();
                                                        }}
                                                        sx={{
                                                            fontSize: 40,
                                                            border: "#FFF44F",
                                                            color: "#FFF44F",
                                                            minWidth: "40px",
                                                        }}
                                                    >
                                                        {`>`}
                                                    </Button>
                                                )}
                                            </Box>
                                        </Box>
                                    </div>
                                )}
                            </Typography>

                            {/* ICON BUTTON ↑ тоже блокируем всплытие */}
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    ButtonFoo(toggle);
                                }}
                                sx={{
                                    color: "#FFF44F",
                                    position: "absolute",
                                    right: -8,
                                    top: "12px",
                                    transform: "translateY(-50%)",
                                }}
                                size="small"
                            >
                                <InfoOutlinedIcon />
                            </IconButton>
                </Box>
                {toggle && currentQuestion && (
                    <span>
          <Box
              sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mb: 1,
              }}
          >
              <Typography variant="h6" sx={{color: 'white', display: 'flex', alignItems: 'center', gap: 1}}>
               <span style={{color: '#FFF44F'}}>{questions.filter(q => q.isDone).length}/{questions.length}</span>
               <span>{currentQuestion.question}</span>
              </Typography>
            <IconButton
                onClick={() => speakText(currentQuestion.question, "ru")}
                sx={{color: "#FFF44F"}}
                aria-label="Озвучить вопрос"
            >
              <VolumeUpIcon/>
            </IconButton>
              {answerStatus === "correct" && (
                  <CheckCircleIcon sx={{color: "limegreen", fontSize: 28}}/>
              )}
          </Box>
          <Box
              sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  maxWidth: 400,
                  margin: "0 auto",
                  position: "relative",
              }}
          >
            {currentQuestion.answers.map((ans) => {
                const isSelected = selectedAnswer === ans.text;
                let bgColor = "transparent";
                if (answerStatus !== "none") {
                    if (ans.isCorrect) {
                        bgColor = "limegreen";
                    }
                    if (isSelected && !ans.isCorrect) {
                        bgColor = "#ff4c4c";
                    }
                }

                return (
                    <Box
                        key={ans.text}
                        sx={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        {answerStatus === "correct" && ans.isCorrect && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    zIndex: 2,
                                }}
                            >
                                {toggelVideoCat === 2 && (
                                    <VideoCat
                                        src={"/RightS6.mp4"}
                                        setToggelVideoCatFoo={() => setToggelVideoCat(0)}
                                        toggelVideoCat={toggelVideoCat}
                                        showCondition={toggelModal === 1 && answerStatus === "correct"} // 👈 фикс
                                    />
                                )}
                            </Box>
                        )}
                        <Button
                            variant={isSelected ? "contained" : "outlined"}
                            onClick={() => handleAnswer(ans.text, currentQuestion.id)}
                            disabled={answerStatus !== "none"}
                            sx={{
                                flexGrow: 1,
                                color: "white !important",
                                border: "1px solid #FFF44F",
                                backgroundColor: bgColor,
                                textTransform: "none",
                                zIndex: 1,
                                "&:hover": {
                                    backgroundColor: bgColor === "transparent" ? "#555" : bgColor,
                                    color: "white !important",
                                },
                                "&.Mui-disabled": {
                                    backgroundColor: bgColor,
                                    color: "white !important",
                                    borderColor: "#FFF44F",
                                    opacity: 1,
                                },
                            }}
                        >
                            {ans.text}
                        </Button>

                        <IconButton
                            onClick={() => speakText(ans.text, "en")}
                            sx={{ml: 1, color: "#FFF44F", zIndex: 3}} // иконка всегда выше
                            aria-label="Озвучить ответ"
                        >
                            <VolumeUpIcon/>
                        </IconButton>
                    </Box>
                );
            })}
          </Box>
                        {answerStatus === "correct" && (
                            <Box>
                                <Button
                                    variant="contained"
                                    sx={{
                                        flexGrow: 1,
                                        maxWidth: "300px",
                                        width: "100%",
                                        mt: 2,
                                        backgroundColor: "#FFF44F",
                                        color: "black",
                                        py: 1,
                                    }}
                                    onClick={handleNextQuestion}
                                >
                                    СЛЕДУЮЩИЙ ВОПРОС(ПО ПОРЯДКУ)
                                </Button>
                            </Box>
                        )}
                        {answerStatus === "wrong" && (
                            <Box>
                                <Button
                                    variant="contained"
                                    sx={{
                                        flexGrow: 1,
                                        maxWidth: "300px",
                                        width: "100%",
                                        mt: 2,
                                        backgroundColor: "#FFF44F",
                                        color: "black",
                                    }}
                                    onClick={tryAgain}
                                >
                                    ПОПРОБУЙ СНОВА
                                </Button>
                            </Box>
                        )}
                        <Box>
                            <Button
                                variant="contained"
                                sx={{
                                    flexGrow: 1,
                                    maxWidth: "300px",
                                    width: "100%",
                                    mt: 2,
                                    backgroundColor: "#FFF44F",
                                    color: "black",
                                }}
                                onClick={() => gobackFoo()}
                            >
                                ВЕРНУТЬСЯ К ВИДЕО
                            </Button>
                        </Box>
                </span>
                )}
            </Paper>

            {videoLoading && (
                <Box sx={{
                    width: "95%",
                    maxWidth: "980px",
                    margin: "0 auto",
                    marginTop: "-16px", // убираем отступ Paper
                    position: "relative",
                    zIndex: 1
                }}>
                    <LinearProgress
                        sx={{
                            width: "100%",
                            height: 4,
                            backgroundColor: "rgb(0, 183, 255)",
                            "& .MuiLinearProgress-bar": {
                                backgroundColor: "#00ff00",
                            },
                        }}
                    />
                </Box>
            )}
        </>
    );
};

const blinkAnimation = {
    "@keyframes blinkGreen":
        {
            "0%":
                {
                    boxShadow: "0 0 10px 2px #00ff00"
                }
            ,
            "50%":
                {
                    boxShadow: "0 0 20px 5px #00ff00"
                }
            ,
            "100%":
                {
                    boxShadow: "0 0 10px 2px #00ff00"
                }
            ,
        }
    ,
    "@keyframes blinkRed":
        {
            "0%":
                {
                    boxShadow: "0 0 10px 2px red"
                }
            ,
            "50%":
                {
                    boxShadow: "0 0 20px 5px red"
                }
            ,
            "100%":
                {
                    boxShadow: "0 0 10px 2px red"
                }
            ,
        }
    ,
};