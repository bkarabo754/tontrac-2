import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTable from "../components/UserTable";
import { getUsers, deleteUser } from "../api/userApi";
import useUserStore from "../store/useUserStore";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const users = useUserStore((state) => state.users);
  const setUsers = useUserStore((state) => state.setUsers);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getUsers();
        console.log("data =>", data);
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users. Please try again.");
        setLoading(false);
      }
    };
    fetchUsers();
  }, [setUsers]);

  // Handle viewing user details
  const handleView = (id) => {
    navigate(`/user/${id}`);
  };

  // Handle editing a user
  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };

  // Handle deleting a user
  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      console.log(`Deleting user with id: ${id}`);
      await deleteUser(id);
      console.log(`User with id: ${id} deleted`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      setDeleting(false);
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user. Please try again.");
      setDeleting(false);
    }
  };

  // Navigate to Add User page
  const handleAddUser = () => {
    navigate("/add-user");
  };

  return (
    <div>
      <h1 className='text-2xl font-bold mb-8 mt-20 text-center'>
        User Management Application
      </h1>
      <div className='flex justify-end mb-8 px-4'>
        <Button onClick={handleAddUser} variant='default'>
          Add User
        </Button>
      </div>
      {loading ? (
        <div className='text-center'>Loading...</div>
      ) : error ? (
        <div className='text-center text-red-500'>{error}</div>
      ) : (
        <UserTable
          users={users}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      {deleting && <div className='text-center'>Deleting user...</div>}
    </div>
  );
};

export default HomePage;
