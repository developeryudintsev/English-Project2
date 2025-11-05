import {Link, useParams} from 'react-router-dom';
import {topics} from "../AppRoutes";

export const TopicDetailPage = () => {
    const { topicId } = useParams<{ topicId: string }>();

    const topic = topics.find(f => f.path === topicId);
    if (!topic) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h1>Тема не найдена</h1>
                <p>Извините, мы не можем найти эту тему.</p>
                <Link to="/themes">
                    <button style={{ padding: '10px 20px', marginTop: '20px' }}>
                        Вернуться к списку тем
                    </button>
                </Link>
            </div>
        );
    }
    const topicLabel = topic.label;

    return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h1>Тема: {topicLabel}</h1>
            <p>Здесь будет контент и задания по теме "{topicLabel}".</p>
            <Link to="/themes">
                <button style={{ padding: '10px 20px', marginTop: '20px' }}>
                    Вернуться к списку тем
                </button>
            </Link>
        </div>
    );
};