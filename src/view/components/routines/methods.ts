import {IRoutine} from "src/models/routines.routine";

export function GetRoutines(): IRoutine[] {
  const routines: IRoutine[] = [];

  for (let i = 0; i < 20; i++) {
    routines.push({
      ID: i,
      actionBody: "https://loco.com",
      actionType: 2,
      colorScheme: "orange",
      describe: `I learn English to find best company
      in the world which can use my skills
      to make world better place`,
      hours: 7,
      name: "English",
      hoursSpended: [1, 1, 0, 0, 0, 0, 0],
      minDurationHours: 1,
      dayZone: 1,
    });
  }
  return routines;
}
