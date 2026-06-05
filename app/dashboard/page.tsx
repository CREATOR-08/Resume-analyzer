export default function Dashboard() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
        <p className="text-zinc-300 mb-6">Welcome to the dashboard. Use the navbar to switch pages.</p>
        <div className="rounded-2xl bg-zinc-900 p-6 shadow-lg ring-1 ring-white/10">
          <p className="text-zinc-300">This page is a placeholder so the navbar routes can load correctly.</p>
        </div>
      </div>
    </div>
  )
}
