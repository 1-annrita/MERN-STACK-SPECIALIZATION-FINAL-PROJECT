import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

export default function NewConditionDialog({ onCreate }) {
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
        <Button className="text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800">
          New Condition
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay
          className="
            fixed inset-0 
            bg-black/40 
            dark:bg-black/60 
            backdrop-blur-sm
          "
        />

        {/* Modal */}
        <Dialog.Content
          className="
            fixed left-1/2 top-1/2 
            w-[95vw] max-w-lg 
            -translate-x-1/2 -translate-y-1/2 
            rounded-xl 
            p-4 
            shadow-xl 

            bg-white dark:bg-gray-900 
            text-gray-900 dark:text-gray-100 
            border border-gray-200 dark:border-gray-700
          "
        >
          <Dialog.Title className="text-lg font-semibold mb-2">
            Create Condition
          </Dialog.Title>

          <form onSubmit={submit} className="space-y-3">
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="
                bg-gray-50 dark:bg-gray-800 
                text-gray-900 dark:text-gray-100 
                border-gray-300 dark:border-gray-700
              "
            />

            <Textarea
              rows={6}
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="
                bg-gray-50 dark:bg-gray-800 
                text-gray-900 dark:text-gray-100 
                border-gray-300 dark:border-gray-700
              "
            />

            <div className="flex gap-2">
              <Button
                type="submit"
                className="
                  text-white
                  bg-blue-600 dark:bg-blue-700 
                  hover:bg-blue-700 dark:hover:bg-blue-800
                "
              >
                Create
              </Button>

              <Button
                type="button"
                onClick={() => setOpen(false)}
                className="
                  text-white
                  bg-gray-600 dark:bg-gray-700 
                  hover:bg-gray-700 dark:hover:bg-gray-800
                "
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
