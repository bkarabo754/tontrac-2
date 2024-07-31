import React from "react";
import { Button } from "@/components/ui/button";

const ActionButtonGroup = ({
  onSave,
  onCancel,
  saveLabel = "Save",
  cancelLabel = "Cancel",
  saveClassName = "py-3 px-6 border bg-black rounded-lg hover:bg-primary-DEFAULT",
  cancelClassName = "destructive py-3 px-4 rounded-lg ml-3",
}) => {
  return (
    <div className='mt-4'>
      <Button className={saveClassName} type='button' onClick={onSave}>
        {saveLabel}
      </Button>
      <Button
        variant='destructive'
        className={cancelClassName}
        type='button'
        onClick={onCancel}
      >
        {cancelLabel}
      </Button>
    </div>
  );
};

export default ActionButtonGroup;
