export interface Color{
  passiv_color:string
  average_color: string
  upper_average_color: string
  active_color: string
}

export let colors:{[key: string]: Color}={
  "orange":{
    "passiv_color": "#FFD9C6",
    "active_color": "#FF7A38",
    "upper_average_color": "#FF9F70",
    "average_color":"#FFB28B"
  },
  "violet":{
    "passiv_color": "#d0c4ff",
    "active_color": "#8D6EFF",
    "upper_average_color": "#9477ff",
    "average_color":"#a087ff"
  },
  "default":{
    "passiv_color": "#ffffff",
    "active_color": "#ffffff",
    "upper_average_color": "#ffffff",
    "average_color":"#ffffff" 
  }
}
