export default function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-white rounded-lg shadow-md px-6 py-8 min-w-md text-center">{children}</div>;
}
