import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EvidenceRegistration() {
  const [formData, setFormData] = useState({
    type: 'Seized HDD',
    serial: 'WD-WCC6Y6A',
    capacity: '4000',
    notes: 'Seized from security room DVR chassis.'
  });
  
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    setTimeout(() => {
      navigate('../hardware-interrogation');
    }, 1500);
  };

  return (
    <div className="max-w-3xl flex flex-col gap-6">
      <div className="border-b border-dark-600 pb-4">
        <h2 className="text-2xl font-bold text-gray-100">Evidence Registration</h2>
        <p className="text-gray-400 mt-1">Register new physical digital evidence. Vendor and format will be auto-detected in a later stage.</p>
      </div>

      <form onSubmit={handleRegister} className="bg-dark-800 border border-dark-600 rounded-lg p-6 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Media Type</label>
            <select className="bg-dark-900 border border-dark-600 rounded p-2 text-gray-200" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
              <option>Seized HDD</option>
              <option>SSD</option>
              <option>USB Storage</option>
              <option>SD Card</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Physical Serial Number</label>
            <input className="bg-dark-900 border border-dark-600 rounded p-2 text-gray-200" value={formData.serial} onChange={e => setFormData({...formData, serial: e.target.value})} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Capacity (GB)</label>
            <input type="number" className="bg-dark-900 border border-dark-600 rounded p-2 text-gray-200" value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} />
          </div>
        </div>
        
        <div className="flex flex-col gap-1 mt-2">
          <label className="text-sm text-gray-400">Field Notes / Chain of Custody</label>
          <textarea className="bg-dark-900 border border-dark-600 rounded p-2 text-gray-200 h-24" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />
        </div>

        <div className="flex justify-end mt-4">
          <button type="submit" disabled={isRegistering} className="bg-primary-500 hover:bg-primary-400 disabled:opacity-50 text-white px-6 py-2 rounded font-medium transition-colors">
            {isRegistering ? 'Registering Evidence...' : 'Register Evidence'}
          </button>
        </div>
      </form>
    </div>
  );
}
