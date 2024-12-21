import React from 'react';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-medium text-white mb-2">
        {title}
      </h2>
      <p className="text-gray-400 text-sm">
        {subtitle}
      </p>
    </div>
  );
}