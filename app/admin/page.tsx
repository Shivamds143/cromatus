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

function formatFileSize(bytes: number): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function formatExternalUrl(url?: string | null): string {
  if (!url) return "#";
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export default async function AdminPage() {
  const data = await getAdminDashboardData();
  const applications = data.jobApplications;
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
              Candidate resumes, client inquiries, newsletter subscribers, and account credentials.
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
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-indigo/20 bg-white p-6 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-indigo" />
            <p className="mono-tag text-indigo">Job Applications</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-4xl font-semibold text-ink">
                {data.counts.totalApplications}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate">
              Resumes & CVs submitted
            </p>
          </div>

          <div className="rounded-xl border border-line bg-white p-6 shadow-xs">
            <p className="mono-tag text-slate">Contact Requests</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-4xl font-semibold text-ink">
                {data.counts.totalContacts}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate">
              Client inquiries captured
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

        {/* Section 1: Job Applications & Resumes */}
        <div className="mt-12">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-indigo" />
                <h2 className="font-display text-2xl font-semibold text-ink">Job Applications & Resumes</h2>
              </div>
              <p className="text-xs text-slate">Candidates who submitted their CV through the Careers portal</p>
            </div>
            <span className="mono-tag text-indigo font-semibold">{applications.length} candidate{applications.length === 1 ? "" : "s"}</span>
          </div>

          {applications.length === 0 ? (
            <div className="rounded-xl border border-dashed border-line bg-white p-10 text-center text-sm text-slate">
              No job applications or resumes submitted yet.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-line bg-white shadow-xs">
              <table className="min-w-[1050px] w-full text-left text-sm">
                <thead className="border-b border-line bg-paper-dim text-xs uppercase tracking-wider text-slate">
                  <tr>
                    <th className="px-5 py-4 font-medium">Applied (IST)</th>
                    <th className="px-5 py-4 font-medium">Candidate</th>
                    <th className="px-5 py-4 font-medium">Role & Experience</th>
                    <th className="px-5 py-4 font-medium">Contact Details</th>
                    <th className="px-5 py-4 font-medium">Cover Note</th>
                    <th className="px-5 py-4 font-medium text-right">Resume / CV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {applications.map((app) => (
                    <tr key={app.id} className="align-top text-slate hover:bg-paper/50 transition">
                      <td className="whitespace-nowrap px-5 py-4 text-xs font-mono">
                        {formatDate(app.createdAt)}
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-ink">{app.fullName}</p>
                        {app.linkedinUrl && (
                          <a
                            href={formatExternalUrl(app.linkedinUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-flex items-center gap-1 text-xs text-indigo hover:underline"
                          >
                            LinkedIn Profile
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                              <path d="M3 9L9 3M9 3H4.5M9 3V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </a>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center rounded-md bg-indigo/10 px-2.5 py-1 text-xs font-medium text-indigo">
                          {app.position}
                        </span>
                        {app.experience && (
                          <p className="mt-1.5 text-xs text-slate">
                            Exp: <span className="font-medium text-ink">{app.experience}</span>
                          </p>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <a
                          className="font-medium text-indigo hover:text-indigo-light underline block text-xs"
                          href={`mailto:${app.email}`}
                        >
                          {app.email}
                        </a>
                        {app.phone && (
                          <p className="mt-1 text-xs text-slate font-mono">{app.phone}</p>
                        )}
                      </td>
                      <td className="max-w-xs whitespace-pre-wrap px-5 py-4 text-xs leading-relaxed text-ink">
                        {app.message || (
                          <span className="text-slate/60 italic">No note provided.</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`/api/admin/resumes/${app.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo px-3.5 py-2 text-xs font-semibold text-white shadow-2xs transition hover:bg-indigo-light"
                            title="Open resume in new tab"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                            View Resume
                          </a>
                          <a
                            href={`/api/admin/resumes/${app.id}?download=1`}
                            download
                            className="inline-flex items-center rounded-lg border border-line bg-white p-2 text-slate hover:text-ink hover:bg-paper transition shadow-2xs"
                            title="Download original file"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                          </a>
                        </div>
                        <div className="mt-1.5 text-[11px] text-slate/80">
                          <span className="font-mono uppercase">{app.resumeFileName.split('.').pop()}</span>
                          {app.resumeFileSize ? ` &bull; ${formatFileSize(app.resumeFileSize)}` : ""}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Section 2: Contact Requests Table */}
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

        {/* Section 3: Newsletter Subscribers Table */}
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
