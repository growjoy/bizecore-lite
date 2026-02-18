import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { FileText, CheckCircle, XCircle, AlertTriangle, Scale } from 'lucide-react';

export default function TermsOfService() {
    const lastUpdated = 'February 14, 2026';

    const sections = [
        {
            icon: CheckCircle,
            title: 'Acceptance of Terms',
            content: [
                'By accessing and using Bizecore, you accept and agree to be bound by these Terms of Service.',
                'If you do not agree to these terms, you may not access or use our services.',
                'We reserve the right to modify these terms at any time with notice to users.',
                'Continued use of the service after changes constitutes acceptance of new terms.'
            ]
        },
        {
            icon: FileText,
            title: 'Use of Services',
            content: [
                'You must be at least 18 years old and have the authority to enter into these terms.',
                'You are responsible for maintaining the confidentiality of your account credentials.',
                'You agree to use the service only for lawful purposes and in accordance with these terms.',
                'You may not use the service in any way that could damage, disable, or impair our systems.',
                'Automated data scraping or unauthorized API access is strictly prohibited.'
            ]
        },
        {
            icon: Scale,
            title: 'User Rights and Responsibilities',
            content: [
                'You retain all rights to the data you upload to our platform.',
                'You grant us a license to use your data solely to provide and improve our services.',
                'You are responsible for ensuring you have the right to upload and share any data on our platform.',
                'You must not upload any content that infringes on intellectual property rights of others.',
                'You are responsible for all activity that occurs under your account.'
            ]
        },
        {
            icon: AlertTriangle,
            title: 'Prohibited Activities',
            content: [
                'Attempting to gain unauthorized access to our systems or other user accounts.',
                'Using the service to transmit viruses, malware, or any malicious code.',
                'Engaging in any activity that interferes with the proper functioning of our services.',
                'Violating any applicable laws or regulations while using our platform.',
                'Sharing your account credentials with unauthorized third parties.',
                'Using the service for any illegal or unauthorized purpose.'
            ]
        },
        {
            icon: XCircle,
            title: 'Service Availability and Limitations',
            content: [
                'We strive for 99.9% uptime but do not guarantee uninterrupted service availability.',
                'We reserve the right to modify or discontinue any feature with notice to users.',
                'Scheduled maintenance will be announced in advance whenever possible.',
                'We are not liable for any loss of data or business resulting from service interruptions.',
                'Service level agreements (SLAs) are defined separately for enterprise customers.'
            ]
        },
        {
            icon: FileText,
            title: 'Subscription and Payment',
            content: [
                'Subscription fees are billed in advance on a monthly or annual basis.',
                'All fees are non-refundable except as required by law or stated in our refund policy.',
                'You authorize us to charge your payment method for all fees incurred.',
                'Failure to pay may result in suspension or termination of your account.',
                'We reserve the right to change our pricing with 30 days notice to existing customers.',
                'Enterprise customers may have custom pricing and terms as per their agreement.'
            ]
        },
        {
            icon: AlertTriangle,
            title: 'Termination',
            content: [
                'You may terminate your account at any time through your account settings.',
                'We may suspend or terminate your access for violation of these terms.',
                'Upon termination, your right to use the service will immediately cease.',
                'You will have 30 days to export your data after account termination.',
                'We reserve the right to delete your data 90 days after account closure.',
                'Certain provisions of these terms will survive termination.'
            ]
        },
        {
            icon: Scale,
            title: 'Limitation of Liability',
            content: [
                'Our total liability shall not exceed the amount you paid us in the past 12 months.',
                'We are not liable for any indirect, incidental, or consequential damages.',
                'We do not guarantee that our service will meet all your requirements.',
                'We are not responsible for any third-party content or services accessed through our platform.',
                'Some jurisdictions do not allow limitation of liability, so these may not apply to you.'
            ]
        },
        {
            icon: FileText,
            title: 'Intellectual Property',
            content: [
                'All content, features, and functionality of our service are owned by Bizecore.',
                'You may not copy, modify, distribute, or reverse engineer any part of our service.',
                'Our trademarks and logos may not be used without our prior written permission.',
                'Any feedback or suggestions you provide may be used by us without obligation to you.',
                'We respect intellectual property rights and expect our users to do the same.'
            ]
        },
        {
            icon: AlertTriangle,
            title: 'Governing Law and Disputes',
            content: [
                'These terms are governed by the laws of Indonesia without regard to conflict of law provisions.',
                'Any disputes shall be resolved through binding arbitration in Jakarta, Indonesia.',
                'You waive any right to participate in class actions or class arbitrations.',
                'Small claims court actions may be brought in appropriate jurisdictions.',
                'The prevailing party in any dispute shall be entitled to costs and attorney fees.'
            ]
        },
    ];

    return (
        <MainLayout>
            <Head title="Terms of Service - Bizecore" />

            {/* Header */}
            <section className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Scale className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-5xl font-black mb-6">Terms of Service</h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                            Please read these terms carefully before using Bizecore platform and services.
                        </p>
                        <p className="mt-4 text-sm text-slate-400">
                            Last Updated: {lastUpdated}
                        </p>
                    </div>
                </div>
            </section>

            {/* Important Notice */}
            <section className="py-12 bg-amber-50 border-b border-amber-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-4">
                        <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-black text-amber-900 text-lg mb-2">Important Notice</h3>
                            <p className="text-amber-800 leading-relaxed">
                                These Terms of Service constitute a legally binding agreement between you and Bizecore.
                                By using our services, you agree to be bound by these terms. If you do not agree,
                                please do not use our platform.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Terms Sections */}
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
                                        <div>
                                            <h2 className="text-3xl font-black text-slate-900">{section.title}</h2>
                                        </div>
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

                    {/* Contact Section */}
                    <div className="mt-16 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-3xl p-10 border border-indigo-100">
                        <h2 className="text-2xl font-black text-slate-900 mb-4">Questions About These Terms?</h2>
                        <p className="text-slate-600 mb-6">
                            If you have any questions or concerns about these Terms of Service, please contact our legal team:
                        </p>
                        <div className="space-y-2 text-slate-700">
                            <p><strong>Email:</strong> legal@bizecore.com</p>
                            <p><strong>Address:</strong> Bizecore Inc., Jakarta, Indonesia</p>
                            <p><strong>Phone:</strong> +62 21 1234 5678</p>
                        </div>
                    </div>

                    {/* Acknowledgment */}
                    <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                        <h3 className="font-bold text-slate-900 mb-3">Acknowledgment</h3>
                        <p className="text-sm text-slate-600">
                            BY USING BIZECORE, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE,
                            UNDERSTAND THEM, AND AGREE TO BE BOUND BY THEM. IF YOU DO NOT AGREE TO THESE TERMS,
                            YOU ARE NOT AUTHORIZED TO USE OUR SERVICES.
                        </p>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
