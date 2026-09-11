import { getDatabase, checkMongoStatus } from "@/lib/mongodb";
import { getFallbackData } from "@/lib/storage-fallback";

export type ContactSubmission = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  company: string;
  message: string | null;
  createdAt: Date;
  source: "mongodb" | "fallback";
};

export type NewsletterSubscription = {
  id: string;
  email: string;
  createdAt: Date;
  source: "mongodb" | "fallback";
};

export async function getAdminDashboardData() {
  const status = await checkMongoStatus();
  let contactSubmissions: ContactSubmission[] = [];
  let newsletterSubscriptions: NewsletterSubscription[] = [];

  if (status.connected) {
    try {
      const database = await getDatabase();
      const [rawContacts, rawNewsletters] = await Promise.all([
        database.collection("contactSubmissions").find({}).sort({ createdAt: -1 }).toArray(),
        database.collection("newsletterSubscriptions").find({}).sort({ createdAt: -1 }).toArray(),
      ]);

      contactSubmissions = rawContacts.map(
        (submission): ContactSubmission => ({
          id: submission._id.toString(),
          fullName: String(submission.fullName || ""),
          email: String(submission.email || ""),
          phone: submission.phone ? String(submission.phone) : null,
          company: String(submission.company || ""),
          message: submission.message ? String(submission.message) : null,
          createdAt: new Date(submission.createdAt),
          source: "mongodb",
        })
      );

      newsletterSubscriptions = rawNewsletters.map(
        (subscription): NewsletterSubscription => ({
          id: subscription._id.toString(),
          email: String(subscription.email || ""),
          createdAt: new Date(subscription.createdAt),
          source: "mongodb",
        })
      );
    } catch (err: any) {
      console.error("Failed to query collections despite ping:", err);
    }
  }

  // Also include any fallback records
  const fallback = await getFallbackData();
  
  const allContacts: ContactSubmission[] = [
    ...contactSubmissions,
    ...fallback.contactSubmissions,
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const allNewsletters: NewsletterSubscription[] = [
    ...newsletterSubscriptions,
    ...fallback.newsletterSubscriptions,
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return {
    status,
    contactSubmissions: allContacts,
    newsletterSubscriptions: allNewsletters,
    counts: {
      totalContacts: allContacts.length,
      mongoContacts: contactSubmissions.length,
      fallbackContacts: fallback.contactSubmissions.length,
      totalNewsletters: allNewsletters.length,
      mongoNewsletters: newsletterSubscriptions.length,
      fallbackNewsletters: fallback.newsletterSubscriptions.length,
    },
  };
}
