import React, { useRef, useEffect } from 'react';
import SignaturePad from 'signature_pad';

interface SignatureCanvasProps {
  onSave: (signature: string) => void;
  className?: string;
}

export const SignatureCanvas: React.FC<SignatureCanvasProps> = ({ onSave, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      signaturePadRef.current = new SignaturePad(canvasRef.current, {
        backgroundColor: 'rgb(255, 255, 255)',
      });
    }
  }, []);

  const handleClear = () => {
    signaturePadRef.current?.clear();
  };

  const handleSave = () => {
    if (signaturePadRef.current?.isEmpty()) {
      alert('Please provide a signature');
      return;
    }
    const dataUrl = signaturePadRef.current?.toDataURL();
    if (dataUrl) {
      onSave(dataUrl);
    }
  };

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <canvas
        ref={canvasRef}
        className="border border-gray-300 rounded-lg bg-white"
        width={400}
        height={200}
      />
      <div className="flex space-x-2">
        <button
          onClick={handleClear}
          className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Clear
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 text-sm bg-aaa-orange text-white rounded hover:bg-aaa-orange/90"
        >
          Save Signature
        </button>
      </div>
    </div>
  );
};
