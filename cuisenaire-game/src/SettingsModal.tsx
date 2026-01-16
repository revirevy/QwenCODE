import React, { useEffect } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTargetWidth: number;
  onSave: (newTargetWidth: number) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentTargetWidth,
  onSave,
}) => {
  const [tempTargetWidth, setTempTargetWidth] = React.useState(currentTargetWidth);

  useEffect(() => {
    if (isOpen) {
      setTempTargetWidth(currentTargetWidth);
    }
  }, [isOpen, currentTargetWidth]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(tempTargetWidth);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Game Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Close settings"
          >
            &times;
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Target Row Width (Sum)
          </label>
          <input
            type="range"
            min="5"
            max="20"
            value={tempTargetWidth}
            onChange={(e) => setTempTargetWidth(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-1">
            <span className="text-sm text-gray-600">5</span>
            <span className="text-lg font-semibold text-blue-600">{tempTargetWidth}</span>
            <span className="text-sm text-gray-600">20</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Set the target sum for completing a row (default: 10)
          </p>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;