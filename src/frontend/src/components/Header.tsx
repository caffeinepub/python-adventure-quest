import { Progress } from "@/components/ui/progress";
import { Zap } from "lucide-react";

interface HeaderProps {
  xp: number;
}

export default function Header({ xp }: HeaderProps) {
  const level = Math.floor(xp / 100) + 1;
  const xpInLevel = xp % 100;

  return (
    <header
      className="bg-nav-gradient shadow-md sticky top-0 z-50"
      data-ocid="header.section"
    >
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">🐍</span>
          <span className="text-white font-black text-xl tracking-tight">
            CodeQuest
          </span>
        </div>

        <nav
          className="hidden md:flex items-center gap-6"
          data-ocid="nav.section"
        >
          {["Play", "Learn", "Leaderboard"].map((link) => (
            <button
              key={link}
              type="button"
              className="text-white/80 hover:text-white font-semibold text-sm transition-colors"
              data-ocid={`nav.${link.toLowerCase()}.link`}
            >
              {link}
            </button>
          ))}
        </nav>

        <div
          className="flex items-center gap-3 shrink-0"
          data-ocid="header.xp.section"
        >
          <div className="hidden sm:flex flex-col items-end gap-0.5">
            <div className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-gold" fill="currentColor" />
              <span className="text-white text-xs font-bold">{xp} XP</span>
            </div>
            <div className="w-32">
              <Progress value={xpInLevel} className="h-2 bg-white/20" />
            </div>
          </div>
          <div className="bg-gold text-gold-foreground font-black text-sm px-3 py-1 rounded-full shadow">
            Lv {level}
          </div>
        </div>
      </div>
    </header>
  );
}
