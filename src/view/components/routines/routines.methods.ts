import {Routine} from 'src/models/routines.routine'

export function GetRoutines():Array<Routine>{
  let routines: Array<Routine> = []

  for(let i=0;i<20;i++){
    routines.push({
      id:i,
      colorScheme:"orange",
      describe: `I learn English to find best company
      in the world which can use my skills
      to make world better place`,
      hours: 7,
      name:"English"
    })
  }
  return routines
}

