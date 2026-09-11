import Link from "next/link";
import { getAdminDashboardData } from "@/lib/admin-data";
import AdminAccountSettings from "@/components/AdminAccountSettings";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function formatDate(date: Date) {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }).format(date);
  } catch {
    return date.toLocaleString();
  }
}

export default async function AdminPage() {
  const data = await getAdminDashboardData();
  const contacts = data.contactSubmissions;
  const subscribers = data.newsletterSubscriptions;
  const isConnected = data.status.connected;

  return (
    <section className="min-h-screen bg-paper py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
          <div>
            <p className="mono-tag text-slate">Private Portal</p>
            <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Administration & Management
            </h1>
            <p className="mt-1 text-sm text-slate">
              Real-time client requests, newsletter subscribers, and account settings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="mono-tag rounded-full border border-line bg-white px-3 py-1.5 text-slate shadow-xs">
              IST (UTC+5:30)
            </span>
            <Link
              href="/admin"
              className="rounded-lg border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink shadow-xs transition hover:bg-paper"
            >
              Refresh
            </Link>
            <a
              href="/api/admin/logout"
              className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
            >
              Sign out
            </a>
          </div>
        </div>

        {/* Counter Metric Cards */}
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <div className="rounded-xl border border-line bg-white p-6 shadow-xs">
            <p className="mono-tag text-slate">Contact Requests</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-4xl font-semibold text-ink">
                {data.counts.totalContacts}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate">
              Total client inquiries captured
            </p>
          </div>

          <div className="rounded-xl border border-line bg-white p-6 shadow-xs">
            <p className="mono-tag text-slate">Newsletter Subscribers</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-4xl font-semibold text-ink">
                {data.counts.totalNewsletters}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate">
              Active email subscriptions
            </p>
          </div>

          <div className="rounded-xl border border-line bg-white p-6 shadow-xs">
            <p className="mono-tag text-slate">System Status</p>
            <div className="mt-2 flex items-center gap-2">
              <span
                className={`h-3 w-3 rounded-full ${isConnected ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`}
              />
              <span className="font-display text-2xl font-semibold text-ink">
                {isConnected ? "Operational & Live" : "Maintenance Mode"}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate">
              Secure cloud synchronization active
            </p>
          </div>
        </div>

        {/* Account & Password Reset Section */}
        <div className="mt-10">
          <AdminAccountSettings />
        </div>

        {/* Section 1: Contact Requests Table */}
        <div className="mt-12">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Client Inquiries</h2>
              <p className="text-xs text-slate">Messages received through website contact forms</p>
            </div>
            <span className="mono-tag text-slate">{contacts.length} total</span>
          </div>

          {contacts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-line bg-white p-10 text-center text-sm text-slate">
              No contact inquiries received yet.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-line bg-white shadow-xs">
              <table className="min-w-[900px] w-full text-left text-sm">
                <thead className="border-b border-line bg-paper-dim text-xs uppercase tracking-wider text-slate">
                  <tr>
                    <th className="px-5 py-4 font-medium">Received (IST)</th>
                    <th className="px-5 py-4 font-medium">Name</th>
                    <th className="px-5 py-4 font-medium">Company</th>
                    <th className="px-5 py-4 font-medium">Contact Details</th>
                    <th className="px-5 py-4 font-medium">Message</th>
                    <th className="px-5 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="align-top text-slate hover:bg-paper/50 transition">
                      <td className="whitespace-nowrap px-5 py-4 text-xs font-mono">
                        {formatDate(contact.createdAt)}
                      </td>
                      <td className="px-5 py-4 font-medium text-ink">
                        {contact.fullName}
                      </td>
                      <td className="px-5 py-4 font-medium text-slate">
                        {contact.company}
                      </td>
                      <td className="px-5 py-4">
                        <a
                          className="font-medium text-indigo hover:text-indigo-light underline"
                          href={`mailto:${contact.email}`}
                        >
                          {contact.email}
                        </a>
                        {contact.phone && (
                          <p className="mt-1 text-xs text-slate font-mono">{contact.phone}</p>
                        )}
                      </td>
                      <td className="max-w-sm whitespace-pre-wrap px-5 py-4 text-xs leading-relaxed text-ink">
                        {contact.message || (
                          <span className="text-slate/60 italic">No message provided.</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-xs">
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 border border-emerald-200">
                          Active & Stored
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Section 2: Newsletter Subscribers Table */}
        <div className="mt-12">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">Newsletter Subscribers</h2>
              <p className="text-xs text-slate">Verified subscriber emails captured across the website</p>
            </div>
            <span className="mono-tag text-slate">{subscribers.length} total</span>
          </div>

          {subscribers.length === 0 ? (
            <div className="rounded-xl border border-dashed border-line bg-white p-10 text-center text-sm text-slate">
              No newsletter subscribers recorded yet.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-line bg-white shadow-xs">
              <table className="min-w-[650px] w-full text-left text-sm">
                <thead className="border-b border-line bg-paper-dim text-xs uppercase tracking-wider text-slate">
                  <tr>
                    <th className="px-5 py-4 font-medium">Subscribed (IST)</th>
                    <th className="px-5 py-4 font-medium">Email Address</th>
                    <th className="px-5 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {subscribers.map((sub) => (
                    <tr key={sub.id} className="text-slate hover:bg-paper/50 transition">
                      <td className="whitespace-nowrap px-5 py-4 text-xs font-mono">
                        {formatDate(sub.createdAt)}
                      </td>
                      <td className="px-5 py-4">
                        <a
                          className="font-medium text-indigo hover:text-indigo-light underline"
                          href={`mailto:${sub.email}`}
                        >
                          {sub.email}
                        </a>
                      </td>
                      <td className="px-5 py-4 text-xs">
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 border border-emerald-200">
                          Subscribed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
