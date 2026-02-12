import { usePageContext } from "vike-react/usePageContext";

export function Link({ href, children, className }: { href: string; children: string; className?: string }) {
  const pageContext = usePageContext();
  const { urlPathname } = pageContext;
  const isActive = href === "/" ? urlPathname === href : urlPathname.startsWith(href);
  const activeClass = isActive ? "is-active" : undefined;
  const combinedClassName = [activeClass, className].filter(Boolean).join(" ");
  
  return (
    <a href={href} className={combinedClassName || undefined}>
      {children}
    </a>
  );
}
