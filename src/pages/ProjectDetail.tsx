"use client";

import { useState } from "react";
import UserNavbar from "../components/UserNavbar";
import { Plus } from "lucide-react";

// ──────────── Dummy Data ────────────

const PROJECT_DETAILS = {
  title: "Project Title",
  description:
    "Description of project. For example, abcdefg. SP3D is a deep-tech that simplifies digitization for industrial companies and launches disruptive THEIA.",
  highlights: [
    "THEIA: AI powered 2D to 3D reconstruction tool",
    "Cuts reverse-engineering cost by up to 90%",
    "Tech team with extensive experience in AI research",
    "Financed by French Defence Innovation Agency"
  ],
  valuation: "$123,000",
  startTarget: "3 %",
  endTarget: "12 %",
  equityOffered: "$123,000",
  pitchDeck: "PitchDeck.pdf",
  raised: 1300,
  goal: 1600,
  investors: 78,
  tokens: 1234
};


const FINANCE_RECORD = [
  { id: 1, tag: "income", text: "Added financial record for June 2025.", time: "1 day ago" },
  { id: 2, tag: "others", text: "Edit 4 entries in March 2025.", time: "3 days ago" },
];

const DiscussionDummy = [
  {
    id: 1,
    user: "@username",
    time: "2 days ago",
    text: "What are the key features of this project?",
  },
  {
    id: 2,
    user: "@username",
    time: "2 days ago",
    text: "How is the business model of this project?",
    reply:
      "We're raising funds to scale our go‑to‑market & strengthen our AI core.",
  },
];

function StatBox({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white rounded-xl p-6 space-y-2 text-center shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-[#1E1E1E]">{value}</p>
    </div>
  );
}

function Modal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl w-full max-w-lg p-8 space-y-6">
        <h2 className="text-xl font-bold text-center">Create Financial Record</h2>

        <div className="space-y-4">
          <input className="input-box" placeholder="Add description" />
          <input className="input-box" placeholder="Add category" />
          <div className="grid grid-cols-2 gap-4">
            <input className="input-box" placeholder="Start date" />
            <input className="input-box" placeholder="End date" />
          </div>
          <input className="input-box" placeholder="Add nominal" />
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <button onClick={onClose} className="btn-outline w-28">
            Cancel
          </button>
          <button className="btn-primary w-28">Save</button>
        </div>
      </div>
    </div>
  );
}

export default function ProjectDetail() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <UserNavbar />
      <main className="bg-gradient-to-r from-[#4162FF]/15 to-[#9665FF]/15 min-h-screen py-4 px-6 md:px-10">
        <div className="mx-auto w-full max-w-7xl bg-white/50 rounded-2xl py-8 px-6">
          <div className="grid grid-cols-16 gap-6">
            {/* ──── TOP ROW ───────────────────────────────────────── */}
            {/* left 4/16  (thumbnail + highlights) */}
            <div className="col-span-4 space-y-4">
              <div className="w-full h-40 bg-white rounded-md" />
              <div className="bg-white/50 rounded-md p-4 text-sm">
                <h4 className="font-semibold mb-2 text-[#324286]">Project Highlights</h4>
                <ul className="list-disc list-inside space-y-1 text-[#64748B] text-xs">
                  {PROJECT_DETAILS.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* centre 6/16 (title, description, editable fields) */}
            <div className="col-span-6 space-y-4">
              {/* title with inline edit */}
              <div className="inline-flex items-baseline gap-2">
                <h1 className="text-4xl font-bold leading-tight">
                  {PROJECT_DETAILS.title}
                </h1>
                <button className="text-xs text-[#64748B] hover:underline">edit</button>
              </div>

              <p className="text-sm text-[#324286]">
                {PROJECT_DETAILS.description}
              </p>

              {/* INLINE FIELDS grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <label className="space-y-1">
                  <span className="text-[#324286]">Valuation</span>
                  <input
                    readOnly
                    value={PROJECT_DETAILS.valuation}
                    className="w-full border rounded px-2 py-1"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-[#324286]">Pitch Deck</span>
                  <input
                    readOnly
                    value={PROJECT_DETAILS.pitchDeck}
                    className="w-full border rounded px-2 py-1"
                  />
                </label>

                <label className="space-y-1">
                  <span className="text-[#324286]">Start Target</span>
                  <input readOnly value={PROJECT_DETAILS.startTarget} className="w-full border rounded px-2 py-1" />
                </label>
                <label className="space-y-1">
                  <span className="text-[#324286]">End Target</span>
                  <input readOnly value={PROJECT_DETAILS.endTarget} className="w-full border rounded px-2 py-1" />
                </label>

                <label className="space-y-1 col-span-2">
                  <span className="text-[#324286]">Equity Offered</span>
                  <input readOnly value={PROJECT_DETAILS.equityOffered} className="w-full border rounded px-2 py-1" />
                </label>
              </div>
            </div>

            {/* right 6/16 (metrics cards) */}
            <div className="col-span-6 space-y-4">
              <div className="bg-white p-6 rounded-xl space-y-2">
                <p className="text-[#324286] text-sm">Fund Raised</p>
                <p className="text-4xl font-bold">
                  ${PROJECT_DETAILS.raised.toLocaleString()}
                  <span className="text-lg text-[#324286] font-medium"> / ${PROJECT_DETAILS.goal.toLocaleString()}</span>
                </p>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-black rounded-full"
                    style={{ width: `${(PROJECT_DETAILS.raised / PROJECT_DETAILS.goal) * 100}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl text-center">
                  <p className="text-xs text-[#324286]">Investors</p>
                  <p className="text-2xl font-bold">{PROJECT_DETAILS.investors}</p>
                </div>
                <div className="bg-white p-4 rounded-xl text-center">
                  <p className="text-xs text-[#324286]">Tokens</p>
                  <p className="text-2xl font-bold">{PROJECT_DETAILS.tokens}</p>
                </div>
              </div>
            </div>

            <div className="col-span-6 space-y-3 mt-8 bg-white p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-2 text-[#324286]">Discussion</h2>
              <div className="h-64 overflow-y-auto pr-2 space-y-4">
                {DiscussionDummy.map((d) => (
                  <div key={d.id} className="bg-[#F7F7FF] rounded-md p-4 space-y-2">
                    <p className="text-xs text-gray-400">{d.user} • {d.time}</p>
                    <p className="text-sm text-gray-800">{d.text}</p>
                    {d.reply && (
                      <div className="ml-4 pl-3 border-l text-sm text-gray-600">{d.reply}</div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex mt-2 gap-2">
                <input placeholder="Add a new thread or reply" className="input-box flex-1" />
                <button className="btn-primary w-10 h-10 !p-0 flex items-center justify-center">
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div className="col-span-6 mt-8 bg-white p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-2 text-[#324286]">Finance Growth</h2>
              <div className="h-64 flex items-center justify-center text-gray-400">(chart)</div>
            </div>

            {/* Financial Record */}
            <div className="col-span-4 mt-8 bg-white p-6 rounded-xl flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Financial Record</h2>
                <button onClick={() => setOpenModal(true)} className="btn-primary !px-2 !py-1 flex items-center gap-1">
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {FINANCE_RECORD.map((r) => (
                  <div key={r.id} className="border rounded-md p-3 space-y-1 text-sm">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${r.tag==='income'?'bg-green-100 text-green-700':'bg-gray-100 text-gray-700'}`}>{r.tag}</span>
                    <p>{r.text}</p>
                    <p className="text-xs text-gray-400">{r.time}</p>
                  </div>
                ))}
                <p className="text-center text-xs text-gray-400">see more</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)} />

      {/* Tailwind helper classes */}
      <style>{`
        .input-box {
          @apply w-full border rounded-md py-1.5 px-3 text-sm bg-[#F4F4FF] focus:outline-none;
        }
        .btn-primary {
          @apply bg-[#1C245B] text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-[#273071];
        }
        .btn-outline {
          @apply border text-sm font-medium rounded-md px-4 py-2 hover:bg-gray-100;
        }
        .form-label {
          @apply text-xs text-gray-600 font-medium;
        }
      `}</style>
    </>
  );
}
