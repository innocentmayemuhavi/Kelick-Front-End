import styled from "styled-components";
import checkers from "../../assets/images/checkers.png";

const StyledAvatar = styled.div<{
  size?: string;
}>`
  height: ${(props) => props.size ?? "32px"};
  width: ${(props) => props.size ?? "32px"};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--gray-300);
  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const Avatar = ({ size, src }: { size?: string; src?: string }) => {
  return (
    <StyledAvatar size={size}>
      <img src={src ?? checkers} />
    </StyledAvatar>
  );
};

export default Avatar;
