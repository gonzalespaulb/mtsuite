import pg from "./assets/pg.png";

export const employeeData = [
  {
    firstName: "Paul", 
    lastName: "Gonzales",
    preferredName: "Paulie",
    employeePicture: pg,
    employeeId: "000000",
    employeePosition: "Administrator",
    isActive: true,
    email: "pgonzales@aspensnowmass.com",
    phoneNumber: "(650) 814-4040",
    mailingAddress: "4510 S. G St. Oxnard, CA 93033",
    availableDays: ["MON", "THU", "FRI", "SAT", "SUN"],
    terrainLimit: 1,
    liftsWorked: [
      {
        name: "Sam's Knob",
        station: ["T"],
      },
      {
        name: "Assay Hill",
        station: ["B"],
      },
    ],
    performance: {
      totalHours: 245,
      lates: 2,
      absences: 1,
      ncns: 0,
    },
  },
];
