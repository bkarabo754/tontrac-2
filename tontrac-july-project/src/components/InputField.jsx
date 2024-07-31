const InputField = ({
  id,
  label,
  type = "text",
  register,
  error,
  errorMessage,
}) => (
  <div className='flex flex-col'>
    <label htmlFor={id} className='mb-2 font-medium text-gray-700'>
      {label}
    </label>
    <input
      id={id}
      type={type}
      className='border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
      {...register(id)}
    />
    {error && <span className='text-red-500 text-sm mt-1'>{errorMessage}</span>}
  </div>
);

export default InputField;
