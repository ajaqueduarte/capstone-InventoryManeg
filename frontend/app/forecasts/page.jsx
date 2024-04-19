'use client';
import React, { useState, useEffect } from "react";
import { DateRangePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { Button, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import Header from '../ui/Header';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    start: parseDate("2024-04-01"),
    end: parseDate("2024-04-08"),
  });
  const [futureDays, setFutureDays] = useState(2);
  const [jsonData, setJsonData] = useState(null);
  const [totalSold, setTotalSold] = useState([]);

  const formatter = useDateFormatter({ dateStyle: "long" });

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_day: value?.start?.day,
          end_day: value?.end?.day,
          month: value?.start?.month,
          year: value?.start?.year,
          future_days: futureDays,
        }),
      });
      const result = await response.json();
      const jsonData = result?.forecast ? JSON.parse(result.forecast) : null;
      setJsonData(jsonData);
      setLoading(false);
      const totalSold = Array.from({ length: jsonData.data[0].length }, (_, index) =>
        jsonData.data.map((dayData) => dayData[index]).reduce((acc, val) => acc + val, 0)
      );
      setTotalSold(totalSold);
      alert('done');
    } catch (error) {
      console.log({ error });
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log({ date: value });
  }, [value]);

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
          <Input
            type="number"
            label="Future Days"
            value={futureDays}
            onChange={(e) => setFutureDays(parseInt(e.target.value))}
            className="w-30 mr-auto"
          />
          <Button onClick={onSubmit} variant="flat" disabled={loading}>
            {loading ? 'Loading...' : 'Submit'}
          </Button>
        </div>
      </div>
      {jsonData && jsonData.columns && jsonData.index && jsonData.data && (
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>SMOOTHIE</TableColumn>
            <TableColumn>TOTAL QUANTITY</TableColumn>
          </TableHeader>
          <TableBody>
            {jsonData.columns.map((_, columnIndex) => (
              <TableRow key={columnIndex}>
                <TableCell style={{ color: '#333' }}>{jsonData.columns[columnIndex]}</TableCell>
                <TableCell style={{ color: '#333' }}>{totalSold[columnIndex]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
