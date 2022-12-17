import "./App.css";
import Navigation from "./components/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import { AppContext, socket } from "./context/appContext";
import { useState } from "react";

function App() {
  const user = useSelector((state) => state.user);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});
  return (
    <AppContext.Provider
      value={
        {socket,
        currentRoom,
        setCurrentRoom,
        members,
        setMembers,
        messages,
        setNewMessages,
        setMessages,
        setPrivateMemberMsg,
        rooms,
        setRooms}
      }
    >
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          {!user && (
            <>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
            </>
          )}
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
