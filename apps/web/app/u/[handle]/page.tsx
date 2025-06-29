"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Twitter,
  Shield,
  CheckCircle,
  Globe,
  Loader2,
  ExternalLink,
} from "lucide-react";

interface Deal {
  id: string;
  projectName: string;
  role: string;
  startDate: string;
  tokenAmount?: string;
  tokenSymbol?: string;
  disclosureUrl?: string;
}

interface Profile {
  id: string;
  handle: string;
  name: string;
  profileImage?: string;
  bio?: string;
  isVerified: boolean;
  createdAt: string;
  deals: Deal[];
  stats: {
    totalDeals: number;
    complianceScore: number;
    transparencyScore: number;
  };
}

export default function PublicProfilePage() {
  const params = useParams();
  const handle = params.handle as string;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // For now, mock the profile data
        // In production, this would fetch from the API
        const mockProfile: Profile = {
          id: "1",
          handle: handle,
          name: `@${handle}`,
          profileImage: undefined,
          bio: "Crypto advisor committed to transparency",
          isVerified: true,
          createdAt: new Date().toISOString(),
          deals: [],
          stats: {
            totalDeals: 0,
            complianceScore: 100,
            transparencyScore: 100,
          },
        };

        // Check if user exists in the directory
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
        const response = await fetch(`${apiUrl}/api/users/directory`);
        const data = await response.json();
        const user = data.users?.find((u: any) => u.handle === handle);

        if (user) {
          mockProfile.name = user.name || `@${handle}`;
          mockProfile.profileImage = user.profileImage;
          setProfile(mockProfile);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (notFound || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Profile Not Found</h1>
          <p className="text-gray-600">
            @{handle} hasn&apos;t joined OpenAdvisor yet.
          </p>
          <a
            href="/"
            className="text-blue-600 hover:underline mt-4 inline-block"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold">
            OpenAdvisor
          </a>
          <a href="/" className="text-sm text-gray-600 hover:text-gray-900">
            Join OpenAdvisor
          </a>
        </div>
      </header>

      {/* Profile Section */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-start gap-6">
            {profile.profileImage ? (
              <Image
                src={profile.profileImage}
                alt={profile.name}
                width={80}
                height={80}
                className="rounded-full"
              />
            ) : (
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full" />
            )}

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                {profile.isVerified && (
                  <div className="flex items-center gap-2">
                    <Twitter className="w-5 h-5 text-blue-400" />
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                )}
              </div>
              <p className="text-gray-600 mb-4">@{profile.handle}</p>
              {profile.bio && (
                <p className="text-gray-700 mb-4">{profile.bio}</p>
              )}

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-gray-600">
                    {profile.stats.complianceScore}% Compliant
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-600">
                    {profile.stats.totalDeals} Advisory Deals
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {profile.stats.totalDeals}
            </div>
            <p className="text-gray-600">Advisory Deals</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {profile.stats.complianceScore}%
            </div>
            <p className="text-gray-600">Compliance Score</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {profile.stats.transparencyScore}%
            </div>
            <p className="text-gray-600">Transparency Score</p>
          </div>
        </div>

        {/* Deals Section */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-xl font-bold mb-6">
            Public Advisory Relationships
          </h2>

          {profile.deals.length === 0 ? (
            <div className="text-center py-12">
              <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">No public deals yet</p>
              <p className="text-sm text-gray-500">
                Advisory relationships will appear here once disclosed
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {profile.deals.map((deal) => (
                <div
                  key={deal.id}
                  className="border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {deal.projectName}
                      </h3>
                      <p className="text-gray-600">{deal.role}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Since {deal.startDate}
                      </p>
                      {deal.tokenAmount && deal.tokenSymbol && (
                        <p className="text-sm text-gray-500 mt-2">
                          Grant: {deal.tokenAmount} {deal.tokenSymbol}
                        </p>
                      )}
                    </div>
                    {deal.disclosureUrl && (
                      <a
                        href={deal.disclosureUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
                      >
                        Disclosure
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            This profile is part of{" "}
            <a href="/" className="text-blue-600 hover:underline">
              OpenAdvisor
            </a>
            , the transparency-first platform for crypto advisor deals.
          </p>
        </div>
      </div>
    </div>
  );
}
