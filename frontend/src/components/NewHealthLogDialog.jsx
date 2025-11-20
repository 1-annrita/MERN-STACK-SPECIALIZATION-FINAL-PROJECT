import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

export default function NewHealthLogDialog({ onCreate }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ type: "", value: "", note: "" });

  function submit(e) {
    e.preventDefault();
    if (!form.type.trim() || !form.value.trim()) return; // Require type and value
    onCreate(form).then(() => {
      setForm({ type: "", value: "", note: "" });
      setOpen(false);
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button>New Health Log</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-4 shadow-xl">
          <Dialog.Title className="text-lg font-semibold mb-2">
            Create Health Log
          </Dialog.Title>
          <form onSubmit={submit} className="space-y-3">
            <Input
              placeholder="Type (e.g., Blood Pressure)"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            />
            <Input
              placeholder="Value (e.g., 120/80)"
              value={form.value}
              onChange={(e) => setForm({ ...form, value: e.target.value })}
            />
            <Textarea
              rows={4}
              placeholder="Note (optional)"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            />
            <div className="flex gap-2">
              <Button type="submit">Create</Button>
              <Button
                type="button"
                className="bg-slate-600 hover:bg-slate-700"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
