'use client';
import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
// import { EditIcon } from "./EditIcon";
// import { DeleteIcon } from "./DeleteIcon";

// const statusColorMap = {
//   active: "success",
//   paused: "danger",
//   vacation: "warning",
// };

export default function FoodTable() {
    const [foods, setFoods] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch("/api/food"); // Fetch data from the API route
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch foods");
        }
        const data = await response.json();
        setFoods(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };
    fetchData();
  }, []);

  const renderCell = (food, columnKey) => {
    const cellValue = food[columnKey];
    return cellValue;
  };

  if (!foods || foods.length === 0) {
    return <div>Loading...</div>;
  }

  const columnKeys = Object.keys(foods[0] || {});

  return (
    <Table aria-label="Food table">
      <TableHeader columns={columnKeys}>
        {(column) => (
          <TableColumn key={column} align="start">
            {column}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={foods}>
        {(food) => (
          <TableRow key={food.ID}>
            {columnKeys.map((columnKey) => (
              <TableCell key={columnKey}>{renderCell(food, columnKey)}</TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
