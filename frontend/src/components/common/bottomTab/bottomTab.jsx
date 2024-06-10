import React from "react";
import BottomNavigation from "@mui/material/core/BottomNavigation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RestoreIcon from "@mui/icons-material/Restore";
import BottomNavigationAction from "@mui/material/core/BottomNavigationAction";
 
const bottomTab = () => {
    const [value, setValue] = React.useState(0);
 
    return (
        <div
            style={{
                margin: "auto",
                display: "table",
            }}
        >
            <h4>How to use BottomNavigation in ReactJS?</h4>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(e, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction
                    label="Recents"
                    icon={<RestoreIcon />}
                />
                <BottomNavigationAction
                    label="Nearby"
                    icon={<LocationOnIcon />}
                />
            </BottomNavigation>
            
        </div>
    );
};
 
export default bottomTab;