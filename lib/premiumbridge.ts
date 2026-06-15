const premiumbridge = async (

  resume: File,

  pdfUrl: string,

  role: string,

  jobDescription: string

) => {

  // Fetch pdf from Supabase

  const pdfResponse = await fetch(pdfUrl);

  if (!pdfResponse.ok) {

    throw new Error(

      "Failed to fetch Job Description PDF"

    );

  }

  // Convert to Blob

  const pdfBlob = await pdfResponse.blob();

  // Convert Blob to File

  const jdFile = new File(

    [pdfBlob],

    "job_description.pdf",

    {

      type: "application/pdf",

    }

  );

  // Prepare form data

  const formData = new FormData();

  formData.append(

    "resume",

    resume

  );

  formData.append(

    "jd",

    jdFile

  );

  formData.append(

    "role",

    role

  );

  formData.append(

    "jobDescription",

    jobDescription

  );

  const response = await fetch(

    process.env.NEXT_PUBLIC_AI_SERVICES_PREMIUM!,

    {

      method: "POST",

      body: formData,

    }

  );

  if (!response.ok) {

    throw new Error(

      "Failed to analyze resume"

    );

  }

  const result = await response.json();

  return result;

};

export default premiumbridge;