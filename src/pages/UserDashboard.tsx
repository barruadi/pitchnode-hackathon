"use client";

import UserNavbar from "../components/UserNavbar";
import { useState } from "react";

// Dummy Data
const FUND_DATA = {
  raised: 1250,
  goal: 2750,
  growth: "+$750 funding in June 2025",
};

const INVESTOR_DATA = {
  total: 123,
  growth: "Gain new 2 investors in June 2025",
};

const PROJECTS = [
  {
    id: 1,
    title: "Project Title",
    description: "Description of project. For example, abcdefg.",
    valuation: "$123K",
    target: "3–12%",
    investors: 12,
    raised: "$957",
    progressNote: "12%",
  },
  {
    id: 2,
    title: "Project Title",
    description: "Description of project. For example, abcdefg.",
    valuation: "$123K",
    target: "3–12%",
    investors: 12,
    raised: "$957",
    progressNote: "12%",
  },
];

const UPDATES = [
  { user: "Investor X", text: "Updated company valuation to $4000", time: "yesterday" },
  { user: "Startup 1", text: "Updated company valuation to $4000", time: "yesterday" },
  { user: "Startup 2", text: "Updated company pitchdeck", time: "2 days ago" },
  { user: "Startup 1", text: "Updated company valuation to $2000", time: "2 days ago" },
  { user: "Startup 3", text: "We are reaching funding target", time: "3 days ago" },
  { user: "You", text: "You invested $400 in StartUp Name", time: "3 days ago" },
];


;

function FileInput({ id, label, placeholder }: { id: string; label: string; placeholder: string;}) {
  const [fileName, setFileName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold text-[#64748B]">
        {label}
      </label>
      <label
        htmlFor={id}
        className="w-full h-[40px] flex items-center truncate rounded-md border border-[#EBEBEB] px-4 text-sm text-[#64748B] cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-[#EBEBEB]"
      >
        {fileName || placeholder}
      </label>
      <input
        id={id}
        type="file"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}


function AddProjectModal({ open, onClose }: {open: boolean; onClose: () => void;}) {
  const [step, setStep] = useState<1 | 2>(1);

  if (!open) return null;

  const goNext = () => setStep(2);
  const goPrevOrClose = () => (step === 1 ? onClose() : setStep(1));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-xl rounded-xl bg-white p-10 relative min-h-[500px]">
        <h2 className="mb-8 text-center text-2xl font-semibold text-[#324286]">
          Add New Project
        </h2>

        <div className="mb-10 flex items-center justify-center gap-2">
          <div className="flex flex-col items-center">
            <span
              className={`h-4 w-4 rounded-full ${
                step === 1 ? "bg-[#324286]" : "bg-[#86D010]"
              }`}
            />
            <p className="mt-1 text-[10px] font-medium text-[#64748B] text-center">
              Project <br /> Information
            </p>
          </div>

            <div className={`relative h-0.5 w-32 rounded-full overflow-hidden transition-colors duration-300 
              ${step === 1 ? "bg-[#D9D9D9]" : "bg-[#324286]" }`}>
              <div
                className={`absolute left-0 top-0 h-full w-1/2 transition-all duration-300 ${
                  step === 1 ? "bg-[#324286]" : "bg-[#86D010]"}`}/>
            </div>

          <div className="flex flex-col items-center">
            <span className={`h-4 w-4 rounded-full transition-all duration-200 ${
              step === 2 ? "bg-[#324286]" : "bg-[#D9D9D9]"
            }`}/>
            <p className="mt-1 text-[10px] font-medium text-[#64748B] text-center">
              Project <br /> Target
            </p>
          </div>
        </div>

        {step === 1 && (
          <form className="space-y-6 transition-opacity duration-300 opacity-100 pointer-events-auto">
            <div>
              <label htmlFor="title" className="mb-1 block text-sm font-semibold text-[#64748B]">
                Project Title
              </label>
              <input
                id="title"
                placeholder="Add title"
                className="w-full rounded-md border border-[#EBEBEB] px-4 py-2 text-sm placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#EBEBEB]"
              />
            </div>

            <div>
              <label htmlFor="desc" className="mb-1 block text-sm font-semibold text-[#64748B]">
                Project Description
              </label>
              <input
                id="desc"
                placeholder="Add description"
                className="w-full rounded-md border border-[#EBEBEB] px-4 py-2 text-sm placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#EBEBEB]"
              />
            </div>

            <div>
              <label htmlFor="high" className="mb-1 block text-sm font-semibold text-[#64748B]">
                Highlights
              </label>
              <input
                id="high"
                placeholder="Add project’s highlights and key points"
                className="w-full rounded-md border border-[#EBEBEB] px-4 py-2 text-sm placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#EBEBEB]"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FileInput id="uploadImage" label="Upload Image" placeholder="Click to upload image" />
              <FileInput id="uploadDeck" label="Upload Pitch Deck" placeholder="Click to upload pitch deck" />
            </div>
          </form>
        )}

        {step === 2 && (
          <form className="space-y-6 transition-opacity duration-300 opacity-100 pointer-events-auto">
            <div>
              <label htmlFor="fund" className="mb-1 block text-sm font-semibold text-[#64748B]">
                Funding Nominal Target
              </label>
              <input
                id="fund"
                placeholder="Add funding nominal target"
                className="w-full rounded-md border border-[#EBEBEB] px-4 py-2 text-sm placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#EBEBEB]"
              />
            </div>

            <div>
              <label htmlFor="valuation" className="mb-1 block text-sm font-semibold text-[#64748B]">
                Initial Valuation
              </label>
              <input
                id="valuation"
                placeholder="Add initial valuation"
                className="w-full rounded-md border border-[#EBEBEB] px-4 py-2 text-sm placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#EBEBEB]"
              />
            </div>

            <div>
              <label htmlFor="equity" className="mb-1 block text-sm font-semibold text-[#64748B]">
                Equity Offered
              </label>
              <input
                id="equity"
                placeholder="Add offered equity"
                className="w-full rounded-md border border-[#EBEBEB] px-4 py-2 text-sm placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#EBEBEB]"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="start" className="mb-1 block text-sm font-semibold text-[#64748B]">
                  Start Target
                </label>
                <input
                  id="start"
                  placeholder="Add start target"
                  className="w-full h-[40px] rounded-md border border-[#EBEBEB] px-4 py-2 text-sm placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#EBEBEB]"
                />
              </div>
              <div>
                <label htmlFor="end" className="mb-1 block text-sm font-semibold text-[#64748B]">
                  End Target
                </label>
                <input
                  id="end"
                  placeholder="Add end target"
                  className="w-full h-[40px] rounded-md border border-[#EBEBEB] px-4 py-2 text-sm placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#EBEBEB]"
                />
              </div>
            </div>
          </form>
        )}

        <div className="mt-10 flex justify-center gap-6">
          <button
            type="button"
            onClick={goPrevOrClose}
            className="rounded-md px-4 py-2 w-32 border border-gray-400 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          {step === 1 ? (
            <button
              type="button"
              onClick={goNext}
              className="rounded-md px-4 py-2 w-32 bg-[#243B76] text-white hover:bg-[#1a2d5d]"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              className="rounded-md px-4 py-2 w-32 bg-[#243B76] text-white hover:bg-[#1a2d5d]"
            >
              Add Project
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <UserNavbar />
      <main className="bg-gradient-to-r from-[#4162FF]/15 to-[#9665FF]/15 min-h-screen py-8 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex gap-6">
          <section className="flex-[3] space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#FFFFFF]/50 p-6 rounded-xl shadow-sm space-y-2 col-span-2">
                <p className="text-[#324286] text-sm font-medium">Total Fund Raised</p>
                <div className="text-3xl font-bold text-black">
                  ${FUND_DATA.raised.toLocaleString()} <span className="text-[#324286] text-lg">/ ${FUND_DATA.goal.toLocaleString()}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-black rounded-full" style={{ width: `${(FUND_DATA.raised / FUND_DATA.goal) * 100}%` }} />
                </div>
                <p className="text-md text-[#324286]">Trending up this month • <span className="text-[#64748B] text-sm">{FUND_DATA.growth}</span></p>
              </div>
              <div className="bg-[#FFFFFF]/50 p-6 rounded-xl shadow-sm space-y-2">
                <p className="text-[#324286] text-sm font-medium">Total Investors</p>
                <p className="text-3xl font-bold">{INVESTOR_DATA.total}</p>
                <p className="text-sm text-[#324286]">New investor gained</p>
                <p className="text-xs text-[#64748B]">{INVESTOR_DATA.growth}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4 gap-4">
                <h2 className="text-[#324286] text-lg font-semibold">Your Projects</h2>
                <button 
                onClick={() => setOpenModal(true)}
                className="mt-2 px-2 py-1 rounded-md bg-white/70 border border-[#EBEBEB] text-[#0F172A] text-xs font-medium hover:bg-gray-100">
                  + Add New Project
                </button>
              </div>

              <div className="space-y-4">
                {PROJECTS.map((project) => (
                  <div key={project.id} className="bg-white/50 rounded-xl shadow-sm p-4 flex justify-between items-center">
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 bg-white rounded-md" />
                      <div>
                        <div className="flex gap-2">
                          <h3 className="font-semibold">{project.title}</h3>
                          <p className="bg-white/70 rounded-md border border-[#EBEBEB] text-xs text-[#60D600] font-medium">{project.progressNote} <span className="text-xs text-[#0F172A]"></span></p>
                        </div>
                        <p className="text-sm text-[#324286]">{project.description}</p>
                        <div className="flex gap-4 text-xs mt-2 text-[#324286]">
                          <p>Valuation <span className="font-semibold text-black">{project.valuation}</span></p>
                          <p>Target <span className="font-semibold text-black">{project.target}</span></p>
                          <p>Investors <span className="font-semibold text-black">{project.investors}</span></p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg text-[#324286]">{project.raised}</p>
                      <p className="text-xs text-[#64748B]">raised</p>
                      <button className="mt-2 px-3 py-1 text-xs text-[#0F172A] border-2 border-[#EBEBEB] rounded-md hover:bg-gray-100">View More</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-end">
                <div className="flex space-x-2">
                  <button className="w-8 h-8 border rounded-md text-sm font-semibold">1</button>
                  <button className="w-8 h-8 border rounded-md text-sm font-semibold bg-gray-200">2</button>
                </div>
              </div>
            </div>
          </section>

          {/* Right Section: 1/4 */}
          <aside className="flex-[1]">
            <div className="bg-white/50 p-4 rounded-xl space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-[#324286]">Recent Updates</h2>
                <button className="text-xs text-gray-500 hover:underline">see more</button>
              </div>
              
              <div className="space-y-3">
                {UPDATES.map((update, i) => (
                  <div key={i} className="bg-white/70 border border-[#EBEBEB] rounded-lg p-3 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-black" />
                    <div className="flex-1">
                      <p className="text-xs text-[#64748B]">
                        <span className="text-[#0F172A] font-semibold">{update.user}</span> • {update.time}
                      </p>
                      <p className="text-sm text-[#0F172A]">{update.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center text-xs text-[#64748B] pt-4">No More Updates</p>
            </div>
          </aside>
        </div>
      </main>
      <AddProjectModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}

//todo: fetch data