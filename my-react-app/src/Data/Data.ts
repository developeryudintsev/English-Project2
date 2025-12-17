import {v1} from "uuid";
import {openDB} from "idb";


export type TenseKey = 'Simple Present' | 'Simple Past' | 'Simple Future';


export type AnswerType = {
    text: string;
    isCorrect: boolean;
};
export type QuestionType = {
    id: string;
    question: string;
    isDone: boolean,
    word: string,
    answers: AnswerType[];
};
export type TimeData = {
    [lessonKey: string]: QuestionType[];
};
export type DataType = {
    simple: {
        'Simple Past': TimeData;
        'Simple Present': TimeData;
        'Simple Future': TimeData;
    };
};
export type RatingMap = {
    simple: {
        'Simple Past': { [lessonKey: string]: 0 | 1 };
        'Simple Present': { [lessonKey: string]: 0 | 1 };
        'Simple Future': { [lessonKey: string]: 0 | 1 };
    };
};
const DB_NAME = "englishApp";
const STORE_NAME = "answers";
const ROOT_ID = "DATA_V1";
const RATING_STORE = "rating";
const RATING_ID = "RATING_V1";

export const initDB = async () => {
    return openDB(DB_NAME, 2, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, {keyPath: "id"});
            }
            if (!db.objectStoreNames.contains(RATING_STORE)) {
                db.createObjectStore(RATING_STORE, {keyPath: "id"});
            }
        },
    });
};

export const computeRatingMapFromData = (data: DataType): RatingMap => {
    const result: RatingMap = {
        simple: {
            'Simple Past': {},
            'Simple Present': {},
            'Simple Future': {},
        },
    };

    // --- ИСПРАВЛЕНИЕ ЛОГИКИ: ИСПОЛЬЗУЕМ ДЛИННЫЕ КЛЮЧИ В ЦИКЛЕ ---
    (['Simple Past', 'Simple Present', 'Simple Future'] as const).forEach((tense) => {
        const lessons = data.simple[tense];
        Object.keys(lessons).forEach((lessonKey) => {
            const questions = lessons[lessonKey];
            const total = questions.length;
            const done = questions.filter((q) => q.isDone).length;
            result.simple[tense][lessonKey] = total > 0 && done === total ? 1 : 0;
        });
    });
    // --- КОНЕЦ ИСПРАВЛЕНИЯ ЛОГИКИ ---

    return result;
};

export const getRatingMap = async (): Promise<RatingMap | null> => {
    const db = await initDB();
    const rec = (await db.get(RATING_STORE, RATING_ID)) as { id: string; payload: RatingMap } | undefined;

    if (rec) return rec.payload;

    const data = await getQuestions();
    if (!data) return null;

    return computeRatingMapFromData(data);
};

export const setRatingMap = async (map: RatingMap) => {
    const db = await initDB();
    await db.put(RATING_STORE, {id: RATING_ID, payload: map});
};

// --- ИСПРАВЛЕНИЕ: Функция updateRatingFor теперь ожидает длинный ключ ---
export const updateRatingFor = async (tense: TenseKey, lessonKey: string) => {
    const map = await getRatingMap();

    const updated: RatingMap = map ?? {
        simple: {'Simple Past': {}, 'Simple Present': {}, 'Simple Future': {}},
    };

    const data = await getQuestions();
    if (!data) return;

    const questions = data.simple[tense][lessonKey] ?? [];
    const total = questions.length;
    const done = questions.filter((q) => q.isDone).length;

    updated.simple[tense][lessonKey] = total > 0 && done === total ? 1 : 0;

    const db = await initDB();
    await db.put(RATING_STORE, {id: RATING_ID, payload: updated});
};
// --- КОНЕЦ ИСПРАВЛЕНИЯ ---


export const saveRatingMap = async (rating: RatingMap) => {
    const db = await initDB();
    await db.put(RATING_STORE, {id: ROOT_ID, payload: rating});
};

export const updateQuestion = async (updatedData: DataType) => {
    const db = await initDB();
    const rec: DBRecord = {id: ROOT_ID, payload: updatedData};
    await db.put(STORE_NAME, rec);

    const newRating = calculateRating(updatedData);
    await saveRatingMap(newRating);
};

// --- ИСПРАВЛЕНИЕ: Функция calculateRating теперь использует длинные ключи ---
const calculateRating = (data: DataType): RatingMap => {
    const result: RatingMap = {simple: {'Simple Past': {}, 'Simple Present': {}, 'Simple Future': {}}};
    (['Simple Present', 'Simple Past', 'Simple Future'] as const).forEach((tense) => {
        const lessons = data.simple[tense];
        Object.keys(lessons).forEach((lessonKey) => {
            const questions = lessons[lessonKey];
            const total = questions.length;
            const done = questions.filter((q) => q.isDone).length;
            result.simple[tense][lessonKey] = total > 0 && done === total ? 1 : 0;
        });
    });
    return result;
};
// --- КОНЕЦ ИСПРАВЛЕНИЯ ---


type DBRecord = {
    id: string;
    payload: DataType;
};

export const addQuestions = async (data: DataType, refresh: 'reload' | 'none') => {
    if (refresh === 'none') {
        const db = await initDB();
        const exists = await db.get(STORE_NAME, ROOT_ID);
        console.log(exists)
        if (!exists) {
            const rec: DBRecord = {id: ROOT_ID, payload: data};
            await db.add(STORE_NAME, rec);
        }
    } else if (refresh === 'reload') {
        const db = await initDB();
        await db.delete(STORE_NAME, ROOT_ID);
        const rec: DBRecord = {id: ROOT_ID, payload: data};
        await db.add(STORE_NAME, rec);
    }
};

export const getQuestions = async (): Promise<DataType | null> => {
    const db = await initDB();
    const rec = (await db.get(STORE_NAME, ROOT_ID)) as DBRecord | undefined;
    return rec?.payload ?? null;
};

export const data: DataType = {
    simple: {
        ['Simple Present']: {
            ['.']: [
                {
                    id: v1(),
                    question: "Я говорю",
                    isDone: false,
                    word: 'say',
                    answers: [
                        {text: "I say", isCorrect: true},
                        {text: "I says", isCorrect: false},
                        {text: "Do i say?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Вы(ты) идете",
                    isDone: false,
                    word: 'go',
                    answers: [
                        {text: "I go", isCorrect: false},
                        {text: "She says", isCorrect: false},
                        {text: "You go", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "Он получает",
                    isDone: false,
                    word: 'get',
                    answers: [
                        {text: "We get", isCorrect: false},
                        {text: "I got", isCorrect: false},
                        {text: "He gets", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "Oна делает(что-то руками)",
                    isDone: false,
                    word: 'make',
                    answers: [
                        {text: "I will make", isCorrect: false},
                        {text: "She makes", isCorrect: true},
                        {text: "I maked", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Оно знает",
                    isDone: false,
                    word: 'know',
                    answers: [
                        {text: "It know", isCorrect: false},
                        {text: "Did it know?", isCorrect: false},
                        {text: "It knows", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "Мы берём",
                    isDone: false,
                    word: 'take',
                    answers: [
                        {text: "I take", isCorrect: false},
                        {text: "We take", isCorrect: true},
                        {text: "You does take", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Они видят",
                    isDone: false,
                    word: 'see',
                    answers: [
                        {text: "They sees", isCorrect: false},
                        {text: "They see", isCorrect: true},
                        {text: "They saw", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Я прихожу",
                    isDone: false,
                    word: 'came',
                    answers: [
                        {text: "I cames", isCorrect: false},
                        {text: "I came", isCorrect: true},
                        {text: "I do came", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Ты думаешь",
                    isDone: false,
                    word: 'think',
                    answers: [
                        {text: "You think", isCorrect: true},
                        {text: "We think", isCorrect: false},
                        {text: "You thinks", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Она смотрит",
                    isDone: false,
                    word: 'look',
                    answers: [
                        {text: "I looks", isCorrect: false},
                        {text: "He looks", isCorrect: false},
                        {text: "She looks", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "Оно хочет",
                    isDone: false,
                    word: 'want',
                    answers: [
                        {text: "I wants", isCorrect: false},
                        {text: "It wants", isCorrect: true},
                        {text: "I want", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Мы даём",
                    isDone: false,
                    word: 'give',
                    answers: [
                        {text: "We give", isCorrect: true},
                        {text: "We gives", isCorrect: false},
                        {text: "They gives", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Они используют",
                    isDone: false,
                    word: 'use',
                    answers: [
                        {text: "They use", isCorrect: true},
                        {text: "It use", isCorrect: false},
                        {text: "They uses", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Я нахожу",
                    isDone: false,
                    word: 'find',
                    answers: [
                        {text: "I find", isCorrect: true},
                        {text: "I finds", isCorrect: false},
                        {text: "We find", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Ты расказываешь",
                    isDone: false,
                    word: 'tell',
                    answers: [
                        {text: "You tell", isCorrect: true},
                        {text: "I tells", isCorrect: false},
                        {text: "We tell", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Он спрашивает",
                    isDone: false,
                    word: 'ask',
                    answers: [
                        {text: "He ask", isCorrect: false},
                        {text: "He asks", isCorrect: true},
                        {text: "I asks", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Она работает",
                    isDone: false,
                    word: 'work',
                    answers: [
                        {text: "You works", isCorrect: false},
                        {text: "She works", isCorrect: true},
                        {text: "She work", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Оно чувствует",
                    isDone: false,
                    word: 'fell',
                    answers: [
                        {text: "It feels", isCorrect: true},
                        {text: "I feels", isCorrect: false},
                        {text: "It feel", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Мы пытаемся",
                    isDone: false,
                    word: 'try',
                    answers: [
                        {text: "It try", isCorrect: false},
                        {text: "I trys", isCorrect: false},
                        {text: "We try", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "Они уходят",
                    isDone: false,
                    word: 'leave',
                    answers: [
                        {text: "We leave", isCorrect: false},
                        {text: "They leave", isCorrect: true},
                        {text: "They leaves", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Я звоню",
                    isDone: false,
                    word: 'call',
                    answers: [
                        {text: "I call", isCorrect: true},
                        {text: "I calls", isCorrect: false},
                        {text: "It calls", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Тебе нужно",
                    isDone: false,
                    word: 'need',
                    answers: [
                        {text: "They need", isCorrect: false},
                        {text: "She need", isCorrect: false},
                        {text: "You need", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "Он хранит",
                    isDone: false,
                    word: 'keep',
                    answers: [
                        {text: "He keep", isCorrect: false},
                        {text: "He keeps", isCorrect: true},
                        {text: "He kept", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Она позволяет",
                    isDone: false,
                    word: 'let',
                    answers: [
                        {text: "She lets", isCorrect: true},
                        {text: "She let", isCorrect: false},
                        {text: "She leted", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Мы начинаем",
                    isDone: false,
                    word: 'begin',
                    answers: [
                        {text: "I begin", isCorrect: false},
                        {text: "We begin", isCorrect: true},
                        {text: "We begins", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Они несут",
                    isDone: false,
                    word: 'bring',
                    answers: [
                        {text: "They bring", isCorrect: true},
                        {text: "She bring", isCorrect: false},
                        {text: "They brings", isCorrect: false},
                    ],
                },
            ],
            ['?']: [
                {
                    id: v1(),
                    question: "Я говорю?",
                    isDone: false,
                    word: 'say',
                    answers: [
                        {text: "Do I say?", isCorrect: true},
                        {text: "Does I say?", isCorrect: false},
                        {text: "I say?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Вы(ты) идете?",
                    isDone: false,
                    word: 'go',
                    answers: [
                        {text: "Do you go?", isCorrect: true},
                        {text: "Does you go?", isCorrect: false},
                        {text: "You goes?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Он получает?",
                    isDone: false,
                    word: 'get',
                    answers: [
                        {text: "Does he get?", isCorrect: true},
                        {text: "Do he get?", isCorrect: false},
                        {text: "He gets?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Она делает?",
                    isDone: false,
                    word: 'make',
                    answers: [
                        {text: "Does she make?", isCorrect: true},
                        {text: "Do she make?", isCorrect: false},
                        {text: "She makes?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Оно знает?",
                    isDone: false,
                    word: 'know',
                    answers: [
                        {text: "Does it know?", isCorrect: true},
                        {text: "Do it know?", isCorrect: false},
                        {text: "It knows?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Мы берём?",
                    isDone: false,
                    word: 'take',
                    answers: [
                        {text: "Do we take?", isCorrect: true},
                        {text: "Does we take?", isCorrect: false},
                        {text: "We takes?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Они видят?",
                    isDone: false,
                    word: 'see',
                    answers: [
                        {text: "Do they see?", isCorrect: true},
                        {text: "Does they see?", isCorrect: false},
                        {text: "They sees?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Я прихожу?",
                    isDone: false,
                    word: 'come',
                    answers: [
                        {text: "Do I come?", isCorrect: true},
                        {text: "Does I come?", isCorrect: false},
                        {text: "I comes?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Ты думаешь?",
                    isDone: false,
                    word: 'think',
                    answers: [
                        {text: "Do you think?", isCorrect: true},
                        {text: "Does you think?", isCorrect: false},
                        {text: "You thinks?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Она смотрит?",
                    isDone: false,
                    word: 'look',
                    answers: [
                        {text: "Does she look?", isCorrect: true},
                        {text: "Do she look?", isCorrect: false},
                        {text: "She looks?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Оно хочет?",
                    isDone: false,
                    word: 'want',
                    answers: [
                        {text: "Does it want?", isCorrect: true},
                        {text: "Do it want?", isCorrect: false},
                        {text: "It wants?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Мы даём?",
                    isDone: false,
                    word: 'give',
                    answers: [
                        {text: "Do we give?", isCorrect: true},
                        {text: "Does we give?", isCorrect: false},
                        {text: "We gives?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Они используют?",
                    isDone: false,
                    word: 'use',
                    answers: [
                        {text: "Do they use?", isCorrect: true},
                        {text: "Does they use?", isCorrect: false},
                        {text: "They uses?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Я нахожу?",
                    isDone: false,
                    word: 'find',
                    answers: [
                        {text: "Do I find?", isCorrect: true},
                        {text: "Does I find?", isCorrect: false},
                        {text: "I finds?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Ты рассказываешь?",
                    isDone: false,
                    word: 'tell',
                    answers: [
                        {text: "Do you tell?", isCorrect: true},
                        {text: "Does you tell?", isCorrect: false},
                        {text: "You tells?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Он спрашивает?",
                    isDone: false,
                    word: 'ask',
                    answers: [
                        {text: "Does he ask?", isCorrect: true},
                        {text: "Do he ask?", isCorrect: false},
                        {text: "He asks?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Она работает?",
                    isDone: false,
                    word: 'work',
                    answers: [
                        {text: "Does she work?", isCorrect: true},
                        {text: "Do she work?", isCorrect: false},
                        {text: "She works?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Оно чувствует?",
                    isDone: false,
                    word: 'feel',
                    answers: [
                        {text: "Does it feel?", isCorrect: true},
                        {text: "Do it feel?", isCorrect: false},
                        {text: "It feels?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Мы пытаемся?",
                    isDone: false,
                    word: 'try',
                    answers: [
                        {text: "Do we try?", isCorrect: true},
                        {text: "Does we try?", isCorrect: false},
                        {text: "We trys?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Они уходят?",
                    isDone: false,
                    word: 'leave',
                    answers: [
                        {text: "Do they leave?", isCorrect: true},
                        {text: "Does they leave?", isCorrect: false},
                        {text: "They leaves?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Я звоню?",
                    isDone: false,
                    word: 'call',
                    answers: [
                        {text: "Do I call?", isCorrect: true},
                        {text: "Does I call?", isCorrect: false},
                        {text: "I calls?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Тебе нужно?",
                    isDone: false,
                    word: 'need',
                    answers: [
                        {text: "Do you need?", isCorrect: true},
                        {text: "Does you need?", isCorrect: false},
                        {text: "You needs?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Он хранит?",
                    isDone: false,
                    word: 'keep',
                    answers: [
                        {text: "Does he keep?", isCorrect: true},
                        {text: "Do he keep?", isCorrect: false},
                        {text: "He keeps?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Она позволяет?",
                    isDone: false,
                    word: 'let',
                    answers: [
                        {text: "Does she let?", isCorrect: true},
                        {text: "Do she let?", isCorrect: false},
                        {text: "She lets?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Мы начинаем?",
                    isDone: false,
                    word: 'begin',
                    answers: [
                        {text: "Do we begin?", isCorrect: true},
                        {text: "Does we begin?", isCorrect: false},
                        {text: "We begins?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Они несут?",
                    isDone: false,
                    word: 'bring',
                    answers: [
                        {text: "Do they bring?", isCorrect: true},
                        {text: "Does they bring?", isCorrect: false},
                        {text: "They brings?", isCorrect: false},
                    ],
                },
            ],
            ['!']: [
                {
                    id: v1(),
                    question: "Я не говорю",
                    isDone: false,
                    word: 'say',
                    answers: [
                        {text: "I do not say", isCorrect: true},
                        {text: "I does not say", isCorrect: false},
                        {text: "I did not say", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Вы(ты) не идете",
                    isDone: false,
                    word: 'go',
                    answers: [
                        {text: "You do not go", isCorrect: true},
                        {text: "You does not go", isCorrect: false},
                        {text: "You not go", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Он не получает",
                    isDone: false,
                    word: 'get',
                    answers: [
                        {text: "He does not get", isCorrect: true},
                        {text: "He do not get", isCorrect: false},
                        {text: "He did not get", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Она не делает",
                    isDone: false,
                    word: 'make',
                    answers: [
                        {text: "She does not make", isCorrect: true},
                        {text: "She do not make", isCorrect: false},
                        {text: "She did not make", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Оно не знает",
                    isDone: false,
                    word: 'know',
                    answers: [
                        {text: "It does not know", isCorrect: true},
                        {text: "It not know", isCorrect: false},
                        {text: "It didn’t know", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Мы не берём",
                    isDone: false,
                    word: 'take',
                    answers: [
                        {text: "We do not take", isCorrect: true},
                        {text: "We does not take", isCorrect: false},
                        {text: "We not take", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Они не видят",
                    isDone: false,
                    word: 'see',
                    answers: [
                        {text: "They do not see", isCorrect: true},
                        {text: "They not see", isCorrect: false},
                        {text: "They did not see", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Я не прихожу",
                    isDone: false,
                    word: 'came',
                    answers: [
                        {text: "I do not come", isCorrect: true},
                        {text: "I did not came", isCorrect: false},
                        {text: "I not come", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Ты не думаешь",
                    isDone: false,
                    word: 'think',
                    answers: [
                        {text: "You do not think", isCorrect: true},
                        {text: "You not think", isCorrect: false},
                        {text: "You doesn’t think", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Она не смотрит",
                    isDone: false,
                    word: 'look',
                    answers: [
                        {text: "She does not look", isCorrect: true},
                        {text: "She not look", isCorrect: false},
                        {text: "She didn’t look", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Оно не хочет",
                    isDone: false,
                    word: 'want',
                    answers: [
                        {text: "It does not want", isCorrect: true},
                        {text: "It want not", isCorrect: false},
                        {text: "It didn’t want", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Мы не даём",
                    isDone: false,
                    word: 'give',
                    answers: [
                        {text: "We do not give", isCorrect: true},
                        {text: "We gives not", isCorrect: false},
                        {text: "We did not give", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Они не используют",
                    isDone: false,
                    word: 'use',
                    answers: [
                        {text: "They do not use", isCorrect: true},
                        {text: "They not use", isCorrect: false},
                        {text: "They uses not", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Я не нахожу",
                    isDone: false,
                    word: 'find',
                    answers: [
                        {text: "I do not find", isCorrect: true},
                        {text: "I not find", isCorrect: false},
                        {text: "I did not find", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Ты не рассказываешь",
                    isDone: false,
                    word: 'tell',
                    answers: [
                        {text: "You do not tell", isCorrect: true},
                        {text: "You not tell", isCorrect: false},
                        {text: "You did not tell", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Он не спрашивает",
                    isDone: false,
                    word: 'ask',
                    answers: [
                        {text: "He does not ask", isCorrect: true},
                        {text: "He not ask", isCorrect: false},
                        {text: "He did not ask", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Она не работает",
                    isDone: false,
                    word: 'work',
                    answers: [
                        {text: "She does not work", isCorrect: true},
                        {text: "She not work", isCorrect: false},
                        {text: "She did not work", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Оно не чувствует",
                    isDone: false,
                    word: 'fell',
                    answers: [
                        {text: "It does not feel", isCorrect: true},
                        {text: "It not feel", isCorrect: false},
                        {text: "It didn’t feel", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Мы не пытаемся",
                    isDone: false,
                    word: 'try',
                    answers: [
                        {text: "We do not try", isCorrect: true},
                        {text: "We not try", isCorrect: false},
                        {text: "We did not try", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Они не уходят",
                    isDone: false,
                    word: 'leave',
                    answers: [
                        {text: "They do not leave", isCorrect: true},
                        {text: "They not leave", isCorrect: false},
                        {text: "They did not leave", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Я не звоню",
                    isDone: false,
                    word: 'call',
                    answers: [
                        {text: "I do not call", isCorrect: true},
                        {text: "I not call", isCorrect: false},
                        {text: "I did not call", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Тебе не нужно",
                    isDone: false,
                    word: 'need',
                    answers: [
                        {text: "You do not need", isCorrect: true},
                        {text: "You not need", isCorrect: false},
                        {text: "You needs not", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Он не хранит",
                    isDone: false,
                    word: 'keep',
                    answers: [
                        {text: "He does not keep", isCorrect: true},
                        {text: "He not keep", isCorrect: false},
                        {text: "He did not keep", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Она не позволяет",
                    isDone: false,
                    word: 'let',
                    answers: [
                        {text: "She does not let", isCorrect: true},
                        {text: "She not let", isCorrect: false},
                        {text: "She did not let", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Мы не начинаем",
                    isDone: false,
                    word: 'begin',
                    answers: [
                        {text: "We do not begin", isCorrect: true},
                        {text: "We not begin", isCorrect: false},
                        {text: "We did not begin", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Они не несут",
                    isDone: false,
                    word: 'bring',
                    answers: [
                        {text: "They do not bring", isCorrect: true},
                        {text: "They not bring", isCorrect: false},
                        {text: "They did not bring", isCorrect: false},
                    ],
                },
            ],
            ['.?!']: [
                {
                    id: v1(),
                    question: "Я говорю каждый день",
                    isDone: false,
                    word: 'speak',
                    answers: [
                        {text: "I speak every day", isCorrect: true},
                        {text: "I speak every day", isCorrect: false},
                        {text: "Do i speak every day?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Вы(ты) ходите в школу",
                    isDone: false,
                    word: 'go',
                    answers: [
                        {text: "I go to school", isCorrect: false},
                        {text: "She goes to school", isCorrect: false},
                        {text: "You go to school", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "Он не получает большие деньги",
                    isDone: false,
                    word: 'get',
                    answers: [
                        {text: "He does not get paid a lot of money", isCorrect: true},
                        {text: "He do not get paid a lot of money", isCorrect: false},
                        {text: "He did not got paid a lot of money", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Oна делает(что-то руками) торт каждые выходные",
                    isDone: false,
                    word: 'make',
                    answers: [
                        {text: "I will make a cake every weekend", isCorrect: false},
                        {text: "She makes a cake every weekend", isCorrect: true},
                        {text: "I make a cake every weekend", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Оно знает английский язык?",
                    isDone: false,
                    word: 'know',
                    answers: [
                        {text: "Does it know English?", isCorrect: true},
                        {text: "Do it know English?", isCorrect: false},
                        {text: "It know English?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Мы не берём сладости в магазине",
                    isDone: false,
                    word: 'take',
                    answers: [
                        {text: "We don't take sweets from the store", isCorrect: true},
                        {text: "We does take sweets from the store", isCorrect: false},
                        {text: "We not take sweets from the store", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Они видят красивую птицу",
                    isDone: false,
                    word: 'see',
                    answers: [
                        {text: "They sees a beautiful bird", isCorrect: false},
                        {text: "They see a beautiful bird", isCorrect: true},
                        {text: "They saw a beautiful bird", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Я прихожу домой во время?",
                    isDone: false,
                    word: 'come',
                    answers: [
                        {text: "Do I come home on time?", isCorrect: true},
                        {text: "Does I come home on time?", isCorrect: false},
                        {text: "I come home on time?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Ты не думаешь много",
                    isDone: false,
                    word: 'think',
                    answers: [
                        {text: "You do not think", isCorrect: true},
                        {text: "You not think", isCorrect: false},
                        {text: "You doesn’t think", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Она смотрит сериалы каждый вечер",
                    isDone: false,
                    word: 'watch',
                    answers: [
                        {text: "I watches TV series every evening.", isCorrect: false},
                        {text: "He watches TV series every evening.", isCorrect: false},
                        {text: "She watches TV series every evening.", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "Оно хочет учить английский",
                    isDone: false,
                    word: 'want',
                    answers: [
                        {text: "I wants to learn English", isCorrect: false},
                        {text: "It wants to learn English", isCorrect: true},
                        {text: "I want to learn English", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Мы даём сдачу на кассе?",
                    isDone: false,
                    word: 'give',
                    answers: [
                        {text: "Do we give change at the checkout?", isCorrect: true},
                        {text: "Does we give change at the checkout?", isCorrect: false},
                        {text: "We give change at the checkout?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Они не используют китайский запчасти",
                    isDone: false,
                    word: 'use',
                    answers: [
                        {text: "They don't use Chinese parts.", isCorrect: true},
                        {text: "They don't use Chinese parts.", isCorrect: false},
                        {text: "They uses not Chinese parts.", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Я нахожу полезную информацию",
                    isDone: false,
                    word: 'find',
                    answers: [
                        {text: "I find useful information", isCorrect: true},
                        {text: "I finds useful information", isCorrect: false},
                        {text: "We find useful information", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Ты рассказываешь анекдоты на работе?",
                    isDone: false,
                    word: 'tell',
                    answers: [
                        {text: "Do you tell jokes at work?", isCorrect: true},
                        {text: "Does you tell jokes at work?", isCorrect: false},
                        {text: "You tell jokes at work?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Он не спрашивает новый рецепт",
                    isDone: false,
                    word: 'ask',
                    answers: [
                        {text: "He doesn't ask for a new recipe", isCorrect: true},
                        {text: "He not ask for a new recipe.", isCorrect: false},
                        {text: "He asks for a new recipe.", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Она работает изо всех сил",
                    isDone: false,
                    word: 'work',
                    answers: [
                        {text: "You works as hard as she can.", isCorrect: false},
                        {text: "She works as hard as she can.", isCorrect: true},
                        {text: "She work as hard as she can.", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Оно чувствует вкусный запах?",
                    isDone: false,
                    word: 'feel',
                    answers: [
                        {text: "Does it smell delicious?", isCorrect: true},
                        {text: "Does it smells delicious?", isCorrect: false},
                        {text: "Do it smell delicious?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Мы не пытаемся делать те же вещи",
                    isDone: false,
                    word: 'try',
                    answers: [
                        {text: "We does not try to do the same things.", isCorrect: true},
                        {text: "We not try to do the same things.", isCorrect: false},
                        {text: "We're tryes to do the same things.", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Они уходят на улицу",
                    isDone: false,
                    word: 'leave',
                    answers: [
                        {text: "We leave outside", isCorrect: false},
                        {text: "They leave outside", isCorrect: true},
                        {text: "They leaves outside", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Я не звоню на работу в выходные",
                    isDone: false,
                    word: 'call',
                    answers: [
                        {text: "I don't call work on weekends", isCorrect: true},
                        {text: "I not call work on weekends", isCorrect: false},
                        {text: "I did not call work on weekends", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Тебе нужно учить английский каждый день",
                    isDone: false,
                    word: 'need',
                    answers: [
                        {text: "They need to learn English every day", isCorrect: false},
                        {text: "She need to learn English every day", isCorrect: false},
                        {text: "You need to learn English every day", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "Он хранит деньги в сейфе?",
                    isDone: false,
                    word: 'keep',
                    answers: [
                        {text: "Does he keep his money in a safe?", isCorrect: true},
                        {text: "Do he keep his money in a safe?", isCorrect: false},
                        {text: "He keeps his money in a safe?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Она не позволяет играть на улице вечером",
                    isDone: false,
                    word: 'let',
                    answers: [
                        {text: "She doesn't let me to play outside in the evening.", isCorrect: true},
                        {text: "She not let me to play outside in the evening.", isCorrect: false},
                        {text: "She did not let me to play outside in the evening.", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Мы начинаем рабочий день в 9 утра",
                    isDone: false,
                    word: 'begin',
                    answers: [
                        {text: "I begin work day at 9 am", isCorrect: false},
                        {text: "We begin our work day at 9 am", isCorrect: true},
                        {text: "We begins our work day at 9 am", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Они носят покупки в корзине?",
                    isDone: false,
                    word: 'bring',
                    answers: [
                        {text: "Do they bring their groceries in a basket?", isCorrect: true},
                        {text: "Does they bring their groceries in a basket?", isCorrect: false},
                        {text: "They brings their groceries in a basket?", isCorrect: false},
                    ],
                },
            ]
        },
        ['Simple Past']: {
            ['.']: [
                {
                    id: v1(),
                    question: "Он мне позвонил",
                    isDone: false,
                    word: 'came',
                    answers: [
                        {text: "He called me", isCorrect: true},
                        {text: "He call me", isCorrect: false},
                        {text: "He do call me", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "ы это видели?",
                    isDone: false,
                    word: 'saw',
                    answers: [
                        {text: "Do you saw it?", isCorrect: false},
                        {text: "You did saw it?", isCorrect: false},
                        {text: "Did you see it?", isCorrect: true},
                    ],
                },
            ],
            ['?']: [
                {
                    id: v1(),
                    question: "Ты это видел?",
                    isDone: false,
                    word: 'saw',
                    answers: [
                        {text: "Do you saw it?", isCorrect: false},
                        {text: "You did saw it?", isCorrect: false},
                        {text: "Did you see it?", isCorrect: true},
                    ],
                },
            ],
            ['!']: [
                {
                    id: v1(),
                    question: "Он мне не позвонил.",
                    isDone: false,
                    word: 'came',
                    answers: [
                        {text: "He did not call me", isCorrect: true},
                        {text: "He not called me", isCorrect: false},
                        {text: "He didn’t called me", isCorrect: false},
                    ],
                },
            ],
            ['.?!']: [
                {
                    id: v1(),
                    question: "Я говорил",
                    isDone: false,
                    word: 'say',
                    answers: [
                        { text: "I said", isCorrect: true },
                        { text: "I say", isCorrect: false },
                        { text: "Did I say?", isCorrect: false },
                    ],
                },
                {
                    id: v1(),
                    question: "Вы(ты) шли",
                    isDone: false,
                    word: 'go',
                    answers: [
                        { text: "You went", isCorrect: true },
                        { text: "You go", isCorrect: false },
                        { text: "Did you go", isCorrect: false },
                    ],
                },
                {
                    id: v1(),
                    question: "Он не получил",
                    isDone: false,
                    word: 'get',
                    answers: [
                        { text: "He did not get", isCorrect: true },
                        { text: "He did not got", isCorrect: false },
                        { text: "He does not get", isCorrect: false },
                    ],
                },
                {
                    id: v1(),
                    question: "Она сделала",
                    isDone: false,
                    word: 'make',
                    answers: [
                        { text: "She made", isCorrect: true },
                        { text: "She make", isCorrect: false },
                        { text: "She maked", isCorrect: false },
                    ],
                },
                {
                    id: v1(),
                    question: "Оно знало?",
                    isDone: false,
                    word: 'know',
                    answers: [
                        { text: "Did it know?", isCorrect: true },
                        { text: "Does it know?", isCorrect: false },
                        { text: "It knew?", isCorrect: false },
                    ],
                },
                {
                    id: v1(),
                    question: "Мы не взяли",
                    isDone: false,
                    word: 'take',
                    answers: [
                        { text: "We did not take", isCorrect: true },
                        { text: "We not took", isCorrect: false },
                        { text: "We does not take", isCorrect: false },
                    ],
                },
                {
                    id: v1(),
                    question: "Они видели",
                    isDone: false,
                    word: 'see',
                    answers: [
                        { text: "They saw", isCorrect: true },
                        { text: "They see", isCorrect: false },
                        { text: "They sees", isCorrect: false },
                    ],
                },
                {
                    id: v1(),
                    question: "Я пришёл?",
                    isDone: false,
                    word: 'come',
                    answers: [
                        { text: "Did I come?", isCorrect: true },
                        { text: "Do I come?", isCorrect: false },
                        { text: "I came?", isCorrect: false },
                    ],
                },
                {
                    id: v1(),
                    question: "Ты не думал",
                    isDone: false,
                    word: 'think',
                    answers: [
                        { text: "You did not think", isCorrect: true },
                        { text: "You not thought", isCorrect: false },
                        { text: "You don’t think", isCorrect: false },
                    ],
                },
                {
                    id: v1(),
                    question: "Она смотрела",
                    isDone: false,
                    word: 'look',
                    answers: [
                        { text: "She looked", isCorrect: true },
                        { text: "She looks", isCorrect: false },
                        { text: "She look", isCorrect: false },
                    ],
                },
            ],
        },
        ['Simple Future']: {
            ['.']: [
                {
                    id: v1(),
                    question: "Она придет",
                    isDone: false,
                    word: 'will came',
                    answers: [
                        {text: "She will come", isCorrect: true},
                        {text: "She will not come", isCorrect: false},
                        {text: "She don’t come", isCorrect: false},
                    ],
                },
            ],
            ['?']: [
                {
                    id: v1(),
                    question: "Они идут?",
                    isDone: false,
                    word: 'go',
                    answers: [
                        {text: "They will go?", isCorrect: false},
                        {text: "Do they go?", isCorrect: false},
                        {text: "Will they go?", isCorrect: true},
                    ],
                },
            ],
            ['!']: [
                {
                    id: v1(),
                    question: "Она не придет.",
                    isDone: false,
                    word: 'came',
                    answers: [
                        {text: "She not will come", isCorrect: false},
                        {text: "She will not come", isCorrect: true},
                        {text: "She don’t come", isCorrect: false},
                    ],
                },
            ],
            ['.?!']: [
                {
                    id: v1(),
                    question: "Я скажу",
                    isDone: false,
                    word: 'say',
                    answers: [
                        {text: "I will say", isCorrect: true},
                        {text: "I say", isCorrect: false},
                        {text: "I will said", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Вы(ты) пойдёте",
                    isDone: false,
                    word: 'go',
                    answers: [
                        {text: "You will go", isCorrect: true},
                        {text: "You go", isCorrect: false},
                        {text: "Will you went", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Он не получит",
                    isDone: false,
                    word: 'get',
                    answers: [
                        {text: "He will not get", isCorrect: true},
                        {text: "He does not get", isCorrect: false},
                        {text: "He will not got", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Она сделает",
                    isDone: false,
                    word: 'make',
                    answers: [
                        {text: "She will make", isCorrect: true},
                        {text: "She makes", isCorrect: false},
                        {text: "She will made", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Оно будет знать?",
                    isDone: false,
                    word: 'know',
                    answers: [
                        {text: "Will it know?", isCorrect: true},
                        {text: "Does it know?", isCorrect: false},
                        {text: "It will knows?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Мы не возьмём",
                    isDone: false,
                    word: 'take',
                    answers: [
                        {text: "We will not take", isCorrect: true},
                        {text: "We not will take", isCorrect: false},
                        {text: "We do not take", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Они увидят",
                    isDone: false,
                    word: 'see',
                    answers: [
                        {text: "They will see", isCorrect: true},
                        {text: "They see", isCorrect: false},
                        {text: "They will saw", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Я приду?",
                    isDone: false,
                    word: 'come',
                    answers: [
                        {text: "Will I come?", isCorrect: true},
                        {text: "Do I come?", isCorrect: false},
                        {text: "I will came?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Ты не будешь думать",
                    isDone: false,
                    word: 'think',
                    answers: [
                        {text: "You will not think", isCorrect: true},
                        {text: "You do not think", isCorrect: false},
                        {text: "You will not thought", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Она посмотрит",
                    isDone: false,
                    word: 'look',
                    answers: [
                        {text: "She will look", isCorrect: true},
                        {text: "She looks", isCorrect: false},
                        {text: "She will looked", isCorrect: false},
                    ],
                },
            ],
        },
    },
}

