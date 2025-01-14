import styled from "styled-components";
import logo from "../../assets/icons/kelic-logo.svg";
import dashboard from "../../assets/icons/dashboard.svg";
import arrow from "../../assets/icons/arrow.svg";
import more from "../../assets/icons/more.svg";
import freePlan from "../../assets/icons/free-plan.svg";
import notification from "../../assets/icons/notification.svg";
import notificationIndicator from "../../assets/icons/notification-indicator.svg";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { menuItemsData } from "../../constants";
import ProfileNav from "../profile-nav";

const StyledSideBar = styled.aside`
  width: 250px;
  background-color: var(--white);
  height: 100vh;
  padding: 16px;
  border-right: 1px solid var(--border-light);
  .menu {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    &-first {
      flex-direction: column;
      display: flex;
      gap: 20px;
      &-logo {
        height: 50px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 20px;
        flex-direction: row;
        gap: 10px;

        font-weight: 700;
        color: var(--gray-700);
      }
      ul {
        list-style: none;
      }
    }
    &-bottom {
      display: flex;
      flex-direction: column;
      gap: 10px;
      &-plan {
        border-top: 1px solid var(--gray-100);

        display: flex;
        flex-direction: column;
        gap: var(--spacing-5);
        .menu-bottom-plan-employees {
          padding: var(--spacing-6) var(--spacing-8);
          font-size: 12px;
          color: var(--tex-primary);
          font-weight: 500;
        }
      }
      &-notification {
        border-top: 1px solid var(--gray-100);

        display: flex;
        flex-direction: column;
        gap: var(--spacing-5);
        div {
          display: flex;
        }
        &-content {
          display: flex;
          justify-content: space-between;

          width: 100%;
          div {
            gap: var(--spacing-6);
          }
        }
        &-indicator {
          width: 10px;
        }
      }
    }
  }

  a {
    text-decoration: none;
    color: var(--text-dark);
  }
`;

const StyledMenuItem = styled.div<{
  isActive: boolean;
  disabled: boolean;
}>`
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: ${(props) => (props.isActive ? 600 : 500)};
  gap: var(--spacing-6);
  border-radius: var(--radi-6);
  padding: var(--spacing-6) var(--spacing-8);
  border: ${(props) =>
    props.isActive ? "1px solid var(--menu-item-boarder)" : "none"};
  background-color: ${(props) =>
    props.isActive ? "var(--menu-item-active-bg)" : "transparent"};
  color: ${(props) =>
    props.isActive ? "var(--text-primary)" : "var(--text-secondary)"};
  img {
    width: 24px;
  }
`;

const StyledColapsable = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;

  .collapsable {
    &-header {
      display: flex;
      justify-content: space-between;
      color: var(--gray-300);
      cursor: pointer;
      font-weight: 700;
      padding: 10px 20px;
      font-size: 16px;
    }
    &-content {
      max-height: ${({ isOpen }) => (isOpen ? "200px" : "0px")};
      overflow: hidden;
      transition: max-height 0.3s ease;
    }
  }
`;

const SideBar = () => {
  const [menuItems, setMenuItems] = useState(menuItemsData);
  return (
    <StyledSideBar>
      <div className="menu">
        <div className="menu-first">
          <div className="menu-first-logo">
            <img src={logo} alt="logo-image" />
            Kelick
          </div>
          <ul>
            <StyledMenuItem isActive={false} disabled={true}>
              <img src={dashboard} alt="dashboard-icon" />
              Dashboard
            </StyledMenuItem>

            {menuItems.map((item) => {
              return (
                <StyledColapsable key={item.id} isOpen={item.isOpen}>
                  <div
                    className="collapsable-header"
                    onClick={() => {
                      setMenuItems((prev) => {
                        return prev.map((menuItem) => {
                          if (menuItem.id === item.id) {
                            return { ...menuItem, isOpen: !menuItem.isOpen };
                          }
                          return menuItem;
                        });
                      });
                    }}
                  >
                    {item.name}
                    {item.hasDropDown && <img src={arrow} alt="arrow-icon" />}
                  </div>
                  <div className="collapsable-content">
                    {item.children.map((child) => {
                      return child.disabled ? (
                        <StyledMenuItem
                          key={child.id}
                          isActive={window.location.pathname === child.path}
                          disabled={child.disabled}
                        >
                          <img src={child.icon} alt="icon" />
                          {child.name}
                        </StyledMenuItem>
                      ) : (
                        <NavLink to={child.path} key={child.id}>
                          <StyledMenuItem
                            isActive={window.location.pathname === child.path}
                            disabled={child.disabled}
                          >
                            <img src={child.icon} alt="icon" />
                            {child.name}
                          </StyledMenuItem>
                        </NavLink>
                      );
                    })}
                  </div>
                </StyledColapsable>
              );
            })}
            <StyledMenuItem isActive={false} disabled={true}>
              <img src={more} alt="More" />
              More
            </StyledMenuItem>
          </ul>
        </div>
        <div className="menu-bottom">
          <div className="menu-bottom-plan">
            <StyledMenuItem isActive={false} disabled={false}>
              <img src={freePlan} alt="Free Plan" />
              Free Plan
            </StyledMenuItem>
            <div className="menu-bottom-plan-employees">1/10 Employees</div>
          </div>
          <div className="menu-bottom-notification">
            <StyledMenuItem isActive={false} disabled={false}>
              <div className="menu-bottom-notification-content">
                <div>
                  <img src={notification} alt="Settings" />
                  Notifications
                </div>
                <img
                  src={notificationIndicator}
                  alt="Notification Indicator"
                  className="menu-bottom-notification-indicator"
                />
              </div>
            </StyledMenuItem>
            <ProfileNav />
          </div>
        </div>
      </div>
    </StyledSideBar>
  );
};

export default SideBar;
