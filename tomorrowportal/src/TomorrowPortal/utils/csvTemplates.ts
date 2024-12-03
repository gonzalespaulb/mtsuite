import Papa from "papaparse";

const convertToCSV = (data: any) => {
    const csv = Papa.unparse(
      data
    );
    return csv;
  };

  export const employeeListToCSV = (employeeList: any, fileName: string) => {
    const csvData = convertToCSV(employeeList);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  export const scheduleToCSV = (schedule: any, fileName: string) => {
    const csvData = convertToCSV(schedule);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }; 