import styled from "styled-components";

const StyledSecondaryButton = styled.button<{
  disabled?: boolean;
  minWidth?: string;
}>`
  border-radius: 12px;
  border: 1px solid var(--border-base);
  background-color: var(--button-secondary-bg);
  padding: var(--spacing-5) var(--spacing-8);
  display: flex;
  flex-direction: row;
  gap: var(--spacing-5);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: var(--gray-700);
  wrap: no-wrap;
  min-width: ${(props) => props.minWidth};
  max-height: 40px;
`;

const StyledPrimaryButton = styled.button<{ disabled?: boolean }>`
  border-radius: 12px;
  border: 1px solid var(--border-base);
  background-color: var(--button-primary-bg);
  padding: var(--spacing-5) var(--spacing-8);
  display: flex;
  flex-direction: row;
  gap: var(--spacing-5);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-light);
`;

const StyledTextButton = styled.button<{
  disabled: boolean;
}>`
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 14px;
  font-weight: 700;

  justify-content: center;
  align-content: center;
  text-decoration: underline;
`;
const PrimaryButton = ({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}) => (
  <StyledPrimaryButton disabled={disabled} onClick={onClick}>
    {children}
  </StyledPrimaryButton>
);

const SecondaryButton = ({
  children,
  disabled,
  onClick,
  minwidth,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  minwidth?: string;
}) => {
  return (
    <StyledSecondaryButton
      disabled={disabled}
      onClick={onClick}
      minWidth={minwidth}
    >
      {children}
    </StyledSecondaryButton>
  );
};

const TextButton = ({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}) => (
  <StyledTextButton disabled={disabled ?? false} onClick={onClick}>
    {children}
  </StyledTextButton>
);
export { PrimaryButton, SecondaryButton, TextButton };
