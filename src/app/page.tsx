import {
  Box,
  SlidersHorizontal,
  MessageSquare,
  Camera,
  Code2,
  BookOpen,
  HelpCircle,
  Plus,
  ChevronDown,
  Bell,
  Maximize2,
  Video,
  Pencil,
  Tag,
  Scissors,
  Layers,
  Link2,
  Sun,
  ChevronRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col bg-white overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="h-14 flex items-center justify-between px-4 border-b border-[#e5e7eb] bg-white shrink-0">
        {/* Left: Workspace */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-[#2563eb] flex items-center justify-center text-white font-semibold text-sm">
            B
          </div>
          <button className="flex items-center gap-1 text-[#1a1a1a] font-medium text-sm hover:bg-gray-100 px-2 py-1 rounded-md transition-colors">
            BATANG
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Center: Breadcrumb */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 text-sm">
          <span className="text-gray-500 hover:text-[#1a1a1a] cursor-pointer transition-colors">Projects</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-[#1a1a1a] font-medium">BATANG</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button className="bg-[#2563eb] text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-[#1d4ed8] transition-colors shadow-sm">
            View in dashboard
          </button>
          <button className="flex items-center gap-1 text-[#1a1a1a] font-medium text-sm px-3 py-1.5 border border-[#e5e7eb] rounded-md hover:bg-gray-50 transition-colors">
            Share
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button className="flex items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-[#2563eb] flex items-center justify-center text-white font-medium text-sm">
              U
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Icon Sidebar */}
        <aside className="w-12 bg-white border-r border-[#e5e7eb] flex flex-col items-center py-3 shrink-0">
          {/* Top Icons */}
          <div className="flex flex-col items-center gap-1">
            <button className="w-8 h-8 rounded-md bg-[#2563eb]/10 flex items-center justify-center group">
              <Box className="w-5 h-5 text-[#2563eb]" />
            </button>
            <button className="w-8 h-8 rounded-md hover:bg-gray-100 flex items-center justify-center transition-colors">
              <SlidersHorizontal className="w-5 h-5 text-gray-500" />
            </button>
            <button className="w-8 h-8 rounded-md hover:bg-gray-100 flex items-center justify-center transition-colors">
              <MessageSquare className="w-5 h-5 text-gray-500" />
            </button>
            <button className="w-8 h-8 rounded-md hover:bg-gray-100 flex items-center justify-center transition-colors">
              <Camera className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Bottom Icons */}
          <div className="mt-auto flex flex-col items-center gap-1">
            <button className="w-8 h-8 rounded-md hover:bg-gray-100 flex items-center justify-center transition-colors">
              <Code2 className="w-5 h-5 text-gray-500" />
            </button>
            <button className="w-8 h-8 rounded-md hover:bg-gray-100 flex items-center justify-center transition-colors">
              <BookOpen className="w-5 h-5 text-gray-500" />
            </button>
            <button className="w-8 h-8 rounded-md hover:bg-gray-100 flex items-center justify-center transition-colors">
              <HelpCircle className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </aside>

        {/* Left Panel - Models */}
        <aside className="w-80 bg-white border-r border-[#e5e7eb] flex flex-col shrink-0">
          {/* Panel Header */}
          <div className="h-12 flex items-center justify-between px-4 border-b border-[#e5e7eb]">
            <span className="font-medium text-sm text-[#1a1a1a]">Models</span>
            <button className="w-6 h-6 rounded hover:bg-gray-100 flex items-center justify-center transition-colors">
              <Plus className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Empty State */}
          <div className="flex-1 flex flex-col items-center justify-center px-8">
            {/* Dotted Box Illustration - Document/Paper style */}
            <div className="w-48 h-36 mb-4">
              <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Outer dashed rounded rectangle - tilted paper effect */}
                <g transform="translate(20, 15) rotate(-8, 80, 60)">
                  <rect x="0" y="0" width="160" height="120" rx="12" stroke="#d1d5db" strokeWidth="2" strokeDasharray="8 5" fill="none" />
                </g>
                {/* Inner document with 3D building elements */}
                <g transform="translate(50, 35) rotate(-8, 50, 45)">
                  {/* Document background */}
                  <rect x="0" y="0" width="100" height="80" rx="6" fill="white" stroke="#d1d5db" strokeWidth="1" />
                  {/* 3D Building representation */}
                  <g transform="translate(20, 15)">
                    {/* Main building block */}
                    <path d="M10 35 L10 10 L35 5 L60 10 L60 35 L35 40 Z" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
                    {/* Top face */}
                    <path d="M10 10 L35 5 L60 10 L35 15 Z" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
                    {/* Side connection */}
                    <path d="M35 15 L35 40" stroke="#9ca3af" strokeWidth="1.5" />
                    {/* Floor lines */}
                    <path d="M12 18 L33 14" stroke="#c4c4c4" strokeWidth="1" />
                    <path d="M12 25 L33 21" stroke="#c4c4c4" strokeWidth="1" />
                    <path d="M12 32 L33 28" stroke="#c4c4c4" strokeWidth="1" />
                    {/* Right side lines */}
                    <path d="M37 14 L58 18" stroke="#c4c4c4" strokeWidth="1" />
                    <path d="M37 21 L58 25" stroke="#c4c4c4" strokeWidth="1" />
                  </g>
                </g>
              </svg>
            </div>
            <p className="text-sm text-gray-500 mb-4">No models loaded, yet.</p>
            <button className="bg-[#2563eb] text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-[#1d4ed8] transition-colors shadow-sm">
              Add model
            </button>
          </div>
        </aside>

        {/* Main Canvas Area */}
        <main className="flex-1 relative bg-[#fafafa] overflow-hidden">
          {/* 3D Viewer Canvas Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fafafa] to-[#f5f5f5]" />

          {/* Right Top Toolbar */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button className="w-9 h-9 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors border border-[#e5e7eb]">
              <Maximize2 className="w-4 h-4 text-gray-600" />
            </button>
            <button className="w-9 h-9 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors border border-[#e5e7eb]">
              <Video className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Bottom Center Toolbar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-1 bg-white px-3 py-2 rounded-full shadow-lg border border-[#e5e7eb]">
              <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                <Pencil className="w-4 h-4 text-gray-600" />
              </button>
              <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                <Tag className="w-4 h-4 text-gray-600" />
              </button>
              <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                <Scissors className="w-4 h-4 text-gray-600" />
              </button>
              <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                <Layers className="w-4 h-4 text-gray-600" />
              </button>
              <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                <Link2 className="w-4 h-4 text-gray-600" />
              </button>
              <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                <Sun className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
