'use client';
import React, { useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LocalDrinkOutlinedIcon from '@mui/icons-material/LocalDrinkOutlined';
import LocalBarOutlinedIcon from '@mui/icons-material/LocalBarOutlined';

import Header from "../ui/Header";
import FoodTable from "./foodTable";
import SmoothieTable from "./smoothieTable";
import JuiceTable from "./juiceTable";

const Recipes = () => {
    const [activeTab, setActiveTab] = useState("food");

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    const renderTable = () => {
        switch (activeTab) {
            case "food":
                return <FoodTable />;
            case "smoothie":
                return <SmoothieTable />;
            case "juice":
                return <JuiceTable />;
            default:
                return null;
        }
    };

    return (
        <div>
            <Header />
            <div className="flex w-full flex-col" style={{ marginTop: '20px' }}>
                <Tabs aria-label="Options" color="primary" variant="bordered" value={activeTab} onChange={handleTabChange}>
                    <Tab
                        key="food"
                        value="food"
                        title={
                            <div className="flex items-center space-x-2">
                                <RestaurantMenuIcon />
                                <span>Food</span>
                            </div>
                        }
                    />
                    <Tab
                        key="smoothie"
                        value="smoothie"
                        title={
                            <div className="flex items-center space-x-2">
                                <LocalDrinkOutlinedIcon />
                                <span>Smoothie</span>
                            </div>
                        }
                    />
                    <Tab
                        key="juice"
                        value="juice"
                        title={
                            <div className="flex items-center space-x-2">
                                <LocalBarOutlinedIcon />
                                <span>Juice</span>
                            </div>
                        }
                    />
                </Tabs>
                {/* Render the FoodTable component */}
                <FoodTable />
            </div>
        </div>
    );
};

export default Recipes;
