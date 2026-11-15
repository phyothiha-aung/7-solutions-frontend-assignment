import { Departments } from "@/interface/department-interfaces";
import { User } from "@/interface/user-interfaces";

export const groupByDepartment = (users: User[]): Departments => {
  const departmentTracker: Departments = {};

  users.forEach((user) => {
    const dept = user.company.department;

    if (!departmentTracker[dept]) {
      departmentTracker[dept] = {
        male: 0,
        female: 0,
        ageRange: "Infinity-0",
        hair: {},
        addressUser: {},
      };
    }

    const current = departmentTracker[dept];

    if (user.gender.toLowerCase() === "male") current.male++;
    if (user.gender.toLowerCase() === "female") current.female++;

    const [minAge, maxAge] = current.ageRange.split("-");
    current.ageRange = `${Math.min(Number(minAge), user.age)}-${Math.max(Number(maxAge), user.age)}`;

    const hairColor = user.hair.color;
    current.hair[hairColor] = (current.hair[hairColor] || 0) + 1;

    const fullName = `${user.firstName}${user.lastName}`;
    current.addressUser[fullName] = user.address.postalCode;
  });

  return departmentTracker;
};
