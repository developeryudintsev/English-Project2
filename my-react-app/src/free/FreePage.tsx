import  {useEffect, useState} from "react";
import {ModalCamponent} from "../modal/Modal";
import {Box, Button, IconButton, Paper, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {VideoCat} from "../camponent/VideoCat";
import {v1} from "uuid";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

export const FreePage = () => {
    const [allData] = useState([
        {
            id: v1(),
            question: "Я говорю каждый день",
            isDone: false,
            word: 'speak',
            answers: [{text: "I speak every day", isCorrect: true}, {
                text: "I speaks every day",
                isCorrect: false
            }, {text: "Do i speak every day?", isCorrect: false}]
        },
        {
            id: v1(),
            question: "Вы(ты) ходите в школу",
            isDone: false,
            word: 'go',
            answers: [{text: "I go to school", isCorrect: false}, {
                text: "She goes to school",
                isCorrect: false
            }, {text: "You go to school", isCorrect: true}]
        },
        {
            id: v1(),
            question: "Он не получает большие деньги",
            isDone: false,
            word: 'get',
            answers: [{
                text: "He does not get paid a lot of money",
                isCorrect: true
            }, {
                text: "He do not get paid a lot of money",
                isCorrect: false
            }, {text: "He did not got paid a lot of money", isCorrect: false}]
        },
        {
            id: v1(),
            question: "Oна делает торт каждые выходные",
            isDone: false,
            word: 'make',
            answers: [{
                text: "I will make a cake every weekend",
                isCorrect: false
            }, {text: "She makes a cake every weekend", isCorrect: true}, {
                text: "I make a cake every weekend",
                isCorrect: false
            }]
        },
        {
            id: v1(),
            question: "Оно знает английский язык?",
            isDone: false,
            word: 'know',
            answers: [{text: "Does it know English?", isCorrect: true}, {
                text: "Do it know English?",
                isCorrect: false
            }, {text: "It know English?", isCorrect: false}]
        },
        {
            id: v1(),
            question: "Мы не берём сладости в магазине",
            isDone: false,
            word: 'take',
            answers: [{
                text: "We don't take sweets from the store",
                isCorrect: true
            }, {
                text: "We does take sweets from the store",
                isCorrect: false
            }, {text: "We not take sweets from the store", isCorrect: false}]
        },
        {
            id: v1(),
            question: "Они видят красивую птицу",
            isDone: false,
            word: 'see',
            answers: [{text: "They sees a beautiful bird", isCorrect: false}, {
                text: "They see a beautiful bird",
                isCorrect: true
            }, {text: "They saw a beautiful bird", isCorrect: false}]
        },
        {
            id: v1(),
            question: "Я прихожу домой во время?",
            isDone: false,
            word: 'come',
            answers: [{text: "Do I come home on time?", isCorrect: true}, {
                text: "Does I come home on time?",
                isCorrect: false
            }, {text: "I come home on time?", isCorrect: false}]
        },
        {
            id: v1(),
            question: "Ты не думаешь много",
            isDone: false,
            word: 'think',
            answers: [{text: "You do not think", isCorrect: true}, {
                text: "You not think",
                isCorrect: false
            }, {text: "You doesn’t think", isCorrect: false}]
        },
        {
            id: v1(),
            question: "Она смотрит сериалы каждый вечер",
            isDone: false,
            word: 'watch',
            answers: [{
                text: "I watches TV series every evening.",
                isCorrect: false
            }, {
                text: "He watches TV series every evening.",
                isCorrect: false
            }, {text: "She watches TV series every evening.", isCorrect: true}]
        },
        {
            id: v1(),
            question: "Оно хочет учить английский",
            isDone: false,
            word: 'want',
            answers: [{text: "I wants to learn English", isCorrect: false}, {
                text: "It wants to learn English",
                isCorrect: true
            }, {text: "I want to learn English", isCorrect: false}]
        },
        {
            id: v1(),
            question: "Мы даём сдачу на кассе?",
            isDone: false,
            word: 'give',
            answers: [{
                text: "Do we give change at the checkout?",
                isCorrect: true
            }, {
                text: "Does we give change at the checkout?",
                isCorrect: false
            }, {text: "We give change at the checkout?", isCorrect: false}]
        },
        {
            id: v1(),
            question: "Они не используют китайский запчасти",
            isDone: false,
            word: 'use',
            answers: [{text: "They doesn't use Chinese parts.", isCorrect: true}, {
                text: "They don't use Chinese parts.",
                isCorrect: false
            }, {text: "They uses not Chinese parts.", isCorrect: false}]
        },
        {
            id: v1(),
            question: "Я нахожу полезную информацию",
            isDone: false,
            word: 'find',
            answers: [{text: "I find useful information", isCorrect: true}, {
                text: "I finds useful information",
                isCorrect: false
            }, {text: "We find useful information", isCorrect: false}]
        },
        {
            id: v1(),
            question: "Ты рассказываешь анекдоты на работе?",
            isDone: false,
            word: 'tell',
            answers: [{text: "Do you tell jokes at work?", isCorrect: true}, {
                text: "Does you tell jokes at work?",
                isCorrect: false
            }, {text: "You tell jokes at work?", isCorrect: false}]
        },
        {
            id: v1(),
            question: "Он не спрашивает новый рецепт",
            isDone: false,
            word: 'ask',
            answers: [{text: "He doesn't ask for a new recipe", isCorrect: true}, {
                text: "He not ask for a new recipe.",
                isCorrect: false
            }, {text: "He asks for a new recipe.", isCorrect: false}]
        },
        {
            id: v1(),
            question: "Она работает изо всех сил",
            isDone: false,
            word: 'work',
            answers: [{text: "You works as hard as she can.", isCorrect: false}, {
                text: "She works as hard as she can.",
                isCorrect: true
            }, {text: "She work as hard as she can.", isCorrect: false}]
        },
        {
            id: v1(),
            question: "Оно чувствует вкусный запах?",
            isDone: false,
            word: 'feel',
            answers: [{text: "Does it smell delicious?", isCorrect: true}, {
                text: "Does it smells delicious?",
                isCorrect: false
            }, {text: "Do it smell delicious?", isCorrect: false}]
        },
        {
            id: v1(),
            question: "Мы не пытаемся делать те же вещи",
            isDone: false,
            word: 'try',
            answers: [{
                text: "We does not try to do the same things.",
                isCorrect: true
            }, {
                text: "We not try to do the same things.",
                isCorrect: false
            }, {text: "We're tryes to do the same things.", isCorrect: false}]
        },
        {
            id: v1(),
            question: "Они уходят на улицу",
            isDone: false,
            word: 'leave',
            answers: [{text: "We leave outside", isCorrect: false}, {
                text: "They leave outside",
                isCorrect: true
            }, {text: "They leaves outside", isCorrect: false}]
        },
        {
            id: v1(),
            question: "Я не звоню на работу в выходные",
            isDone: false,
            word: 'call',
            answers: [{text: "I don't call work on weekends", isCorrect: true}, {
                text: "I not call work on weekends",
                isCorrect: false
            }, {text: "I did not call work on weekends", isCorrect: false}]
        },
        {
            id: v1(),
            question: "Тебе нужно учить английский каждый день",
            isDone: false,
            word: 'need',
            answers: [{
                text: "They need to learn English every day",
                isCorrect: false
            }, {
                text: "She need to learn English every day",
                isCorrect: false
            }, {text: "You need to learn English every day", isCorrect: true}]
        },
        {
            id: v1(),
            question: "Он хранит деньги в сейфе?",
            isDone: false,
            word: 'keep',
            answers: [{
                text: "Does he keep his money in a safe?",
                isCorrect: true
            }, {text: "Do he keep his money in a safe?", isCorrect: false}, {
                text: "He keeps his money in a safe?",
                isCorrect: false
            }]
        },
        {
            id: v1(),
            question: "Она не позволяет играть на улице вечером",
            isDone: false,
            word: 'let',
            answers: [{
                text: "She doesn't let me to play outside in the evening.",
                isCorrect: true
            }, {
                text: "She not let me to play outside in the evening.",
                isCorrect: false
            }, {text: "She did not let me to play outside in the evening.", isCorrect: false}]
        },
        {
            id: v1(),
            question: "Мы начинаем рабочий день в 9 утра",
            isDone: false,
            word: 'begin',
            answers: [{text: "I begin work day at 9 am", isCorrect: false}, {
                text: "We begin our work day at 9 am",
                isCorrect: true
            }, {text: "We begins our work day at 9 am", isCorrect: false}]
        },
        {
            id: v1(),
            question: "Они носят покупки в корзине?",
            isDone: false,
            word: 'bring',
            answers: [{
                text: "Do they bring their groceries in a basket?",
                isCorrect: true
            }, {
                text: "Does they bring their groceries in a basket?",
                isCorrect: false
            }, {text: "They brings their groceries in a basket?", isCorrect: false}]
        }
    ]);
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<any>(null);
    const [toggelModal, setToggelModal] = useState<0 | 1 | 2 | 3>(0);
    const [toggelVideoCat, setToggelVideoCat] = useState<0 | 1 | 2 | 3>(0);
    const [answerStatus, setAnswerStatus] = useState<"none" | "correct" | "wrong">("none");
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const [russianVoice, setRussianVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [englishVoice, setEnglishVoice] = useState<SpeechSynthesisVoice | null>(null);
    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            const ruMale = voices.find(
                (v) => v.lang.startsWith("ru") && /male|man/i.test(v.name)
            );
            const ruAny = voices.find((v) => v.lang.startsWith("ru"));
            const enMale = voices.find(
                (v) => v.lang.startsWith("en") && /male|man/i.test(v.name)
            );
            const enAny = voices.find((v) => v.lang.startsWith("en"));
            setRussianVoice(ruMale || ruAny || null);
            setEnglishVoice(enMale || enAny || null);
        };
        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }, []);
    const speakText = (text: string, lang: "ru" | "en") => {
        if (!text) return;

        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(text);

        if (lang === "ru" && russianVoice) {
            utterance.voice = russianVoice;
            utterance.lang = russianVoice.lang;
            utterance.rate = 1;
        } else if (lang === "en" && englishVoice) {
            utterance.voice = englishVoice;
            utterance.lang = englishVoice.lang;
            utterance.rate = 0.65;
        } else {
            utterance.lang = lang === "ru" ? "ru-RU" : "en-US";
            utterance.rate = lang === "en" ? 0.75 : 1;
        }

        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
    };
    useEffect(() => {
        const shuffled = [...allData].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);
        setQuestions(selected);
        setCurrentQuestion(selected[0]);
    }, [allData]);
    useEffect(() => {
        let timer: any;

        // Если открыта модалка "Верно" (2)
        if (toggelModal === 2) {
            timer = setTimeout(() => {
                setToggelModal(0);
                setToggelVideoCat(0);
            }, 2000); // 2 секунды
        }

        // Очистка таймера при закрытии или смене состояния
        return () => clearTimeout(timer);
    }, [toggelModal]);
    const progressDone = questions.filter(q => q.isDone).length;
    const selectQuestion = (id: string) => {
        const found = questions.find(q => q.id === id);
        if (found) {
            setCurrentQuestion(found);
            setAnswerStatus("none");
            setSelectedAnswer(null);
        }
    };
    const handleAnswer = (text: string, isCorrect: boolean) => {
        if (answerStatus !== "none") return;
        setSelectedAnswer(text);

        if (isCorrect) {
            setAnswerStatus("correct");
            const updated = questions.map(q => q.id === currentQuestion.id ? {...q, isDone: true} : q);
            setQuestions(updated);
            const totalDone = updated.filter(q => q.isDone).length;

            if (totalDone === updated.length) {
                setToggelVideoCat(3);
                setToggelModal(3);
            } else {
                setToggelVideoCat(2);
                setToggelModal(2);
                setTimeout(() => {
                    const nextQ = updated.find(q => !q.isDone);
                    if (nextQ) {
                        selectQuestion(nextQ.id);
                        setToggelModal(0);
                    }
                }, 1500);
            }
        } else {
            setAnswerStatus("wrong");
            setToggelVideoCat(1);
            setToggelModal(1);
        }
    };
    if (!currentQuestion) return null;

    return (
        <Box sx={{
            display: "flex", justifyContent: "center", alignItems: "center",
            minHeight: "88.5vh", width: "100vw",
        }}>
            <Paper elevation={3} sx={{
                padding: 3, width: "95%", maxWidth: "800px", textAlign: "center",
                backgroundColor: "#444447", borderRadius: 4, position: "relative",
                minHeight: "400px", display: "flex", flexDirection: "column", justifyContent: "center"
            }}>

                {/* --- ОТОБРАЖЕНИЕ ПРИ ОШИБКЕ --- */}
                {answerStatus === "wrong" ? (
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, py: 4 }}>
                        <Typography variant="h5" sx={{ color: "#FFF44F", fontWeight: "bold", px: 2 }}>
                            Не расстраивайся, мы приглашаем тебя на бесплатные занятия по английскому языку!
                        </Typography>

                        <Box sx={{marginLeft:'9%', width: "200px", height: "200px" }}>
                            <VideoCat
                                src={'/wrong4.mp4'}
                                // Оставляем пустую функцию или не сбрасываем в 0,
                                // чтобы кот не исчезал и замер на последнем кадре
                                setToggelVideoCatFoo={() => {}}
                                toggelVideoCat={toggelVideoCat}
                                showCondition={true}
                            />
                        </Box>

                        <Button
                            variant="contained"
                            onClick={() => window.location.reload()}
                            sx={{
                                marginTop:'-5%',
                                bgcolor: "#FFF44F",
                                color: "black",
                                fontWeight: "bold",
                                "&:hover": { bgcolor: "#fff" }
                            }}
                        >
                            Попробовать еще раз
                        </Button>
                    </Box>
                ) : (
                    /* --- ОБЫЧНЫЙ ИНТЕРФЕЙС (Вопросы и Глаголы) --- */
                    <>
                        {/* Модалки для ВЕРНО и ФИНАЛ (ошибку убрали, так как она теперь в Paper) */}
                        {(toggelModal === 2 || toggelModal === 3) && (
                            <ModalCamponent open={true}>
                                <Box sx={{
                                    p: 3, display: "flex", flexDirection: "column",
                                    alignItems: "center", bgcolor: "#444447", position: "relative",
                                    minWidth: "300px"
                                }}>
                                    <IconButton
                                        onClick={() => setToggelModal(0)}
                                        sx={{position: "absolute", right: 8, top: 8, color: "#fff"}}
                                    >
                                        <CloseIcon/>
                                    </IconButton>

                                    <Typography sx={{
                                        color: '#4caf50',
                                        fontWeight: "bold", mb: 2, textAlign: 'center'
                                    }}>
                                        {toggelModal === 2 && "ВЕРНО!"}
                                        {toggelModal === 3 && "ПОЗДРАВЛЯЕМ! ТЕСТ ПРОЙДЕН! ⭐"}
                                    </Typography>

                                    <Box sx={{mb: 2}}>
                                        <VideoCat
                                            src={'/RightS6.mp4'}
                                            setToggelVideoCatFoo={() => setToggelVideoCat(0)}
                                            toggelVideoCat={toggelVideoCat}
                                            showCondition={true}
                                        />
                                    </Box>

                                    {toggelModal === 3 && (
                                        <Button
                                            variant="contained"
                                            onClick={() => window.location.reload()}
                                            sx={{
                                                mt: 1, bgcolor: "#FFF44F", color: "#000",
                                                "&:hover": {bgcolor: "#fff"}, textTransform: 'none'
                                            }}
                                        >
                                            Начать новый тест
                                        </Button>
                                    )}
                                </Box>
                            </ModalCamponent>
                        )}

                        {/* Прогресс и кнопки глаголов */}
                        <Box sx={{mb: 3}}>
                            <Typography sx={{color: "#FFF44F", mb: 2, fontSize: "0.9rem", fontWeight: "bold"}}>
                                Прогресс теста: {progressDone} / {questions.length}
                            </Typography>

                            <Box sx={{display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 1.5}}>
                                {questions.map((q) => (
                                    <Button
                                        key={q.id}
                                        variant={q.isDone ? "contained" : "outlined"}
                                        onClick={() => selectQuestion(q.id)}
                                        sx={{
                                            bgcolor: currentQuestion.id === q.id ? "#1976d2" : q.isDone ? "#4caf50" : "transparent",
                                            color: "white",
                                            borderColor: "#FFF44F",
                                            textTransform: "none",
                                            minWidth: "200px",
                                            height:'60px'
                                        }}
                                    >
                                        {q.word}
                                    </Button>
                                ))}
                            </Box>
                        </Box>

                        {/* Вопрос и ответы */}
                        <Box sx={{mt: 2}}>
                            <Typography variant="h5" sx={{color: "white", mb: 4, minHeight: "60px"}}>
                                {currentQuestion.question}
                                <IconButton
                                    onClick={() => speakText(currentQuestion.question, "ru")}
                                    sx={{color: "#FFF44F"}}
                                >
                                    <VolumeUpIcon/>
                                </IconButton>
                            </Typography>

                            <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                                {currentQuestion.answers.map((ans: any, idx: number) => (
                                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Button
                                            variant="contained"
                                            onClick={() => handleAnswer(ans.text, ans.isCorrect)}
                                            sx={{
                                                py: 2, textTransform: "none", fontSize: "1.1rem",
                                                width:'60%',
                                                color: "black",
                                                bgcolor: selectedAnswer === ans.text
                                                    ? (ans.isCorrect ? "#4caf50" : "#f44336")
                                                    : "#FFF44F",
                                                "&:hover": {bgcolor: "#FFF44F"}
                                            }}
                                        >
                                            <span style={{color:'black'}}>
                                            {ans.text}
                                                </span>
                                        </Button>
                                        <IconButton
                                            onClick={() => speakText(ans.text, "en")}
                                            sx={{ml: 1,color:'#FFF44F'}}
                                        >
                                            <VolumeUpIcon/>
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </>
                )}
            </Paper>
        </Box>
    );
};