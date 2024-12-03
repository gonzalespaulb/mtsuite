export const colors = {
  primary: "#0D3B6F",
  secondary: "#FFFFFF",
  accent: "#FAF7F3",
  border: "rgba(0, 0, 0, 0.1)",
  input: "rgba(102, 102, 102, 0.1)",
  lightRed: "#F4968E",
  darkRed: "#660809",
  lightGreen: "#95D5B1",
  darkGreen: "#1C4332",
};

export const positionColors = (position: string) => {
  switch (position) {
    case "Manager":
      return {
        light: "#E8F5EB",
        dark: "#1F873A",
      };
    case "Supervisor":
      return {
        light: "#F6EAEC",
        dark: "#C9232C",
      };
    case "Administrator":
      return {
        light: "#FFD9DC",
        dark: "#FE9E9F", 
      };
    case "Relief":
      return {
        light: "#EEECF4",
        dark: "#5931A2",
      };
    case "Foreman":
      return {
        light: "#F7EEE9",
        dark: "#E36811",
      };
    case "Operator":
      return {
        light: "#F1E9D3",
        dark: "#F9C510",
      };
    case "Attendant":
      return {
        light: "#E6EFF9",
        dark: "#005AC4",
      };
  }
};
