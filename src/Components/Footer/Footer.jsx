import React, { useState } from "react";
import "./Footer.scss";
import MentionsLegales from "../MentionsLegales/MentionsLegales";

const Footer = () => {
  const [showMentionsLegales, setShowMentionsLegales] = useState(false);

  const toggleMentionsLegales = () => {
    setShowMentionsLegales(!showMentionsLegales);
  };

  return (
    <div className="footer">
      <button onClick={toggleMentionsLegales}>
        {showMentionsLegales
          ? "Cacher les Mentions Légales"
          : "Lire les Mentions Légales"}
      </button>
      {showMentionsLegales && <MentionsLegales />}
    </div>
  );
};

export default Footer;
