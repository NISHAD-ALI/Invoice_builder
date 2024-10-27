// src/Components/Overview.js
import React from 'react';
import TextArea from './TextArea';
import { useDispatch } from 'react-redux';
import { setTerms, setFootNote } from '../Redux/slice';

const Overview = ({ data }) => {
  const dispatch = useDispatch();

  const handleInputChange = (field, value) => {
    if (field === 'terms') {
      dispatch(setTerms(value));
    } else if (field === 'footNote') {
      dispatch(setFootNote(value));
    }
  };

  return (
    <div className="space-y-6">
      <TextArea
        label="Terms"
        placeholder="Terms and conditions - late fees, payment methods, delivery schedule"
        value={data.terms}
        onChange={(value) => handleInputChange('terms', value)}
      />
      <TextArea
        label="Foot Note"
        placeholder="Thank you for your business"
        value={data.footNote}
        onChange={(value) => handleInputChange('footNote', value)}
      />
    </div>
  );
};

export default Overview;
