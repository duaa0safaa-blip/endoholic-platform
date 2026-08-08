export const metadata = {
  title: 'About — Endoholic',
  description: 'About Endoholic — mission, team, and educational approach for endodontics.'
};

export default function AboutPage(){
  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-white mb-4">About Endoholic</h1>
      <p className="text-slate-300 mb-6">Endoholic is a focused educational platform for clinicians and students in endodontics. Our mission is to bridge evidence-based practice with accessible learning materials including interactive courses, peer-reviewed articles, and curated textbooks.</p>

      <section className="bg-slate-800/60 p-6 rounded-xl shadow-soft">
        <h2 className="text-xl font-semibold text-white mb-2">Our Approach</h2>
        <p className="text-slate-300">We emphasize clinically relevant learning: high-quality lectures, case-based sessions, and downloadable resources designed to support day-to-day endodontic practice. Content is authored by specialists and reviewed for clinical validity.</p>
      </section>

      <section className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="bg-slate-800/50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white">For Clinicians</h3>
          <p className="text-slate-300 text-sm">Short practical courses, procedural videos, and advanced case discussions to refine clinical outcomes.</p>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white">For Students</h3>
          <p className="text-slate-300 text-sm">Structured learning paths, foundational modules, and exam-focused materials to support training and certification.</p>
        </div>
      </section>

    </main>
  );
}