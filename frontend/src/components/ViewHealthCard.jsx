import { useState } from "react";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function HealthLogCard({ log, onSave, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ type: log.type, value: log.value, note: log.note });

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex items-center justify-between">
        {!editing ? (
          <>
            <h3>{log.type}</h3>
            <div className="flex gap-2">
              <Button onClick={() => { setDraft({ type: log.type, value: log.value, note: log.note }); setEditing(true); }}>Edit</Button>
              <Button className="bg-red-600 hover:bg-red-700" onClick={() => onDelete(log._id)}>Delete</Button>
            </div>
          </>
        ) : (
          <h3>Edit Log</h3>
        )}
      </CardHeader>
      <CardContent>
        {!editing ? (
          <p>{log.value} {log.note && `- ${log.note}`}</p>
        ) : (
          <form onSubmit={e => { e.preventDefault(); onSave(log._id, draft); setEditing(false); }} className="space-y-2">
            <Input value={draft.type} onChange={e => setDraft({ ...draft, type: e.target.value })} />
            <Input value={draft.value} onChange={e => setDraft({ ...draft, value: e.target.value })} />
            <Textarea value={draft.note} onChange={e => setDraft({ ...draft, note: e.target.value })} />
            <div className="flex gap-2">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">Save</Button>
              <Button type="button" className="bg-slate-600 hover:bg-slate-700" onClick={() => setEditing(false)}>Cancel</Button>
            </div>
          </form>
        )}
        <p className="text-xs text-slate-500">Updated {new Date(log.updatedAt).toLocaleString()}</p>
      </CardContent>
    </Card>
  );
}
