import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { MdFavorite, MdAssignment, MdUpdate } from "react-icons/md";

import NewHealthLogDialog from "../components/NewHealthLogDialog";
import ViewHealthCard from "../components/ViewHealthCard";
import { HealthLogsApi } from "../api/healthLogsApi";
import { ConditionsApi } from "../api/conditionsApi";


export default function MainDashboard() {
  const { user } = useUser();
  const [logs, setLogs] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  // Load conditions and logs
  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        setStatus("loading");
        const [conds, logsData] = await Promise.all([
          ConditionsApi.list(user.id),
          HealthLogsApi.list(user.id),
        ]);
        setConditions(conds);
        setLogs(logsData);
        setStatus("success");
      } catch (err) {
        setError(err.message);
        setStatus("error");
      }
    })();
  }, [user]);

  // Create a new health log
  async function createLog(payload) {
    const created = await HealthLogsApi.create({
      ...payload,
      userId: user.id,
    });
    setLogs((prev) => [created, ...prev]);
  }

  // Update a log
  async function saveLog(id, payload) {
    const updated = await HealthLogsApi.update(id, payload);
    setLogs((prev) => prev.map((l) => (l._id === id ? updated : l)));
  }

  // Delete a log
  async function deleteLog(id) {
    await HealthLogsApi.delete(id);
    setLogs((prev) => prev.filter((l) => l._id !== id));
  }

  if (status === "loading") return <p className="p-4">Loading dashboard…</p>;
  if (status === "error") return <p className="p-4 text-red-600">Error: {error}</p>;

  return (
    <div className="mx-auto max-w-5xl p-4 space-y-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{user.firstName}'s Dashboard</h2>
        <div className="flex gap-2">
          <NewHealthLogDialog onCreate={createLog} conditions={conditions} />
          <Link
            to="/add-condition"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Add Condition
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="flex items-center gap-3 p-5 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <MdFavorite className="text-red-500 text-3xl" />
          <div className="">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Conditions</p>
            <p className="text-2xl text-center font-bold">{conditions.length}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-5 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <MdAssignment className="text-blue-500 text-3xl" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Health Logs</p>
            <p className="text-2xl text-center font-bold">{logs.length}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-5 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <MdUpdate className="text-green-500 text-3xl" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Most Recent Log</p>
            <p className="text-2xl font-bold">{logs[0]?.type || "None"}</p>
          </div>
        </div>
      </div>

      {/* Recent Health Logs */}
      <div className="space-y-3">
        <h3 className="text-xl font-semibold">Recent Health Logs</h3>
        {logs.slice(0, 5).length > 0 ? (
          logs.slice(0, 5).map((log) => (
            <ViewHealthCard
              key={log._id}
              log={log}
              onSave={saveLog}
              onDelete={deleteLog}
              conditions={conditions}
            />
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No logs yet. Add a new health log to get started.
          </p>
        )}
      </div>
    </div>
  );
}
