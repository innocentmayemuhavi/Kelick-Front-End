import styled from "styled-components";

const StyledHeader = styled.header`
  padding: 20px;
  background-color: var(--white);
  width: 100%;
  font-weight: 700;
  font-size: 30px;
  border-bottom: 1px solid var(--border-mideum);
`;

const Header = () => {
  return <StyledHeader>Employees</StyledHeader>;
};

export default Header;
