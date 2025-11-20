// import { Link } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

export default function NewConditionDialog({
  // condition,
  onCreate,
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });

  function submit(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    onCreate(form).then(() => {
      setForm({ name: "", description: "" });
      setOpen(false);
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button>New Condition</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-4 shadow-xl">
          <Dialog.Title className="text-lg font-semibold mb-2">
            Create Condition
          </Dialog.Title>
          <form onSubmit={submit} className="space-y-3">
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Textarea
              rows={6}
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
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

    // <div className="border p-4 rounded shadow">
    //   <h2 className="font-semibold">{condition.name}</h2>
    //   <p>{condition.description}</p>
    //   <Link
    //     to={`/condition/${condition._id}`}
    //     className="text-blue-500 mt-2 inline-block"
    //   >
    //     View Logs
    //   </Link>
    // </div>
  );
}
