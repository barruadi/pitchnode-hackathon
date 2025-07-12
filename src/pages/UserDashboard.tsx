"use client";

import UserNavbar from "../components/UserNavbar";

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

export default function DashboardPage() {
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
                <button className="mt-2 px-2 py-1 rounded-md bg-white/70 border border-[#EBEBEB] text-[#0F172A] text-xs font-medium hover:bg-gray-100">
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
    </>
  );
}
