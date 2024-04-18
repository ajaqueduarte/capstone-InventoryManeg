'use client';
import React, { useState, useEffect } from "react";
import { DateRangePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { Button } from "@nextui-org/react";
import Header from '../ui/Header';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

export default function App() {
  console.log("Component rendered"); 
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    start: parseDate("2024-04-01"),
    end: parseDate("2024-04-08"),
  });
  const [smoothieData, setSmoothieData] = useState(null);
  const [error, setError] = useState(null);

  let formatter = useDateFormatter({ dateStyle: "long" });

  useEffect(() => {
    console.log("useEffect called");
    fetchData();
  }, []); // Empty dependency array, meaning it only runs once after the initial render
  

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_day: value?.start?.day,
          end_day: value?.end?.day,
          month: value?.start?.month,
          year: value?.start?.year,
        }),
      });
      const result = await response.json();
      console.log(result);
      setSmoothieData(result); // Set the entire result object
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_day: value?.start?.day,
          end_day: value?.end?.day,
          month: value?.start?.month,
          year: value?.start?.year,
        }),
      });
      const result = await response.json();
      setSmoothieData(result);
      setLoading(false);
      alert('done');
    } catch (error) {
      console.error("Error submitting data:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-row gap-2 items-center">
        <div className="flex justify-between p-24 w-full flex-col gap-y-2">
          <div className="flex items-center">
            <DateRangePicker
              label="Date range (controlled)"
              value={value}
              onChange={setValue}
            />
            <p className="text-default-500 text-sm ml-2">
              Selected date:{" "}
              {value
                ? formatter.formatRange(value.start.toDate(), value.end.toDate())
                : "--"}
            </p>
          </div>
          <Button onClick={onSubmit} variant="flat" disabled={loading}>
            {loading ? 'Loading...' : 'Submit'}
          </Button>
        </div>
      </div>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        // Render the table only if smoothieData exists and has non-empty columns and quantity
        smoothieData && smoothieData.columns && smoothieData.columns.length > 0 && smoothieData.quantity && smoothieData.quantity.length > 0 && (
          <Table isStriped aria-label="Smoothie Table">
            <TableHeader>
              {smoothieData.columns.map((column, index) => (
                <TableColumn key={index}>{column}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {smoothieData.index.map((date, rowIndex) => (
                <TableRow key={rowIndex}>
                  {smoothieData.quantity[rowIndex] && smoothieData.quantity[rowIndex].map((value, colIndex) => (
                    <TableCell key={colIndex}>{value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      )}
    </div>
  );
}
