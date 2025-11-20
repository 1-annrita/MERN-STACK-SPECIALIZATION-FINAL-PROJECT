import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

export default function NewHealthLogDialog({ onCreate, conditions = [] }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ type: "", value: "", note: "", conditionId: "" });

  function submit(e) {
    e.preventDefault();
    if (!form.type.trim() || !form.value.trim()) return;

    onCreate(form).then(() => {
      setForm({ type: "", value: "", note: "", conditionId: "" });
      setOpen(false);
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button className="text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800">
          New Health Log
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl p-4 shadow-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
          <Dialog.Title className="text-lg font-semibold mb-2">Create Health Log</Dialog.Title>

          <form onSubmit={submit} className="space-y-3">
            <Input
              placeholder="Type (e.g., Blood Pressure)"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
            />

            <Input
              placeholder="Value (e.g., 120/80)"
              value={form.value}
              onChange={(e) => setForm({ ...form, value: e.target.value })}
              className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
            />

            <Textarea
              rows={4}
              placeholder="Note (optional)"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
            />

            {/* Condition Dropdown */}
            <select
              value={form.conditionId}
              onChange={(e) => setForm({ ...form, conditionId: e.target.value })}
              className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
            >
              <option value="">-- Link to condition (optional) --</option>
              {conditions.map((cond) => (
                <option key={cond._id} value={cond._id}>
                  {cond.name}
                </option>
              ))}
            </select>

            <div className="flex gap-2">
              <Button type="submit" className="text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800">
                Create
              </Button>
              <Button type="button" onClick={() => setOpen(false)} className="text-white bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800">
                Cancel
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
