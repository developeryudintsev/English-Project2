import {Link, useParams} from 'react-router-dom';
import {topics} from "../AppRoutes";

export const TopicDetailPage = () => {
    const { topicId } = useParams<{ topicId: string }>();

    const topicName=topics.find(f=>f.path===topicId?f.label:'')
    console.log(topicName.label)
    return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h1>Тема: {topicName.label}</h1>
            <p>Здесь будет контент и задания по теме "{topicName.label}".</p>
            <Link to="/themes">
                <button style={{ padding: '10px 20px', marginTop: '20px' }}>
                    Вернуться к списку тем
                </button>
            </Link>
        </div>
    );
};