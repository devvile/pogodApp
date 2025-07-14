interface ContentCardProps {
  children: React.ReactNode;
}

const ContentCard = ({ children }: ContentCardProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center px-4">
      {children}
    </div>
  );
};

export default ContentCard;
