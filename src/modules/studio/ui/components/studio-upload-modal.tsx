"use client";

import { Loader2Icon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { ResponsiveModal } from "@/components/responsive-modal";
import { StudioUploader } from "./studio-uploader";
import { useRouter } from "next/navigation";

import { useState } from "react";

export const StudioUploadModal = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const utils = trpc.useUtils();
  const create = trpc.videos.create.useMutation({
    onSuccess: () => {
      toast.success("Video created");
      utils.studio.getMany.invalidate();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const onSuccess = () => {
    if (!create.data?.video.id) return;

    create.reset();
    setOpen(false);
    router.push(`/studio/videos/${create.data.video.id}`);
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) {
      create.reset();
    }
  };

  const handleCreate = () => {
    create.mutate();
  };

  // Open modal when mutation starts
  if (create.isPending && !open) {
    setOpen(true);
  }

  return (
    <>
      <ResponsiveModal
        title="Upload a video"
        open={open}
        onOpenChange={handleOpenChange}
      >
        {create.isError ? (
          <div className="text-red-500">Failed to create video. Please try again.</div>
        ) : create.isPending || !create.data?.url ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <StudioUploader endpoint={create.data.url} onSuccess={onSuccess} />
        )}
      </ResponsiveModal>
      <Button
        variant="secondary"
        onClick={handleCreate}
        disabled={create.isPending}
      >
        {create.isPending ? (
          // Show loading spinner when creating
          <Loader2Icon className="animate-spin" />
        ) : (
          <PlusIcon />
        )}
        Create
      </Button>
    </>
  );
};
