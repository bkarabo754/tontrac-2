import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import { getUserById, updateUser } from "../api/userApi";
import useUserStore from "../store/useUserStore";
import { Button } from "@/components/ui/button";

const UserPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const user = useUserStore((state) =>
    state.users.find((u) => u.id === parseInt(userId))
  );

  const addUserToStore = useUserStore((state) => state.addUser);
  const deleteUserFromStore = useUserStore((state) => state.deleteUser);
  const updateUserInStore = useUserStore((state) => state.updateUser);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(userId);
        console.log("UserData", userData);
        addUserToStore(userData); // Add user data to store
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError(error.message); // Set error state
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId, addUserToStore]);

  const handleSubmit = async (updatedUser) => {
    try {
      await updateUser(updatedUser.id, updatedUser);
      updateUserInStore(updatedUser.id, updatedUser);
      setIsEditing(false);
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUserFromStore(userId); // Remove user from store and call API
      navigate("/"); // Navigate back to home page after deletion
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleBack = () => {
    navigate("/");
  };

  if (loading) {
    return <p className='text-center text-gray-500'>Loading user data...</p>;
  }

  if (error) {
    return (
      <p className='text-center text-red-500'>Error fetching user: {error}</p>
    );
  }

  if (!user) {
    return (
      <p className='text-center text-red-500'>User not found or not loaded.</p>
    );
  }

  return (
    <div className='max-w-2xl mx-auto p-6 mt-32 bg-white shadow-md rounded-lg'>
      <h2 className='text-3xl font-bold mb-6 text-center'>User Details</h2>
      {!isEditing ? (
        <>
          <div className='space-y-4'>
            <div className='flex justify-between'>
              <span className='font-semibold'>ID:</span>
              <span>{user.id}</span>
            </div>
            <div className='flex justify-between'>
              <span className='font-semibold'>Name:</span>
              <span>{`${user.firstName} ${user.lastName}`}</span>
            </div>
            <div className='flex justify-between'>
              <span className='font-semibold'>Email:</span>
              <span>{user.email}</span>
            </div>
            <div className='flex justify-between'>
              <span className='font-semibold'>Age:</span>
              <span>{user.age}</span>
            </div>
            <div className='flex justify-between'>
              <span className='font-semibold'>Gender:</span>
              <span>{user.gender}</span>
            </div>
          </div>
          <div className='mt-6 flex justify-end space-x-4'>
            <Button onClick={handleDelete} variant='default'>
              Delete User
            </Button>
            <Button onClick={() => setIsEditing(true)} variant='default'>
              Edit User
            </Button>
            <Button onClick={handleBack} variant='default'>
              Back to Users
            </Button>
          </div>
        </>
      ) : (
        <div>
          <UserForm
            defaultValues={user}
            onSubmit={handleSubmit}
            onCancel={handleCancelEdit}
          />
          <div className='mt-[-39px] ml-28'>
            <Button onClick={handleCancelEdit} variant='destructive'>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
