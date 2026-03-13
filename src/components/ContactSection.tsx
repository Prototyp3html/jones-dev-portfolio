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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const response = await fetch("https://formsubmit.co/ajax/sevilla.jsivn@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio Contact: ${form.name}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setStatusMessage("Message sent successfully. Thanks for reaching out!");
      setForm({ name: "", email: "", message: "" });
    } catch {
      const subject = encodeURIComponent(`Portfolio Contact: ${form.name}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
      );

      window.location.href = `mailto:sevilla.jsivn@gmail.com?subject=${subject}&body=${body}`;
      setStatusMessage(
        "Automatic send failed, so your email app was opened with the message pre-filled."
      );
    } finally {
      setIsSubmitting(false);
    }
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
              disabled={isSubmitting}
              className="w-full rounded-lg bg-gradient-purple px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90 glow-purple"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
            {statusMessage && (
              <p className="text-sm text-muted-foreground">{statusMessage}</p>
            )}
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
                href="https://github.com/Prototyp3html"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="h-5 w-5" />
                <span className="text-sm">github.com/Prototyp3html</span>
              </a>
              <a
                href="https://www.linkedin.com/in/jones-ivan-sevilla-a022333a6/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Linkedin className="h-5 w-5" />
                <span className="text-sm">linkedin.com/in/jones-ivan-sevilla-a022333a6</span>
              </a>
              <a
                href="mailto:sevilla.jsivn@gmail.com"
                className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-5 w-5" />
                <span className="text-sm">sevilla.jsivn@gmail.com</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
