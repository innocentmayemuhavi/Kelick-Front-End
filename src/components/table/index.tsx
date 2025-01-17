import React from "react";
import sortIcon from "../../assets/icons/d-arrow.svg";
import styled from "styled-components";
import Avatar from "../avatar";

const StyledTable = styled.div`
  border-radius: var(--radi-6);
  max-width: 1124px;
  overflow-x: auto;
  border: 1px solid var(--border-base);
  table {
    input[type="checkbox"] {
      cursor: pointer;
      color: var(--gray-400);
      border: 1px solid var(--gray-400);
    }
    thead {
      background-color: var(--button-secondary-bg);
      border-bottom: 1px solid var(--border-base);
    }
    tr {
      border-bottom: 1px solid var(--border-base);
      &:last-child {
        border-bottom: none;
      }
      &:nth-child(even) {
        background-color: var(--white);
      }
    }
  }
`;
const Table = ({ children }: { children: React.ReactNode }) => {
  return <StyledTable>{children}</StyledTable>;
};

export default Table;
