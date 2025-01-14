import kelick from "../assets/icons/kelick.svg";
import employees from "../assets/icons/employees.svg";
import payroll from "../assets/icons/payroll.svg";
import leaves from "../assets/icons/leaves.svg";
import claims from "../assets/icons/claims.svg";
export const menuItemsData = [
  {
    id: 1,
    disabled: false,
    name: "ORGANISATION",
    hasDropDown: true,
    isOpen: true,
    children: [
      {
        id: 1,
        name: "Kelick",
        icon: kelick,
        disabled: true,
        path: "/kelick",
      },
    ],
  },
  {
    isOpen: true,
    id: 2,
    disabled: false,
    name: "MANAGE",
    hasDropDown: false,
    children: [
      {
        id: 1,
        name: "Employees",
        icon: employees,
        disabled: false,
        path: "/employees",
      },
      {
        id: 2,
        name: "Payroll",
        icon: payroll,
        disabled: true,
        path: "/payroll",
      },
      {
        id: 3,
        name: "Leaves",
        icon: leaves,
        disabled: true,
        path: "/leaves",
      },
      {
        id: 4,
        name: "Claims",
        icon: claims,
        disabled: true,
        path: "/claims",
      },
    ],
  },
];
