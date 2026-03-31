import { motion } from "motion/react";
import type { World } from "../backend.d";

const WORLD_STYLES: { emoji: string; gradient: string }[] = [
  {
    emoji: "🌿",
    gradient:
      "linear-gradient(135deg, oklch(0.50 0.14 145), oklch(0.38 0.13 145))",
  },
  {
    emoji: "🌲",
    gradient:
      "linear-gradient(135deg, oklch(0.48 0.13 155), oklch(0.36 0.12 155))",
  },
  {
    emoji: "🌊",
    gradient:
      "linear-gradient(135deg, oklch(0.54 0.14 225), oklch(0.40 0.13 225))",
  },
  {
    emoji: "🏔️",
    gradient:
      "linear-gradient(135deg, oklch(0.50 0.10 265), oklch(0.38 0.09 265))",
  },
  {
    emoji: "🏡",
    gradient:
      "linear-gradient(135deg, oklch(0.62 0.15 55), oklch(0.48 0.14 55))",
  },
];

interface WorldSelectorProps {
  worlds: World[];
  selectedWorld: World | null;
  onSelect: (w: World) => void;
}

export default function WorldSelector({
  worlds,
  selectedWorld,
  onSelect,
}: WorldSelectorProps) {
  return (
    <aside data-ocid="worlds.panel">
      <div className="bg-card-blue rounded-xl shadow-card p-3 flex flex-col gap-2">
        <h2 className="text-white font-black text-base px-1 pt-1 pb-0.5">
          🗺️ World Map
        </h2>
        {worlds.map((world, i) => {
          const style = WORLD_STYLES[i % WORLD_STYLES.length];
          const isSelected = selectedWorld?.id === world.id;
          return (
            <motion.button
              key={world.id.toString()}
              onClick={() => onSelect(world)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-ocid={`worlds.item.${i + 1}`}
              className={`w-full text-left rounded-lg p-3 transition-all border-2 ${
                isSelected
                  ? "border-gold shadow-[0_0_0_3px_oklch(0.83_0.155_80/0.35)]"
                  : "border-transparent"
              }`}
              style={{ background: style.gradient }}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{style.emoji}</span>
                <div className="min-w-0">
                  <p className="text-white font-bold text-sm leading-tight truncate">
                    {world.name}
                  </p>
                  <p className="text-white/70 text-xs truncate">
                    {world.description}
                  </p>
                </div>
                {isSelected && (
                  <span className="ml-auto text-gold text-xs font-black">
                    ▶
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </aside>
  );
}
