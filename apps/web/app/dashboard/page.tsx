"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import {
  CheckCircle,
  Plus,
  ExternalLink,
  Copy,
  Loader2,
  Twitter,
  Globe,
  Shield,
} from "lucide-react";

interface Deal {
  id: string;
  projectName: string;
  role: string;
  startDate: string;
  tokenAmount?: string;
  tokenSymbol?: string;
  isPublic: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [showAddDeal, setShowAddDeal] = useState(false);
  const [copying, setCopying] = useState(false);

  // Mock data for now
  const profileUrl = `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  }/u/${user?.handle}`;

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/");
    }
  }, [loading, isAuthenticated, router]);

  const copyProfileLink = async () => {
    setCopying(true);
    try {
      await navigator.clipboard.writeText(profileUrl);
      setTimeout(() => setCopying(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      setCopying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">OpenAdvisor</h1>
          <nav className="flex items-center gap-6">
            <a href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </a>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              View Profile <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-sm text-gray-600">@{user?.handle}</span>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Welcome back, @{user?.handle}!
              </h2>
              <p className="text-gray-600">
                Manage your advisor profile and track your compliance.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Twitter className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-600">Twitter Verified</span>
            </div>
          </div>

          {/* Profile Link */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Your Public Profile
            </p>
            <div className="flex items-center gap-3">
              <code className="flex-1 bg-white px-4 py-2 rounded border text-sm font-mono">
                {profileUrl}
              </code>
              <button
                onClick={copyProfileLink}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                {copying ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Share this link to showcase your transparent advisor relationships
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <Globe className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold">{deals.length}</span>
            </div>
            <h3 className="font-semibold mb-1">Active Deals</h3>
            <p className="text-sm text-gray-600">Advisory relationships</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <Shield className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-green-600">100%</span>
            </div>
            <h3 className="font-semibold mb-1">Compliance Score</h3>
            <p className="text-sm text-gray-600">All deals disclosed</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold">0</span>
            </div>
            <h3 className="font-semibold mb-1">Pending Actions</h3>
            <p className="text-sm text-gray-600">You&apos;re all caught up</p>
          </div>
        </div>

        {/* Advisory Deals Section */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Your Advisory Deals</h3>
            <button
              onClick={() => setShowAddDeal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Deal
            </button>
          </div>

          {deals.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-2">No advisory deals yet</p>
              <p className="text-sm text-gray-500 mb-6">
                Add your existing advisor relationships to build trust with your
                community
              </p>
              <button
                onClick={() => setShowAddDeal(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Your First Deal
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {deals.map((deal) => (
                <div
                  key={deal.id}
                  className="border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-lg">
                        {deal.projectName}
                      </h4>
                      <p className="text-gray-600">{deal.role}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Since {deal.startDate}
                      </p>
                    </div>
                    <div className="text-right">
                      {deal.isPublic ? (
                        <span className="text-green-600 text-sm flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          Public
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">Private</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
