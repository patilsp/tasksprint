"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function InviteModal({ sprintId }: { sprintId: string }) {
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");

  const sendInvite = async () => {
    const res = await fetch("/api/invite", {
      method: "POST",
      body: JSON.stringify({ email, sprintId }),
    });
    const data = await res.json();
    setLink(data.inviteLink);
  };

  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite a User</DialogTitle>
        </DialogHeader>
        <Input placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button onClick={sendInvite}>Send Invite</Button>
        {link && (
          <div className="mt-4 text-sm text-green-600">
            Invite Link: <a href={link} target="_blank">{link}</a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
