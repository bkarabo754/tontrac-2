import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../lib/userValidation";
import { getUserById, saveUser } from "../api/userApi"; // Import the saveUser function
import InputField from "../components/InputField";
import ActionButtonGroup from "../components/ActionButton";
import useUserStore from "@/store/useUserStore";

const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    }
  }, [userId]);

  const fetchUserData = async (userId) => {
    try {
      const userData = await getUserById(userId);
      reset(userData);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      useUserStore.setState({ user: data }); // Example of setting user state in the store
      await saveUser({ ...data, id: userId });
      alert("User saved successfully");
      navigate(`/user/${userId}`); // Navigate to user details
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleCancel = () => {
    navigate("/"); // Navigate to the home page or another appropriate route
  };

  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-4'>
      <div className='w-full max-w-4xl bg-white shadow-md rounded-lg p-8'>
        <h1 className='text-2xl md:text-3xl font-semibold text-center mb-8'>
          {userId ? "Edit User" : "Add User"}
        </h1>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <InputField
              id='name'
              label='Name'
              register={register}
              error={errors.name}
              errorMessage={errors.name?.message}
            />
            <InputField
              id='email'
              label='Email'
              type='email'
              register={register}
              error={errors.email}
              errorMessage={errors.email?.message}
            />
            <InputField
              id='username'
              label='Username'
              type='text'
              register={register}
              error={errors.username}
              errorMessage={errors.username?.message}
            />
            <InputField
              id='website'
              label='Website'
              register={register}
              error={errors.website}
              errorMessage={errors.website?.message}
            />
            <InputField
              id='phone'
              label='Phone'
              register={register}
              error={errors.phone}
              errorMessage={errors.phone?.message}
            />
            <InputField
              id='role'
              label='Role'
              register={register}
              error={errors.role}
              errorMessage={errors.role?.message}
            />
          </div>
          <ActionButtonGroup
            onSave={handleSubmit(onSubmit)} // Pass handleSubmit(onSubmit) directly
            onCancel={handleCancel}
          />
        </form>
      </div>
    </div>
  );
};

export default EditUser;
