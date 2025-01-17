import styled from "styled-components";
import { CSSProperties } from "react";
import BarLoader from "react-spinners/BarLoader";
const StyledLineLoader = styled.div`
  padding: 0;
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(26, 26, 26, 0.48);
  height: 100vh; /* Only the height of the loader */

  .loader {
    width: 100vw;

    &-line {
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 4px;
      background: linear-gradient(45deg, transparent 0%, var(--green-600) 50%);
      animation: slide 2s ease-in infinite;
    }

    @keyframes slide {
      0% {
        left: -100%;
      }
      100% {
        left: 100%;
      }
    }
  }
`;
const override: CSSProperties = {
  width: "100%",
};
export const LineLoader = () => {
  return (
    <StyledLineLoader>
      <div className="loader">
        <BarLoader
          loading={true}
          cssOverride={override}
          height={4}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </StyledLineLoader>
  );
};
