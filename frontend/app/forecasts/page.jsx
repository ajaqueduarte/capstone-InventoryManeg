"use client";
import React from "react";
import { DateRangePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { Button } from "@nextui-org/react";

export default function App() {
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState({
    start: parseDate("2024-04-01"),
    end: parseDate("2024-04-08"),
  });

  let formatter = useDateFormatter({ dateStyle: "long" });

  const onSubmit = async () => {
    try {
      console.log({
        start_day: value?.start?.day,
        end_day: value?.end?.day,
        month: value?.start?.month,
        year: value?.start?.year,
      });
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
      console.log({result});
      alert('done');
    } catch (error) {
      console.log({ error });
    }
  };

  React.useEffect(() => {
    console.log({ date: value });
  }, [value]);

  return (
    <div className="flex flex-row gap-2">
      <div className="w-full flex flex-col gap-y-2">
        <DateRangePicker
          label="Date range (controlled)"
          value={value}
          onChange={setValue}
        />
        <p className="text-default-500 text-sm">
          Selected date:{" "}
          {value
            ? formatter.formatRange(value.start.toDate(), value.end.toDate())
            : "--"}
        </p>
      </div>
      <Button onClick={onSubmit} variant="flat">
        Submit
      </Button>
    </div>
  );
}
