interface SectionHeadingProps {
  id: string;
  label: string;
  title: string;
}

export default function SectionHeading({ id, label, title }: SectionHeadingProps) {
  return (
    <div id={id} className="mb-8 scroll-mt-20 border-l-2 border-accent pl-3">
      <p className="text-sm font-mono mb-1.5 tracking-widest uppercase bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
        {label}
      </p>
      <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
    </div>
  );
}
