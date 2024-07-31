import React, { useEffect, useState } from "react";
import { fetchUserById } from "../api/userApi";
import { useParams } from "react-router-dom";
import useUserStore from "../store/useUserStore";

const UserDetails = () => {
  const { id } = useParams();
  const users = useUserStore((state) => state.users);
  const setUsers = useUserStore((state) => state.setUsers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!users.find((u) => u.id === parseInt(id))) {
      const fetchUser = async () => {
        try {
          const data = await fetchUserById(id);
          setUsers((prevUsers) => [...prevUsers, data]); // Add fetched user to store
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user:", error);
          setLoading(false);
        }
      };
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [id, users, setUsers]);

  if (loading) return <div>Loading...</div>;

  const user = users.find((u) => u.id === parseInt(id));
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>
        {user.firstName} {user.lastName}
      </h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Age: {user.age}</p>
    </div>
  );
};

export default UserDetails;
