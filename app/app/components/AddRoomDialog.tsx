"use client";

import { useState } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { newRoom } from "../actions";

export default function AddRoomDialog() {
  const [open, setOpen] = useState(false);

  async function handleSubmit(data: FormData) {
    const roomName = data.get("name");

    if (roomName) {
      const { error, message } = await newRoom(roomName.toString());

      if (error) {
        toast.error(message);
      } else {
        toast.success("Room created successfully");
        setOpen(false);
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New room</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <form action={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>New room</DialogTitle>
            <DialogDescription>
              Create a room to chat with anyone.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Room name</Label>
              <Input id="name" name="name" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
