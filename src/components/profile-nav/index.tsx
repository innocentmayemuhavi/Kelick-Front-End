import styled from "styled-components";
import Avatar from "../avatar";

const StyledProfileNav = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--spacing-6);
  padding: var(--spacing-6) var(--spacing-8);
  .profile-nav-info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    font-size: 12px;
    &-name {
      color: var(--text-primary);
    }
    &-email {
      color: var(--gray-400);
    }
  }
`;

const ProfileNav = () => {
  return (
    <StyledProfileNav>
      <Avatar size="32px" />
      <div className="profile-nav-info">
        <div className="profile-nav-info-name">John Doe</div>
        <div className="profile-nav-info-email">johndoe@asure.com</div>
      </div>
    </StyledProfileNav>
  );
};

export default ProfileNav;
