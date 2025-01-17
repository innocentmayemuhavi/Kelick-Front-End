import { createContext, useEffect, useState } from "react";
import { CoreContextType, IEmployees } from "../models";

const CoreContext = createContext({
  loading: true,
  notification: "",
  showSideBar: false,
  employees: [],
  setEmployees: () => {},
  setLoading: () => {},
  showNotification: () => {},
  setNotification: () => {},
  setShowSideBar: () => {},
} as CoreContextType);

const CoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [notification, setNotification] = useState<string>("");
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const [employees, setEmployees] = useState<IEmployees[]>([]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <CoreContext.Provider
      value={{
        loading,
        notification,
        showSideBar,
        setLoading,
        showNotification: setNotification,
        setNotification,
        setShowSideBar,
        employees,
        setEmployees,
      }}
    >
      {children}
    </CoreContext.Provider>
  );
};

export { CoreContext, CoreProvider };
