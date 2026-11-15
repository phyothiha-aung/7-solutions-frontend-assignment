import { Departments } from "@/interface/department-interfaces";
import { User } from "@/interface/user-interfaces";

export const groupByDepartment = (users: User[]): Departments => {
  const departmentTracker: {
    [key: string]: {
      male: number;
      female: number;
      ages: number[];
      hair: {
        [key: string]: number;
      };
      addressUser: { [key: string]: string };
    };
  } = {};

  users.forEach((user) => {
    const dept = user.company.department;

    if (!departmentTracker[dept]) {
      departmentTracker[dept] = {
        male: 0,
        female: 0,
        ages: [],
        hair: {},
        addressUser: {},
      };
    }

    const current = departmentTracker[dept];

    if (user.gender.toLowerCase() === "male") current.male++;
    if (user.gender.toLowerCase() === "female") current.female++;

    current.ages.push(user.age);

    const hairColor = user.hair.color;
    current.hair[hairColor] = (current.hair[hairColor] || 0) + 1;

    const fullName = `${user.firstName}${user.lastName}`;
    current.addressUser[fullName] = user.address.postalCode;
  });

  const departmentsResult: Departments = {};

  for (const [deptName, data] of Object.entries(departmentTracker)) {
    const minAge = data.ages.length ? Math.min(...data.ages) : 0;
    const maxAge = data.ages.length ? Math.max(...data.ages) : 0;

    departmentsResult[deptName] = {
      male: data.male,
      female: data.female,
      ageRange: `${minAge}-${maxAge}`,
      hair: data.hair,
      addressUser: data.addressUser,
    };
  }

  return departmentsResult;
};
