import {Link, useParams} from 'react-router-dom';
import {topics} from "../AppRoutes";

export const TopicDetailPage = () => {
    const {topicId} = useParams<{ topicId: string }>();

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
        <div style={{padding: '40px', textAlign: 'center'}}>
            <h1>Тема: {topic.label}</h1>
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
        </div>
    );
};