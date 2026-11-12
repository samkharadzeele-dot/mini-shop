import { AnimatePresence, motion } from "motion/react";

export function FormField({ label, error, as = "input", ...props }) {
  const Tag = as;
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <Tag className="field__input" {...props} />
      <AnimatePresence>
        {error && (
          <motion.span
            className="field__error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}
