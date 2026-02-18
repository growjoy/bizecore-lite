import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { Shield, Lock, Eye, Database, FileText, AlertCircle } from 'lucide-react';

export default function PrivacyPolicy() {
    const lastUpdated = 'February 14, 2026';

    const sections = [
        {
            icon: Database,
            title: 'Information We Collect',
            content: [
                'We collect information that you provide directly to us, including name, email address, company information, and usage data.',
                'Automatically collected information includes IP address, browser type, device information, and interaction data with our platform.',
                'We use cookies and similar tracking technologies to enhance your experience and analyze platform usage.'
            ]
        },
        {
            icon: Lock,
            title: 'How We Use Your Information',
            content: [
                'To provide, maintain, and improve our services and platform functionality.',
                'To process transactions and send you related information including confirmations and invoices.',
                'To send you technical notices, updates, security alerts, and support messages.',
                'To respond to your comments, questions, and provide customer service.',
                'To monitor and analyze trends, usage, and activities in connection with our services.'
            ]
        },
        {
            icon: Shield,
            title: 'Information Security',
            content: [
                'We implement industry-standard security measures including AES-256 encryption for data at rest and in transit.',
                'Regular security audits and penetration testing are conducted to identify and address vulnerabilities.',
                'Access to personal data is restricted to authorized personnel only on a need-to-know basis.',
                'We maintain compliance with SOC 2, GDPR, and other international data protection standards.',
                'Multi-factor authentication and role-based access controls protect against unauthorized access.'
            ]
        },
        {
            icon: Eye,
            title: 'Information Sharing',
            content: [
                'We do not sell, trade, or rent your personal information to third parties.',
                'Information may be shared with service providers who assist in platform operations under strict confidentiality agreements.',
                'We may disclose information when required by law or to protect our rights and safety.',
                'In the event of a merger or acquisition, user data may be transferred with proper notice to affected users.'
            ]
        },
        {
            icon: FileText,
            title: 'Your Rights',
            content: [
                'You have the right to access, update, or delete your personal information at any time.',
                'You can opt-out of marketing communications while still receiving essential service updates.',
                'You may request a copy of all data we hold about you in a machine-readable format.',
                'You have the right to object to processing of your personal data for certain purposes.',
                'For EU residents, you have additional rights under GDPR including data portability and the right to be forgotten.'
            ]
        },
        {
            icon: AlertCircle,
            title: 'Data Retention',
            content: [
                'We retain your personal information for as long as necessary to provide our services.',
                'Account data is retained for 90 days after account deletion to allow for recovery.',
                'Transaction and billing records are retained for 7 years to comply with legal requirements.',
                'You may request immediate deletion of your data, subject to our legal obligations.',
                'Anonymized usage data may be retained indefinitely for analytics and improvement purposes.'
            ]
        },
    ];

    return (
        <MainLayout>
            <Head title="Privacy Policy - Bizecore" />

            {/* Header */}
            <section className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-5xl font-black mb-6">Privacy Policy</h1>
                        <p className="text-xl text-slate-300">
                            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
                        </p>
                        <p className="mt-4 text-sm text-slate-400">
                            Last Updated: {lastUpdated}
                        </p>
                    </div>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-16 bg-slate-50 border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl p-10 border border-slate-200">
                        <h2 className="text-3xl font-black text-slate-900 mb-6">Introduction</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            Bizecore ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect,
                            use, disclose, and safeguard your information when you use our platform and services.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            By using Bizecore, you agree to the collection and use of information in accordance with this policy.
                            If you do not agree with our policies and practices, please do not use our services.
                        </p>
                    </div>
                </div>
            </section>

            {/* Policy Sections */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-12">
                        {sections.map((section, idx) => {
                            const Icon = section.icon;
                            return (
                                <div key={idx} className="border-l-4 border-indigo-600 pl-8">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-6 h-6 text-indigo-600" />
                                        </div>
                                        <h2 className="text-3xl font-black text-slate-900">{section.title}</h2>
                                    </div>
                                    <ul className="space-y-4">
                                        {section.content.map((item, index) => (
                                            <li key={index} className="flex gap-3">
                                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 flex-shrink-0"></span>
                                                <p className="text-slate-600 leading-relaxed">{item}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>

                    {/* Contact Info */}
                    <div className="mt-16 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-3xl p-10 border border-indigo-100">
                        <h2 className="text-2xl font-black text-slate-900 mb-4">Questions About This Policy?</h2>
                        <p className="text-slate-600 mb-6">
                            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
                        </p>
                        <div className="space-y-2 text-slate-700">
                            <p><strong>Email:</strong> privacy@bizecore.com</p>
                            <p><strong>Address:</strong> Bizecore Inc., Jakarta, Indonesia</p>
                            <p><strong>Phone:</strong> +62 21 1234 5678</p>
                        </div>
                    </div>

                    {/* Updates Notice */}
                    <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-2xl">
                        <div className="flex gap-3">
                            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                            <div>
                                <h3 className="font-bold text-amber-900 mb-2">Policy Updates</h3>
                                <p className="text-sm text-amber-800">
                                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting
                                    the new policy on this page and updating the "Last Updated" date. You are advised to review this
                                    policy periodically for any changes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
