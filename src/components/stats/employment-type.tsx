import styled from "styled-components";

const StyledEmploymentType = styled.div`
  border-radius: var(--radi-7);
  border: 1px solid var(--gray-100);
  padding: var(--spacing-8);
  background-color: var(--white);
  max-width: 457px;
  width: 100%;

  .content {
    display: flex;
    flex-direction: column;
    &-stats {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &-total {
        font-size: 36px;
        font-weight: 700;
        color: var(--gray-700);
      }
      &-title {
        color: var(--gray-400);
        font-size: 12px;
        font-weight: 500;
      }
      p {
        color: var(--gray-700);
        font-size: 16px;
        font-weight: 600;
      }
    }
    &-chart {
      display: flex;
      flex-direction: row;
      gap: var(--spacing-1);
    }
    &-types {
      display: flex;

      flex-wrap: wrap;
      gap: var(--spacing-4);
      margin-top: var(--spacing-8);
      &-type {
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

const EmploymentType = () => {
  const data = [
    {
      name: "Full-Timer",
      value: 25,
    },
    {
      name: "Part-Timer",
      value: 10,
    },
    {
      name: "Contract",
      value: 5,
    },
    {
      name: "Intern",
      value: 6,
    },
  ];
  return (
    <StyledEmploymentType>
      <div className="content">
        <div className="content-stats">
          <div className="content-stats-title">Employment Type</div>
          <div className="content-stats-total">25</div>
          <p>Full Timers</p>
        </div>
        <div className="content-chart">
          <div className="w-full bg-gray-100 rounded-full h-[10px] ">
            <div className="bg-[var(--button-primary-bg)] h-[10px] rounded-full "></div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-[10px] ">
            <div className="bg-[var(--yellow-400)] h-[10px] rounded-full "></div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-[10px] ">
            <div className="bg-[var(--purple-400)] h-[10px] rounded-full "></div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-[10px] ">
            <div className="bg-[var(--gray-200)] h-[10px] rounded-full "></div>
          </div>
        </div>
        <div className="content-types">
          {data.map((value) => (
            <div className="content-types-type">
              <div
                className="h-full w-[4px]  rounded-[var(--radi-2)]"
                style={{
                  background: `${
                    value.name === "Full-Timer"
                      ? "var(--button-primary-bg)"
                      : value.name === "Part-Timer"
                      ? "var(--yellow-400)"
                      : value.name === "Contract"
                      ? "var(--purple-400)"
                      : "var(--gray-200)"
                  } `,
                }}
              ></div>
              <div className={`content-types-type-value  flex flex-row`}>
                {value.value}
              </div>
              <div className="content-types-type-name">{value.name}</div>
            </div>
          ))}
        </div>
      </div>
    </StyledEmploymentType>
  );
};

export default EmploymentType;
