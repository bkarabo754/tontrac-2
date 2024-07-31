import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ActionButtonGroup from "../components/ActionButton";
import InputField from "../components/InputField";
import { userSchema } from "../lib/userValidation";
import { useNavigation } from "@/context/NavigationContext";
import { getUserById } from "../api/userApi";
import Toaster from "@/components/Toaster";
import { useToast } from "@/components/ui/use-toast";
import useUserStore from "@/store/useUserStore";

function AddUser() {
  const { navigate } = useNavigation();
  const { userId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(userSchema),
  });
  const { toast } = useToast();
  const addUser = useUserStore((state) => state.addUser);

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    }
  }, [userId]);

  const fetchUserData = async (userId) => {
    try {
      const userData = await getUserById(userId);
      reset({
        name: userData.name,
        email: userData.email,
        username: userData.username,
        website: userData.website,
        phone: userData.phone,
        role: userData.role,
      });
    } catch (error) {
      handleApiError(error, "fetching user details");
    }
  };

  const onSubmit = async (data) => {
    try {
      const newUser = { ...data }; // Ensure newUser does not contain circular references
      const savedUser = await addUser(newUser); // Add new user
      alert("User saved successfully");
      navigate(`/user/${savedUser.id}`); // Navigate to user details
    } catch (error) {
      handleApiError(error, "saving user");
    }
  };

  const handleApiError = (error, operation) => {
    console.error(`Error ${operation}:`, error);
    showErrorToast(
      `Error ${operation}`,
      `There was a problem ${operation.toLowerCase()} the user details.`
    );
  };

  const showErrorToast = (title, description) => {
    toast({
      variant: "destructive",
      title,
      description,
      className: "bg-toast text-text",
    });
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-4'>
      <div className='w-full max-w-4xl bg-white shadow-md rounded-lg p-8'>
        <h1 className='text-2xl md:text-3xl font-semibold text-center mb-8'>
          Add User
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
              label='Email Address'
              register={register}
              error={errors.email}
              errorMessage={errors.email?.message}
            />
            <InputField
              id='username'
              label='Username'
              register={register}
              error={errors.username}
              errorMessage={errors.username?.message}
            />
            <InputField
              id='website'
              label='Website Address'
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
              label='Roles'
              register={register}
              error={errors.role}
              errorMessage={errors.role?.message}
            />
          </div>
          <ActionButtonGroup
            onSave={handleSubmit(onSubmit)}
            onCancel={handleCancel}
          />
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default AddUser;
