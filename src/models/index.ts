interface CoreContextType {
  loading: boolean;
  showNotification: (message: string) => void;
  notification: string;
  showSideBar: boolean;
  setLoading: (loading: boolean) => void;
  setNotification: (message: string) => void;
  setShowSideBar: (showSideBar: boolean) => void;
  employees: IEmployees[];
  setEmployees: (data: IEmployees[]) => void;
}
interface IEmployees {
  Employee_Id: string;
  Employee_Profile: string;
  Email: string;
  Role: string;
  Status: string;
}

export type { CoreContextType, IEmployees };
