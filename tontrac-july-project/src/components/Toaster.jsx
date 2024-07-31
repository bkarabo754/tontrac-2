import { ToastProvider, ToastViewport } from "@radix-ui/react-toast";

function Toaster({ children }) {
  return (
    <div className='toast-container'>
      <ToastProvider swipeDirection='right'>
        {children}
        <ToastViewport className='custom-toast-viewport' />
      </ToastProvider>
    </div>
  );
}

export default Toaster;
