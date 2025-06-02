import React from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Welcompage from "./Welcomepage/Welcompage";
import LoginPage from "./LoginPage/LoginPage";
import Register from "./Register/Register";
import ForgotPassword from "./Forgotpassword/Forgotpassword";
import Homepage from "./Homepage/HomePage";
import Profile from "./Profile/Profile";
import AccountSettings from "./AccountSettings/AccountSettings";
import Score from "./Score/Score";
import ResetPassword from "./Resetpassword/Resetpassword";
import MiniGameSelection from "./Minigame/Minigame";
import MemoryGame from "../src/Minigame/MemoryGame/MemoryGame";
import NumberSortGame from "./Minigame/NumberSortGame/NumberSortGame";
import RockPaperScissors from "./Minigame/RockPaperScissors/RockPaperScissors";
import NumberTarget from "./Minigame/NumberTarget/NumberTarget";
import MathPage from "./LessonPage/Mathpage/Mathpage";
import SciPage from "./LessonPage/Science/Science";
import EnglanguagePage from "./LessonPage/EngLanguage/EngLanguage";
import ThlanguagePage from "./LessonPage/ThaiLanguage/ThaiLanguage";
import EngQuiz from "./LessonPage/Quiz/EngQuiz/EngLanguageQuiz";
import MathQuiz from "./LessonPage/Quiz/MathQuiz/MathQuiz";
import ScienceQuiz from "./LessonPage/Quiz/SciQuiz/ScienceQuiz";
import ThaiQuiz from "./LessonPage/Quiz//ThaiQuiz/ThaiLanguageQuiz";
import MathLearning from "./Learningpage/MathLearning/MathLeraning";
import SciLearning from "./Learningpage/SciLearning/SciLearning";
import EngLearning from "./Learningpage/EngLearning/EngLearning";
import ThaiLearning from "./Learningpage/ThaiLearning/ThaiLearning";
function App() {
  return (
    <Router>
      <Routes>
        <Route path= "/" element = {<Welcompage />} />
        <Route path="login" element = {<LoginPage />} />
        <Route path="register" element = {<Register />} />
        <Route path="forgotpassword" element ={<ForgotPassword />} />
        <Route path="homepage" element = {<Homepage />} />
        <Route path="profile" element = {<Profile />} />
        <Route path="account-settings" element = {<AccountSettings />} />
        <Route path="score" element = {<Score />} />
        <Route path="/reset-password" element = {<ResetPassword />} />
        <Route path="minigame" element = {<MiniGameSelection />} />
        <Route path="memorygame" element = {<MemoryGame />} />
        <Route path="numbersortgame" element = {<NumberSortGame />} />
        <Route path="rockpaperscissors" element = {<RockPaperScissors />} />
        <Route path="numbertarget" element = {<NumberTarget />} />
        <Route path="math" element = {<MathPage />} />
        <Route path="science" element = {<SciPage/>} />
        <Route path="thailanguage" element = {<ThlanguagePage />} />
        <Route path="englanguage" element = {<EnglanguagePage />} />
        <Route path="/english/quiz" element = {<EngQuiz />} />
        <Route path="/math/Quiz" element = {<MathQuiz />} />
        <Route path="/science/quiz" element = {<ScienceQuiz />} />
        <Route path="/thai/quiz" element = {<ThaiQuiz />} />
        <Route path="mathlearning" element = {<MathLearning />} />
        <Route path="sciencelearning" element = {<SciLearning />} />
        <Route path="englearning" element = {<EngLearning />} />
        <Route path="thailearning" element = {<ThaiLearning />} />
        
      </Routes> 
    </Router>
  );
}


export default App;
