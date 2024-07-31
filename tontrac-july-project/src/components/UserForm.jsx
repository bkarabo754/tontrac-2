import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../lib/userValidation"; // Import your validation schema
import InputField from "./InputField";
import { Button } from "./ui/button";

const UserForm = ({ defaultValues, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(userSchema), // Apply validation schema
    defaultValues, // Set default values for editing
  });

  const handleFormSubmit = async (data) => {
    await onSubmit(data); // Pass form data to parent component onSubmit function
  };

  return (
    <form className='space-y-6' onSubmit={handleSubmit(handleFormSubmit)}>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <InputField
          id='firstName'
          label='First Name'
          register={register}
          error={errors.firstName}
          errorMessage={errors.firstName?.message}
        />
        <InputField
          id='lastName'
          label='Last Name'
          register={register}
          error={errors.lastName}
          errorMessage={errors.lastName?.message}
        />
        <InputField
          id='email'
          label='Email Address'
          register={register}
          error={errors.email}
          errorMessage={errors.email?.message}
        />
        <InputField
          id='age'
          label='Age'
          register={register}
          error={errors.age}
          errorMessage={errors.age?.message}
        />
        <InputField
          id='gender'
          label='Gender'
          register={register}
          error={errors.gender}
          errorMessage={errors.gender?.message}
        />
      </div>

      <Button
        type='submit'
        variant='bg-destructive'
        className='bg-black text-white px-5 mt-5'
      >
        Save
      </Button>
    </form>
  );
};

export default UserForm;
