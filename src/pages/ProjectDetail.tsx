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
  { id: 1, tag: "revenue", text: "Added financial record for June 2025.", time: "1 day ago" },
  { id: 2, tag: "others", text: "Edit 4 entries in March 2025.", time: "3 days ago" },
  { id: 3, tag: "others", text: "Edit 4 entries in March 2025.", time: "3 days ago" },
  { id: 4, tag: "others", text: "Edit 4 entries in March 2025.", time: "3 days ago" },
  { id: 5, tag: "others", text: "Edit 4 entries in March 2025.", time: "3 days ago" },
];

const DISCUSSION = [
  {
    id: 1,
    user: '@username',
    time: '2 days ago',
    text: 'What are the key features of this project?',
    likes: 256,
    dislikes: 13,
    comments: 9,
    replies: [],
  },
  {
    id: 2,
    user: '@username',
    time: '2 days ago',
    text: 'How is the business model of this project?',
    likes: 256,
    dislikes: 13,
    comments: 2,
    replies: [
      {
        id: '2-1',
        user: '@founder',
        time: '2 days ago',
        text: "We're raising funds to scale our go-to-market & strengthen our AI core.",
        likes: 12,
        dislikes: 0,
        comments: 0,
      },
    ],
  },
];



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

function PostItem({ item, isReply = false }) {
  return (
    <div className={`space-y-2 ${isReply ? 'mt-2' : ''}`}>
      <p className="text-xs text-[#64748B]">
        <span className="font-medium text-[#0F172A]">{item.user}</span> • {item.time}
      </p>

      <p className="text-[#0F172A]">{item.text}</p>

      <div className="flex gap-6 text-xs">
        <span className="flex items-center gap-1">
          <img src="../assets/icon-like.png" alt="like" className="w-3 h-3" /> 
          <span className="font-medium">{item.likes}</span>
        </span>
        <span className="flex items-center gap-1">
          <img src="../assets/icon-dislike.png" alt="dislike" className="w-3 h-3" /> 
          <span className="font-medium">{item.dislikes}</span>
        </span>
        <span className="flex items-center gap-1">
          <img src="../assets/icon-comment.png" alt="comment" className="w-3 h-3" />
          <span className="font-medium">{item.comments}</span>
        </span>
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
            <div className="col-span-4 space-y-4">
              <div className="w-full h-32 bg-white rounded-md" />
              <div className="bg-white/50 rounded-md p-4 text-sm">
                <h4 className="font-semibold mb-2 text-[#324286]">Project Highlights</h4>
                <ul className="list-disc marker:mr-0.5 marker:text-[#64748B] list-inside space-y-0.5 text-[#64748B] text-[10px]">
                  {PROJECT_DETAILS.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-1">
                      <span className="mt-[1px] text-[10px] leading-none">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-span-6 space-y-4">
              <div className="inline-flex items-baseline gap-2">
                <h1 className="text-4xl font-bold leading-tight">
                  {PROJECT_DETAILS.title}
                </h1>
                <button className="text-xs text-[#64748B] hover:underline">edit</button>
              </div>

              <p className="text-sm text-[#324286]">
                {PROJECT_DETAILS.description}
              </p>

              <div className="grid grid-cols-3 gap-6 text-xs">

                <div className="space-y-4 col-span-2">
                  <label className="grid grid-cols-3 items-center gap-2">
                    <span className="text-[#324286] col-span-1">Valuation</span>
                    <input
                      readOnly
                      value={PROJECT_DETAILS.valuation}
                      className="border border-[#C1C1C1] rounded px-3 py-1 w-full col-span-2 font-sm"
                    />
                  </label>

                  <div className="grid grid-cols-2 gap-4">
                    <label className="grid grid-cols-3 items-center">
                      <span className="text-[#324286] col-span-2">Start Target</span>
                      <input
                        readOnly
                        value={PROJECT_DETAILS.startTarget}
                        className="border border-[#C1C1C1] rounded text-center py-1 w-full col-span-1 font-sm"
                      />
                    </label>

                    <label className="grid grid-cols-3 items-center">
                      <span className="text-[#324286] col-span-2">End Target</span>
                      <input
                        readOnly
                        value={PROJECT_DETAILS.endTarget}
                        className="border border-[#C1C1C1] rounded text-center py-1 w-full col-span-1 font-sm"
                      />
                    </label>
                  </div>

                  <label className="grid grid-cols-3 items-center gap-2">
                    <span className="text-[#324286] col-span-1">Equity Offered</span>
                    <input
                      readOnly
                      value={PROJECT_DETAILS.equityOffered}
                      className="border border-[#C1C1C1] rounded px-3 py-1 w-full col-span-2 font-sm"
                    />
                  </label>
                </div>

                <div className="space-y-4 col-span-1">
                  <div className="flex justify-between items-end">
                    <label className="flex-1 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[#324286]">Pitch Deck</span>
                        <button className="text-xs text-[#64748B] hover:underline">view</button>
                      </div>
                      <input
                        readOnly
                        value={PROJECT_DETAILS.pitchDeck}
                        className="w-full border border-[#C1C1C1] rounded text-center py-1"
                      />
                    </label>
                  </div>

                  <button className="w-full rounded-md border border-[#EBEBEB] py-1 bg-white/70 hover:bg-gray-100 text-xs text-[#0F172A] font-medium">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            <div className="col-span-6 space-y-4">
              <div className="bg-white/50 p-6 rounded-xl space-y-2">
                <p className="text-[#324286] text-md font-semibold">Fund Raised</p>
                <p className="text-4xl font-bold">
                  ${PROJECT_DETAILS.raised.toLocaleString()}
                  <span className="text-lg text-[#324286] font-medium"> / ${PROJECT_DETAILS.goal.toLocaleString()}</span>
                </p>
                <div className="h-2 bg-[F2F2F2] rounded-full">
                  <div
                    className="h-2 bg-black rounded-full"
                    style={{ width: `${(PROJECT_DETAILS.raised / PROJECT_DETAILS.goal) * 100}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/50 p-4 rounded-xl text-left">
                  <p className="text-md font-semibold text-[#324286]">Investors</p>
                  <p className="text-2xl font-bold">{PROJECT_DETAILS.investors}</p>
                </div>
                <div className="bg-white/50 p-4 rounded-xl text-left">
                  <p className="text-md font-semibold text-[#324286]">Tokens</p>
                  <p className="text-2xl font-bold">{PROJECT_DETAILS.tokens}</p>
                </div>
              </div>
            </div>

            <div className="col-span-6 bg-white/50 rounded-xl p-6 flex flex-col mt-2 h-96">
              <h2 className="text-xl font-semibold mb-4 text-[#324286]">Discussion</h2>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-[#5A5A5A] scrollbar-track-[#F2F2F2] scrollbar-thumb-rounded-lg hover:scrollbar-thumb-[#8486f2]">
                {DISCUSSION.map((d) => (
                  <div key={d.id} className="bg-[#FFFFFF]/70 border border-[#EBEBEB] rounded-md p-4 space-y-2 text-sm text-[#0F172A]">
                    <PostItem item={d} />
                    {d.replies?.length > 0 && (
                      <div className="space-y-2 border-t border-[#C1C1C1]">
                        {d.replies.map((r) => (
                          <PostItem key={r.id} item={r} isReply />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="h-2" />
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="mt-3 flex gap-2"
              >
                <input
                  placeholder="Add a new thread or reply"
                  className="flex-1 rounded-md border border-gray-300 bg-[#F7F7FF] px-4 py-2 text-sm outline-none"/>
                <button
                  type="submit"
                  className="
                    flex items-center justify-center
                    w-10 h-10 rounded-md bg-[#324286] hover:bg-[#25346d] active:scale-95
                  "
                >
                  <img src="../assets/send.png" alt="send" className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div className="col-span-6 mt-2 bg-white/50 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-2 text-[#324286]">Finance Growth</h2>
              <div className="h-64 flex items-center justify-center text-gray-400">(chart)</div>
            </div>

            <div className="col-span-4 mt-2 bg-white/50 p-6 rounded-xl flex flex-col relative h-96">
              <h2 className="text-lg font-semibold mb-4 text-[#324286]">Financial Record</h2>

              <div className="flex-1 space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#5A5A5A]/80 scrollbar-track-transparent hover:scrollbar-thumb-[#8486F2]">
                {FINANCE_RECORD.map(r => (
                  <article key={r.id} className="rounded-xl bg-white/70 border border-[#EBEBEB] p-4">
                    <header className="flex items-start justify-between">
                      <span
                        className={`rounded-full px-3 py-0.5 text-[11px] capitalize text-white
                          ${r.tag.toLowerCase() === "revenue"
                            ? "bg-[#60D600]"
                            : "bg-[#64748B]"}`}
                      >
                        {r.tag}
                      </span>
                      <time className="text-[11px] text-[#0F172A]">{r.time}</time>
                    </header>
                    <p className="mt-2 text-sm text-[#0F172A]">{r.text}</p>
                  </article>
                ))}

                <div className="h-2" />
              </div>
              
              <div className="items-center mt-3">
                <button className="mt-4 self-start text-xs text-[#324286] hover:underline">
                  see more
                </button>

                <button
                  onClick={() => setOpenModal(true)}
                  aria-label="add record"
                  className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center
                            rounded-lg bg-[#26347F] shadow-md transition hover:bg-[#1b265e]"
                >
                  <img src="../assets/add-icon.png" alt="" className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Modal open={openModal} onClose={() => setOpenModal(false)} />
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
