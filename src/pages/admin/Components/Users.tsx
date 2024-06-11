import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Box,
  Container,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { getAllUsersAction } from "../../../redux/actions/adminActions/users";
import Pagination from "../../../components/Pagination";
import { IUserSignupData } from "../../../interface/IUserSignup";
import { axiosInstance } from "../../../config/instances";

const Users: React.FC = () => {
  const { users } = useAppSelector((state) => state.admin);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageUsers, setCurrentPageUsers] = useState<IUserSignupData[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    search: "",
  });

  const tableHead = ["SL.No", "User", "Email", "Status", "Actions"];
  const dispatch = useAppDispatch();

  useEffect(() => {
    setQuery({
      page: currentPage,
      limit: itemsPerPage,
      search: search,
    });
  }, [currentPage, itemsPerPage, search]);

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await dispatch(getAllUsersAction(query));
      if (response.type === "admin/users/get-all-users/fulfilled") {
        setTotalItems(response.payload.totalCount);
        setCurrentPageUsers(response.payload.data);
      }
    };
    getAllUsers();
  }, [dispatch, query]);

  const handlePageChange = (currentPageNumber: number) => {
    setCurrentPage(currentPageNumber);
  };

  const handleBlockUnblock = async (userId: string | null, isBlocked: boolean | null) => {
    if (!userId) return;

    try {
      const response = await axiosInstance.patch(
        `/user/${userId}/status`,
        { isBlocked: !isBlocked },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setCurrentPageUsers(
          currentPageUsers.map((user) =>
            user._id === userId ? { ...user, isBlocked: !isBlocked } : user
          )
        );
      }
    } catch (error) {
      console.error("Failed to update user status", error);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
        <TextField
          label="Search Users"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "300px" }}
        />
      </Box>
      <TableContainer component={Paper} style={{height:"80%", width: "100%", marginBottom: "1rem" }}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHead.map((head: string, index: number) => (
                <TableCell key={index} >
                 <p className="font-serif font-extrabold"> {head}</p> 
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className="">
            {currentPageUsers.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell><p className="font-bold">{index + 1}</p></TableCell>
                <TableCell><p className="font-sans text-font-color-200">{`${user.firstName} ${user.lastName}`}</p></TableCell>
                <TableCell><p className="font-sans text-font-color-200">{user.email}</p></TableCell>
                <TableCell><p className={`font-sans font-bold ${user.isBlocked ? "text-red-500" : "text-green-700" }` }>{user.isBlocked ? "Blocked" : "Active"}</p></TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={user.isBlocked ? "primary" : "secondary"}
                    onClick={() => handleBlockUnblock(user._id, user.isBlocked)}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
        />
      </Box>
    </Container>
  );
};

export default Users;
