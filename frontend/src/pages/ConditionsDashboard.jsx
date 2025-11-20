import { useState, useEffect } from "react";
import NewConditionCard from "../components/NewConditionCard";
import ViewConditionCard from "@/components/ViewConditionCard";
import {ConditionsApi} from "../api/ConditionsApi";
import { useUser } from "@clerk/clerk-react";

export default function Dashboard({ frontendUserId }) {
  const [conditions, setConditions] = useState([]);
  const [status, setStatus] = useState("idle");
  const { user } = useUser();
  const [error, setError] = useState("");

  useEffect(()=> {
    (async () => {
      try {
        setStatus("loading");
        const data = await ConditionsApi.list(frontendUserId);
        setConditions(data);
        setStatus("success");
      } catch (e) { setError(e.message); setStatus("error"); }
    })();
  }, [frontendUserId]);

  async function createCondition(payload) {
    // const created = await NotesAPI.create({ 
    // ...payload, 
    // userId: frontendUserId 
    // });
    const created = await ConditionsApi.create({ 
      ...payload, 
      userId: frontendUserId, 
      userEmail: user?.primaryEmailAddress?.emailAddress
    })
    setConditions(prev => [created, ...prev]);
  }
  async function saveCondition(id, payload) {
    const updated = await ConditionsApi.update(id, payload);
    setConditions(prev => prev.map(c => c._id === id ? updated : c));
  }
  async function deleteCondition(id) {
    await ConditionsApi.delete(id);
    setConditions(prev => prev.filter(c => c._id !== id));
  }

  return (
    <div className="mx-auto max-w-5xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {user ? `${user.firstName}'s Conditions` : "Your Conditions"}
        </h2>
        <NewConditionCard onCreate={createCondition} />
      </div>

      {status === "loading" && <p>Loading…</p>}
      {status === "error" && <p className="text-red-600">Error: {error}</p>}
      {status === "success" && conditions.length === 0 && <p>No conditions yet. Create your first condition</p>}

      <div className="grid gap-3">
        {conditions.map(c => (
          <ViewConditionCard key={c._id} card={c} onSave={saveCondition} onDelete={deleteCondition} />
        ))}
      </div>
    </div>
  );
}
