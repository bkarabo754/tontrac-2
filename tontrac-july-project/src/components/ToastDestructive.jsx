import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "./ui/use-toast";
// import { useToast } from "@/lib/use-toast";

export function ToastDestructive() {
  const { toast } = useToast();

  return (
    <Button
      variant='outline'
      onClick={() => {
        toast({
          variant: "toast",
          description: "User has been saved successfully",
        });
      }}
    >
      Show Toast
    </Button>
  );
}
