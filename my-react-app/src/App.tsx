import {useEffect, useState} from "react";
import {Header} from "./Header/Header";
import {PresentSimple} from "./Present/PresentSimple";
import {PastSimple} from "./Present/PasteSimple";
import {FutureSimple} from "./Present/FutureSimple";
import {Body} from "./body/Body";
import {PracticeComponent} from "./body/smallCamponents/PracticeCamponent";
import {Box} from "@mui/material";
import {getQuestions} from "./Data/Data";
import type {SvgIconProps} from '@mui/material/SvgIcon';
import SvgIcon from '@mui/material/SvgIcon';
import {Link} from "react-router-dom";

export function HomeIcon(props: SvgIconProps) {
    return (
        <Link to="/" style={{textDecoration: "none"}}>
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </SvgIcon>
        </Link>
    );
}

export type timeType = 'Simple Present' | 'Simple Past' | 'Simple Future';
export const App = () => {
    const [time, setTime] = useState<timeType>('Simple Present');
    const [thorium, setThorium] = useState(false);
    const [toggleVideo, setToggleVideo] = useState(false);
    const [firstClick, setFirstClick] = useState(false);
    const [showPractice, setShowPractice] = useState(false);
    const [toggleVC, setToggleVC] = useState(false);
    const [star, setStar] = useState(0);

    const handleChange = (eValue: timeType) => {
        setTime(eValue);
        setThorium(false);
    };

    const toggleTheory = (theory: boolean) => setThorium(theory);
    const toggleTheoryPV = (toggle: boolean) => setToggleVideo(toggle);

    const getTheoryComponent = (toggleTheory: (theory: boolean) => void) => {
        switch (time) {
            case "Simple Present":
                return <PresentSimple thorium={thorium} toggleTheory={toggleTheory}/>;
            case "Simple Past":
                return <PastSimple thorium={thorium} toggleTheory={toggleTheory}/>;
            case "Simple Future":
                return <FutureSimple thorium={thorium} toggleTheory={toggleTheory}/>;
            default:
                return null;
        }
    };

    useEffect(() => {
        const fetchProgress = async () => {
            const data = await getQuestions();
            if (data) {
                let completed = 0;
                let total = 0;

                Object.values(data.simple).forEach((timeBlock) => {
                    Object.values(timeBlock).forEach((lesson) => {
                        lesson.forEach((q) => {
                            total++;
                            if (q.isDone) completed++;
                        });
                    });
                });

                setStar(completed);
            }
        };

        fetchProgress();
    }, []);

    useEffect(() => {
        if (showPractice) {
            window.scrollTo({top: 0, behavior: "smooth"});
        }
    }, [showPractice]);

    return (
        <>
            {!showPractice && (
                <Header time={time} setTime={setTime} handleChange={handleChange} star={star}/>
            )}
            {showPractice && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        minHeight: "10vh",
                        padding: 2,
                        gap: "10px",
                        overflowX: "hidden",
                        boxSizing: "border-box",
                        maxWidth: "100vw",
                    }}
                >
                    <PracticeComponent
                        time={time}
                        toggle={toggleVideo}
                        openTheory={toggleTheory}
                        toggleTheory={toggleTheoryPV}
                        setToggleVC={setToggleVC}
                        setShowPractice={setShowPractice}
                        showPractice={showPractice}
                        setStar={setStar}
                        star={star}
                    />
                </Box>
            )}
            <Body
                time={time}
                thorium={thorium}
                toggleTheory={toggleTheory}
                getTheoryComponent={getTheoryComponent}
                toggleVideo={toggleVideo}
                setToggleVideo={setToggleVideo}
                firstClick={firstClick}
                setFirstClick={setFirstClick}
                setShowPracticeFoo={() => setShowPractice(!showPractice)}
                showPractice={showPractice}
                setShowPractice={setShowPractice}
                toggleVC={toggleVC}
                setToggleVC={setToggleVC}
                setStar={setStar}
                star={star}
            />

        </>
    );
};
