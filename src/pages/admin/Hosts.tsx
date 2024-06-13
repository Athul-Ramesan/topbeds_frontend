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

// Interface for host data
interface Host {
  id: string;
  name: string;
  email: string;
  numListings: number;
  status: 'accepted' | 'rejected' | 'pending';
  // Add any other relevant properties
}

const Hosts: React.FC = () => {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [selectedHost, setSelectedHost] = useState<Host | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  // Fetch hosts data from your API or data source
  useEffect(() => {
    fetchHosts();
  }, []);

  const fetchHosts = async () => {
    // Implement your logic to fetch hosts data from the backend
    const hostsData: Host[] = [
      // Sample data
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        numListings: 3,
        status: 'accepted',
      },
      // Add more sample data as needed
    ];
    setHosts(hostsData);
  };

  const handleAcceptReject = (host: Host, action: 'accept' | 'reject') => {
    // Implement your logic to accept or reject a host request
    console.log(`${action} host with ID: ${host.id}`);
  };

  const handleHostClick = (host: Host) => {
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

  const getHostsByStatus = (status: Host['status']) => {
    return hosts.filter((host) => host.status === status);
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
                  <TableCell>No. of Listings</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getHostsByStatus(
                  tabValue === 0 ? 'accepted' : tabValue === 1 ? 'rejected' : 'pending'
                ).map((host, index) => (
                  <TableRow key={host.id} hover onClick={() => handleHostClick(host)}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar>{host.name.charAt(0)}</Avatar>
                        <Typography marginLeft={3}>{host.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{host.email}</TableCell>
                    <TableCell>{host.numListings}</TableCell>
                    <TableCell>
                      {host.status === 'pending' ? (
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
                        <Typography>{host.status}</Typography>
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
                  <Avatar>{selectedHost.name.charAt(0)}</Avatar>
                  <Typography marginLeft={1}>{selectedHost.name}</Typography>
                </Box>
                <Typography>Email: {selectedHost.email}</Typography>
                <Typography>No. of Listings: {selectedHost.numListings}</Typography>
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