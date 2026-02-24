interface SectionHeadingProps {
  id: string;
  label: string;
  title: string;
}

export default function SectionHeading({ id, label, title }: SectionHeadingProps) {
  return (
    <div id={id} className="mb-8 scroll-mt-20">
      <p className="text-accent text-sm font-mono mb-1.5 tracking-widest uppercase">{label}</p>
      <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
    </div>
  );
}
