import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import {
  sectionReveal,
  headingReveal,
  subtitleReveal,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "@/lib/motion";

const projects = [
  {
    title: "SafePath Zamboanga",
    description:
      "A web-based navigation system for safer commuter routes in Zamboanga City using weather forecasts and terrain data to help users avoid flood-prone areas.",
    tech: ["TypeScript", "Python", "React", "PostgreSQL"],
    github: "https://github.com/Prototyp3html/2025-CP-SafePathZamboanga",
    liveDemo: "https://safepath-zamboanga-city.vercel.app/",
  },
  {
    title: "WMSU HR Connect",
    description:
      "A comprehensive HR management system for Western Mindanao State University with employee records, leave management, and admin controls built as a monorepo.",
    tech: ["React", "Express.js", "TypeScript", "SQLite"],
    github: "https://github.com/Prototyp3html/wmsu-hr-connect",
    liveDemo: "",
  },
  {
    title: "Wellmeadows Hospital",
    description:
      "A comprehensive hospital management system designed to streamline digital operations, improve workflow efficiency, and enhance overall patient care experience.",
    tech: ["PHP", "MySQL", "JavaScript", "CSS"],
    github: "https://github.com/YzrSaid/Wellmeadows-Hospital",
    liveDemo: "",
  },
  {
    title: "City Smiles Dental Clinic",
    description:
      "A complete dental clinic management system with appointment scheduling, patient records, and service billing integrated into a single platform.",
    tech: ["PHP", "MySQL", "Laravel", "JavaScript"],
    github: "https://github.com/nooniman/CitySmilesRepo",
    liveDemo: "",
  },
];

const ProjectsSection = () => {
  return (
    <motion.section
      id="projects"
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
          My <span className="text-gradient">Projects</span>
        </motion.h2>
        <motion.p
          className="text-center text-muted-foreground max-w-xl mx-auto mb-16"
          variants={subtitleReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          A selection of projects I've built to sharpen my skills.
        </motion.p>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              className="group rounded-xl border border-border bg-card p-6 space-y-4 shadow-sm transition-colors hover:border-primary/40"
              variants={staggerItem}
              whileHover={{
                scale: 1.05,
                y: -8,
                boxShadow: "0 20px 40px hsl(var(--foreground) / 0.15)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{ willChange: "transform, box-shadow" }}
            >
              <h3 className="text-xl font-display font-semibold">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-muted"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-purple px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProjectsSection;
