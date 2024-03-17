import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Header from "../Components/Header/Header";
import HomePage from "../Components/HomePage/HomePage";
import NotesList from "../Components/NotesList/NotesList";
import MentionsLegales from "../Components/Footer/MentionsLegales/MentionsLegales";
import Footer from "../Components/Footer/Footer";
import "./App.scss";

const App = () => {
  return (
    <HashRouter>
      <div>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notes" element={<NotesList />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          {/*<Route path="/nous-contacter" element={<NousContacter />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
