import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {topics} from '../AppRoutes';

export const TopicsPage = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const getCardStyle = (index: number): React.CSSProperties => {
        const isHovered = hoveredIndex === index;
        return {
            background: "#555",
            backgroundColor: '#444447',
            color: "#FFF44F",
            border: "2px solid black",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "18px",
            flex: "0 0 auto",
            textAlign: "center",
            minWidth: "160px",
            minHeight: "150px",
            maxHeight: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: isHovered ? 'scale(1.11)' : 'scale(1)',
            transition: 'transform 0.3s ease-in-out',
        };
    };

    return (
        <div style={{ display: "flex", flexWrap: 'wrap', gap: "10px", justifyContent: 'center', padding: '30px' }}>
            {topics.map((topic, index) => (
                <Link key={index} to={`/themes/${topic.path}`} style={{ textDecoration: "none" }}>
                    <div
                        style={getCardStyle(index)}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div>
                            <p style={{
                                fontFamily: 'sans-serif',
                                fontWeight:900,
                                fontSize:16,
                                width: "160px",
                                marginTop: '10px',
                                marginLeft:'center',
                                color: '#FFF44F',
                            }}>
                                {topic.label}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}

        </div>
    );
};