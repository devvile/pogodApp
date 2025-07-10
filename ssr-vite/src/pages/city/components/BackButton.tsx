import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const BackButton = () => {
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <button
      onClick={handleBackToHome}
      className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors duration-200"
    >
      <ArrowLeft size={20} />
      <span>Back to Home</span>
    </button>
  );
};

export default BackButton;
