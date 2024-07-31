// useUserStore.js
import { create } from 'zustand';
import { getUsers,  updateUser, deleteUser } from '@/api/userApi'; // Ensure to correct the path

const useUserStore = create((set) => {
  // Define initial state.
  const initialState = {
    users: [],
    isLoading: false,
  };

  const setUsers = (users) => {
    set((state) => ({
      users,
      isLoading: false,
    }));
  };

  const fetchUsers = async () => {
    set({ isLoading: true });
    try {
      const users = await getUsers();
      setUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      set({ isLoading: false });
    }
  };

  const addUserToStore = async (user) => {
    try {
      // Make a shallow copy of user data to avoid circular references
      const newUser = { ...user };
  
      // Add newUser to the state
      set((state) => ({
        users: [...state.users, newUser],
      }));
  
      // Return newUser for further use if needed
      return newUser;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  };
  

  const updateUserInStore = async (id, updatedUser) => {
    try {
      const user = await updateUser(id, updatedUser);
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? user : u)),
      }));
      return user;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const deleteUserFromStore = async (id) => {
    try {
      await deleteUser(id);
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };

  const saveUser = async (userData) => {
    const { id, ...rest } = userData;
    try {
      if (id) {
        await updateUserInStore(id, rest);
      } else {
        throw new Error("User ID is required for updating.");
      }
    } catch (error) {
      console.error("Error saving user:", error);
      throw error;
    }
  };

  return {
    ...initialState,
    setUsers,
    fetchUsers,
    addUser: addUserToStore,
    updateUser: updateUserInStore,
    deleteUser: deleteUserFromStore,
    saveUser, // Ensure saveUser is exported
  };
});

export default useUserStore;
