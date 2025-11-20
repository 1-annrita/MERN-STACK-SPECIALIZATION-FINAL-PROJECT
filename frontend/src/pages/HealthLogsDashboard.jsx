import { useState, useEffect } from "react";
import NewHealthLogDialog from "../components/NewHealthLogDialog";
import ViewHealthCard from "../components/ViewHealthCard";
import { HealthLogsApi } from "../api/HealthLogsApi";
import { useUser } from "@clerk/clerk-react";

export default function HealthLogsDashboard({ conditionId }) {
  const { user } = useUser();
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  // Load health logs for this user (and optionally condition)
  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        setStatus("loading");
        const data = await HealthLogsApi.list(user.id, conditionId);
        setLogs(data);
        setStatus("success");
      } catch (err) {
        setError(err.message);
        setStatus("error");
      }
    })();
  }, [user, conditionId]);

  // Create a new health log
  async function createLog(payload) {
    const created = await HealthLogsApi.create({
      ...payload,
      userId: user.id,
      conditionId,
    });
    setLogs((prev) => [created, ...prev]);
  }

  // Save / update a log
  async function saveLog(id, payload) {
    const updated = await HealthLogsApi.update(id, payload);
    setLogs((prev) => prev.map((l) => (l._id === id ? updated : l)));
  }

  // Delete a log
  async function deleteLog(id) {
    await HealthLogsApi.delete(id);
    setLogs((prev) => prev.filter((l) => l._id !== id));
  }

  return (
    <div className="mx-auto max-w-5xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {user ? `${user.firstName}'s Health Logs` : "Health Logs"}
        </h2>
        <NewHealthLogDialog onCreate={createLog} />
      </div>

      {status === "loading" && <p>Loading health logs…</p>}
      {status === "error" && <p className="text-red-600">Error: {error}</p>}
      {status === "success" && logs.length === 0 && (
        <p>No health logs yet. Create your first log!</p>
      )}

      <div className="grid gap-3">
        {logs.map((log) => (
          <ViewHealthCard
            key={log._id}
            log={log}
            onSave={saveLog}
            onDelete={deleteLog}
          />
        ))}
      </div>
    </div>
  );
}
