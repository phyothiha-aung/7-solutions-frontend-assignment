import Link from "next/link";

const nav = [
  { href: "/auto-delete-todo-list", label: "Auto Delete Todo List" },
  { href: "/create-data-from-api", label: "Create Data From API" },
];

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center gap-5 h-dvh">
      {nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-center border border-gray-700 px-4 py-2 min-w-xs rounded-md"
        >
          {item.label}
        </Link>
      ))}
    </main>
  );
}
