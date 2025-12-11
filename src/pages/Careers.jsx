import { motion } from 'framer-motion';
import { Users, Target, Rocket, Heart } from 'lucide-react';
import JobListing from '../components/JobListing';
import SEO from '../components/SEO';
import { jobOpenings } from '../data/jobsData';

const Careers = () => {
    const activeJobs = jobOpenings.filter(job => job.isActive);

    const values = [
        {
            icon: Target,
            title: "Data-Driven Excellence",
            description: "We build solutions that transform raw data into actionable insights for businesses worldwide."
        },
        {
            icon: Rocket,
            title: "Innovation First",
            description: "We embrace cutting-edge technologies and creative problem-solving to stay ahead of the curve."
        },
        {
            icon: Users,
            title: "Collaborative Growth",
            description: "We believe in knowledge sharing, continuous learning, and growing together as a team."
        },
        {
            icon: Heart,
            title: "Work-Life Balance",
            description: "We offer flexible schedules, hybrid work options, and comprehensive benefits to support your well-being."
        }
    ];

    return (
        <>
            <SEO
                title="Careers - Join Iceberg Data"
                description="Join our team of data engineers and help build the future of web scraping and data automation. Explore open positions at Iceberg Data."
                keywords="careers, jobs, data engineer, web scraping engineer, python developer, remote jobs, Bogotá jobs"
                type="website"
            />

            <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-white to-light-50">
                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-4 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-dark-900 mb-6">
                            Build the Future of{' '}
                            <span className="bg-gradient-to-r from-primary-600 via-accent-purple to-accent-cyan bg-clip-text text-transparent">
                                Data Intelligence
                            </span>
                        </h1>
                        <p className="text-xl text-dark-700 mb-8 leading-relaxed">
                            Join our team of innovators who are transforming how businesses extract, process, and leverage data.
                            We&apos;re building cutting-edge scraping and automation solutions for clients worldwide.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-dark-600">
                            <span className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
                                🌍 Global Impact
                            </span>
                            <span className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
                                🚀 Fast-Growing Startup
                            </span>
                            <span className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
                                💡 Cutting-Edge Tech
                            </span>
                            <span className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
                                🎯 Meaningful Work
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Open Positions */}
                <div className="max-w-7xl mx-auto px-4 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-dark-900 mb-4">
                            Open Positions
                        </h2>
                        <p className="text-lg text-dark-600 max-w-2xl mx-auto">
                            {activeJobs.length > 0
                                ? `We're currently hiring for ${activeJobs.length} position${activeJobs.length > 1 ? 's' : ''}. Find your perfect fit below.`
                                : "We don't have any open positions at the moment, but we're always looking for talented individuals. Feel free to send us your resume at careers@icebergdata.io"
                            }
                        </p>
                    </motion.div>

                    <div className="space-y-8">
                        {activeJobs.map((job, index) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <JobListing job={job} />
                            </motion.div>
                        ))}
                    </div>

                    {activeJobs.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-12 text-center shadow-lg"
                        >
                            <div className="max-w-md mx-auto">
                                <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-accent-purple rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Heart className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-dark-900 mb-3">Stay Connected</h3>
                                <p className="text-dark-600 mb-6">
                                    Don&apos;t see a position that fits? We&apos;re always interested in meeting talented people.
                                    Send your resume to careers@icebergdata.io and we&apos;ll keep you in mind for future opportunities.
                                </p>
                                <a
                                    href="mailto:careers@icebergdata.io"
                                    className="inline-block px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-purple text-white rounded-xl font-medium hover:shadow-lg transition-all"
                                >
                                    Send Your Resume
                                </a>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Culture Section */}
                <div className="max-w-7xl mx-auto px-4 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-primary-50 to-accent-purple/10 rounded-2xl p-8 md:p-12"
                    >
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-display font-bold text-dark-900 mb-4">
                                Our Culture
                            </h2>
                            <p className="text-lg text-dark-700 mb-6 leading-relaxed">
                                At Iceberg Data, we foster a culture of innovation, collaboration, and continuous learning.
                                We believe in giving our team members the autonomy to solve complex problems while providing
                                the support and resources they need to succeed. Whether you&apos;re working on cutting-edge AI
                                solutions or optimizing data pipelines, you&apos;ll be making a real impact on businesses worldwide.
                            </p>
                            <div className="grid md:grid-cols-5 gap-4 mt-8">
                                <div className="bg-white rounded-lg p-6 shadow-sm">
                                    <div className="text-3xl font-bold text-primary-600 mb-2">$2,000</div>
                                    <div className="text-sm text-dark-600">Annual Learning Budget</div>
                                </div>
                                <div className="bg-white rounded-lg p-6 shadow-sm">
                                    <div className="text-3xl font-bold text-primary-600 mb-2">📱</div>
                                    <div className="text-sm text-dark-600">Mobile Device Subsidy</div>
                                </div>
                                <div className="bg-white rounded-lg p-6 shadow-sm">
                                    <div className="text-3xl font-bold text-primary-600 mb-2">🚗</div>
                                    <div className="text-sm text-dark-600">Mobility Subsidy</div>
                                </div>
                                <div className="bg-white rounded-lg p-6 shadow-sm">
                                    <div className="text-3xl font-bold text-primary-600 mb-2">🍽️</div>
                                    <div className="text-sm text-dark-600">Meals Coverage</div>
                                </div>
                                <div className="bg-white rounded-lg p-6 shadow-sm">
                                    <div className="text-3xl font-bold text-primary-600 mb-2">🌍</div>
                                    <div className="text-sm text-dark-600">International Clients</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Our Values */}
                <div className="max-w-7xl mx-auto px-4 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-dark-900 mb-4">
                            Why Join Iceberg Data?
                        </h2>
                        <p className="text-lg text-dark-600 max-w-2xl mx-auto">
                            We&apos;re more than just a company—we&apos;re a team of passionate engineers solving real-world problems.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-purple rounded-lg flex items-center justify-center mb-4">
                                    <value.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-dark-900 mb-2">{value.title}</h3>
                                <p className="text-dark-600 text-sm leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </>
    );
};

export default Careers;
