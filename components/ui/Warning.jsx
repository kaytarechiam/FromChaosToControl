export default function Warning({ children }) {
  if (!children) return null;
  return (
    <div className="mb-4 rounded-lg border border-console-warn/40 bg-console-warn/10 px-4 py-3 text-sm text-console-warn">
      <span className="mr-2 font-mono">[!]</span>
      {children}
    </div>
  );
}
