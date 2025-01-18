import styled from "styled-components";
import Layout from "../../layouts";
import searchUser from "../../assets/images/search-user.svg";
import bulkUpload from "../../assets/images/bulk-icon.svg";
import addUser from "../../assets/images/add-user.svg";
import search from "../../assets/icons/search.svg";
import arrow from "../../assets/icons/arrow.svg";
import { PrimaryButton, SecondaryButton } from "../../components/buttons";
import Overlay from "../../components/overlay";
import { UploadFiles } from "../../components/modals";
import { useContext, useState } from "react";
import { CoreContext } from "../../context/core-context";
import { SpinnerCircularFixed } from "spinners-react";
import Table from "../../components/table";
import Avatar from "../../components/avatar";
import StatusIndicator from "../../components/status-indicator";
import {
  EmployeeStatusStats,
  EmploymentTypeStats,
  NationalityStats,
} from "../../components/stats";

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
                setIsFetching((prev) => prev);
              }}
            />
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
          <>
            <div className="flex gap-[16px]   w-full max-w-[1128px] flex-row">
              <NationalityStats />
              <EmploymentTypeStats />
              <EmployeeStatusStats />
            </div>
            <div className="flex justify-between items-center gap-4  w-full py-2 max-w-[1128px] flex-row">
              <div className="font-[700] text-[var(--gray-700)] text-[20px]">
                All Employees
              </div>
              <div className="flex gap-[var(--spacing-4)]  ">
                <div className="search flex flex-row justify-between  flex-row gap-[var(--spacing-4)]  px-[var(--spacing-4)]  rounded-[var(--radi-6)] bg-[var(--button-secondary-bg)] px-[var(--spacing-4] py-2 h-full  border-1 border ">
                  <img src={search} />
                  <input
                    type="search"
                    placeholder="Search employee"
                    className="outline-none bg-transparent w-full"
                  />
                </div>
                <div className="border-1  flex items-center gap-2 rounded-[var(--radi-6)] bg-[var(--button-secondary-bg)] px-[var(--spacing-7)] py-2 h-full  border-1 border cursor-pointer">
                  All Status <img src={arrow} />
                </div>
                <div className="border-1  flex items-center gap-2 rounded-[var(--radi-6)] bg-[var(--button-secondary-bg)] px-[var(--spacing-7)] py-2 h-full  border-1 border cursor-pointer">
                  All Role <img src={arrow} />
                </div>
              </div>
            </div>
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
                      <td className="underline text-[var(--button-primary-bg)] cursor-pointer">
                        {employee.Employee_Id}
                      </td>
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
          </>
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
