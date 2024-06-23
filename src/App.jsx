import "./App.css";
import Login from "./Login";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import { useStateValue } from "./StateProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
// Accueil de l'application
function App() {
  const { user } = useStateValue();

  return (
    <div className="app">
      {user === null ? (
        <Login />
      ) : user === undefined ? (
        <img src="/loading_kakao.gif" alt="loading" />
      ) : (
        <div className="app__body">
          <Router>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <>
                    <Sidebar />
                  </>
                }
              />
              <Route
                exact
                path="/rooms/:roomId"
                element={
                  <>
                    <Sidebar />
                  </>
                }
              />
            </Routes>
          </Router>
          <Chat>{/* Composant chat */}</Chat>
        </div>
      )}
    </div>
  );
}

export default App;
