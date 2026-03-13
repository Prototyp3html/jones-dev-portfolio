import { motion } from "framer-motion";
import {
  sectionReveal,
  headingReveal,
  subtitleReveal,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "@/lib/motion";

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["Python", "HTML", "CSS", "JavaScript", "PHP", "Java", "VB.NET"],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      "Django",
      "Node.js",
      "Laravel",
      "Bootstrap",
      "Tailwind CSS",
      "React JS",
      "jQuery",
    ],
  },
  {
    title: "Databases",
    skills: ["MySQL", "PostgreSQL"],
  },
];

const SkillsSection = () => {
  return (
    <motion.section
      id="skills"
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
          Tech <span className="text-gradient">Skills</span>
        </motion.h2>
        <motion.p
          className="text-center text-muted-foreground max-w-xl mx-auto mb-16"
          variants={subtitleReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          Technologies and tools I work with to bring ideas to life.
        </motion.p>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.title}
              className="rounded-xl border border-border bg-card p-6 space-y-5"
              variants={staggerItem}
              whileHover={{ y: -4, boxShadow: "0 12px 24px hsl(var(--foreground) / 0.1)" }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
            >
              <h3 className="text-lg font-display font-semibold text-gradient">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:border-primary/40"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SkillsSection;
