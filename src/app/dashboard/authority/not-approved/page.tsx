"use client";
import { LogOut } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { authClient } from "@/lib/auth-client";
import { useLogoutModalStore } from "@/store/logout-modal-store";

const NotApprovedPage = () => {
  const { open } = useLogoutModalStore();
  return (
    <div className="h-screen flex items-center justify-center">
      <AlertDialog defaultOpen={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Account Not Approved</AlertDialogTitle>
            <AlertDialogDescription>
              Your account has not yet been approved. Please contact the
              administrator for approval. This process may take some time. Thank
              you for your patience.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => open()}>
              LogOut <LogOut />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default NotApprovedPage;
