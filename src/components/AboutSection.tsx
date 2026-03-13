import { GraduationCap, Code, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import {
  sectionReveal,
  headingReveal,
  subtitleReveal,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "@/lib/motion";

const highlights = [
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "Bachelor of Science in Information Technology from Western Mindanao State University.",
  },
  {
    icon: Code,
    title: "Full-Stack Development",
    description:
      "Experienced in building end-to-end web applications with modern frameworks and databases.",
  },
  {
    icon: Lightbulb,
    title: "Passion",
    description:
      "Driven by curiosity and a love for solving real-world problems through technology.",
  },
];

const AboutSection = () => {
  return (
    <motion.section
      id="about"
      className="py-24"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl font-display font-bold text-center mb-4"
          variants={headingReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          About <span className="text-gradient">Me</span>
        </motion.h2>
        <motion.p
          className="text-center text-muted-foreground max-w-2xl mx-auto mb-16"
          variants={subtitleReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          A recently graduated IT professional eager to contribute to meaningful
          projects and grow as a developer.
        </motion.p>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {highlights.map((item) => (
            <motion.div
              key={item.title}
              className="rounded-xl border border-border bg-card p-6 space-y-4 transition-colors hover:border-primary/40"
              variants={staggerItem}
              whileHover={{ y: -4, boxShadow: "0 12px 24px hsl(var(--foreground) / 0.1)" }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-purple text-primary-foreground">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-display font-semibold">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
