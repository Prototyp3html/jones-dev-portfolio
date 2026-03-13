import { useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import {
  sectionReveal,
  headingReveal,
  subtitleReveal,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "@/lib/motion";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — integrate with backend later
    console.log("Form submitted:", form);
  };

  return (
    <motion.section
      id="contact"
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
          Get in <span className="text-gradient">Touch</span>
        </motion.h2>
        <motion.p
          className="text-center text-muted-foreground max-w-xl mx-auto mb-16"
          variants={subtitleReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          Have a question or want to work together? Drop me a message!
        </motion.p>

        <motion.div
          className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto"
          variants={staggerContainer(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            variants={staggerItem}
          >
            <div>
              <label className="mb-1.5 block text-sm font-medium">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-purple px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90 glow-purple"
            >
              Send Message
            </button>
          </motion.form>

          {/* Socials */}
          <motion.div
            className="flex flex-col justify-center space-y-6"
            variants={staggerItem}
          >
            <p className="text-muted-foreground leading-relaxed">
              Feel free to reach out through the form or connect with me on
              social platforms. I'm always open to discussing new projects and
              opportunities.
            </p>
            <div className="space-y-4">
              <a
                href="#"
                className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="h-5 w-5" />
                <span className="text-sm">github.com/jonesivan</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Linkedin className="h-5 w-5" />
                <span className="text-sm">linkedin.com/in/jonesivan</span>
              </a>
              <a
                href="mailto:jonesivan@example.com"
                className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-5 w-5" />
                <span className="text-sm">jonesivan@example.com</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
