import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const footerSections = [
    {
      title: "Shop",
      links: [
        { href: "/men", label: "Men's Collection" },
        { href: "/women", label: "Women's Collection" },
        { href: "/kids", label: "Kids' Collection" },
        { href: "/sale", label: "Sale Items" },
        { href: "/new-arrivals", label: "New Arrivals" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { href: "/help", label: "Help Center" },
        { href: "/contact", label: "Contact Us" },
        { href: "/shipping", label: "Shipping Info" },
        { href: "/returns", label: "Returns & Exchanges" },
        { href: "/size-guide", label: "Size Guide" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about", label: "About Us" },
        { href: "/careers", label: "Careers" },
        { href: "/sustainability", label: "Sustainability" },
        { href: "/press", label: "Press" },
        { href: "/blog", label: "Blog" },
      ],
    },
  ];

  return (
    <footer className="bg-muted mt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Newsletter Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">Stay in Style</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Subscribe to our newsletter for the latest fashion trends, exclusive offers, and style tips.
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <Input placeholder="Enter your email" className="flex-1" />
            <Button variant="accent">
              <Mail className="h-4 w-4 mr-2" />
              Subscribe
            </Button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div>
            <Link to="/" className="font-bold text-2xl text-primary mb-4 block">
              StyleHub
            </Link>
            <p className="text-muted-foreground mb-4">
              Your destination for trendy, high-quality fashion for the whole family.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon-sm">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon-sm">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon-sm">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon-sm">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-muted-foreground text-sm mb-4 md:mb-0">
              © 2024 StyleHub. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-muted-foreground hover:text-foreground">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;