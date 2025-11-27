import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

import NewConditionCard from "../components/NewConditionCard";
import ViewConditionCard from "@/components/ViewConditionCard";
import { ConditionsApi } from "../api/conditionsApi";

export default function Dashboard() {
  const { user } = useUser();
  const userId = user?.id;

  const [conditions, setConditions] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  // Load the conditions for the logged-in user
  useEffect(() => {
    if (!userId) return; // wait for Clerk to resolve user

    async function loadConditions() {
      try {
        setStatus("loading");
        const data = await ConditionsApi.list(userId);
        setConditions(data);
        setStatus("success");
      } catch (err) {
        setError(err.message);
        setStatus("error");
      }
    }

    loadConditions();
  }, [userId]);

  // Create new condition
  async function createCondition(payload) {
    const created = await ConditionsApi.create({
      ...payload,
      userId,
      userEmail: user?.primaryEmailAddress?.emailAddress,
    });

    setConditions((prev) => [created, ...prev]);
  }

  // Update existing condition
  async function saveCondition(id, payload) {
    const updated = await ConditionsApi.update(id, payload);
    setConditions((prev) => prev.map((c) => (c._id === id ? updated : c)));
  }

  // Delete a condition
  async function deleteCondition(id) {
    await ConditionsApi.delete(id);
    setConditions((prev) => prev.filter((c) => c._id !== id));
  }

  return (
    <div className="mx-auto max-w-5xl p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {user ? `${user.firstName}'s Conditions` : "Your Conditions"}
        </h2>

        <NewConditionCard onCreate={createCondition} />
      </div>

      {/* Status Messages */}
      {status === "loading" && <p>Loading…</p>}
      {status === "error" && (
        <p className="text-red-600">Error: {error}</p>
      )}
      {status === "success" && conditions.length === 0 && (
        <p>No conditions yet. Create your first condition.</p>
      )}

      {/* Conditions List */}
      <div className="grid gap-3">
        {conditions.map((c) => (
          <ViewConditionCard
            key={c._id}
            card={c}
            onSave={saveCondition}
            onDelete={deleteCondition}
          />
        ))}
      </div>
    </div>
  );
}
