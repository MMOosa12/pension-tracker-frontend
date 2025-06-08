import React, { useState } from 'react';
import { CheckCircleIcon, InformationCircleIcon, StarIcon } from '@heroicons/react/24/solid';

const plans = [
  {
    name: 'Free',
    badge: 'Start Free',
    price: { monthly: '£0', annually: '£0' },
    description: 'Up to 25 clients included',
    features: {
      'Core Platform': [
        { label: 'Dashboard & Client Management - Save 5 hours/week', info: 'Automated tracking eliminates manual spreadsheet management.' },
        { label: 'Filters & Search - Find any client in seconds', info: 'Quickly locate clients using search and status filters.' },
        { label: 'Secure Hosting on Azure - Bank-level security', info: 'All data stored securely on Microsoft Azure infrastructure.' }
      ],
      'User Access': [
        { label: 'One User', info: 'One login access per bureau account.' }
      ]
    },
    color: 'border-gray-200 dark:border-gray-700',
    bgColor: 'bg-white dark:bg-gray-800',
    textColor: 'text-gray-900 dark:text-white',
    buttonColor: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
  },
  {
    name: 'Basic',
    badge: '',
    price: { monthly: '£1', annually: '£0.83' },
    description: 'Automate reminders and send reports.',
    features: {
      'Core Platform': [
        { label: 'Dashboard & Client Management', info: 'Manage client data, re-enrolment and declaration tracking.' },
        { label: 'Filters & Search', info: 'Quickly locate clients using search and status filters.' },
        { label: 'Secure Hosting on Azure', info: 'All data stored securely on Microsoft Azure infrastructure.' }
      ],
      'User Access': [
        { label: 'Two Users', info: 'Allow two team members to log in.' }
      ],
      'Automated Reminders & Reports': [
        { label: 'Client Reminders - Never miss a deadline', info: 'Automatic email reminders to clients before due dates.' },
        { label: 'User Notifications on Client Changes - Stay informed', info: 'Get notified when clients update key dates.' },
        { label: 'Monthly Declaration Reports - Automated reporting', info: 'Receive monthly overview reports for declarations due.' },
        { label: 'Customisable Email Templates - Your branding', info: 'Personalise your client communication with branding.' }
      ],
      'Coming Soon': [
        { label: '2FA Login (Q3 2025)', info: 'Add two-factor authentication to improve login security.' }
      ]
    },
    color: 'border-[#FF8073]',
    bgColor: 'bg-gradient-to-br from-[#FF8073] to-[#EC385D]',
    textColor: 'text-white',
    buttonColor: 'bg-white text-[#EC385D] hover:bg-gray-100',
  },
  {
    name: 'Premium',
    badge: 'Most Popular',
    price: { monthly: '£2', annually: '£1.66' },
    description: 'Full automation with branding and integrations.',
    features: {
      'Core Platform': [
        { label: 'Dashboard & Client Management', info: 'Manage client data, re-enrolment and declaration tracking.' },
        { label: 'Filters & Search', info: 'Quickly locate clients using search and status filters.' },
        { label: 'Secure Hosting on Azure', info: 'All data stored securely on Microsoft Azure infrastructure.' }
      ],
      'User Access': [
        { label: 'Unlimited Users', info: 'No user limits — great for large teams.' }
      ],
      'Automated Reminders & Reports': [
        { label: 'Client Reminders - Never miss a deadline', info: 'Automatic email reminders to clients before due dates.' },
        { label: 'User Notifications on Client Changes - Stay informed', info: 'Get notified when clients update key dates.' },
        { label: 'Monthly Declaration Reports - Automated reporting', info: 'Receive monthly overview reports for declarations due.' },
        { label: 'Customisable Email Templates - Your branding', info: 'Personalise your client communication with branding.' },
        { label: 'Consultant Reminders - Team coordination', info: 'Assign and alert consultants to client duties.' },
        { label: 'Company Branded Reports & Emails - White-label', info: 'Fully white-labeled monthly client reporting.' }
      ],
      'Support & Access': [
        { label: 'Priority Email Support - Fast-track help', info: 'Get fast-track help from our support team.' },
        { label: 'API Access / Integrations - Connect your tools', info: 'Integrate with third-party tools via API.' }
      ],
      'Coming Soon': [
        { label: 'SSO Login (Q4 2025)', info: 'Single sign-on via Microsoft or Google.' }
      ]
    },
    color: 'border-[#401D6C] shadow-2xl ring-4 ring-[#401D6C]/20',
    bgColor: 'bg-gradient-to-br from-[#401D6C] to-[#EC385D]',
    textColor: 'text-white',
    buttonColor: 'bg-white text-[#401D6C] hover:bg-gray-100',
    popular: true,
  }
];

const PricingPage = () => {
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 px-4 py-16">
      {/* Header Section */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-[#401D6C] via-[#EC385D] to-[#FF8073] bg-clip-text text-transparent mb-6">
          Choose Your Plan
        </h1>
        
        {/* Billing Toggle */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <span className="text-gray-700 dark:text-gray-300 font-medium">Billing:</span>
          <div className="relative bg-gray-100 dark:bg-gray-700 p-1 rounded-full flex">
            <button
              className={`relative px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                billing === 'monthly' 
                  ? 'bg-white dark:bg-gray-600 text-[#401D6C] dark:text-white shadow-md' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
              onClick={() => setBilling('monthly')}
            >
              Monthly
            </button>
            <button
              className={`relative px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                billing === 'annually' 
                  ? 'bg-white dark:bg-gray-600 text-[#401D6C] dark:text-white shadow-md' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
              onClick={() => setBilling('annually')}
            >
              Annually 
              <span className="ml-2 text-xs bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full font-bold">
                16% off
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`relative rounded-2xl border-2 ${plan.color} ${plan.bgColor} ${plan.textColor} p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full ${
              plan.popular ? 'transform scale-105' : ''
            }`}
          >
            {/* Popular Badge */}
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold text-sm px-4 py-1 rounded-full shadow-lg flex items-center gap-1">
                  {plan.badge === 'Most Popular' && <StarIcon className="h-4 w-4" />}
                  {plan.badge}
                </div>
              </div>
            )}

            {/* Plan Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
              <div className="mb-4">
                <span className="text-5xl font-extrabold">{plan.price[billing]}</span>
                <span className="text-lg font-medium opacity-80">/client{billing === 'annually' ? '/month' : ''}</span>
                {billing === 'annually' && plan.name !== 'Free' && (
                  <div className="text-sm opacity-75 mt-1">Billed annually</div>
                )}
              </div>
              <p className="text-sm opacity-90">{plan.description}</p>
            </div>

            {/* Features */}
            <div className="flex-1 space-y-6">
              {Object.entries(plan.features).map(([group, items], i) => (
                <div key={i}>
                  <h4 className="font-semibold text-sm uppercase mb-3 pb-2 border-b border-current/20 tracking-wide">
                    {group}
                  </h4>
                  <ul className="space-y-3">
                    {items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm">
                        <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <div className="flex items-center gap-2 flex-1">
                          <span>{item.label}</span>
                          <div className="relative group">
                            <InformationCircleIcon
                              className="w-4 h-4 opacity-60 hover:opacity-100 cursor-pointer transition-opacity"
                            />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                              {item.info}
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button className={`mt-8 ${plan.buttonColor} transition-all duration-200 font-semibold py-3 px-6 rounded-xl w-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}>
              {plan.name === 'Free' ? 'Start Free' : plan.name === 'Premium' ? 'Start Free Trial' : 'Choose Basic'}
            </button>
          </div>
        ))}
      </div>

      {/* Pricing Note */}
      <div className="text-center mb-16">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Pricing is charged per client per month, based on the highest number of clients held during that month.
          </p>
        </div>
      </div>

      {/* Social Proof */}
      <div className="text-center mb-16">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">Trusted by 500+ pension consultants managing 50,000+ clients</p>
        <div className="flex justify-center items-center gap-8 opacity-60">
          <div className="text-gray-500 text-sm font-semibold">Microsoft Partner</div>
          <div className="text-gray-500 text-sm font-semibold">GDPR Compliant</div>
          <div className="text-gray-500 text-sm font-semibold">SOC 2 Certified</div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-[#401D6C] to-[#EC385D] rounded-2xl p-8 text-white shadow-2xl">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-6 w-6 text-yellow-400" />
              ))}
            </div>
            <blockquote className="text-xl font-medium italic leading-relaxed mb-4">
              "This transformed how we manage client re-enrolments and declarations. We reduced our compliance workload by 75% and never miss a deadline."
            </blockquote>
            <cite className="text-yellow-200 font-semibold">
              — Chris Jones, Payroll Manager at ABC Consulting
            </cite>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="max-w-6xl mx-auto mt-16 text-center">
        <div className="grid md:grid-cols-4 gap-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>30-day money-back guarantee</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>No setup fees</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Free data migration</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
