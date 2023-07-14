import { Box, Button, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { toast } from "react-toastify";
import useAuthCredentials from "../auth/auth";
import { tokens } from "../theme";
import { memo, useMemo } from "react";

const initialValues = {
  name: "",
  email: "",
  contact: "",
  age: "",
  access: "",
  password: "",
};


// regex for validation
const contactRegex = /^(\+\d{1,3})?(\d{10})$/;
const ageRegex = /^[1-9][0-9]{0,2}$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/;

const validateMessage =
  "Please enter strong password at least 8 characters long and contains at least one uppercase , one lowercase , one digit and one special character ";

// Schema for Form validation

const userSchema = Yup.object().shape({
  name: Yup.string().required("required"),

  email: Yup.string().email("invalid email").required("required"),

  contact: Yup.string()
    .matches(contactRegex, "Phone Number is not Valid!")
    .required("required"),

  age: Yup.string().matches(ageRegex, "Invalid age").required("required"),

  password: Yup.string()
    .matches(passwordRegex, validateMessage)
    .required("required"),

  access: Yup.string()
    .oneOf(
      ["user", "manager", "admin"],
      "Invalid! , access should be 'user','manager'or 'admin'"
    )
    .required("required"),
});

// Form component
const UserForm = ({
  isTeamUpdate = false,
  prevValue,
  setIsDialogOpen,
  setIsTeamFormOpen,
  getTeamData
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("min-width:600px");
  const { access, token } = useAuthCredentials();
  const teamInitialValue = useMemo(()=>({...prevValue, password: ''}),[prevValue])
  // headers
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };

  // Handling Form Submit
  const handleCreateTeam = async (data, { resetForm }) => {
    // form data
    const formData = {
      name: data.name,
      email: data.email,
      contact: data.contact,
      age: data.age,
      access: data.access,
      password: data.password,
    };
    try {
      if (access === "admin") {
        const response = await axios.post(
          `${window.env.API_URL}/team/${access}/create`,
          formData,
          { headers }
        );
        toast.success(response.data.msg);
        resetForm();
      } else {
        toast.info("Access denied");
        resetForm();
      }
    } catch (error) {
      console.error(error);
      toast.error("failed! please try again later");
    }
  };

  // Handling team modification
  const handleUpdateTeam = async (data, { resetForm }) => {
    // form data
    const formData = {
      name: data.name,
      email: data.email,
      contact: data.contact,
      age: data.age,
      access: data.access,
      password: data.password,
    };

    try {
      if (access === "admin") {
        const response = await axios.put(
          `${window.env.API_URL}/team/${access}/update/${data._id}`,
          formData,
          { headers }
        );
        if(response.data.status === 'incorrect password')
        {
          toast.error(response.data.msg);
        }else{
          toast.success(response.data.msg);
        }
           
        resetForm();
        getTeamData()
        setIsDialogOpen(false);
        setIsTeamFormOpen(false);
      } else {
        toast.info("Access denied");
        resetForm();
        setIsDialogOpen(false);
        setIsTeamFormOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("failed! please try again later");
      setIsTeamFormOpen(false);
    }
  };

  return (
    <>
      {/* Form field */}
      <Formik
        onSubmit={isTeamUpdate ? handleUpdateTeam : handleCreateTeam}
        initialValues={isTeamUpdate ? teamInitialValue : initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} id="user-form">
            <Box
              sx={{
                display: "grid",
                gap: "30px",
                gridTemplateColumns: "repeat(4,minmax(0,1fr))",
                "& >div": { gridColumn: isMobile ? "span 4" : undefined },
              }}
            >
              {/* Full Name field */}
              <TextField
                fullWidth
                type="text"
                variant="filled"
                label="Username"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
                InputLabelProps={{ style: { color: colors.grey[100] } }}
              />
              {/* Access field */}
              <TextField
                fullWidth
                type="text"
                variant="filled"
                label="Access"
                name="access"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.access}
                error={!!touched.access && !!errors.access}
                helperText={touched.access && errors.access}
                sx={{ gridColumn: "span 2" }}
                InputLabelProps={{ style: { color: colors.grey[100] } }}
              />
              {/* Email field */}
              <TextField
                fullWidth
                type="email"
                variant="filled"
                label="Email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
                InputLabelProps={{ style: { color: colors.grey[100] } }}
              />
              {/* Contact Number field */}
              <TextField
                fullWidth
                type="text"
                variant="filled"
                label="Contact"
                name="contact"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.contact}
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
                InputLabelProps={{ style: { color: colors.grey[100] } }}
              />
              {/* Age field */}
              <TextField
                fullWidth
                type="text"
                variant="filled"
                label="Age"
                name="age"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.age}
                error={!!touched.age && !!errors.age}
                helperText={touched.age && errors.age}
                sx={{ gridColumn: "span 2" }}
                InputLabelProps={{ style: { color: colors.grey[100] } }}
              />
              {/* password field */}
              <TextField
                fullWidth
                type="text"
                variant="filled"
                label={isTeamUpdate ? "Enter Password to update" : "Password"}
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
                InputLabelProps={{ style: { color: colors.grey[100] } }}
              />
            </Box>
            {/* submit button */}
            <Box sx={{ display: "flex", justifyContent: "end", mt: "20px" }}>
              {isTeamUpdate && (
                <Button
                  variant="text"
                  sx={{
                    color: colors.grey[100],
                    ":hover": {opacity: 0.8},
                    mr: "16px",
                  }}
                  onClick={() => {
                    setIsDialogOpen(false);
                    setIsTeamFormOpen(false);
                  }}
                >
                  cancel
                </Button>
              )}
              <Button
                type="submit"
                variant="contained"
                sx={{
                  color: colors.grey[100],
                  backgroundColor: colors.greenAccent[600],
                  ":hover": { backgroundColor: colors.greenAccent[500] },
                }}
              >
                {isTeamUpdate ? "Update User" : "Create New User"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default memo(UserForm);
