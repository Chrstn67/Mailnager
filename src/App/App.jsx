import React, { useState, useEffect } from "react";
import Header from "../Components/Header/Header";
import NotesList from "../Components/NotesList/NotesList";
import MailForm from "../Components/MailForm/MailForm";
import MailList from "../Components/MailList/MailList";
import Footer from "../Components/Footer/Footer";
import "./App.scss";

const App = () => {
  const [mails, setMails] = useState([]);

  useEffect(() => {
    const storedMails = JSON.parse(localStorage.getItem("mails"));
    if (storedMails) {
      setMails(storedMails);
    }
  }, []);

  useEffect(() => {
    window.onbeforeunload = () => {
      localStorage.setItem("mails", JSON.stringify(mails));
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, [mails]);

  const addMail = (mail) => {
    const updatedMails = [...mails, mail];
    setMails(updatedMails);
  };

  const deleteMail = (index) => {
    const updatedMails = [...mails];
    updatedMails.splice(index, 1);
    setMails(updatedMails);
  };

  const updateMailStatus = (index, status) => {
    const updatedMails = [...mails];
    updatedMails[index].status = status;
    setMails(updatedMails);
  };

  const updateMailDetails = (index, updatedMail) => {
    const updatedMails = [...mails];
    updatedMails[index] = updatedMail;
    setMails(updatedMails);
  };

  const updateMailLocation = (index, location) => {
    const updatedMails = [...mails];
    updatedMails[index].location = location;
    setMails(updatedMails);
  };

  return (
    <div>
      <Header />
      <NotesList />
      <MailForm addMail={addMail} setMails={setMails} />
      <MailList
        mails={mails}
        deleteMail={deleteMail}
        updateMailStatus={updateMailStatus}
        updateMailDetails={updateMailDetails}
        updateMailLocation={updateMailLocation}
      />
      <Footer />
    </div>
  );
};

export default App;
