import styled from "styled-components";
import getHeaderTitle from "../../utils/get-header-title";
import add from "../../assets/images/add-user.svg";
import { useState, useEffect, useContext } from "react";
import { PrimaryButton } from "../buttons";
import { CoreContext } from "../../context/core-context";

const StyledHeader = styled.header`
  padding: 20px;
  background-color: var(--white);
  width: 100%;
  font-weight: 700;
  font-size: 30px;
  border-bottom: 1px solid var(--border-mideum);
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Header = () => {
  const { employees } = useContext(CoreContext);
  const [title, setTitle] = useState("Dashboard");
  useEffect(() => {
    setTitle(getHeaderTitle(location.pathname));
  }, [location]);
  return (
    <StyledHeader>
      {title}
      {title === "Employees" && employees.length > 0 && (
        <PrimaryButton>
          <img src={add} /> Add Employee
        </PrimaryButton>
      )}
    </StyledHeader>
  );
};

export default Header;
