import React from "react";
import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", hover = true, onClick, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -2, scale: 1.005 } : {}}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`rounded-xl glass p-5 ${onClick ? "cursor-pointer" : ""} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
