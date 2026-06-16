
import ResumeLensHero from '../ResumeLensHero';

/**
 * @typedef {{ id: string; name: string | null; email: string | null } | null} SectionInitialUser
 */

/**
 * @param {{ initialUser?: SectionInitialUser }} props
 */

const Sec1 = ({ initialUser = null }) => {
  return (
    <>
    <ResumeLensHero

                resumeImage="/animation/resume.jfif"

                scoreImage="/animation/score.jpg"

                recommendationImage="/animation/recommendation.jfif"

                skillsImage="/animation/skills.jfif"

                summaryImage="/animation/summary.jfif"

              />
    </>
  )
}

export default Sec1
