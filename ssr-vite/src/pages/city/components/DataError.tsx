import { AlertCircle } from "lucide-react";

interface DataErrorProps{
    text:string;
}

const DataError = ({text}:DataErrorProps ) =>{
    return   (
        <section className="mb-6">
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-center gap-3 text-white/70">
              <AlertCircle size={24} />
              <p className="text-lg">{text}</p>
            </div>
          </div>
        </section>
      );
}

export default DataError;