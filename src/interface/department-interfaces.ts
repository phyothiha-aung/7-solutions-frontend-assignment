export interface Departments {
  [key: string]: {
    male: number; // ---> Male Count Summary
    female: number; // ---> Female Count Summary
    ageRange: string; // ---> Range
    hair: {
      // ---> "Color": Color Summary
      [key: string]: number;
    };
    addressUser: {
      // ---> "firstNamelastName": postalCode
      [key: string]: string;
    };
  };
}
