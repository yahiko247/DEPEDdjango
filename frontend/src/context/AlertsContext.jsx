import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import SuccessAlert from "../components/alerts/SuccessAlert";
import ErrorAlert from "../components/alerts/ErrorAlert";
import Notifications from "../components/alerts/Notifications";

const AlertsContext = createContext();

export const AlertsProvider = ({ children }) => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notification, setNotification] = useState([]);

  const addNotification = useCallback((message) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    const newNotif = { id, message, timestamp: new Date() };
    setNotification((prev) => [...prev, newNotif]);

    setTimeout(() => {
      setNotification((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  }, []);

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

  const clearModalArchive = () => setModalNotifications([]);

  return (
    <AlertsContext.Provider
      value={{
        setSuccessMessage,
        setErrorMessage,
        setNotification,
        addNotification,
        clearModalArchive,
      }}
    >
      {children}
      {successMessage && (
        <div className="toast toast-top toast-end z-1000 mt-16">
          <SuccessAlert message={successMessage} />
        </div>
      )}

      {errorMessage && (
        <div className="toast toast-top toast-end z-1000 mt-16">
          <ErrorAlert message={errorMessage} />
        </div>
      )}

      {notification.length > 0 && (
        <div className="toast toast-top toast-end z-1000 mt-16 flex flex-col gap-2">
          {notification.map((notif) => (
            <Notifications
              key={notif.id}
              message={notif.message} // FIXED: Passing individual string message
            />
          ))}
        </div>
      )}
    </AlertsContext.Provider>
  );
};

export const useAlerts = () => useContext(AlertsContext);
