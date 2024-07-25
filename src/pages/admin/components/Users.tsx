import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux/store";
import { getAllUsersAction } from "../../../redux/actions/adminActions/users";
import { IUserSignupData } from "../../../interface/IUserSignup";
import {  userApiInstance } from "../../../config/instances";
import TableUsers from "./TableUsers";

const Users: React.FC = () => {
  // const { users } = useAppSelector((state) => state.admin);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageUsers, setCurrentPageUsers] = useState<IUserSignupData[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useAppDispatch();

  // console.log(setItemsPerPage);
  console.log(totalItems)
  // Function to fetch users based on current state
  const fetchUsers = async () => {
    try {
      const query = {
        page: currentPage,
        limit: itemsPerPage,
        search: search,
      };
      const response = await dispatch(getAllUsersAction(query));
      if (response.type === "admin/users/get-all-users/fulfilled") {
        const { data, totalCount } = response.payload;
        setCurrentPageUsers(data);
        setTotalItems(totalCount);
        setTotalPages(Math.ceil(totalCount / itemsPerPage));
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, itemsPerPage, search]);

  // const handlePageChange = (pageNumber: number) => {
  //   setCurrentPage(pageNumber);
  // };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleBlockUnblock = async (userId: string, isBlocked: boolean) => {
    try {
      const response = await userApiInstance.patch(
        `/status-update/${userId}`,
        { isBlocked: isBlocked },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setCurrentPageUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isBlocked: !isBlocked } : user
          )
        );
      }
    } catch (error) {
      console.error("Failed to update user status:", error);
    }
  };

  return (
    <div className="px-4">
      <div className="flex my-2 w-full">
        <input
          type="text"
          placeholder="Search Users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="focus:outline-none w-full max-w-xs"
        />
      </div>

      <div role="tablist" className="tabs tabs-lifted">
        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Users" defaultChecked />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <div className="overflow-auto h-[445px] w-[750px]">
            <TableUsers currentPageUsers={currentPageUsers} handleBlockUnblock={handleBlockUnblock} />
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab bg-blue-100"
          aria-label={`Active`}
        />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <div className="overflow-auto h-[445px] w-[750px]">
            <TableUsers currentPageUsers={currentPageUsers.filter(item => !item.isBlocked)} handleBlockUnblock={handleBlockUnblock} />
          </div>
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab bg-red-300" aria-label="Blocked" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <div className="overflow-auto h-[445px] w-[750px]">
            <TableUsers currentPageUsers={currentPageUsers.filter(item => item.isBlocked)} handleBlockUnblock={handleBlockUnblock} />
          </div>
        </div>
      </div>

      <div className="join flex justify-center mb-4">
        <button className={`join-item btn ${currentPage <= 1 ? 'btn-disabled' : ''}`} onClick={handlePrevClick}>«</button>
        <button className="join-item btn">{currentPage}</button>
        <button className={`join-item btn ${currentPage >= totalPages ? 'btn-disabled' : ''}`} onClick={handleNextClick}>»</button>
      </div>
    </div>
  );
};

export default Users;
