import styled from "styled-components";
import Confetti from "react-confetti";
import checkCircle from "../../assets/icons/check-circle.svg";
import { useWindowSize } from "../../utils";
import { PrimaryButton, SecondaryButton } from "../buttons";
type AddSuccessModalProps = {
  isOpen: boolean;
  onClose: () => {};
};

const StyledSuccessModal = styled.div`
  .modal {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-10);
    img {
      width: 80px;
    }
    &-content {
      div {
        color: var(--gray-700);
        font-size: 20px;
        font-weight: 700;
      }
      p {
        color: var(--gray-700);
        font-size: 18px;
        font-weight: 500;
      }
    }
    &-buttons {
    }
  }
`;

const AddSuccessModal = ({ isOpen, onClose }: AddSuccessModalProps) => {
  return (
    <StyledSuccessModal onClick={onClose}>
      <Confetti width={useWindowSize().width} height={useWindowSize().height} />
      <div className="modal">
        <img src={checkCircle} alt="Image" />
        <div className="modal-content">
          <div>Congrats! You've successfully added all your employees</div>
          <p>Would you like to generate payroll?</p>
        </div>
        <div className=" gap-[var(--spacing-12)] flex flex-row justify-center items-center w-full">
          <SecondaryButton onClick={onClose}>I'll do it later</SecondaryButton>
          <PrimaryButton>Generate payroll </PrimaryButton>
        </div>
      </div>
    </StyledSuccessModal>
  );
};

export default AddSuccessModal;
