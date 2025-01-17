import styled from "styled-components";

const StyledStatusIndicator = styled.div<{ status: string }>`
  padding: 0 var(--spacing-7);
  border-radius: var(--radi-6);
  height: 40px;
  max-height: 40px;
  color: ${(props) =>
    props.status === "Active"
      ? "var(--button-primary-bg)"
      : props.status === "Payroll Only"
      ? "var(--gray-400)"
      : "var(--purple-600)"};

  background-color: ${(props) =>
    props.status === "Active"
      ? "var(--primary-50)"
      : props.status === "Payroll Only"
      ? "var(--gray-100)"
      : "var(--purple-100)"};

  display: flex;
  gap: var(--spacing-4);
  justify-content: flex-start;
  align-items: center;

  div {
    min-width: 10px;
    background-color: ${(props) =>
      props.status === "Active"
        ? "var(--button-primary-bg)"
        : props.status === "Payroll Only"
        ? "var(--gray-400)"
        : "var(--purple-600)"};
    height: 10px;
    width: 10px;
    border-radius: 100%;
  }
`;
const StatusIndicator = ({ status }: { status: string }) => {
  return (
    <StyledStatusIndicator status={status}>
      <div></div>
      {status}
    </StyledStatusIndicator>
  );
};

export default StatusIndicator;
