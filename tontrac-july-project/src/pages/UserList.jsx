import React from "react";
import UserTable from "../components/UserTable";
import useUserStore from "../store/useUserStore";

const UserList = () => {
  const users = useUserStore((state) => state.users);

  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-4'>
      <div className='w-full max-w-4xl bg-white shadow-md rounded-lg p-8'>
        <h1 className='text-2xl md:text-3xl font-semibold text-center mb-8'>
          User List
        </h1>
        <UserTable users={users} />
      </div>
    </div>
  );
};

export default UserList;
