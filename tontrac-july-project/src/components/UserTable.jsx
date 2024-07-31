import React from "react";
import { Button } from "@/components/ui/button";
import useUserStore from "../store/useUserStore";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserTable = ({ onView, onEdit, onDelete }) => {
  const users = useUserStore((state) => state.users);

  // Handle cases where users is not an array
  if (!Array.isArray(users)) {
    return <div>Loading...</div>; // Or handle loading state based on your application logic
  }

  return (
    <div className='px-4 py-2'>
      <div className='max-h-[600px] overflow-y-auto custom-scrollbar mt-[-10px]'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-1/12'>ID</TableHead>
              <TableHead className='w-3/12'>First Name</TableHead>
              <TableHead className='w-3/12'>Last Name</TableHead>
              <TableHead className='w-3/12'>Email</TableHead>
              <TableHead className='w-2/12'>Phone</TableHead>
              <TableHead className='w-2/12 text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell className='flex justify-end space-x-2'>
                  <Button onClick={() => onView(user.id)} variant='default'>
                    View
                  </Button>
                  <Button
                    onClick={() => onEdit(user.id)}
                    variant='default'
                    className='ml-2'
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => onDelete(user.id)}
                    variant='destructive'
                    className='ml-2'
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className='mt-4 text-center text-gray-400'>
        A list of users ({users.length} users)
      </div>
    </div>
  );
};

export default UserTable;
