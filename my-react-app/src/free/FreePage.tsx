import {useEffect, useState} from "react";
import {ModalCamponent} from "../modal/Modal";
import {Box, Button, IconButton, Paper, Typography} from "@mui/material";
import {VideoCat} from "../camponent/VideoCat";
import win from "../picture/win.png";
import {v1} from "uuid";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

export const FreePage = () => {
    const [allData] = useState([
        {
            id: v1(),
            question: "Я говорю каждый день",
            isDone: false,
            word: 'speak',
            answers: [
                {text: "I speak every day", isCorrect: true},
                {text: "I speaks every day", isCorrect: false},
                {text: "Do i speak every day?", isCorrect: false}
            ]
        },
        {
            id: v1(),
            question: "Вы(ты) ходите в школу",
            isDone: false,
            word: 'go',
            answers: [
                {text: "I go to school", isCorrect: false},
                {text: "She goes to school", isCorrect: false},
                {text: "You go to school", isCorrect: true}
            ]
        },
        {
            id: v1(),
            question: "Он не получает большие деньги",
            isDone: false,
            word: 'get',
            answers: [
                {text: "He doesn't get big money", isCorrect: true},
                {text: "He do not get big money", isCorrect: false},
                {text: "He did not get big money", isCorrect: false}
            ]
        },
        {
            id: v1(),
            question: "Oна делает торт каждые выходные",
            isDone: false,
            word: 'make',
            answers: [
                {text: "I will make a cake every weekend", isCorrect: false},
                {text: "She makes a cake every weekend", isCorrect: true},
                {text: "I make a cake every weekend", isCorrect: false}
            ]
        },
        {
            id: v1(),
            question: "Оно знает английский язык?",
            isDone: false,
            word: 'know',
            answers: [
                {text: "Does it know English?", isCorrect: true},
                {text: "Do it know English?", isCorrect: false},
                {text: "It know English?", isCorrect: false}
            ]
        },
        {
            id: v1(),
            question: "Мы не покупаем сладости в магазине",
            isDone: false,
            word: 'take',
            answers: [
                {text: "We don't buy sweets in the shop", isCorrect: true},
                {text: "We doesn't buy sweets in the shop", isCorrect: false},
                {text: "We not buy sweets in the shop", isCorrect: false}
            ]
        },
        {
            id: v1(),
            question: "Они видят красивую птицу каждое утро",
            isDone: false,
            word: 'see',
            answers: [
                {text: "They sees a beautiful bird every morning", isCorrect: false},
                {text: "They see a beautiful bird  every morning", isCorrect: true},
                {text: "They saw a beautiful bird every morning", isCorrect: false}
            ]
        },
        {
            id: v1(),
            question: "Я прихожу домой после школы во время?",
            isDone: false,
            word: 'come',
            answers: [
                {text: "Do I come home on time after school?", isCorrect: true},
                {text: "Does I come home on time after school?", isCorrect: false},
                {text: "I come home on time after school?", isCorrect: false}
            ]
        },
        {
            id: v1(),
            question: "Ты не думаешь много",
            isDone: false,
            word: 'think',
            answers: [
                {text: "You do not think a lot", isCorrect: true},
                {text: "You not think a lot", isCorrect: false},
                {text: "You doesn’t think a lot", isCorrect: false}
            ]
        },
        {
            id: v1(),
            question: "Она смотрит сериалы каждый вечер",
            isDone: false,
            word: 'watch',
            answers: [
                {text: "I watches TV series every evening.", isCorrect: false},
                {text: "He watches TV series every evening.", isCorrect: false},
                {text: "She watches TV series every evening.", isCorrect: true}
            ]
        },
        {
            id: v1(),
            question: "Он хочет учить английский",
            isDone: false,
            word: 'want',
            answers: [
                {text: "I wants to learn English", isCorrect: false},
                {text: "He wants to learn English", isCorrect: true},
                {text: "I want to learn English", isCorrect: false}
            ]
        },
        {
            id: v1(),
            question: "Мы даём сдачу на кассе?",
            isDone: false,
            word: 'give',
            answers: [
                {text: "Do we give change at the cash desk?", isCorrect: true},
                {text: "Does we give change at the cash desk?", isCorrect: false},
                {text: "We give change at the cash desk?", isCorrect: false}
            ]
        },
        {
            id: v1(),
            question: "Они не используют китайские запчасти",
            isDone: false,
            word: 'use',
            answers: [
                {text: "They don't use Chinese parts", isCorrect: true}, // Исправлено: They don't
                {text: "They doesn't use Chinese parts", isCorrect: false},
                {text: "They uses not Chinese parts", isCorrect: false}
            ]
        },
        {
            id: v1(),
            question: "Я нахожу полезную информацию каждый день",
            isDone: false,
            word: 'find',
            answers: [
                {text: "I find useful information every day", isCorrect: true},
                {text: "I finds useful information every day", isCorrect: false},
                {text: "We find useful information every day", isCorrect: false}
            ]
        },
        {
            id: v1(),
            question: "Ты рассказываешь шутки на работе?",
            isDone: false,
            word: 'tell',
            answers: [
                {text: "Do you tell jokes at work?", isCorrect: true}, // Исправлено: jokes вместо anecdotes
                {text: "Does you tell jokes at work?", isCorrect: false},
                {text: "You tell jokes at work?", isCorrect: false}
            ]
        },
        {
            id: v1(),
            question: "Он не спрашивает новые рецепты на работе",
            isDone: false,
            word: 'ask',
            answers: [
                {text: "He doesn't ask for new recipes at work", isCorrect: true},
                {text: "He not ask for new recipes at work", isCorrect: false},
                {text: "He asks for new recipes at work", isCorrect: false}
            ]
        },
        {
            id: v1(),
            question: "Она работает изо всех сил",
            isDone: false,
            word: 'work',
            answers: [
                {text: "You works as hard as she can", isCorrect: false},
                {text: "She works as hard as she can", isCorrect: true},
                {text: "She work as hard as she can", isCorrect: false}
            ]
        },
        {
            id: v1(),
            question: "Оно чувствует вкусный запах каждое утро?",
            isDone: false,
            word: 'feel',
            answers: [
                {text: "Does it smell delicious every morning?", isCorrect: true},
                {text: "Does it smells delicious every morning?", isCorrect: false},
                {text: "Do it smell delicious every morning?", isCorrect: false}
            ]
        },
        {
            id: v1(),
            question: "Мы не пытаемся делать те же вещи",
            isDone: false,
            word: 'try',
            answers: [
                {text: "We don't try to do the same things", isCorrect: true}, // Исправлено: We do not
                {text: "We doesn't try to do the same things", isCorrect: false},
                {text: "We're tries to do the same things", isCorrect: false}
            ]
        },
        {
            id: v1(),
            question: "Они ходят на улицу каждый вечер",
            isDone: false,
            word: 'leave',
            answers: [
                {text: "We leave outside every evening", isCorrect: false},
                {text: "They leave outside every evening", isCorrect: true},
                {text: "They leaves outside every evening", isCorrect: false}
            ]
        },
        {
            id: v1(),
            question: "Я не звоню на работу в выходные",
            isDone: false,
            word: 'call',
            answers: [
                {text: "I don't call work on weekends", isCorrect: true},
                {text: "I not call work on weekends", isCorrect: false},
                {text: "I did not call work on weekends", isCorrect: false}
            ]
        },
        {
            id: v1(),
            question: "Тебе нужно учить английский каждый день",
            isDone: false,
            word: 'need',
            answers: [
                {text: "They need to learn English every day", isCorrect: false},
                {text: "She need to learn English every day", isCorrect: false},
                {text: "You need to learn English every day", isCorrect: true}
            ]
        },
        {
            id: v1(),
            question: "Он хранит деньги в сейфе?",
            isDone: false,
            word: 'keep',
            answers: [
                {text: "Does he keep money in a safe?", isCorrect: true},
                {text: "Do he keep money in a safe?", isCorrect: false},
                {text: "He keeps money in a safe?", isCorrect: false}
            ]
        },
        {
            id: v1(),
            question: "Она не позволяет играть на улице вечером",
            isDone: false,
            word: 'let',
            answers: [
                {text: "She doesn't let play outside in the evening", isCorrect: true},
                {text: "She not let to play outside in the evening", isCorrect: false},
                {text: "She did not let to play outside in the evening", isCorrect: false}
            ]
        },
        {
            id: v1(),
            question: "Мы начинаем рабочий день в 9 утра",
            isDone: false,
            word: 'begin',
            answers: [
                {text: "I begin our work day at 9 am", isCorrect: false},
                {text: "We begin our work day at 9 am", isCorrect: true},
                {text: "We begins our work day at 9 am", isCorrect: false}
            ]
        },
        {
            id: v1(),
            question: "Они носят покупки в корзине?",
            isDone: false,
            word: 'bring',
            answers: [
                {text: "Do they bring their purchases in a basket?", isCorrect: true},
                {text: "Does they bring their purchases in a basket?", isCorrect: false},
                {text: "They brings their purchases in a basket?", isCorrect: false}
            ]
        }
    ]);
    const width = window.innerWidth;
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<any>(null);
    const [toggelModal, setToggelModal] = useState<0 | 1 | 2 | 3>(0);
    const [toggelVideoCat, setToggelVideoCat] = useState<0 | 1 | 2 | 3>(0);
    const [answerStatus, setAnswerStatus] = useState<"none" | "correct" | "wrong">("none");
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [correctAnswerText, setCorrectAnswerText] = useState<string>("");
    const [russianVoice, setRussianVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [englishVoice, setEnglishVoice] = useState<SpeechSynthesisVoice | null>(null);
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
    const speakText = (text: string, lang: "ru" | "en") => {
        if (!text) return;

        // Останавливаем текущую речь, если она идет
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        if (lang === "ru") {
            // Если нашли голос в системе — используем, если нет — просто ставим язык
            if (russianVoice) {
                utterance.voice = russianVoice;
            }
            utterance.lang = "ru-RU";
            utterance.rate = 1.0;
            utterance.pitch = 0.9; // Слегка понижаем для более мужского тембра
        } else {
            if (englishVoice) {
                utterance.voice = englishVoice;
            }
            utterance.lang = "en-US";
            utterance.rate = 0.7; // Твоя просьба: английский медленнее
            utterance.pitch = 1.0;
        }

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

        if (toggelModal === 2) {
            timer = setTimeout(() => {
                setToggelModal(0);
                setToggelVideoCat(0);

                const nextQ = questions.find(q => !q.isDone);
                if (nextQ) {
                    selectQuestion(nextQ.id);
                }
            }, 4000); // ⏱ 4 секунды
        }

        return () => clearTimeout(timer);
    }, [toggelModal, questions]);
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

            }
        } else {
            const correct = currentQuestion.answers.find((a: any) => a.isCorrect);
            if (correct) {
                setCorrectAnswerText(correct.text);
            }
            setAnswerStatus("wrong");
            setToggelVideoCat(1);
            setToggelModal(1);
        }
    };
    if (!currentQuestion) return null;
    return (
        <Box sx={{
            display: "flex", justifyContent: "center", alignItems: "center",
            marginTop:width<500?'-10%':'0%',
            minHeight: "88vh", width: "100vw",
        }}>
            <Paper elevation={3} sx={{
                padding: 3,
                width: "95%",
                maxWidth: "800px",
                textAlign: "center",
                backgroundColor: answerStatus === "wrong" ? '#901010' : "#444447",
                borderRadius: 4,
                position: "relative",
                minHeight: "400px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
            }}>

                {answerStatus === "wrong" ? (
                    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: 3, py: 4}}>
                        <Typography variant="h5" sx={{color: "#FFF44F", fontWeight: "bold", px: 2}}>
                            Не расстраивайся, мы приглашаем тебя на одно бесплатное онлайн занятие по <a style={{color: "#FFF44F"}}
                                                                                         href="https://www.kiber-rus.ru/english/">английскому
                            языку</a>!
                        </Typography>

                        <Box sx={{marginLeft: '9%', width: "200px", height: "200px"}}>
                            <VideoCat
                                src={'/wrong4.mp4'}
                                setToggelVideoCatFoo={() => {
                                }}
                                toggelVideoCat={toggelVideoCat}
                                showCondition={true}
                                free={width<500?true:false}
                            />
                        </Box>
                        <Box sx={{color: "#FFF44F", textAlign: "center", marginTop: '-10%'}}>
                            <Typography variant="body1" sx={{color: "#ffffff", mb: 1}}>
                                Правильный ответ:
                            </Typography>
                            <Typography variant="h6" sx={{
                                color: "#ffffff", fontWeight: "bold", backgroundColor: "#4caf50",
                                border: "1px dashed #4caf50", p: 1, borderRadius: 2
                            }}>
                                {correctAnswerText}
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            onClick={() => window.location.reload()}
                            sx={{
                                marginTop: '-0%',
                                bgcolor: "#FFF44F",
                                color: "black",
                                fontWeight: "bold",
                                "&:hover": {bgcolor: "#fff"}
                            }}
                        >
                            Попробовать еще раз
                        </Button>
                    </Box>
                ) : (
                    <>
                        {(toggelModal === 2 || toggelModal === 3) && (
                            <ModalCamponent open={true}>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    bgcolor: "#34fb08",
                                    position: "relative",
                                    minWidth: "300px",
                                    pb: 3, // Отступ снизу модалки
                                }}>

                                    {/* БЕЛАЯ ПОЛОСА С ФИКСИРОВАННЫМИ ОТСТУПАМИ */}
                                    <Box sx={{
                                        width: '100%',
                                        backgroundColor: 'white',
                                        py: "15px", // Отступ сверху и снизу ровно 15px
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        mb: 3, // Отступ от полосы до видео
                                    }}>
                                        <Typography sx={{
                                            color: '#279010', // Текст цветом фона модалки для красоты
                                            fontWeight: "bold",
                                            textAlign: 'center',
                                            px: 2, // Боковые отступы, чтобы текст не лип к краям
                                            fontSize: toggelModal === 3 ? '1rem' : '1.3rem',
                                            lineHeight: 1.2,
                                        }}>
                                            {toggelModal === 2 && "ВЕРНО!"}
                                            {toggelModal === 3 && "ПОЗДРАВЛЯЕМ! ТЕСТ ПРОЙДЕН! ВЫ ПОЛУЧАЕТЕ ТРИ БЕСПЛАТНЫХ ОНЛАЙН ЗАНЯТИЯ АНГЛИЙСКОГО ЯЗЫКА ⭐"}
                                        </Typography>
                                    </Box>

                                    <Box sx={{mb: 2}}>
                                        <VideoCat
                                            src={'/RightS6.mp4'}
                                            setToggelVideoCatFoo={() => {
                                            }}
                                            toggelVideoCat={toggelVideoCat}
                                            showCondition={true}

                                        />
                                    </Box>

                                    {toggelModal === 3 && (
                                        <Box sx={{position: 'relative', mt: 1}}>
                                            <Button
                                                variant="contained"
                                                onClick={() => window.location.reload()}
                                                sx={{
                                                    bgcolor: "#FFF44F",
                                                    color: "#000",
                                                    "&:hover": {bgcolor: "#fff"},
                                                    textTransform: 'none',
                                                    fontWeight: 'bold',
                                                    px: 4,
                                                    zIndex: 20, // Кнопка на первом слое
                                                    position: 'relative'
                                                }}
                                            >
                                                Начать новый тест
                                            </Button>

                                            {/* Картинка win */}
                                            <img
                                                src={win}
                                                style={{
                                                    height: width<500?'180px':'240px',
                                                    position: 'absolute',
                                                    top: width<500?'-115px':'-160px',   // Смещаем вверх, чтобы она "лежала" на кнопке
                                                    right: width<500?'30px':'10px', // Смещаем вправо
                                                    transform: 'rotate(45deg)', // Поворот на 45 градусов вправо
                                                    zIndex: 10,     // Самый верхний слой (поверх кнопки)
                                                    pointerEvents: 'none' // Чтобы клик сквозь картинку попадал на кнопку
                                                }}
                                                alt="win"
                                            />
                                        </Box>
                                    )}
                                </Box>
                            </ModalCamponent>
                        )}
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
                                            minWidth: width<500?'100px':"200px",
                                            height: width<500?'40px':'60px'
                                        }}
                                    >
                                        {q.word}
                                    </Button>
                                ))}
                            </Box>
                        </Box>

                        <Box sx={{mt: '-1%'}}>
                            <Typography variant="h5" sx={{color: "white", mb: '1%',fontSize:width<500?'13px':'25px', minHeight: "60px"}}>
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
                                    <Box key={idx}
                                         sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <Button
                                            variant="contained"
                                            onClick={() => handleAnswer(ans.text, ans.isCorrect)}
                                            sx={{
                                                py: 2, textTransform: "none", fontSize: "1.1rem",
                                                width: '60%',
                                                color: "black",
                                                bgcolor: selectedAnswer === ans.text
                                                    ? (ans.isCorrect ? "#4caf50" : "#f44336")
                                                    : "#FFF44F",
                                                "&:hover": {bgcolor: "#FFF44F"}
                                            }}
                                        >
                                            <span style={{color: 'black',fontSize:width<500?'12px':'20px'}}>
                                            {ans.text}
                                                </span>
                                        </Button>
                                        <IconButton
                                            onClick={() => speakText(ans.text, "en")}
                                            sx={{ml: 1, color: '#FFF44F'}}
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