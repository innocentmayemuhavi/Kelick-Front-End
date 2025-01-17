import styled from "styled-components";
import Charts from "../charts";

const StyledEmployeeStatus = styled.div`
  border-radius: var(--radi-7);
  border: 1px solid var(--gray-100);
  padding: var(--spacing-8);
  background-color: var(--white);

  .nationality {
    &-stats {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      &-total {
        font-size: 36px;
        font-weight: 700;
        color: var(--gray-700);
      }
      &-nationality {
        color: var(--gray-700);
        font-size: 16px;
        font-weight: 700;
      }
      p {
        color: var(--gray-400);
        font-size: 12px;
        font-weight: 500;
      }
    }
    &-nationalities {
      display: flex;

      flex-wrap: wrap;
      gap: var(--spacing-4);
      margin-top: var(--spacing-8);
      &-nationality {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--spacing-2);
        &-value {
          font-size: 14px;
          font-weight: 600;
          color: var(--gray-700);
        }
        &-name {
          color: var(--gray-700);
          font-size: 12px;
          font-weight: 400;
        }
      }
    }
  }
`;

const EmployeeStatus = () => {
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5],
        backgroundColor: [
          "rgba(250, 201, 5, 1)",
          "rgba(183, 116, 252, 1)",
          "rgba(179, 190, 190, 1)",
          "rgba(2, 185, 176, 1)",
        ],
        borderColor: [
          "rgba(250, 201, 5, 1)",
          "rgba(183, 116, 252, 1)",
          "rgba(179, 190, 190, 1)",
          "rgba(2, 185, 176, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const nationalities = [
    {
      name: "Active",
      value: 25,
    },
    {
      name: "Invite Sent",
      value: 10,
    },
    {
      name: "Payroll Only",
      value: 6,
    },
  ];
  return (
    <StyledEmployeeStatus>
      <div className="nationality-stats">
        <div>
          <p>Employee Status</p>
          <div className="nationality-stats-total">25</div>
          <div className="nationality-stats-nationality">Active Employees</div>
        </div>
        <div className="chart">
          <Charts data={data} type="gauge" />
        </div>
      </div>
      <div className="nationality-nationalities">
        {nationalities.map((nationality) => (
          <div className="nationality-nationalities-nationality">
            <div
              className="h-full w-[4px]  rounded-[var(--radi-2)]"
              style={{
                background: `${
                  nationality.name === "Active"
                    ? "var(--button-primary-bg)"
                    : nationality.name === "Invite Sent"
                    ? "var(--purple-400)"
                    : "var(--gray-200)"
                } `,
              }}
            ></div>
            <div
              className={`nationality-nationalities-nationality-value  flex flex-row`}
            >
              {nationality.value}
            </div>
            <div className="nationality-nationalities-nationality-name">
              {nationality.name}
            </div>
          </div>
        ))}
      </div>
    </StyledEmployeeStatus>
  );
};

export default EmployeeStatus;
