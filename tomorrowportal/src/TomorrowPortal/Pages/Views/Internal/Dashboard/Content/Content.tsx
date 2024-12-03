import { useEffect, useRef, useState } from "react";
import { BarChart, MainContainer } from "./styles";
import { select, Selection } from "d3-selection";
import { scaleLinear, scaleBand } from "d3-scale";
import { max } from "d3-array";
import { colors } from "../../../../../utils/colors";
import { axisLeft, axisBottom } from "d3-axis";
import { useEmployees } from "../../../../../redux/hooks/user";
import { employeeListToCSV } from "../../../../../utils/csvTemplates";

const Content = () => {
  const employeeCountPerDay = [
    {
      day: "SUN",
      count: 8,
    },
    {
      day: "MON",
      count: 14,
    },
    {
      day: "TUE",
      count: 10,
    },
    {
      day: "WED",
      count: 8,
    },
    {
      day: "THU",
      count: 8,
    },
    {
      day: "FRI",
      count: 9,
    },
    {
      day: "SAT",
      count: 8.5,
    },
  ];

  const dimensions = {
    width: 800,
    height: 500,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
    marginBottom: 50,
  };

  const chartRef = useRef<SVGSVGElement | null>(null);

  const [selection, setSelection] = useState<null | Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null);
  const [data, setData] = useState(employeeCountPerDay);

  const x = scaleBand()
    .domain(data.map((d) => d.day))
    .range([5, dimensions.width - 5]) //MOVES THE BARS AND X AXIS LEFT AND RIGHT
    .paddingInner(0.1);

  const y = scaleLinear()
    .domain([0, max(data, (d) => d.count)! + 4])
    .range([dimensions.height - 30, -5]); // MOVES THE BARS AND Y AXIS UP AND DOWN

  useEffect(() => {
    if (!selection) {
      setSelection(select(chartRef.current));
    } else {
      selection
        .selectAll("rect")
        .data(employeeCountPerDay)
        .enter()
        .append("rect")
        .attr("width", x.bandwidth) // CREATES AN EQUAL WIDTH FOR THE BARS BASED ON WHAT IS BEING RENDERED
        .attr("height", (d) => dimensions.height - 40 - y(d.count)) // HOW CLOSE THE BARS ARE FROM THE X AXIS
        .attr("x", (d) => x(d.day)!)
        .attr("y", (d) => y(d.count))
        .attr("fill", "#4782B4")
        .attr("stroke", colors.primary)
        .attr("stroke-width", 1);

      const xAxis = axisBottom(x).tickSize(0); // REMOVES THE TICKS
      selection
        .append("g")
        .attr("transform", `translate(0, ${dimensions.height - 30})`)
        .call(xAxis)
        .selectAll("text")
        .style("font-size", "16px")
        .style("fill", colors.primary)
        .style("font-weight", "bold");

      selection.select(".domain").remove(); // REMOVES THE X AXIS LINE

      const yAxis = axisLeft(y);
      // selection.append("g").attr("transform", `translate(25, -5)`).call(yAxis)
    }
  }, [selection]);

  return (
    <MainContainer>
      <BarChart>
        <svg
          ref={chartRef}
          width={dimensions.width}
          height={dimensions.height}
        ></svg>
      </BarChart>
    </MainContainer>
  );
};

export default Content;
