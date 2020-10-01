export default function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-white rounded-lg shadow-md px-12 py-12 text-center">{children}</div>;
}
