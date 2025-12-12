import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, MapPin, Briefcase, Clock, Calendar, CheckCircle } from 'lucide-react';
import { jobOpenings } from '../data/jobsData';
import ApplicationForm from '../components/ApplicationForm';
import SEO from '../components/SEO';
import { useState } from 'react';
import { validateJobData } from '../utils/sanitize';

const JobDetail = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const [showApplicationForm, setShowApplicationForm] = useState(false);

    const job = jobOpenings.find(j => j.id === jobId);

    // Validate job data structure (defense in depth - React already escapes HTML)
    if (job && !validateJobData(job)) {
      console.warn('Invalid job data structure detected:', jobId);
    }

    if (!job) {
        return (
            <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-white to-light-50">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-dark-900 mb-4">Job Not Found</h1>
                    <p className="text-lg text-dark-600 mb-8">The position you're looking for doesn't exist or has been filled.</p>
                    <Link
                        to="/careers"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-purple text-white rounded-xl font-medium hover:shadow-lg transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        View All Positions
                    </Link>
                </div>
            </div>
        );
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
            <SEO
                title={`${job.title} - Careers at Iceberg Data`}
                description={job.purpose}
                keywords={`${job.title}, ${job.department}, careers, jobs, Iceberg Data, ${job.location}`}
                type="website"
                ogImage="/logos/logo-large.png"
            />

            <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-white to-light-50">
                <div className="max-w-5xl mx-auto px-4">
                    {/* Back Button & Share */}
                    <div className="flex justify-between items-center mb-8">
                        <button
                            onClick={() => navigate('/careers')}
                            className="flex items-center gap-2 text-dark-700 hover:text-primary-600 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Careers
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setShowShareMenu(!showShareMenu)}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all"
                            >
                                <Share2 className="w-4 h-4" />
                                Share
                            </button>

                            {showShareMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-10">
                                    <button
                                        onClick={() => handleShare('linkedin')}
                                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        <span>📱</span> LinkedIn
                                    </button>
                                    <button
                                        onClick={() => handleShare('twitter')}
                                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        <span>🐦</span> Twitter
                                    </button>
                                    <button
                                        onClick={() => handleShare('whatsapp')}
                                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        <span>💬</span> WhatsApp
                                    </button>
                                    <button
                                        onClick={() => handleShare('copy')}
                                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        {copySuccess ? <CheckCircle className="w-4 h-4 text-green-500" /> : <span>🔗</span>}
                                        {copySuccess ? 'Copied!' : 'Copy Link'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Job Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl p-8 shadow-lg mb-8"
                    >
                        <div className="mb-6">
                            <h1 className="text-4xl font-display font-bold text-dark-900 mb-2">{job.title}</h1>
                            {job.alternativeTitle && (
                                <p className="text-lg text-dark-600">({job.alternativeTitle})</p>
                            )}
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <div className="flex items-center gap-2 text-dark-700">
                                <MapPin className="w-5 h-5 text-primary-600" />
                                <div>
                                    <div className="text-sm text-dark-500">Location</div>
                                    <div className="font-medium">{job.location}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-dark-700">
                                <Briefcase className="w-5 h-5 text-primary-600" />
                                <div>
                                    <div className="text-sm text-dark-500">Department</div>
                                    <div className="font-medium">{job.department}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-dark-700">
                                <Clock className="w-5 h-5 text-primary-600" />
                                <div>
                                    <div className="text-sm text-dark-500">Type</div>
                                    <div className="font-medium">{job.contractType}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-dark-700">
                                <Calendar className="w-5 h-5 text-primary-600" />
                                <div>
                                    <div className="text-sm text-dark-500">Start Date</div>
                                    <div className="font-medium">{job.startDate}</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary-50 border-l-4 border-primary-600 p-4 rounded">
                            <p className="text-dark-800 leading-relaxed">{job.purpose}</p>
                        </div>
                    </motion.div>

                    {/* Job Details */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            {/* Responsibilities */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-xl p-6 shadow-lg"
                            >
                                <h2 className="text-2xl font-bold text-dark-900 mb-4">Key Responsibilities</h2>
                                <ul className="space-y-2">
                                    {job.responsibilities.map((item, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="text-primary-600 mt-1">•</span>
                                            <span className="text-dark-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Requirements */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-xl p-6 shadow-lg"
                            >
                                <h2 className="text-2xl font-bold text-dark-900 mb-4">Requirements</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-dark-800 mb-2">Must Have:</h3>
                                        <ul className="space-y-2">
                                            {job.technicalRequirements.mustHave.map((item, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <span className="text-green-600 mt-1">✓</span>
                                                    <span className="text-dark-700">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-dark-800 mb-2">Nice to Have:</h3>
                                        <ul className="space-y-2">
                                            {job.technicalRequirements.niceToHave.map((item, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <span className="text-blue-600 mt-1">+</span>
                                                    <span className="text-dark-700">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Benefits */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-xl p-6 shadow-lg"
                            >
                                <h2 className="text-2xl font-bold text-dark-900 mb-4">Benefits</h2>
                                <ul className="grid md:grid-cols-2 gap-2">
                                    {job.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="text-accent-purple mt-1">★</span>
                                            <span className="text-dark-700">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Soft Skills */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white rounded-xl p-6 shadow-lg"
                            >
                                <h2 className="text-2xl font-bold text-dark-900 mb-4">What We're Looking For</h2>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {job.softSkills.map((skill, index) => (
                                        <div key={index} className="flex items-start gap-2 text-dark-700">
                                            <span className="text-accent-purple mt-1">◆</span>
                                            <span>{skill}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Success Metrics */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="bg-white rounded-xl p-6 shadow-lg"
                            >
                                <h2 className="text-2xl font-bold text-dark-900 mb-4">Success Metrics (First 90 Days)</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {job.successMetrics.map((metric, index) => (
                                        <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                            <h5 className="font-semibold text-dark-800 mb-1">{metric.objective}</h5>
                                            <p className="text-sm text-dark-600 mb-1">{metric.kpi}</p>
                                            <p className="text-sm font-medium text-primary-600">{metric.target}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Onboarding Plan */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="bg-white rounded-xl p-6 shadow-lg"
                            >
                                <h2 className="text-2xl font-bold text-dark-900 mb-4">30-60-90 Day Plan</h2>
                                <div className="space-y-4">
                                    {job.onboardingPlan.map((phase, index) => (
                                        <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                            <h5 className="font-semibold text-dark-800 mb-2">{phase.period}</h5>
                                            <p className="text-dark-700 mb-2">{phase.focus}</p>
                                            <p className="text-sm text-primary-600 font-medium">Success: {phase.metrics}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Scope */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="bg-white rounded-xl p-6 shadow-lg"
                            >
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-dark-900 mb-3">In Scope</h3>
                                        <ul className="space-y-2">
                                            {job.inScope.map((item, index) => (
                                                <li key={index} className="flex items-start gap-2 text-dark-700 text-sm">
                                                    <span className="text-green-600 mt-1">✓</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-dark-900 mb-3">Out of Scope</h3>
                                        <ul className="space-y-2">
                                            {job.outOfScope.map((item, index) => (
                                                <li key={index} className="flex items-start gap-2 text-dark-600 text-sm">
                                                    <span className="text-gray-400 mt-1">✗</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Compliance Note */}
                            {job.complianceNote && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9 }}
                                    className="bg-blue-50 border border-blue-200 rounded-xl p-6"
                                >
                                    <h5 className="font-semibold text-blue-900 mb-2">Data Ethics & Compliance</h5>
                                    <p className="text-sm text-blue-800">{job.complianceNote}</p>
                                </motion.div>
                            )}
                        </div>

                        {/* Sidebar - Apply Button */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="sticky top-24"
                            >
                                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                                    <h3 className="text-xl font-bold text-dark-900 mb-4">Ready to Apply?</h3>
                                    <p className="text-dark-600 mb-6">
                                        Join our team and help build the future of data intelligence.
                                    </p>
                                    <button
                                        onClick={() => setShowApplicationForm(true)}
                                        className="w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-accent-purple text-white rounded-xl font-medium hover:shadow-lg transition-all text-lg"
                                    >
                                        Apply Now
                                    </button>
                                    <p className="text-sm text-dark-500 mt-4 text-center">
                                        We review all applications within 48 hours
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
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

export default JobDetail;
