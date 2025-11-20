import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function ViewConditionCard({ card, onSave, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ name: card.name, description: card.description });

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex items-center justify-between">
        {!editing ? (
          <>
            <h3 className="text-lg font-semibold">{card.name}</h3>
            <div className="flex gap-2">
              <Button className="bg-slate-700 hover:bg-slate-800" onClick={()=>{setDraft({ name: card.name, description: card.description }); setEditing(true);}}>Edit</Button>
              <Button className="bg-red-600 hover:bg-red-700" onClick={()=>onDelete(card._id)}>Delete</Button>
            </div>
          </>
        ) : (
          <h3 className="text-lg font-semibold">Edit Note</h3>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {!editing ? (
          <p className="text-slate-700 whitespace-pre-wrap">{card.description || <em>No description</em>}</p>
        ) : (
          <form onSubmit={(e)=>{e.preventDefault(); onSave(card._id, draft); setEditing(false);}} className="space-y-2">
            <Input value={draft.name} onChange={(e)=>setDraft({...draft, name:e.target.value})} />
            <Textarea rows={5} value={draft.description} onChange={(e)=>setDraft({...draft, description:e.target.value})}/>
            <div className="flex gap-2">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">Save</Button>
              <Button type="button" className="bg-slate-600 hover:bg-slate-700" onClick={()=>setEditing(false)}>Cancel</Button>
            </div>
          </form>
        )}
        <p className="text-xs text-slate-500">Updated {new Date(card.updatedAt).toLocaleString()}</p>
      </CardContent>
    </Card>
  );
}