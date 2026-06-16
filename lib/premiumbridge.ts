const premiumbridge = async (
  resume: File,
  pdfUrl?: string,
  role?: string,
  jobDescription?: string
) => {
  if (!resume) {
    throw new Error("Resume file is required");
  }

  const formData = new FormData();
  formData.append("resume", resume);

  // If a JD PDF URL is provided, fetch and attach it
  if (pdfUrl) {
    const pdfResponse = await fetch(pdfUrl);
    if (!pdfResponse.ok) {
      throw new Error("Failed to fetch Job Description PDF");
    }
    const pdfBlob = await pdfResponse.blob();
    const jdFile = new File([pdfBlob], "job_description.pdf", { type: "application/pdf" });
    formData.append("jd", jdFile);
  }

  if (role) formData.append("role", role);
  if (jobDescription) formData.append("jobDescription", jobDescription);

  const response = await fetch(process.env.NEXT_PUBLIC_AI_SERVICES_PREMIUM!, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to analyze resume");
  }

  return await response.json();
};

export default premiumbridge;