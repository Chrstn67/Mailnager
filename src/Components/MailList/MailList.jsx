import React, { useState } from "react";
import DOMPurify from "dompurify";
import "./MailList.scss";

const MailList = ({
  mails,
  deleteMail,
  updateMailStatus,
  updateMailDetails,
  addMail,
  selectedCity,
  updateMailLocation,
}) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editedDate, setEditedDate] = useState("");

  const handleEditClick = (index) => {
    const date = mails[index].sendDate;
    setEditIndex(index);
    setEditedDate(date);
  };

  const handleSaveClick = (index) => {
    updateMailDetails(index, {
      ...mails[index],
      sendDate: editedDate,
    });
    setEditIndex(null);
    setEditedDate("");
  };

  const handleCancelClick = () => {
    setEditIndex(null);
    setEditedDate("");
  };

  const handleStatusChange = (index, e) => {
    const newStatus = e.target.value;
    updateMailStatus(index, newStatus);
  };

  const handleLocationChange = (index, e) => {
    const newLocation = e.target.value;
    updateMailLocation(index, newLocation);

    // Mise à jour du localStorage
    const updatedMails = JSON.parse(localStorage.getItem("mails")) || [];
    const updatedMail = { ...updatedMails[index], location: newLocation };
    updatedMails.splice(index, 1, updatedMail);
    localStorage.setItem("mails", JSON.stringify(updatedMails));
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "sendDate") {
      setEditedDate(value);
    } else if (name === "location") {
      handleLocationChange(index, e);
    } else {
      const sanitizedValue = DOMPurify.sanitize(value);
      const updatedMail = { ...mails[index], [name]: sanitizedValue };
      updateMailDetails(index, updatedMail);
    }
  };

  return (
    <div className="list-container">
      <h2>Liste des courriers envoyés:</h2>
      {mails.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Métier recherché</th>
              <th>Lieu de l'entreprise</th>
              <th>Destinataire</th>
              <th>Ressource</th>
              <th>Date d'envoi</th>
              <th>Type de contrat</th>
              <th>Horaires</th>
              <th>Réponse</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mails.map((mail, index) => {
              const isEditing = editIndex === index;
              return (
                <tr
                  key={index}
                  className={`status-${mail.status
                    .toLowerCase()
                    .replace(/\s/g, "-")}`}
                >
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        value={mail.job}
                        onChange={(e) => handleInputChange(e, index)}
                        name="job"
                      />
                    ) : (
                      mail.job
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        value={mail.location}
                        onChange={(e) => handleInputChange(e, index)}
                        name="location"
                      />
                    ) : (
                      mail.location
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        value={mail.recipient}
                        onChange={(e) => handleInputChange(e, index)}
                        name="recipient"
                      />
                    ) : (
                      mail.recipient
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        value={mail.jobAdvert}
                        onChange={(e) => handleInputChange(e, index)}
                        name="jobAdvert"
                      />
                    ) : (
                      mail.jobAdvert
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editedDate}
                        onChange={(e) => handleInputChange(e, index)}
                        name="sendDate"
                      />
                    ) : (
                      mail.sendDate
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <select
                        value={mail.contractType}
                        onChange={(e) => handleInputChange(e, index)}
                        name="contractType"
                        required
                      >
                        <option value="">
                          Sélectionnez le type de contrat
                        </option>
                        <option value="Alternance">Alternance</option>
                        <option value="CDI">CDI</option>
                        <option value="CDD">CDD</option>
                        <option value="Intérim">Intérim</option>
                        <option value="Stage">Stage</option>
                        {/* Ajoutez d'autres options de contrat si nécessaire */}
                      </select>
                    ) : (
                      mail.contractType
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <select
                        value={mail.workingHours}
                        onChange={(e) => handleInputChange(e, index)}
                        name="workingHours"
                        required
                      >
                        <option value="">Sélectionnez les horaires</option>
                        <option value="Mi-temps">Mi-temps</option>
                        <option value="Temps partiel">Temps partiel</option>
                        <option value="Temps plein">Temps plein</option>
                      </select>
                    ) : (
                      mail.workingHours
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <select
                        value={mail.status}
                        onChange={(e) => handleStatusChange(index, e)}
                      >
                        <option value="En attente">En attente</option>
                        <option value="Positive">Positive</option>
                        <option value="Négative">Négative</option>
                      </select>
                    ) : (
                      mail.status
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <>
                        <button onClick={() => handleSaveClick(index)}>
                          Enregistrer
                        </button>
                        <button onClick={handleCancelClick}>Annuler</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEditClick(index)}>
                          Modifier
                        </button>
                        <button onClick={() => deleteMail(index)}>
                          Supprimer
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>Aucun courrier envoyé pour le moment.</p>
      )}
    </div>
  );
};

export default MailList;
