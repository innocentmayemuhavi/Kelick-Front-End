import styled from "styled-components";
import cancel from "../../assets/icons/cancel.svg";
import emptyFolder from "../../assets/images/empty-folder.svg";
import mslogo from "../../assets/images/ms-excel-logo.svg";
import download from "../../assets/icons/download.svg";
import success from "../../assets/icons/success.svg";
import { useDropzone } from "react-dropzone";
import { PrimaryButton, SecondaryButton, TextButton } from "../buttons";
import { generateFileFromData, getEmployees } from "../../services";
import toast from "react-hot-toast";
// import { read, WorkBook } from "xlsx";
import { useContext, useState } from "react";
import { CoreContext } from "../../context/core-context";
import { IEmployees } from "../../models";
import { FileUploading } from "../upload_loading";
import AddSuccessModal from "../upload-success";
import Confetti from "react-confetti";
import { WorkBook, read, utils } from "xlsx";

// import { useWindowSize } from "react-use";

const StyledUploadFile = styled.div<{
  isUploading: boolean;
  isSuccess: boolean;
}>`
  width: 400px;
  background-color: var(--white);
  padding: var(
    ${(props) => (props.isSuccess ? "--spacing-12" : "--spacing-10")}
  );
  border-radius: var(${(props) => (props.isSuccess ? "--radi-8" : "--radi-7")});
  width: 100%;
  max-width: 600px;
  min-height: 560px;
  overflow-y: auto;
  transition: 0.7s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  over-flow: auto;
  min-height: ${(props) =>
    props.isUploading ? "230px" : props.isSuccess ? "340px" : "560px"};
  border: ${(props) =>
    props.isUploading ? "1px dashed var(--button-primary-bg)" : "none"};

  .modal {
    display: flex;
    flex-direction: column;
    justify-content: center;

    gap: var(--spacing-10);
    &-header {
      background-color: var(--white);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 20px;
      font-weight: 700;
      img {
        cursor: pointer;
      }
    }
    &-uploader {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: var(--radi-7);
      height: 230px;
      gap: var(--spacing-8);
      border: 1px dashed var(--button-primary-bg);
      &-text {
        font-weight: 500;
        font-size: 14px;
        color: var(--gray-300);
        text-align: center;
      }
    }
    &-file-types {
      font-size: 14px;
      font-weight: 600;
      color: var(--gray-400);
      text-align: center;
      display: flex;
      justify-content: space-between;
    }
    &-file-info {
      display: flex;
      justify-content: space-between;
      background: var(--gray-100);
      border-radius: var(--radi-6);
      padding: var(--spacing-8);
      align-items: center;
      gap: var(--spacing-5);
      &-logo {
        display: flex;
        flex-direction: row;
        gap: var(--spacing-8);
        &-text {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-3);
          div {
            font-weight: 700;
            font-size: 14px;
          }
          p {
            font-weight: 500;
            font-size: 12px;
            color: var(--gray-400);
          }
        }
      }
    }
    &-buttons {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      gap: var(--spacing-7);
    }
  }
`;

const UploadFiles = ({ toogleShow }: { toogleShow: () => void }) => {
  const { employees, setEmployees, setLoading } = useContext(CoreContext);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  // const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<number>(0);

  const onDrop = async (acceptedFiles: File[]) => {
    const maxSize = 25 * 1024 * 1024;
    const validFiles = acceptedFiles.filter((file) => file.size <= maxSize);

    if (validFiles.length !== acceptedFiles.length) {
      toast.error("Some files were too large and were not accepted.");
    }

    setIsUploading(true);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 70) {
          setLoading(true);
        }
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          validFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onprogress = (event) => {
              if (event.lengthComputable) {
              }
            };
            reader.onload = (event) => {
              const data = new Uint8Array(event.target!.result as ArrayBuffer);
              const workbook: WorkBook = read(data, { type: "array" });
              const sheetName = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[sheetName];
              const jsonData = utils.sheet_to_json<IEmployees>(worksheet);

              if (jsonData.length > 1) {
                getEmployees("accessToken")
                  .then((res) => {
                    const newData = employees.concat(
                      jsonData,
                      res as IEmployees[]
                    );
                    setEmployees(newData);
                    toast.success("Employees successfully added", {
                      position: "bottom-center",
                      icon: <img src={success} alt="success icon" />,
                    });
                    setLoading(false);
                    setShowSuccess(true);
                  })
                  .catch((_) => setLoading(false));
              } else {
                toast.error(
                  "The document is empty or has no valid data. add atleast 2 entries",
                  {
                    position: "bottom-center",
                  }
                );
                setLoading(false);
              }
              setProgress(0);
            };
            reader.readAsArrayBuffer(file);
          });

          return 100;
        }
        return prev + 2.5;
      });
    }, 100);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "text/csv": [".csv"],
    },
  });
  const handleExportTemplate = async () => {
    try {
      setLoading(true);
      const templateData = [
        {
          Employee_Id: "",
          Employee_Profile: "",
          Email: "",
          Role: "",
          Status: "",
        },
      ];
      generateFileFromData(
        templateData,
        `employees template-${new Date().toISOString()}.xlsx`
      );
      setLoading(false);

      toast.success("Template generated successfully", {
        position: "bottom-center",
        icon: <img src={success} alt="download icon" />,
      });
    } catch (error) {
      toast.error("An error occurred while generating the template");
    }
  };

  return (
    <StyledUploadFile isUploading={isUploading} isSuccess={true}>
      <div className="modal">
        {showSuccess && <Confetti width={600} height={560} />}
        {showSuccess ? (
          <AddSuccessModal
            isOpen={showSuccess}
            onClose={async () => {
              setShowSuccess(false);
              toogleShow();
            }}
          ></AddSuccessModal>
        ) : isUploading ? (
          <FileUploading progress={progress} />
        ) : (
          <>
            <div className="modal-header">
              Upload File
              <img src={cancel} alt="cancel" onClick={toogleShow} />
            </div>
            <div>
              <div className="modal-uploader" {...getRootProps()}>
                <img src={emptyFolder} alt="empty-folder" />
                <div className="modal-uploader-text">
                  <input {...getInputProps()} accept=".xls,.xlsx,.csv" />
                  {isDragActive ? (
                    <div>Drop the files here</div>
                  ) : (
                    <div>
                      Drag and drop your files here{" "}
                      <p>
                        or <TextButton>click to upload</TextButton>
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-file-types">
                Supported formats:XLS, CSV <div>Maximum file size: 25MB</div>
              </div>
            </div>
            <div className="modal-file-info">
              <div className="modal-file-info-logo">
                <img src={mslogo} alt="mslogo" />
                <div className="modal-file-info-logo-text">
                  <div>Table Example</div>
                  <p>
                    You can download the attached example and use them as a
                    starting point for your own file.
                  </p>
                </div>
              </div>
              <SecondaryButton
                minwidth={"190px"}
                onClick={handleExportTemplate}
              >
                <img src={download} alt="Image" />
                Download XLSX
              </SecondaryButton>
            </div>
            <div className="modal-buttons">
              <SecondaryButton onClick={toogleShow}>Cancel</SecondaryButton>
              <PrimaryButton>Continue</PrimaryButton>
            </div>
          </>
        )}
      </div>
    </StyledUploadFile>
  );
};

export default UploadFiles;
