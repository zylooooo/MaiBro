import React from "react";
import BottomNavigation from '@mui/material/BottomNavigation'
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import { Link } from 'react-router-dom';
 

const BottomTab = (prop) => {
    const [value, setValue] = React.useState(prop.value);
    
    return (
        <div
            style={{
                margin: "auto",
                width: "100%",
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
                        fontFamily: 'Lato',
                    },
                    '& .MuiBottomNavigationAction-label': {
                        fontFamily: 'Lato',
                        fontWeight: '600',
                    },
                  }}
            >
                <BottomNavigationAction
                    disableRipple
                    label="Order"
                    value="Order"
                    component={Link}
                    to="/home"
                    icon={<RestaurantRoundedIcon sx={{ fontSize: '1.8em' }} />}
                />
                <BottomNavigationAction
                    disableRipple
                    label="Transactions"
                    value = "Transaction"
                    component={Link}
                    to="/transaction"
                    icon={<AssignmentOutlinedIcon sx={{ fontSize: '1.8em' }} />}
                />
                <BottomNavigationAction
                    disableRipple
                    label="Delivery"
                    value = "Delivery"
                    component={Link}
                    to="/delivery"
                    icon={<DeliveryDiningOutlinedIcon sx={{ fontSize: '1.8em' }}/>}
                />
            </BottomNavigation>
        </div>
    );
};
 
export default BottomTab;