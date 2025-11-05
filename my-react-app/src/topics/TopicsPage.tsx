import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { topics } from '../AppRoutes';
import thems2 from "../picture/thems2.jpg";


export const TopicsPage = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const getCardStyle = (index: number): React.CSSProperties => {
        const isHovered = hoveredIndex === index;
        return {
            background: "#555",
            color: "#FFF44F",
            border: "2px solid black",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "18px",
            flex: "0 0 auto",
            textAlign: "center",
            minWidth: "250px",
            minHeight: "430px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.3s ease-in-out',
        };
    };

    return (
        <div style={{ display: "flex", flexWrap: 'wrap', gap: "30px", justifyContent: 'center', padding: '30px' }}>
            {topics.map((topic, index) => (
                <Link key={index} to={`/themes/${topic.path}`} style={{ textDecoration: "none" }}>
                    <div
                        style={getCardStyle(index)}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div>
                            <img
                                src={thems2}
                                style={{
                                    borderRadius: "12px",
                                    border:'#FFF44F 1px solid',
                                    width: "101%",
                                    height: "433px",
                                    marginTop: '-30px',
                                    marginLeft: '-2px',
                                }}
                            />
                            <p style={{
                                fontFamily: 'sans-serif',
                                fontWeight:900,
                                fontSize:19,
                                width: "240px",
                                marginTop: '-80px',
                                marginLeft:'13px',
                                color: 'black'
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