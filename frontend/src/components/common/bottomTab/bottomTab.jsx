import React from "react";
import BottomNavigation from '@mui/material/BottomNavigation'
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
 

const BottomTab = () => {
    const [value, setValue] = React.useState(0);
 
    return (
        <div
            style={{
                display: "flex",
                margin: "auto",
                width: "100%",
                display: "table",
                boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.1)",
                position: "fixed",
                bottom: "0",
                left: "0",
                right: "0",
                zIndex: "5",
            }}
        >

            <BottomNavigation
                showLabels
                value={value}
                onChange={(e, newValue) => {
                    setValue(newValue);
                }}
                sx={{
                    '& .MuiBottomNavigationAction-root': {
                      color: '#133851', // Unselected color
                    },
                    '& .Mui-selected': {
                      color: '#C6252E', // Selected color
                    },
                  }}
            >
                <BottomNavigationAction
                    disableRipple
                    label="Order"
                    icon={<RestaurantIcon />}
                />
                <BottomNavigationAction
                    disableRipple
                    label="All Trasactions"
                    icon={<AssignmentOutlinedIcon />}
                />
                <BottomNavigationAction
                    disableRipple
                    label="Delivery"
                    icon={<DeliveryDiningOutlinedIcon />}
                />
            </BottomNavigation>
        </div>
    );
};
 
export default BottomTab;