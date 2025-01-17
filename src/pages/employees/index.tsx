import styled from "styled-components";
import Layout from "../../layouts";
import searchUser from "../../assets/images/search-user.svg";
import bulkUpload from "../../assets/images/bulk-icon.svg";
import addUser from "../../assets/images/add-user.svg";
import { PrimaryButton, SecondaryButton } from "../../components/buttons";
import Overlay from "../../components/overlay";
import { UploadFiles } from "../../components/modals";
import { useContext, useState } from "react";
import { CoreContext } from "../../context/core-context";

import { SpinnerCircularFixed } from "spinners-react";
import Table from "../../components/table";
import Avatar from "../../components/avatar";
import StatusIndicator from "../../components/status-indicator";

const StyledEmployeesPage = styled.main`
  padding: 20px;
  .main {
    background-color: var(--white);
    height: 490px;
    width: 100%;
    max-width: 1123px;
    border-radius: 16px;
    border: 1px solid var(--border-base);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-12);

    &-image {
      img {
        width: 100%;
        max-width: 300px;
      }
    }
    &-text {
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-5);

      div {
        color: var(--gray-700);
        font-size: 30px;
        font-weight: 700;
      }
      p {
        color: var(--gray-400);
        font-size: 16px;
        font-weight: 500;
      }
    }
    &-buttons {
      display: flex;
      gap: var(--spacing-8);
     
  }
`;

const EmployeesPage = () => {
  const { loading, employees } = useContext(CoreContext);
  const [showUpload, setShowUpload] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  return (
    <Layout>
      <StyledEmployeesPage>
        {showUpload && (
          <Overlay isCentered={true} onClicked={() => {}}>
            <UploadFiles
              toogleShow={() => {
                setShowUpload(false);
                setIsFetching((prev) => !prev);
              }}
            />
            {/* <SideBar /> */}
          </Overlay>
        )}
        {isFetching || loading ? (
          <div className="flex justify-center items-center  w-full  self-center h-[80vh] max-w-[1128px]">
            <SpinnerCircularFixed
              size={70}
              thickness={100}
              speed={100}
              color="var(--main-bg)"
              secondaryColor="rgba(57, 142, 172, 0.64)"
            />
          </div>
        ) : employees.length > 0 ? (
          <Table>
            <table>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>Employee Id </th>
                  <th>Employee Profile</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{employee.Employee_Id}</td>
                    <td className="flex items-center justify-start flex-row gap-2">
                      <Avatar /> {employee.Employee_Profile}
                    </td>
                    <td>{employee.Email}</td>
                    <td>{employee.Role}</td>
                    <td>
                      <StatusIndicator status={employee.Status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Table>
        ) : (
          <div className="main">
            <div className="main-image">
              <img src={searchUser} alt="image" />
            </div>
            <div className="main-text">
              <div>Start building your team </div>
              <p>Add your first team member or import your entire team</p>
            </div>
            <div className="main-buttons">
              <SecondaryButton onClick={() => setShowUpload(true)}>
                <img src={bulkUpload} /> Bulk Upload
              </SecondaryButton>
              <PrimaryButton>
                <img src={addUser} /> Add Employee
              </PrimaryButton>
            </div>
          </div>
        )}
      </StyledEmployeesPage>
    </Layout>
  );
};

export default EmployeesPage;
