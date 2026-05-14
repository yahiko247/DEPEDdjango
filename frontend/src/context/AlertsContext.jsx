import React, { createContext, useContext, useEffect, useState } from "react";
import SuccessAlert from "../components/alerts/SuccessAlert";
import ErrorAlert from "../components/alerts/ErrorAlert";

const AlertsContext = createContext();

export const AlertsProvider = ({ children }) => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <AlertsContext.Provider value={{ setSuccessMessage, setErrorMessage }}>
      {children}
      {successMessage && (
        <div className="toast toast-top toast-end z-1000">
          <SuccessAlert message={successMessage} />
        </div>
      )}

      {errorMessage && (
        <div className="toast toast-top toast-end z-1000">
          <ErrorAlert message={errorMessage} />
        </div>
      )}
    </AlertsContext.Provider>
  );
};

export const useAlerts = () => useContext(AlertsContext);
