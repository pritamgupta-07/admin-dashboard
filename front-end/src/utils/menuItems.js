import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";



const dashboard = [
    {
    name:'Dashboard',
    icon: <HomeOutlinedIcon/>,
    route:'/dashboard'
},
]

export default dashboard

export const data = [
    {
        name:'Manage Team',
        icon: <PeopleOutlineOutlinedIcon/>,
        route:'/team'
    },
        {
        name:'Contacts Info',
        icon: <ContactsOutlinedIcon/>,
        route:'/contacts'
    },
        {
        name:'Invoices Balances',
        icon: <ReceiptOutlinedIcon/>,
        route:'/invoices'
    },
       
]

export const pages = [
    {
        name:'Profile Form',
        icon: <PersonAddAltOutlinedIcon/>,
        route:'/profile-form'
    },
        {
        name:'Calendar',
        icon: <CalendarTodayOutlinedIcon/>,
        route:'/calendar'
    },
        {
        name:'FAQ',
        icon: <HelpOutlineOutlinedIcon/>,
        route:'/faq'
    },
]

export const charts = [
    {
        name:'Bar Charts',
        icon: <BarChartOutlinedIcon/>,
        route:'/bar-charts'
    },
        {
        name:'Pie Charts',
        icon: <PieChartOutlineOutlinedIcon/>,
        route:'/pie-charts'
    },
        {
        name:'Line charts',
        icon: <TimelineOutlinedIcon/>,
        route:'/line-charts'
    },
        {
        name:'Geography charts',
        icon: <MapOutlinedIcon/>,
        route:'/geography'
    },
]





