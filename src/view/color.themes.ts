export interface IColor {
  passiv_color: string;
  average_color: string;
  upper_average_color: string;
  active_color: string;
}

export let colors: {[key: string]: IColor} = {
  Orange: {
    passiv_color: "#FFD9C6",
    active_color: "#FF7A38",
    upper_average_color: "#FF9F70",
    average_color: "#FFB28B",
  },
  Violet: {
    passiv_color: "#d0c4ff",
    active_color: "#8D6EFF",
    upper_average_color: "#9477ff",
    average_color: "#a087ff",
  },
  Red: {
    passiv_color: "#ffccd9",
    active_color: "#ff5338",
    upper_average_color: "#ff7870",
    average_color: "#ff8b8b",
  },
  Blue: {
    passiv_color: "#a3ecff",
    active_color: "#5d9fea",
    upper_average_color: "#56a3e4",
    average_color: "#56b6ff",
  },
  Green: {
    passiv_color: "#d7ffcc",
    active_color: "#8ec738",
    upper_average_color: "#8eec70",
    average_color: "#a6e547",
  },
  Default: {
    passiv_color: "#e2e2e2",
    active_color: "#878787",
    upper_average_color: "#b5b5b5",
    average_color: "#b5b5b5",
  },
};
