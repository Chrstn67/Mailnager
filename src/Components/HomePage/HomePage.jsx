import React, { useState, useEffect } from "react";

import MailForm from "./MailForm/MailForm";
import MailList from "./MailList/MailList";

const HomePage = () => {
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
    <>
      <MailForm addMail={addMail} />
      <MailList
        mails={mails}
        deleteMail={deleteMail}
        updateMailStatus={updateMailStatus}
        updateMailDetails={updateMailDetails}
        updateMailLocation={updateMailLocation}
      />
    </>
  );
};

export default HomePage;
