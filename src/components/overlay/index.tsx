import styled from "styled-components";

const StyledOverlay = styled.section<{
  isCentered?: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(26, 26, 26, 0.48);
  z-index: 111;
  display: flex;
  justify-content: ${(props) => (props.isCentered ? "center" : "flex-start")};
  align-items: ${(props) => (props.isCentered ? "center" : "flex-start")};
`;

const Overlay = ({
  children,
  onClicked,
  isCentered,
}: {
  children: React.ReactNode;
  onClicked: () => void;
  isCentered?: boolean;
}) => {
  return (
    <StyledOverlay onClick={() => onClicked()} isCentered={isCentered}>
      {children}
    </StyledOverlay>
  );
};

export default Overlay;
