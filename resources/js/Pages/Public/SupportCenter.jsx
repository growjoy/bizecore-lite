import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { MessageCircle, Mail, Phone, Clock, HelpCircle, Book } from 'lucide-react';

export default function SupportCenter() {
    const supportChannels = [
        {
            icon: MessageCircle,
            title: 'Live Chat',
            desc: 'Chat with our support team in real-time',
            action: 'Start Chat',
            color: 'from-blue-500 to-cyan-600',
            available: '24/7'
        },
        {
            icon: Mail,
            title: 'Email Support',
            desc: 'Send us an email and get response within 24 hours',
            action: 'Send Email',
            color: 'from-indigo-500 to-purple-600',
            available: 'Response in 24h'
        },
        {
            icon: Phone,
            title: 'Phone Support',
            desc: 'Talk to our support specialists',
            action: 'Call Now',
            color: 'from-emerald-500 to-teal-600',
            available: 'Mon-Fri 9AM-6PM'
        },
    ];

    const faqs = [
        {
            question: 'How do I reset my password?',
            answer: 'You can reset your password by clicking on "Forgot Password" on the login page. Follow the instructions sent to your email.'
        },
        {
            question: 'Can I import existing employee data?',
            answer: 'Yes, you can bulk import employee data using our CSV import feature. Navigate to Employees > Import Data and download our template.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for enterprise clients.'
        },
        {
            question: 'Is my data secure?',
            answer: 'Absolutely. We use bank-level encryption (AES-256) and comply with international data protection standards including GDPR and SOC 2.'
        },
        {
            question: 'Can I export my data?',
            answer: 'Yes, you can export all your data at any time in CSV, Excel, or JSON format from the dashboard settings.'
        },
        {
            question: 'Do you offer training for new users?',
            answer: 'Yes, we provide comprehensive onboarding sessions and video tutorials for all new users and teams.'
        },
    ];

    return (
        <MainLayout>
            <Head title="Support Center - Bizecore" />

            {/* Header */}
            <section className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-black mb-6">How Can We Help?</h1>
                    <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                        Get instant answers to your questions or reach out to our support team
                    </p>

                    {/* Search */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <HelpCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search for help articles..."
                                className="w-full pl-12 pr-4 py-4 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50 font-medium"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Support Channels */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-slate-900 mb-4">Contact Our Support Team</h2>
                        <p className="text-slate-600 text-lg">Choose your preferred way to get in touch</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {supportChannels.map((channel, idx) => {
                            const Icon = channel.icon;
                            return (
                                <div key={idx} className="bg-white rounded-3xl p-8 border border-slate-100 hover:shadow-2xl transition-all group">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${channel.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-3">{channel.title}</h3>
                                    <p className="text-slate-600 mb-4">{channel.desc}</p>
                                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                                        <Clock className="w-4 h-4" />
                                        <span className="font-medium">{channel.available}</span>
                                    </div>
                                    <button className="w-full px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-indigo-600 transition-colors">
                                        {channel.action}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-slate-600 text-lg">Quick answers to common questions</p>
                    </div>

                    <div className="space-y-6">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-indigo-100 hover:shadow-lg transition-all">
                                <h3 className="text-xl font-black text-slate-900 mb-3 flex items-start gap-3">
                                    <HelpCircle className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                                    {faq.question}
                                </h3>
                                <p className="text-slate-600 leading-relaxed ml-9">{faq.answer}</p>
                            </div>
                        ))}
                    </div>

                    {/* Additional Help */}
                    <div className="mt-16 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-3xl p-10 border border-indigo-100 text-center">
                        <Book className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                        <h3 className="text-2xl font-black text-slate-900 mb-3">Still need help?</h3>
                        <p className="text-slate-600 mb-6 max-w-md mx-auto">
                            Browse our complete documentation or contact our support team for personalized assistance.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                                View Documentation
                            </button>
                            <button className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
