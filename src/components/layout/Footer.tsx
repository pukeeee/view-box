import Link from "next/link";

const Footer = () => {
  return (
    <footer
      id="about"
      className="w-full bg-dracula-background p-8 pt-12 border-t border-dracula-current-line"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-xl font-semibold text-dracula-pink mb-4">
          Про проєкт
        </h2>
        <p className="text-dracula-foreground max-w-2xl mx-auto mb-6">
          ViewBox - це персональна база даних фільмів та серіалів, створена для
          демонстрації сучасних технологій веб-розробки з Next.js, TypeScript та
          Tailwind CSS.
        </p>
        <div className="flex justify-center space-x-6">
          <Link
            href="https://github.com/pukeeee"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dracula-cyan hover:text-dracula-pink"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
