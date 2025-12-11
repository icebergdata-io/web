import { useState } from 'react';
import PropTypes from 'prop-types';
import { X, Upload, CheckCircle } from 'lucide-react';

const ApplicationForm = ({ jobTitle, onClose }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        linkedin: '',
        portfolio: '',
        yearsExperience: '',
        currentLocation: '',
        availableToRelocate: '',
        coverLetter: '',
        resume: null
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError('File size must be less than 5MB');
                return;
            }
            setFormData(prev => ({ ...prev, resume: file }));
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // Convert resume file to base64 if present
            let resumeData = null;
            if (formData.resume) {
                const file = formData.resume;
                const reader = new FileReader();

                resumeData = await new Promise((resolve, reject) => {
                    reader.onload = () => {
                        const base64 = reader.result.split(',')[1]; // Remove data:mime;base64, prefix
                        resolve({
                            content: base64,
                            filename: file.name,
                            type: file.type
                        });
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            }

            // Prepare submission data
            const submitData = {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                linkedin: formData.linkedin,
                portfolio: formData.portfolio,
                yearsExperience: formData.yearsExperience,
                currentLocation: formData.currentLocation,
                availableToRelocate: formData.availableToRelocate,
                coverLetter: formData.coverLetter,
                jobTitle: jobTitle,
                submittedAt: new Date().toISOString(),
                resume: resumeData
            };

            // Send to backend API
            const response = await fetch('/api/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submitData)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to submit application');
            }

            setIsSubmitted(true);

            // Auto-close after 3 seconds
            setTimeout(() => {
                onClose();
            }, 3000);

        } catch (err) {
            setError(err.message || 'Failed to submit application. Please try again or email us directly at careers@icebergdata.io');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
                    <div className="mb-4 flex justify-center">
                        <CheckCircle className="w-16 h-16 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-dark-900 mb-2">Application Submitted!</h3>
                    <p className="text-dark-600 mb-4">
                        Thank you for applying to {jobTitle}. We&apos;ll review your application and get back to you soon.
                    </p>
                    <p className="text-sm text-dark-500">
                        This window will close automatically...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl w-full my-8">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-dark-900">Apply for Position</h2>
                        <p className="text-dark-600 mt-1">{jobTitle}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-dark-700 mb-1">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-dark-700 mb-1">
                                Email *
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-dark-700 mb-1">
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-dark-700 mb-1">
                                LinkedIn Profile
                            </label>
                            <input
                                type="url"
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Professional Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-dark-700 mb-1">
                                Years of Experience *
                            </label>
                            <select
                                name="yearsExperience"
                                required
                                value={formData.yearsExperience}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                                <option value="">Select...</option>
                                <option value="0-2">0-2 years</option>
                                <option value="3-5">3-5 years</option>
                                <option value="6-10">6-10 years</option>
                                <option value="10+">10+ years</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-dark-700 mb-1">
                                Portfolio / GitHub
                            </label>
                            <input
                                type="url"
                                name="portfolio"
                                value={formData.portfolio}
                                onChange={handleChange}
                                placeholder="https://github.com/..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-dark-700 mb-1">
                                Current Location *
                            </label>
                            <input
                                type="text"
                                name="currentLocation"
                                required
                                value={formData.currentLocation}
                                onChange={handleChange}
                                placeholder="City, Country"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-dark-700 mb-1">
                                Available to Relocate to Bogotá? *
                            </label>
                            <select
                                name="availableToRelocate"
                                required
                                value={formData.availableToRelocate}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                                <option value="">Select...</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                                <option value="maybe">Open to discussion</option>
                            </select>
                        </div>
                    </div>

                    {/* Cover Letter */}
                    <div>
                        <label className="block text-sm font-medium text-dark-700 mb-1">
                            Cover Letter / Why are you interested? *
                        </label>
                        <textarea
                            name="coverLetter"
                            required
                            value={formData.coverLetter}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                            placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                        />
                    </div>

                    {/* Resume Upload */}
                    <div>
                        <label className="block text-sm font-medium text-dark-700 mb-1">
                            Resume / CV * (PDF, max 5MB)
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary-400 transition-colors">
                            <div className="space-y-1 text-center">
                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none">
                                        <span>Upload a file</span>
                                        <input
                                            type="file"
                                            name="resume"
                                            required
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                            className="sr-only"
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PDF, DOC up to 5MB</p>
                                {formData.resume && (
                                    <p className="text-sm text-green-600 font-medium">
                                        ✓ {formData.resume.name}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-dark-700 font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-purple text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

ApplicationForm.propTypes = {
    jobTitle: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ApplicationForm;
