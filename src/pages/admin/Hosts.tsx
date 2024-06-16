import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Avatar,
  Tabs,
  Tab,
} from "@mui/material";
import { axiosInstance } from '../../config/instances';
import { config } from '../../config/config';
import { IUserSignupData } from '../../interface/IUserSignup';


const Hosts: React.FC = () => {
  const [hosts, setHosts] = useState<IUserSignupData[]>([]);
  const [selectedHost, setSelectedHost] = useState<IUserSignupData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchHosts();
    console.log(hosts,'hostasdfjhskldjfh')
  }, []);

  const fetchHosts = async () => {
    const response = await axiosInstance.get('/user/get-all-hosts', config)
    console.log("🚀 ~ fetchHosts ~ response:", response.data)
    if(response.data){
      setHosts(response.data.hosts);
    }
  };

  const handleAcceptReject = (host: IUserSignupData, action: 'accept' | 'reject') => {
    // Implement your logic to accept or reject a host request
    console.log(`${action} host with ID: ${host._id}`);
  };

  const handleHostClick = (host: IUserSignupData) => {
    setSelectedHost(host);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedHost(null);
    setModalOpen(false);
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const getHostsByStatus = (status:IUserSignupData['hostStatus']) => {
    console.log("🚀 ~ getHostsByStatus ~ status:", status)
    const validHosts = hosts || []
    console.log("🚀 ~ getHostsByStatus ~ validHosts:", validHosts)
    return validHosts.filter((host) =>{ 
      console.log(host,"host🔢🔢🔢🔢🔢🔢🔢🔢🔢🔢")

      return host.hostStatus === status});
  };

  return (
    <Grid container spacing={3}>
      {/* Side Navbar */}
      

      {/* Hosts List */}
      <Grid item xs={10}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Hosts
          </Typography>

          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Accepted" />
            <Tab label="Rejected" />
            <Tab label="Pending" />
          </Tabs>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sl. No.</TableCell>
                  <TableCell>Host</TableCell>
                  <TableCell>Email</TableCell>
                  {/* <TableCell>No. of Listings</TableCell> */}
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getHostsByStatus(
                  tabValue === 0 ? 'accepted' : tabValue === 1 ? 'rejected' : 'requested'
                ).map((host, index) => (
                  <TableRow key={host._id} hover onClick={() => handleHostClick(host)}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar>{host.firstName!.charAt(0)}</Avatar>
                        <Typography marginLeft={3}>{host.firstName}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{host.email}</TableCell>
                    {/* <TableCell>{host.numListings}</TableCell> */}
                    <TableCell>
                      {host.hostStatus === 'requested' ? (
                        <>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleAcceptReject(host, 'accept')}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            style={{ marginLeft: '8px' }}
                            onClick={() => handleAcceptReject(host, 'reject')}
                          >
                            Reject
                          </Button>
                        </>
                      ) : (
                        <Typography>{host.hostStatus}</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Host Details Modal */}
        <Modal open={modalOpen}  onClose={handleModalClose}>
          <Box display="flex" flexDirection="column" padding={3}>
            {selectedHost && (
              <>
                <Typography variant="h6" gutterBottom>
                  Host Details
                </Typography>
                <Box display="flex" alignItems="center" marginBottom={2}>
                  <Avatar>{selectedHost?.firstName!.charAt(0)}</Avatar>
                  <Typography marginLeft={1}>{selectedHost.firstName}</Typography>
                </Box>
                <Typography>Email: {selectedHost.email}</Typography>
                {/* <Typography>No. of Listings: {selectedHost.numListings}</Typography> */}
                {/* Add any other relevant details */}
              </>
            )}
          </Box>
        </Modal>
      </Grid>
    </Grid>
  );
};

export default Hosts;