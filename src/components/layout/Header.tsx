import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { SearchIcon, UserIcon, CartIcon, ChevronDownIcon } from "@/components/icons/Icons";

const navLinks = [
  { name: "SHOP", href: "/shop", hasDropdown: true },
  { name: "COLLECTIONS", href: "/collections", hasDropdown: true },
  { name: "ABOUT US", href: "/about", hasDropdown: false },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-surface-soft/90 backdrop-blur-md border-b border-border/50">
      <Container className="h-20 flex items-center justify-between gap-8">
        
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start">
          <Logo />
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group flex items-center gap-1 text-xs font-semibold tracking-wider text-ink hover:text-rose-500 transition-colors focus-ring rounded-sm py-2"
            >
              {link.name}
              {link.hasDropdown && (
                <ChevronDownIcon className="w-3 h-3 text-ink-muted group-hover:text-rose-500 transition-colors" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right: Icons & Mobile Toggle */}
        <div className="flex-1 flex items-center justify-end gap-4">
          <button aria-label="Search" className="p-2 text-ink hover:text-rose-500 transition-colors focus-ring rounded-full hidden sm:block">
            <SearchIcon className="w-5 h-5" />
          </button>
          <button aria-label="Account" className="p-2 text-ink hover:text-rose-500 transition-colors focus-ring rounded-full hidden sm:block">
            <UserIcon className="w-5 h-5" />
          </button>
          
          <button aria-label="Cart" className="p-2 text-ink hover:text-rose-500 transition-colors focus-ring rounded-full relative">
            <CartIcon className="w-5 h-5" />
            <span className="absolute top-1 right-0 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>

          <MobileMenu />
        </div>

      </Container>
    </header>
  );
}