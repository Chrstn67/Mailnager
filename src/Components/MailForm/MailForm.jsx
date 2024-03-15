import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import "./MailForm.scss";

const MailForm = ({ addMail }) => {
  const [nextId] = useState(1);
  const [job, setJob] = useState("");
  const [location, setLocation] = useState("");
  const [recipient, setRecipient] = useState("");
  const [jobAdvert, setJobAdvert] = useState("");
  const [sendDate, setSendDate] = useState("");
  const [contractType, setContractType] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const fetchCitySuggestions = async (inputValue) => {
      try {
        const response = await fetch(
          `https://geo.api.gouv.fr/communes?nom=${inputValue}&fields=nom,departement&limit=10`
        );
        const data = await response.json();
        const options = data.map((feature) => ({
          label: `${feature.nom}, ${feature.departement.code} - ${feature.departement.nom}`,
          department: feature.departement,
          value: feature.nom,
        }));

        setCityOptions(options);
      } catch (error) {
        console.error("Error fetching city suggestions:", error);
      }
    };

    if (location.length > 0) {
      fetchCitySuggestions(location);
    } else {
      setCityOptions([]);
    }
  }, [location]);

  const handleCityInputChange = (inputValue) => {
    setLocation(inputValue);
    setSelectedCity(null);
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    setLocation(selectedOption ? selectedOption.label : "");

    setCityOptions([]); // Masque la liste déroulante si la sélection correspond à "Paris"
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = formatDate(sendDate);
    const mailDetails = {
      id: nextId,
      job: DOMPurify.sanitize(job),
      location: selectedCity ? DOMPurify.sanitize(selectedCity.label) : "",
      recipient: DOMPurify.sanitize(recipient),
      jobAdvert: DOMPurify.sanitize(jobAdvert),
      sendDate: formattedDate,
      contractType: DOMPurify.sanitize(contractType),
      workingHours: DOMPurify.sanitize(workingHours),
      status: "En attente",
    };

    addMail(mailDetails);
    handleClearInputs();

    const updatedMails = JSON.parse(localStorage.getItem("mails")) || [];
    updatedMails.push(mailDetails);
    localStorage.setItem("mails", JSON.stringify(updatedMails));
  };

  const handleClearInputs = () => {
    setJob("");
    setLocation("");
    setRecipient("");
    setJobAdvert("");
    setSendDate("");
    setContractType("");
    setWorkingHours("");
    setSelectedCity(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={job}
        onChange={(e) => setJob(e.target.value)}
        placeholder="Métier recherché"
        required
      />
      <div className="city-autocomplete">
        <input
          type="text"
          value={location}
          onChange={(e) => handleCityInputChange(e.target.value)}
          placeholder="Lieu de l'entreprise"
          required
        />
        {cityOptions.length > 0 && !selectedCity && (
          <ul className="city-options">
            {cityOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleCityChange(option)}
                className={`city-option ${
                  selectedCity && selectedCity.value === option.value
                    ? "selected"
                    : ""
                }`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Nom de l'entreprise"
        required
      />
      <input
        type="text"
        value={jobAdvert}
        onChange={(e) => setJobAdvert(e.target.value)}
        placeholder="Lien de l'offre"
      />
      <input
        type="date"
        value={sendDate}
        onChange={(e) => setSendDate(e.target.value)}
        placeholder="Date d'envoi"
        required
      />
      <select
        value={contractType}
        onChange={(e) => setContractType(e.target.value)}
        required
      >
        <option value="">Sélectionnez le type de contrat</option>
        <option value="Alternance">Alternance</option>
        <option value="CDI">CDI</option>
        <option value="CDD">CDD</option>
        <option value="Intérim">Intérim</option>
        <option value="Stage">Stage</option>
        {/* Ajoutez d'autres options de contrat si nécessaire */}
      </select>
      <select
        value={workingHours}
        onChange={(e) => setWorkingHours(e.target.value)}
        required
      >
        <option value="">Sélectionnez les horaires</option>
        <option value="Mi-temps">Mi-temps</option>
        <option value="Temps partiel">Temps partiel</option>
        <option value="Temps plein">Temps plein</option>
        {/* Ajoutez d'autres options d'horaires si nécessaire */}
      </select>
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default MailForm;
