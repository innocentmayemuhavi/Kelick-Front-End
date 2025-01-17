const getHeaderTitle = (pathname: string) => {
  switch (pathname) {
    case "/":
      return "Dashboard";
    case "/employees":
      return "Employees";

    default:
      return "Overview";
  }
};

export default getHeaderTitle;
