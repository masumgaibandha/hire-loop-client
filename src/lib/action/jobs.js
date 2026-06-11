const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function createJob(newJobData) {
  const res = await fetch(`${baseUrl}/api/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newJobData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to create job");
  }

  return data;
}