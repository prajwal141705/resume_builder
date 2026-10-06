import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Search,
  MapPin,
  Filter,
  Sparkles,
  SlidersHorizontal,
  X,
  FilePlus,
} from 'lucide-react';
import jobService from '../services/jobService';
import resumeService from '../services/resumeService';
import JobCard from '../components/JobCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import toast from 'react-hot-toast';

export const JobBoard = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [skillFilter, setSkillFilter] = useState('All');

  // Modal / Job details sheet
  const [selectedJobForModal, setSelectedJobForModal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [jobsData, resumesData] = await Promise.all([
          jobService.getAllJobs(),
          resumeService.getUserResumes(),
        ]);
        setJobs(Array.isArray(jobsData) ? jobsData : []);
        setResumes(Array.isArray(resumesData) ? resumesData : []);
      } catch (err) {
        console.error('Failed to load job board data:', err);
        toast.error('Failed to load jobs list.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter logic
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      locationFilter === 'All' ||
      job.location.toLowerCase().includes(locationFilter.toLowerCase());

    const matchesSkill =
      skillFilter === 'All' ||
      (job.requiredSkills || []).some(
        (s) => s.toLowerCase() === skillFilter.toLowerCase()
      );

    return matchesSearch && matchesLocation && matchesSkill;
  });

  const handleMatchWithJob = (job) => {
    if (resumes.length === 0) {
      toast.error('Please create a resume first before running AI job matching.');
      navigate('/resume-builder');
      return;
    }

    const primaryResume = resumes[0];
    const resumeId = primaryResume.id || primaryResume._id;
    const fullDesc = `${job.description} ${job.fullDescription || ''} Key Skills: ${(job.requiredSkills || []).join(', ')}`;

    navigate(
      `/job-matcher?resumeId=${resumeId}&jobTitle=${encodeURIComponent(
        job.title
      )}&jobDesc=${encodeURIComponent(fullDesc)}`
    );
  };

  // Collect unique skills and locations for filter dropdowns
  const allLocations = ['All', ...new Set(jobs.map((j) => j.location.split('(')[0].trim()))];
  const allSkills = [
    'All',
    'React',
    'JavaScript',
    'Spring Boot',
    'Java',
    'MongoDB',
    'Docker',
    'TypeScript',
    'Microservices',
  ];

  if (isLoading) {
    return (
      <div className="py-20">
        <LoadingSpinner size="lg" message="Loading tech job openings..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Briefcase className="w-6 h-6 text-emerald-600" />
            Tech Job Board
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Explore verified software engineering and full-stack positions with 1-click AI matching.
          </p>
        </div>

        {resumes.length > 0 ? (
          <div className="text-xs text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200 font-medium">
            Active Target Resume: <strong>{resumes[0].title}</strong>
          </div>
        ) : (
          <button
            onClick={() => navigate('/resume-builder')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-xl border border-brand-200 transition-colors"
          >
            <FilePlus className="w-3.5 h-3.5" />
            Create Resume First
          </button>
        )}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Text Search Input (6 cols) */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by job title, company, or keyword..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-900 placeholder:text-slate-400 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Location Filter (3 cols) */}
          <div className="md:col-span-3 relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 text-sm bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-700 transition-all cursor-pointer"
            >
              {allLocations.map((loc, idx) => (
                <option key={idx} value={loc}>
                  {loc === 'All' ? 'All Locations' : loc}
                </option>
              ))}
            </select>
          </div>

          {/* Skill Filter (3 cols) */}
          <div className="md:col-span-3 relative">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 text-sm bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-700 transition-all cursor-pointer"
            >
              {allSkills.map((sk, idx) => (
                <option key={idx} value={sk}>
                  {sk === 'All' ? 'All Skills' : sk}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active filter count indicator */}
        {(searchTerm || locationFilter !== 'All' || skillFilter !== 'All') && (
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>
              Showing <strong>{filteredJobs.length}</strong> matching openings
            </span>
            <button
              onClick={() => {
                setSearchTerm('');
                setLocationFilter('All');
                setSkillFilter('All');
              }}
              className="text-brand-600 hover:text-brand-700 font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No job openings available"
          description="Try broadening your search query or resetting active filters."
          actionText="Clear Filters"
          onAction={() => {
            setSearchTerm('');
            setLocationFilter('All');
            setSkillFilter('All');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onMatch={handleMatchWithJob}
              onViewDetails={(j) => setSelectedJobForModal(j)}
            />
          ))}
        </div>
      )}

      {/* Job Details Modal */}
      {selectedJobForModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {selectedJobForModal.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedJobForModal.company} • {selectedJobForModal.location}
                </p>
              </div>
              <button
                onClick={() => setSelectedJobForModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Job Overview
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {selectedJobForModal.fullDescription || selectedJobForModal.description}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Required Technical Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {(selectedJobForModal.requiredSkills || []).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-brand-50 text-brand-700 border border-brand-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedJobForModal(null)}
                className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const j = selectedJobForModal;
                  setSelectedJobForModal(null);
                  handleMatchWithJob(j);
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Match with this Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobBoard;
