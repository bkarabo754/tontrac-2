import axios from 'axios';

const API_URL = 'https://dummyjson.com/users';

// Fetches all users
export const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data.users;
};

// Fetches user by ID
export const getUserById = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      console.log("Fetched user data:", response.data); // Log fetched data
      return response.data;
    } catch (error) {
      console.error("Error fetching user by ID:", error); // Log detailed error
      throw error; // Rethrow the error for the caller to handle
    }
  };

// Adds new user
export const addUser = async (user) => {
  const response = await axios.post(`${API_URL}/add`, user);
  return response.data;
};

// Updates user
export const updateUser = async (id, user) => {
  const response = await axios.put(`${API_URL}/${id}`, user);
  return response.data;
};

// Deletes user
export const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  };

// Saves user (Update or Add)
export const saveUser = async (userData) => {
    const { id, name, email } = userData; // Example: Simplify `rest`
    
    try {
      if (id) {
        const response = await axios.put(`${API_URL}/${id}`, { name, email });
        return response.data;
      } else {
        throw new Error("User ID is required for updating.");
      }
    } catch (error) {
      console.error("Error saving user:", error);
      throw error;
    }
  };
