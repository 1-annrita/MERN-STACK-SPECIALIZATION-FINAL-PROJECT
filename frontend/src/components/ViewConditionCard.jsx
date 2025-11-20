import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { MdEdit, MdDelete, MdSave, MdCancel } from "react-icons/md";

export default function ViewConditionCard({ card, logs = [], onSave, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ name: card.name, description: card.description });

  return (
    <Card className="overflow-hidden bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex items-center justify-between">
        {!editing ? (
          <>
            <h3 className="text-lg font-semibold dark:text-white">{card.name}</h3>
            <div className="flex gap-2">
              <Button
                className="flex items-center gap-1 bg-slate-700 hover:bg-slate-800 text-white"
                onClick={() => {
                  setDraft({ name: card.name, description: card.description });
                  setEditing(true);
                }}
              >
                <MdEdit /> Edit
              </Button>
              <Button
                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white"
                onClick={() => onDelete(card._id)}
              >
                <MdDelete /> Delete
              </Button>
            </div>
          </>
        ) : (
          <h3 className="text-lg font-semibold dark:text-white">Edit Condition</h3>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {!editing ? (
          <>
            <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
              {card.description || <em>No description provided.</em>}
            </p>

            {logs.length > 0 && (
              <div className="mt-2">
                <h4 className="text-sm font-semibold dark:text-white">Linked Logs:</h4>
                <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
                  {logs.map((log) => (
                    <li key={log._id}>
                      <span className="font-medium">{log.type}</span>: {log.value}{" "}
                      {log.note && <span className="italic">- {log.note}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave(card._id, draft);
              setEditing(false);
            }}
            className="space-y-3"
          >
            <Input
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              placeholder="Condition Name"
            />
            <Textarea
              rows={5}
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              placeholder="Condition Description"
            />
            <div className="flex gap-2">
              <Button type="submit" className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white">
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
          Updated: {new Date(card.updatedAt).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}
