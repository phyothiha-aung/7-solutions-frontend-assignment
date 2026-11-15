import { it, expect, describe } from "vitest";
import { groupByDepartment } from "../../src/utils/group-by-department";
import type { User } from "../../src/interface/user-interfaces";

type UserOverrides = {
  firstName?: string;
  lastName?: string;
  age?: number;
  gender?: string;
  hairColor?: string;
  postalCode?: string;
  department?: string;
};

const createUser = ({
  firstName = "John",
  lastName = "Doe",
  age = 30,
  gender = "male",
  hairColor = "Black",
  postalCode = "10001",
  department = "Engineering",
}: UserOverrides = {}): User =>
  ({
    firstName,
    lastName,
    age,
    gender,
    hair: { color: hairColor, type: "Straight" },
    address: { postalCode },
    company: { department },
  }) as unknown as User;

describe("groupByDepartment", () => {
  it("should returns an empty object for an empty list", () => {
    expect(groupByDepartment([])).toEqual({});
  });

  it("should return department for a single user", () => {
    const result = groupByDepartment([
      createUser({
        firstName: "Amy",
        lastName: "Pond",
        age: 21,
        gender: "female",
        hairColor: "Red",
        postalCode: "11111",
      }),
    ]);

    expect(result).toEqual({
      Engineering: {
        male: 0,
        female: 1,
        ageRange: "21-21",
        hair: { Red: 1 },
        addressUser: { AmyPond: "11111" },
      },
    });
  });

  it("should group users into separate departments", () => {
    const result = groupByDepartment([
      createUser({ department: "Engineering" }),
      createUser({ department: "Engineering", firstName: "Jack", age: 25 }),
      createUser({
        department: "Marketing",
        firstName: "Jane",
        gender: "female",
        age: 20,
      }),
    ]);

    expect(result).toEqual({
      Engineering: {
        male: 2,
        female: 0,
        ageRange: "25-30",
        hair: { Black: 2 },
        addressUser: { JohnDoe: "10001", JackDoe: "10001" },
      },
      Marketing: {
        male: 0,
        female: 1,
        ageRange: "20-20",
        hair: { Black: 1 },
        addressUser: { JaneDoe: "10001" },
      },
    });
  });

  it("should count male and female correctly", () => {
    const result = groupByDepartment([
      createUser({ gender: "male" }),
      createUser({ gender: "male" }),
      createUser({ gender: "female" }),
    ]);

    expect(result.Engineering.male).toBe(2);
    expect(result.Engineering.female).toBe(1);
  });

  it("should calculate the ageRange correctly", () => {
    const result = groupByDepartment([
      createUser({ age: 35 }),
      createUser({ age: 22 }),
      createUser({ age: 50 }),
      createUser({ age: 40 }),
    ]);

    expect(result.Engineering.ageRange).toBe("22-50");
  });

  it("should count hair colors correctly", () => {
    const result = groupByDepartment([
      createUser({ hairColor: "Black" }),
      createUser({ hairColor: "Red" }),
      createUser({ hairColor: "Black" }),
    ]);

    expect(result.Engineering.hair).toEqual({ Black: 2, Red: 1 });
  });

  it("should map first+last name to postal code", () => {
    const result = groupByDepartment([
      createUser({
        firstName: "Doctor",
        lastName: "Who",
        postalCode: "10000",
      }),
      createUser({
        firstName: "Amy",
        lastName: "Pond",
        postalCode: "20000",
      }),
      createUser({
        firstName: "Rory",
        lastName: "Williams",
        postalCode: "30000",
      }),
    ]);

    expect(result.Engineering.addressUser).toEqual({
      DoctorWho: "10000",
      AmyPond: "20000",
      RoryWilliams: "30000",
    });
  });
});
