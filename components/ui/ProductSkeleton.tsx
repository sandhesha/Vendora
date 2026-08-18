import { motion } from "framer-motion";

export default function ProductSkeleton() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-3">
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="aspect-square rounded-[1.5rem] bg-white/10"
      />

      <div className="space-y-3 p-3">
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-3 w-3/4 rounded-full bg-white/10"
        />

        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
          className="h-2 w-1/2 rounded-full bg-white/10"
        />

        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          className="h-4 w-1/3 rounded-full bg-white/10"
        />
      </div>
    </div>
  );
}