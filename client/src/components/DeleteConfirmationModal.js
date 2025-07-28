import React from 'react';

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, transactionTitle }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-surface/95 backdrop-blur-md rounded-2xl p-6 w-full max-w-md mx-4 border border-surface/30 shadow-2xl">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
            <span className="text-red-400 text-xl">⚠️</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-on-surface">Delete Transaction</h3>
            <p className="text-sm text-on-surface-secondary">This action cannot be undone</p>
          </div>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-on-surface mb-2">
            Are you sure you want to delete this transaction?
          </p>
          {transactionTitle && (
            <div className="bg-background/50 rounded-lg p-3 border border-surface/30">
              <p className="text-sm text-on-surface-secondary mb-1">Transaction:</p>
              <p className="font-medium text-on-surface">{transactionTitle}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 bg-surface/60 text-on-surface py-3 rounded-xl font-semibold hover:bg-surface/80 transition-all duration-200 border border-surface/30"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal; 