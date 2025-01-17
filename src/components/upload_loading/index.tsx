import styled from "styled-components";

const StyledUploading = styled.div<{ progress: number }>`
  .uploading {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &-text {
      font-weight: 500;
      font-size: 12px;
      color: var(--gray-400);
    }
    &-progress {
      width: ${(props) => props.progress}%;
      transition: 0.3s;
    }
  }
`;
const FileUploading = ({ progress }: { progress: number }) => {
  return (
    <StyledUploading progress={progress}>
      <div className="uploading">
        <div className="max-w-[183px] w-full bg-gray-100 rounded-full h-[16px] ">
          <div
            className={`bg-[var(--button-primary-bg)] h-[16px] rounded-full uploading-progress`}
          ></div>
        </div>
        <div className="uploading-text">
          Please wait while we upload your file...
        </div>
      </div>
    </StyledUploading>
  );
};

export { FileUploading };
