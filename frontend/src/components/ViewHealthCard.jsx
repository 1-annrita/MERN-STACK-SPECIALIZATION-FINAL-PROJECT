import { Card, CardHeader, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { MdEdit, MdDelete, MdSave, MdCancel } from "react-icons/md";

export default function ViewHealthCard({ log, onSave, onDelete, conditions = [] }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({
    type: log.type,
    value: log.value,
    note: log.note,
    conditionId: log.conditionId || "",
  });

  const conditionName = conditions.find(c => c._id === draft.conditionId)?.name || "";

  return (
    <Card className="overflow-hidden bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          {!editing ? (
            <>
              <h3 className="text-lg font-semibold dark:text-white mb-4">{log.type}</h3>
              {conditionName && (
                <h4 className="text-gray-500 dark:text-gray-400">
                  Condition: {conditionName}
                </h4>
              )}
            </>
          ) : (
            <h3 className="text-lg font-semibold dark:text-white">Edit Log</h3>
          )}
        </div>

        {!editing && (
          <div className="flex gap-2 mt-2 sm:mt-0">
            <Button
              className="flex items-center gap-1 bg-slate-700 hover:bg-slate-800 text-white"
              onClick={() => setEditing(true)}
            >
              <MdEdit /> Edit
            </Button>
            <Button
              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => onDelete(log._id)}
            >
              <MdDelete /> Delete
            </Button>
          </div>
        )}
      </CardHeader>

      <CardContent className="">
        {!editing ? (
          <div>
            <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap mb-4">
            Value: {log.value} 
          </p>
            <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap mb-4">
            Note: {log.note }
          </p>
          </div>
          
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave(log._id, draft);
              setEditing(false);
            }}
            className="space-y-3"
          >
            <Input
              value={draft.type}
              onChange={(e) => setDraft({ ...draft, type: e.target.value })}
              placeholder="Type of log"
            />
            <Input
              value={draft.value}
              onChange={(e) => setDraft({ ...draft, value: e.target.value })}
              placeholder="Value"
            />
            <Textarea
              value={draft.note}
              onChange={(e) => setDraft({ ...draft, note: e.target.value })}
              placeholder="Notes"
            />

            {conditions.length > 0 && (
              <select
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                value={draft.conditionId}
                onChange={(e) => setDraft({ ...draft, conditionId: e.target.value })}
              >
                <option value="">Select condition</option>
                {conditions.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            )}

            <div className="flex gap-2">
              <Button
                type="submit"
                className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <MdSave /> Save
              </Button>
              <Button
                type="button"
                className="flex items-center gap-1 bg-slate-600 hover:bg-slate-700 text-white"
                onClick={() => setEditing(false)}
              >
                <MdCancel /> Cancel
              </Button>
            </div>
          </form>
        )}

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Updated {new Date(log.updatedAt).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}
