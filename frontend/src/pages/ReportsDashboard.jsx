import { useState, useEffect, useContext, useMemo } from "react";
import { useUser } from "@clerk/clerk-react";
import { ThemeContext } from "../context/Theme";

import { ConditionsApi } from "../api/conditionsApi";
import { HealthLogsApi } from "../api/healthLogsApi";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaNotesMedical } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ReportsDashboard() {
  const { user, isLoaded } = useUser();
  const userId = user?.id;
  const { darkMode } = useContext(ThemeContext);

  const [conditions, setConditions] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  // Fetch user conditions
  useEffect(() => {
    if (!isLoaded || !userId) return;

    async function fetchConditions() {
      try {
        const res = await ConditionsApi.list(userId);
        setConditions(res || []);
      } catch (err) {
        console.error("Error fetching conditions:", err);
        setConditions([]);
      }
    }

    fetchConditions();
  }, [isLoaded, userId]);

  // Auto-select first condition
  useEffect(() => {
    if (conditions.length && !selectedCondition) {
      setSelectedCondition(conditions[0]);
    }
  }, [conditions, selectedCondition]);

  // Fetch logs for selected condition
  useEffect(() => {
    if (!selectedCondition || !userId) {
      setLogs([]);
      return;
    }

    let cancelled = false;
    setLoadingLogs(true);

    async function fetchLogs() {
      try {
        const res = await HealthLogsApi.list(userId, selectedCondition._id || selectedCondition.id);
        if (cancelled) return;

        const filtered = Array.isArray(res)
          ? res.filter((l) =>
              l.conditionId
                ? String(l.conditionId) === String(selectedCondition._id || selectedCondition.id)
                : true
            )
          : [];
        setLogs(filtered);
      } catch (err) {
        console.error("Error fetching logs:", err);
        setLogs([]);
      } finally {
        if (!cancelled) setLoadingLogs(false);
      }
    }

    fetchLogs();
    return () => {
      cancelled = true;
    };
  }, [selectedCondition, userId]);

  // Group logs by type
  const grouped = useMemo(() => {
    const g = {};
    for (const log of logs || []) {
      const type = log.type || "Unknown";
      if (!g[type]) g[type] = [];
      g[type].push(log);
    }
    return g;
  }, [logs]);

  // Numeric chart builder
  function buildNumericChartData(entries, label) {
    const sorted = [...entries].sort((a, b) => new Date(a.date) - new Date(b.date));
    const labels = sorted.map((e) => new Date(e.date).toLocaleDateString());
    const data = sorted.map((e) => Number(e.value));
    return {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: "#00b894",
          backgroundColor: "rgba(0,184,148,0.18)",
          tension: 0.3,
          fill: true,
        },
      ],
    };
  }

  // Blood pressure chart builder
  function buildBloodPressureData(entries) {
    const parsed = entries
      .map((e) => {
        const date = new Date(e.date);
        const parts = String(e.value).split("/");
        if (isNaN(date) || parts.length !== 2) return null;
        const systolic = Number(parts[0]);
        const diastolic = Number(parts[1]);
        if (isNaN(systolic) || isNaN(diastolic)) return null;
        return { date, systolic, diastolic, label: date.toLocaleDateString() };
      })
      .filter(Boolean)
      .sort((a, b) => a.date - b.date);

    if (!parsed.length) return null;

    return {
      labels: parsed.map((p) => p.label),
      datasets: [
        {
          label: "Systolic",
          data: parsed.map((p) => p.systolic),
          borderColor: "#0984e3",
          backgroundColor: "rgba(9,132,227,0.18)",
          tension: 0.3,
          fill: false,
        },
        {
          label: "Diastolic",
          data: parsed.map((p) => p.diastolic),
          borderColor: "#d63031",
          backgroundColor: "rgba(214,48,49,0.14)",
          tension: 0.3,
          fill: false,
        },
      ],
    };
  }

  const isEmpty = !conditions.length;

  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaNotesMedical /> Health Reports
      </h1>

      {/* Condition selector */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:gap-6">
        <div className="flex-1">
          <label className="block mb-2 font-medium">Select condition</label>
          <select
            className={`w-full p-2 rounded ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
            value={selectedCondition ? String(selectedCondition._id || selectedCondition.id) : ""}
            onChange={(e) => {
              const id = e.target.value;
              const found = conditions.find((c) => String(c._id || c.id) === id);
              if (found) setSelectedCondition(found);
            }}
          >
            <option key="default" value="">
              {isEmpty ? "No conditions found" : "Select a Condition"}
            </option>
            {conditions.map((c) => (
              <option key={c._id || c.id} value={String(c._id || c.id)}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Report area */}
      {selectedCondition && (
        <>
          {/* Condition header */}
          <div className={`p-4 rounded mb-6 ${darkMode ? "bg-gray-800" : "bg-white"} shadow`}>
            <h2 className="text-xl font-semibold">{selectedCondition.name}</h2>
            {selectedCondition.description && <p className="text-sm mt-1">{selectedCondition.description}</p>}
            <p className="text-xs text-gray-500 mt-2">
              Updated: {selectedCondition.updatedAt ? new Date(selectedCondition.updatedAt).toLocaleString() : "—"}
            </p>
          </div>

          {/* Overall summary */}
          {logs.length > 0 && (
            <div className={`p-4 rounded mb-6 ${darkMode ? "bg-gray-800" : "bg-white"} shadow`}>
              <h2 className="text-xl font-semibold mb-2">Overall Summary</h2>
              <div className="text-sm space-y-1">
                <p>Total conditions: {conditions.length}</p>
                <p>Total logs for this condition: {logs.length}</p>
                {(() => {
                  const numericLogs = logs.filter((l) => !isNaN(Number(l.value)) && !String(l.value).includes("/"));
                  if (!numericLogs.length) return null;
                  const avgAll = (numericLogs.reduce((sum, l) => sum + Number(l.value), 0) / numericLogs.length).toFixed(1);
                  return <p>Average of all numeric metrics: {avgAll}</p>;
                })()}
              </div>
            </div>
          )}

          {/* Loading / No logs */}
          {loadingLogs && <p>Loading logs...</p>}
          {!loadingLogs && !logs.length && <p>No logs recorded for this condition yet.</p>}

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(grouped).map(([type, entries]) => {
              if (!entries.length) return null;
              const lowerType = type.toLowerCase();

              // Blood pressure
              if (lowerType.includes("blood pressure") || entries.some((e) => String(e.value).includes("/"))) {
                const bpData = buildBloodPressureData(entries);
                if (!bpData) return null;
                return (
                  <div key={type} className={`p-4 rounded ${darkMode ? "bg-gray-800" : "bg-white"} shadow`}>
                    <h3 className="font-semibold mb-3">{type} (Systolic / Diastolic)</h3>
                    <Line data={bpData} options={chartOptionsFor(darkMode)} />
                    <div className="mt-3 text-sm">
                      <p>Total readings: {entries.length}</p>
                      {(() => {
                        const parsed = entries
                          .map((e) => {
                            const parts = String(e.value).split("/");
                            if (parts.length !== 2) return null;
                            const s = Number(parts[0]);
                            const d = Number(parts[1]);
                            return isNaN(s) || isNaN(d) ? null : { s, d };
                          })
                          .filter(Boolean);
                        if (!parsed.length) return null;
                        const avgS = (parsed.reduce((acc, p) => acc + p.s, 0) / parsed.length).toFixed(1);
                        const avgD = (parsed.reduce((acc, p) => acc + p.d, 0) / parsed.length).toFixed(1);
                        return <p>Avg: {avgS}/{avgD}</p>;
                      })()}
                    </div>
                  </div>
                );
              }

              // Numeric
              const numeric = entries.filter((e) => !isNaN(Number(e.value)));
              if (!numeric.length) {
                return (
                  <div key={type} className={`p-4 rounded ${darkMode ? "bg-gray-800" : "bg-white"} shadow`}>
                    <h3 className="font-semibold mb-2">{type}</h3>
                    <p className="text-sm mb-2">This metric is non-numeric. Recent notes:</p>
                    <ul className="list-disc pl-5 text-sm">
                      {entries.slice(0, 5).map((e) => (
                        <li key={e._id || e.id || `${type}-${Math.random()}`}>{e.note || String(e.value)}</li>
                      ))}
                    </ul>
                  </div>
                );
              }

              const chart = buildNumericChartData(numeric, type);
              return (
                <div key={type} className={`p-4 rounded ${darkMode ? "bg-gray-800" : "bg-white"} shadow`}>
                  <h3 className="font-semibold mb-3">{type}</h3>
                  <Line data={chart} options={chartOptionsFor(darkMode)} />
                  <div className="mt-3 text-sm">
                    <p>
                      Average {type}: {(numeric.reduce((sum, l) => sum + Number(l.value), 0) / numeric.length).toFixed(1)}
                    </p>
                    <p>Total logs: {numeric.length}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent logs */}
          {logs.length > 0 && (
            <div className={`mt-8 p-4 rounded ${darkMode ? "bg-gray-800" : "bg-white"} shadow`}>
              <h3 className="font-semibold mb-3">Recent logs</h3>
              <ul className="text-sm space-y-2">
                {logs
                  .slice()
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(0, 8)
                  .map((l) => (
                    <li key={l._id || l.id}>
                      <strong>{l.type}:</strong> {String(l.value)} — {l.note || "No note"}{" "}
                      <span className="text-gray-500">({new Date(l.date).toLocaleString()})</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ---------- Helpers ---------- */

function chartOptionsFor(darkMode) {
  return {
    responsive: true,
    plugins: {
      legend: { labels: { color: darkMode ? "#fff" : "#000" } },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { ticks: { color: darkMode ? "#fff" : "#000" } },
      y: { ticks: { color: darkMode ? "#fff" : "#000" } },
    },
  };
}
