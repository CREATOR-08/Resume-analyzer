import premiumbridge from "@/lib/premiumbridge";
import { useAnalysisStore } from "@/store/useAnalysisStore";
export const handleSubmit = async (resumeFile, selectedJob, setLoading, router) => {

  setLoading(true);
  if (!resumeFile) {

    alert(

      "Please upload your resume"

    );

    return;

  }

  if (!selectedJob) {

    alert(

      "Please select a job description"

    );

    return;

  }

  try {

    setLoading(true);

    const result = await premiumbridge(

      resumeFile,

      selectedJob.pdf_url,

      selectedJob.role,

      selectedJob.jd_text

    );

    console.log(result);
    
    useAnalysisStore.getState().setPremiumResult(result);
    useAnalysisStore.getState().setSelectedJob(selectedJob);

    router.push("/summary/premium");

  }

  catch (error) {

    console.error(error);

    alert(

      error instanceof Error

        ? error.message

        : "Analysis failed"

    );

  }

  finally {

    setLoading(false);

  }

};