import React from 'react';

interface RodProps {
  length: number;
  color: string;
  height?: number;
  widthPerUnit?: number;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Rod: React.FC<RodProps> = ({
  length,
  color,
  height = 40,
  widthPerUnit = 30,
  onClick,
  className = '',
  disabled = false,
}) => {
  const width = length * widthPerUnit;

  return (
    <div
      className={`flex items-center justify-center border border-gray-800 rounded cursor-pointer transition-transform duration-150 ease-in-out ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
      } ${className}`}
      style={{
        backgroundColor: color,
        width: `${width}px`,
        height: `${height}px`,
      }}
      onClick={onClick}
      aria-label={`${length}-unit Cuisenaire rod`}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      <span 
        className="font-bold text-black text-sm opacity-80 drop-shadow-sm"
        style={{ fontSize: '10px' }}
      >
        {length}
      </span>
    </div>
  );
};

export default Rod;