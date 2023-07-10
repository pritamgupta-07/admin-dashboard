import { Box} from "@mui/material";
import Header from "../../components/Header";
import UserForm from "../../components/UserForm";

const Form = () => {
  
  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />
      <UserForm/>
    </Box>
  );
};

export default Form;
