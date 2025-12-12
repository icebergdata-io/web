import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Clock, ChevronDown, ChevronUp, Calendar, Share2, ExternalLink, CheckCircle } from 'lucide-react';
import ApplicationForm from './ApplicationForm';
import { validateJobData } from '../utils/sanitize';

const JobListing = ({ job }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    // Validate job data structure (defense in depth - React already escapes HTML)
    if (!validateJobData(job)) {
      console.warn('Invalid job data structure detected:', job?.id);
      return null;
    }

    const jobUrl = `${window.location.origin}/careers/${job.id}`;

    const handleShare = (platform) => {
        const text = `Check out this job opportunity: ${job.title} at Iceberg Data`;
        const encodedText = encodeURIComponent(text);
        const encodedUrl = encodeURIComponent(jobUrl);

        const shareUrls = {
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
            whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
            copy: jobUrl
        };

        if (platform === 'copy') {
            navigator.clipboard.writeText(shareUrls.copy);
            setCopySuccess(true);
            setTimeout(() => {
                setCopySuccess(false);
                setShowShareMenu(false);
            }, 2000);
        } else {
            window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
            setShowShareMenu(false);
        }
    };

    return (
        <>
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                {/* Job Header */}
                <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-dark-900 mb-2">{job.title}</h3>
                            {job.alternativeTitle && (
                                <p className="text-lg text-dark-600 mb-3">({job.alternativeTitle})</p>
                            )}
                            <div className="flex flex-wrap gap-3 text-sm text-dark-600">
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4 text-primary-600" />
                                    {job.location} · {job.locationType}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Briefcase className="w-4 h-4 text-primary-600" />
                                    {job.level}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4 text-primary-600" />
                                    {job.contractType}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="relative">
                                <button
                                    onClick={() => setShowShareMenu(!showShareMenu)}
                                    className="px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all"
                                    title="Share this job"
                                >
                                    <Share2 className="w-5 h-5 text-dark-700" />
                                </button>
                                {showShareMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-10">
                                        <button
                                            onClick={() => handleShare('linkedin')}
                                            className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm"
                                        >
                                            <span>📱</span> LinkedIn
                                        </button>
                                        <button
                                            onClick={() => handleShare('twitter')}
                                            className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm"
                                        >
                                            <span>🐦</span> Twitter
                                        </button>
                                        <button
                                            onClick={() => handleShare('whatsapp')}
                                            className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm"
                                        >
                                            <span>💬</span> WhatsApp
                                        </button>
                                        <button
                                            onClick={() => handleShare('copy')}
                                            className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm"
                                        >
                                            {copySuccess ? <CheckCircle className="w-4 h-4 text-green-500" /> : <span>🔗</span>}
                                            {copySuccess ? 'Copied!' : 'Copy Link'}
                                        </button>
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => setShowApplicationForm(true)}
                                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-purple text-white rounded-xl font-medium hover:shadow-lg transition-all whitespace-nowrap"
                            >
                                Apply Now
                            </button>
                        </div>
                    </div>

                    {/* Purpose */}
                    <div className="mb-6">
                        <p className="text-dark-700 leading-relaxed">{job.purpose}</p>
                    </div>

                    {/* Quick Info Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium">
                            {job.department}
                        </span>
                        <span className="px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm font-medium flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Start: {job.startDate}
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
                        >
                            {isExpanded ? (
                                <>
                                    <ChevronUp className="w-5 h-5" />
                                    Show Less
                                </>
                            ) : (
                                <>
                                    <ChevronDown className="w-5 h-5" />
                                    View Full Job Description
                                </>
                            )}
                        </button>
                        <Link
                            to={`/careers/${job.id}`}
                            className="flex items-center gap-2 text-accent-purple font-medium hover:text-accent-purple/80 transition-colors"
                        >
                            <ExternalLink className="w-5 h-5" />
                            View Full Details Page
                        </Link>
                    </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                    <div className="border-t border-gray-100 bg-gray-50 p-6 md:p-8 space-y-8">
                        {/* Responsibilities */}
                        <div>
                            <h4 className="text-xl font-bold text-dark-900 mb-4">Key Responsibilities</h4>
                            <ul className="space-y-2">
                                {job.responsibilities.map((resp, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-dark-700">
                                        <span className="text-primary-600 mt-1">•</span>
                                        <span>{resp}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Technical Requirements */}
                        <div>
                            <h4 className="text-xl font-bold text-dark-900 mb-4">Technical Requirements</h4>

                            <div className="mb-4">
                                <h5 className="font-semibold text-dark-800 mb-2">Must Have:</h5>
                                <ul className="space-y-2">
                                    {job.technicalRequirements.mustHave.map((req, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-dark-700">
                                            <span className="text-green-600 mt-1">✓</span>
                                            <span>{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h5 className="font-semibold text-dark-800 mb-2">Nice to Have:</h5>
                                <ul className="space-y-2">
                                    {job.technicalRequirements.niceToHave.map((req, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-dark-600">
                                            <span className="text-primary-600 mt-1">+</span>
                                            <span>{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Soft Skills */}
                        <div>
                            <h4 className="text-xl font-bold text-dark-900 mb-4">What We&apos;re Looking For</h4>
                            <div className="grid md:grid-cols-2 gap-3">
                                {job.softSkills.map((skill, idx) => (
                                    <div key={idx} className="flex items-start gap-2 text-dark-700">
                                        <span className="text-accent-purple mt-1">◆</span>
                                        <span>{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Success Metrics */}
                        <div>
                            <h4 className="text-xl font-bold text-dark-900 mb-4">Success Metrics (First 90 Days)</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                {job.successMetrics.map((metric, idx) => (
                                    <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200">
                                        <h5 className="font-semibold text-dark-800 mb-1">{metric.objective}</h5>
                                        <p className="text-sm text-dark-600 mb-1">{metric.kpi}</p>
                                        <p className="text-sm font-medium text-primary-600">{metric.target}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Onboarding Plan */}
                        <div>
                            <h4 className="text-xl font-bold text-dark-900 mb-4">30-60-90 Day Plan</h4>
                            <div className="space-y-4">
                                {job.onboardingPlan.map((phase, idx) => (
                                    <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200">
                                        <h5 className="font-semibold text-dark-800 mb-2">{phase.period}</h5>
                                        <p className="text-dark-700 mb-2">{phase.focus}</p>
                                        <p className="text-sm text-primary-600 font-medium">Success: {phase.metrics}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Benefits */}
                        <div>
                            <h4 className="text-xl font-bold text-dark-900 mb-4">What We Offer</h4>
                            <div className="grid md:grid-cols-2 gap-3">
                                {job.benefits.map((benefit, idx) => (
                                    <div key={idx} className="flex items-start gap-2 text-dark-700">
                                        <span className="text-green-600 mt-1">✓</span>
                                        <span>{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Scope */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-lg font-bold text-dark-900 mb-3">In Scope</h4>
                                <ul className="space-y-2">
                                    {job.inScope.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-dark-700 text-sm">
                                            <span className="text-green-600 mt-1">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-dark-900 mb-3">Out of Scope</h4>
                                <ul className="space-y-2">
                                    {job.outOfScope.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-dark-600 text-sm">
                                            <span className="text-gray-400 mt-1">✗</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Compliance Note */}
                        {job.complianceNote && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h5 className="font-semibold text-blue-900 mb-2">Data Ethics & Compliance</h5>
                                <p className="text-sm text-blue-800">{job.complianceNote}</p>
                            </div>
                        )}

                        {/* Apply Button (Bottom) */}
                        <div className="pt-4 flex justify-center">
                            <button
                                onClick={() => setShowApplicationForm(true)}
                                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-purple text-white rounded-xl font-medium hover:shadow-lg transition-all text-lg"
                            >
                                Apply for this Position
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Application Form Modal */}
            {showApplicationForm && (
                <ApplicationForm
                    jobTitle={job.title}
                    onClose={() => setShowApplicationForm(false)}
                />
            )}
        </>
    );
};

JobListing.propTypes = {
    job: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        alternativeTitle: PropTypes.string,
        department: PropTypes.string.isRequired,
        level: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        locationType: PropTypes.string.isRequired,
        contractType: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        purpose: PropTypes.string.isRequired,
        responsibilities: PropTypes.arrayOf(PropTypes.string).isRequired,
        inScope: PropTypes.arrayOf(PropTypes.string).isRequired,
        outOfScope: PropTypes.arrayOf(PropTypes.string).isRequired,
        technicalRequirements: PropTypes.shape({
            mustHave: PropTypes.arrayOf(PropTypes.string).isRequired,
            niceToHave: PropTypes.arrayOf(PropTypes.string).isRequired
        }).isRequired,
        softSkills: PropTypes.arrayOf(PropTypes.string).isRequired,
        successMetrics: PropTypes.arrayOf(PropTypes.object).isRequired,
        onboardingPlan: PropTypes.arrayOf(PropTypes.object).isRequired,
        benefits: PropTypes.arrayOf(PropTypes.string).isRequired,
        selectionProcess: PropTypes.arrayOf(PropTypes.string).isRequired,
        complianceNote: PropTypes.string
    }).isRequired
};

export default JobListing;
