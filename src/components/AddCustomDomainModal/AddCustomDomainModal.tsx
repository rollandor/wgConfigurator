import React from 'react';

interface AddCustomDomainModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (domain: string, name: string, category: string) => void;
}

export const AddCustomDomainModal: React.FC<AddCustomDomainModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [domain, setDomain] = React.useState('');
  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState('custom');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(domain, name, category);
    setDomain('');
    setName('');
    setCategory('custom');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Custom Domain</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Domain Name</label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Service Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Custom Service"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700"
            >
              <option value="custom">Custom</option>
              <option value="streaming">Streaming</option>
              <option value="social">Social</option>
              <option value="work">Work</option>
              <option value="gaming">Gaming</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Add Domain
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 

AddCustomDomainModal.displayName = 'AddCustomDomainModal';