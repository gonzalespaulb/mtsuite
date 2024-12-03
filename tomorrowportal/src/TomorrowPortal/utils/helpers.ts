export const flex = (
  justify = "flex-start",
  align = "flex-start",
  direction = "row"
) => {
  const flexDefault = `
    display: flex; 
    justify-content: ${justify};
    align-items: ${align};
    flex-direction: ${direction};
  `;

  return flexDefault;
};

export const parseDate = (formattedDate: string) => {
  const dateSplit = formattedDate.split("/");
  const month = +dateSplit[0] - 1;
  const day = +dateSplit[1];
  const year = +dateSplit[2];

  return new Date(year, month, day);
};

export const formatDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

export const Alphabetize = (arrayToSort: any[]) => {
  return arrayToSort
    .slice()
    .sort((a, b) => a.preferredName.localeCompare(b.preferredName));
};
