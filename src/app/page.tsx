import Link from "next/link";

const nav = [
  { href: "/auto-delete-todo-list", label: "Auto Delete Todo List" },
  { href: "/create-data-from-api", label: "Create Data From API" },
];

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center gap-5 h-dvh">
      {nav.map((item) => (
        <Link key={item.href} href={item.href} className="item">
          {item.label}
        </Link>
      ))}
    </main>
  );
}
