type PageTitleProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  wrapClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

export default function PageTitle({
  title,
  subtitle,
  wrapClassName = "",
  titleClassName = "",
  subtitleClassName = "",
}: PageTitleProps) {
  return (
    <div className={`pageTitle ${wrapClassName}`}>
      <h3
        className={`scroll-m-20 text-xl font-semibold tracking-tight ${titleClassName}`}
      >
        {title}
      </h3>
      <div
        className={`mt-3 text-neutral-600 text-sm leading-tight ${subtitleClassName}`}
      >
        {subtitle}
      </div>
    </div>
  );
}
