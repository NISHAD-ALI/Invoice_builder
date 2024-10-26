import React from 'react';
import TextArea from './TextArea';

export default function Overview() {
    return (
        <div className="space-y-6">
            <TextArea label="Terms" placeholder="Terms and conditions - late fees, payment methods, delivery schedule" size="normal" />
            <TextArea label="Foot Note" placeholder="Thank you for your business" size="normal" />
        </div>
    );
}
