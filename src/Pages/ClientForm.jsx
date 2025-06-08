import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ClientForm = ({ userId }) => {
  const [form, setForm] = useState({
    client_name: '',
    client_type: 'limited_company',
    status: 'green',
    paye_reference: '',
    accounts_office_reference: '',
    lettercode: '',
    contact_first_name: '',
    contact_last_name: '',
    contact_title: '',
    contact_email: '',
    tpr_portal_status: 'waiting_period',
    declaration_date: '',
    staging_date: '',
    reenrolment_date: '',
    reminder_date: '',
    reminder_sent: false,
    reminder_sent_date: '',
    agreed_fee: '',
    invoice_raised_date: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/api/companies', { ...form, user_id: userId });
    navigate('/dashboard');
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Client</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        {Object.entries(form).map(([key, value]) => (
          <div key={key}>
            <label className="block mb-1 capitalize">{key.replace(/_/g, ' ')}</label>
            {typeof value === 'boolean' ? (
              <input
                type="checkbox"
                name={key}
                checked={value}
                onChange={handleChange}
                className="mr-2"
              />
            ) : (
              <input
                type={key.includes('date') ? 'date' : 'text'}
                name={key}
                value={value}
                onChange={handleChange}
                className="w-full p-2 border"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Client
        </button>
      </form>
    </div>
  );
};

export default ClientForm;
