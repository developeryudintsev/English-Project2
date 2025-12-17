import {FreePage} from "./FreePage";

export const Free = () => {

    return (
        <>
           <FreePage/>
        </>
    );
};
// {toggelModal === 1 && (
//     <ModalCamponent open={toggelModal === 1}>
//         <Box
//             sx={{
//                 height: 'auto', // Ключевое: высота подстраивается под контент
//                 minWidth: '300px',
//                 display: "flex",
//                 flexDirection: "column",
//                 transition: "all 0.5s ease-in-out", // Плавное изменение размера
//                 overflow: "hidden"
//             }}
//         >
//             {/* Шапка */}
//             <Box sx={{ p: 2, position: "relative",
//                 backgroundColor: "#444447", textAlign: "center" }}>
//                 <IconButton
//                     onClick={() => setToggelModal(0)}
//                     sx={{ position: "absolute", right: 8, top: 8, color: "#fff", bgcolor: "red" }}
//                 >
//                     <CloseIcon />
//                 </IconButton>
//                 <Typography variant="h6" sx={{ color: '#FFF44F', fontWeight: "bold" }}>
//                     вы допустили ошибку:
//                 </Typography>
//             </Box>
//
//             {/* Контентная часть */}
//             <Box
//                 sx={{
//                     p: 3,
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     gap: 2
//                 }}
//             >
//                 {/*
//                     Условие toggelVideoCat !== 0 гарантирует, что когда видео
//                     заканчивается и вызывается setToggelVideoCat(0),
//                     этот Box мгновенно исчезает из потока, и модалка "схлопывается"
//                 */}
//                 {toggelVideoCat !== 0 && (
//                     <Box sx={{ transition: "all 0.3s ease" }}>
//                         <VideoCat
//                             src={'/wrong4.mp4'}
//                             setToggelVideoCatFoo={() => setToggelVideoCat(0)}
//                             toggelVideoCat={toggelVideoCat}
//                             showCondition={toggelModal === 1}
//                         />
//                     </Box>
//                 )}
//
//                 <Button
//                     variant="contained"
//                     onClick={() => {
//                         setToggelModal(0);
//                         setToggelVideoCat(0);
//                     }}
//                     sx={{
//                         color: 'white',
//                         textTransform: "none",
//                         fontWeight: "bold"
//                     }}
//                 >
//                     начать снова
//                 </Button>
//             </Box>
//         </Box>
//     </ModalCamponent>
// )}
// {toggelModal === 2 && (
//     <ModalCamponent open={toggelModal === 2}>
//         <Box
//             sx={{
//                 height: 'auto',
//                 minWidth: '300px',
//                 display: "flex",
//                 flexDirection: "column",
//                 transition: "all 0.5s ease-in-out",
//                 overflow: "hidden",
//                 borderRadius: '8px'
//             }}
//         >
//             <Box sx={{ p: 2, position: "relative",
//                 backgroundColor: "#444447", textAlign: "center" }}>
//                 <IconButton
//                     onClick={() => {
//                         setToggelModal(0);
//                         setToggelVideoCat(0);
//                     }}
//                     sx={{
//                         position: "absolute",
//                         right: 8,
//                         top: 8,
//                         color: "#fff",
//                         bgcolor: "#4caf50", // Зеленый фон для успеха
//                         "&:hover": { bgcolor: "#388e3c" }
//                     }}
//                 >
//                     <CloseIcon />
//                 </IconButton>
//                 <Typography variant="h6" sx={{ color: '#FFF44F', fontWeight: "bold" }}>
//                     отлично! правильно:
//                 </Typography>
//             </Box>
//
//             <Box
//                 sx={{
//                     p: 3,
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     gap: 3
//                 }}
//             >
//                 {toggelVideoCat === 2 && (
//                     <Box sx={{ transition: "all 0.3s ease" }}>
//                         <VideoCat
//                             src={"/RightS6.mp4"}
//                             setToggelVideoCatFoo={() => setToggelVideoCat(0)}
//                             toggelVideoCat={toggelVideoCat}
//                             showCondition={toggelModal === 2}
//                         />
//                     </Box>
//                 )}
//
//                 <Button
//                     variant="contained"
//                     onClick={() => {
//                         setToggelModal(0);
//                         setToggelVideoCat(0);
//                     }}
//                     sx={{
//                         color: 'white',
//                         bgcolor: '#4caf50',
//                         textTransform: "none",
//                         fontWeight: "bold",
//                         "&:hover": { bgcolor: "#388e3c" }
//                     }}
//                 >
//                     продолжить
//                 </Button>
//             </Box>
//         </Box>
//     </ModalCamponent>
// )}