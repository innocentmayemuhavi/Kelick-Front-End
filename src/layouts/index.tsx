import styled from "styled-components";
import SideBar from "../components/sidebar";
import Header from "../components/header";
import { useContext } from "react";
import { CoreContext } from "../context/core-context";
import { LineLoader } from "../components/lineloader";
import { useWindowSize } from "../utils";

const StyledLayout = styled.section`
  background-color: var(--main-bg);

  .layout {
    display: flex;
    position: relative;
  }
  .layout-content {
    padding: 0px;
    flex: 1;
    height: 100vh;
    overflow-y: auto;
    position: relative;
  }

  /* Media queries */
  @media (min-width: 768px) {
    .show-mobile {
      display: none;
    }
    .show-desktop {
      display: flex;
    }
  }

  @media (max-width: 767px) {
    .show-mobile {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 20px;
      padding: 30px;
      text-align: center;
      height: 100vh;
    }
    .layout-content {
      background-color: var(--white);
    }

    .show-desktop {
      display: none;
    }
  }
`;

const Layout = ({
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { loading } = useContext(CoreContext);
  return (
    <>
      <StyledLayout>
        {useWindowSize().width <= 760 ? (
          <div className="w-full h-[100vh] flex items-center  justify-center  font-[900]">
            Sorry,App not optimised for Mobile phones!
          </div>
        ) : (
          <section className={`layout   `}>
            {loading && <LineLoader />}
            <SideBar />
            <section className="layout-content">
              <Header />
              {children}
            </section>
          </section>
        )}
      </StyledLayout>
    </>
  );
};

export default Layout;
