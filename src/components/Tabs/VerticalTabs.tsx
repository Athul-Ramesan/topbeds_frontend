import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BookingList from '../../pages/user/booking/BookingList';
import { IBooking } from '../../interface/IBooking';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


interface VerticalTabsProps {
    bookings: any;
  }
export default function VerticalTabs( TabProps: VerticalTabsProps ) {
    const [value, setValue] = React.useState(0);

    const {bookings} = TabProps
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log("🚀 ~ handleChange ~ event:", event)
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="Upcoming Bookings" {...a11yProps(0)} />
                <Tab label="Completed Bookings" {...a11yProps(1)} />
             

            </Tabs>
            <TabPanel value={value} index={0}>
                <BookingList
                    bookings={bookings.upcomingBookings}
                    title="Upcoming Bookings"
                    isUpcoming={true}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <BookingList
                    bookings={bookings.completedBookings}
                    title="Past Bookings"
                    isUpcoming={false}
                />
            </TabPanel>
          
        </Box>
    );
}