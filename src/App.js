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
import WordMatchingGame from "./Minigame/WordMatchingGame/WordMatchingGame";
import WordCompletionGame from "./Minigame/WordCompletionGame/WordCompletionGame";
import RockPaperScissors from "./Minigame/RockPaperScissors/RockPaperScissors";
import MathPage from "./LessonPage/Mathpage";
import SciPage from "./LessonPage/Science";
import EnglanguagePage from "./LessonPage/EngLanguage";
import ThlanguagePage from "./LessonPage/ThaiLanguage";
import EngQuiz from "./LessonPage/Quiz/EngLanguageQuiz";
import MathQuiz from "./LessonPage/Quiz/MathQuiz";
import ScienceQuiz from "./LessonPage/Quiz/ScienceQuiz";
import ThaiQuiz from "./LessonPage/Quiz/ThaiLanguageQuiz";
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
        <Route path="wordmatchinggame" element ={<WordMatchingGame />} />
        <Route path="wordcompletiongame" element ={<WordCompletionGame />} />
        <Route path="rockpaperscissors" element = {<RockPaperScissors />} />
        <Route path="math" element = {<MathPage />} />
        <Route path="science" element = {<SciPage/>} />
        <Route path="thailanguage" element = {<ThlanguagePage />} />
        <Route path="englanguage" element = {<EnglanguagePage />} />
        <Route path="/english/quiz" element = {<EngQuiz />} />
        <Route path="/math/Quiz" element = {<MathQuiz />} />
        <Route path="/science/quiz" element = {<ScienceQuiz />} />
        <Route path="/thai/quiz" element = {<ThaiQuiz />} />
      </Routes> 
    </Router>
  );
}


export default App;
