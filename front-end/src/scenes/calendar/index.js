import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import useAuthCredentials from "../../auth/auth";

const Calendar = () => {
  // theme & media query setup
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isTablet = useMediaQuery("(max-width: 960px)");
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [note, setNote] = useState("");
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({});
  const [deleteEvent, setDeleteEvent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Dialog box
  const [inputDialogOpen, setInputDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { token } = useAuthCredentials();

  // Headers setup for api
  const headers = useMemo(
    () => ({ "Content-Type": "application/json", Authorization: token }),
    [token]
  );

  // Requesting all Events from the Database
  const handleGetEvent = useCallback(async () => {
    try {
      const response = await axios.get("https://dashboard-cxq3.onrender.com/calendar", {
        headers,
      });
      setEvents(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [setEvents, setIsLoading, headers]);

  useEffect(() => {
    handleGetEvent();
  }, [handleGetEvent]);

  // Adding Events to the Database
  const handleAddEvent = async () => {
    const eventData = {
      title: note,
      start: currentEvent.startStr,
      end: currentEvent.endStr,
      allday: currentEvent.allDay,
      expirationDate: currentEvent.endStr,
    };
    try {
      const response = await axios.post(
        "https://dashboard-cxq3.onrender.com/calendar/create-event",
        eventData,
        { headers }
      );
      // showing Notification
      toast.success(response.data.msg);
      handleGetEvent();
      // reset all state
      setInputDialogOpen(false);
      setCurrentEvent({});
      setNote("");
    } catch (error) {
      toast.error("failed! please try again later");
      console.error(error);
      // reset all state
      setInputDialogOpen(false);
      setCurrentEvent({});
      setNote("");
    }
  };

  // deleting event from database
  const handleDeleteEvent = async () => {
    try {
      const response = await axios.delete(
        `https://dashboard-cxq3.onrender.com/calendar/delete/${deleteEvent}`,
        { headers }
      );
      // showing Notification
      toast.success(response.data.msg);
      handleGetEvent();
      // reset all state
      setDeleteDialogOpen(false);
      setDeleteEvent("");
    } catch (error) {
      toast.error("Failed! please try again later");
      console.error(error);
      // reset all state
      setDeleteDialogOpen(false);
      setDeleteEvent("");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <Header title="CALENDAR" subtitle="Create your Upcoming Plans" />

          {/* Dialogue for Event input */}
          <Dialog
            open={inputDialogOpen}
            onClose={() => {
              setInputDialogOpen(false);
            }}
            fullWidth
          >
            <DialogContent sx={{ backgroundColor: colors.primary[400] }}>
              <DialogTitle variant="h4" sx={{ padding: "16px 0" }}>
                Enter your note!
              </DialogTitle>
              <TextField
                autoFocus
                fullWidth
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
              />
              <DialogActions>
                <Button
                  variant="text"
                  sx={{ color: colors.primary[100] }}
                  onClick={() => {
                    setInputDialogOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    color: colors.grey[100],
                    backgroundColor: colors.greenAccent[600],
                    ":hover": { backgroundColor: colors.greenAccent[400] },
                  }}
                  onClick={handleAddEvent}
                >
                  Save
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>

          {/* Delete Event Dialog */}
          <Dialog
            open={deleteDialogOpen}
            onClose={() => {
              setDeleteDialogOpen(false);
            }}
          >
            <DialogContent sx={{ backgroundColor: colors.primary[400] }}>
              <DialogTitle variant="h4">
                Are you sure you want to delete this item?
              </DialogTitle>
              <DialogActions>
                <Button
                  variant="text"
                  sx={{ color: colors.primary[100] }}
                  onClick={() => {
                    setDeleteDialogOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    color: colors.grey[100],
                    backgroundColor: "#e11515",
                    ":hover": { backgroundColor: "#b70606" },
                  }}
                  onClick={handleDeleteEvent}
                >
                  Delete
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>

          {/* Main Event Component */}
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection={isTablet ? "column" : "row"}
          >
            {/* CALENDAR Events List*/}
            <Box
              flex="1 1 25%"
              backgroundColor={colors.primary[400]}
              p="15px"
              borderRadius="4px"
              marginBottom={isTablet ? "16px" : 0}
              height="70vh"
              maxHeight={isTablet ? "50vh" : undefined}
              sx={{ overflowY: "auto" }}
            >
              <Typography variant="h5">Events</Typography>
              <List>
                {events.length > 0 ? (
                  events.map((event) => (
                    <ListItem
                      key={event._id}
                      sx={{
                        backgroundColor: colors.greenAccent[500],
                        margin: "10px 0",
                        borderRadius: "2px",
                      }}
                      onClick={() => {
                        setDeleteEvent(event._id);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <ListItemText
                        primary={event.title}
                        secondary={
                          <Typography>
                            {formatDate(event.start, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))
                ) : (
                  <Typography variant="h6">No Events</Typography>
                )}
              </List>
            </Box>

            {/* FULL CALENDAR */}

            <Box
              flex="1 1 100%"
              ml={isTablet ? "" : "15px"}
              sx={{
                "& .fc-theme-standard .fc-list-day-cushion ": {
                  backgroundColor: colors.primary[400],
                },
                "& .fc .fc-list-event:hover td": {
                  backgroundColor: colors.greenAccent[500],
                },
                "& .fc-toolbar-title": {
                  margin: "0 8px",
                  fontSize: isTablet ? "1rem" : "1.75rem",
                },
                "& .fc-toolbar , .fc-toolbar-chunk": isMobile
                  ? {
                      display: "block",
                      mt: "8px",
                    }
                  : {
                      display: "flex",
                    },
              }}
            >
              <FullCalendar
                height="70vh"
                plugins={[
                  interactionPlugin,
                  dayGridPlugin,
                  timeGridPlugin,
                  listPlugin,
                ]}
                initialView="dayGridMonth"
                headerToolbar={
                  isMobile
                    ? {
                        left: "title",
                        center: "",
                        right: "prev,next dayGridMonth,timeGridWeek,listWeek",
                      }
                    : {
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,listWeek",
                      }
                }
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                select={(selected) => {
                  setInputDialogOpen(true);
                  setCurrentEvent(selected);
                }}
                events={events}
                eventClick={(selected) => {
                  setDeleteEvent(selected.event.extendedProps._id);
                  setDeleteDialogOpen(true);
                }}
              />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Calendar;
