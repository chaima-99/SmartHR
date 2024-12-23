import { useState } from 'react';
import { FaUser, FaFileUpload } from 'react-icons/fa';

const LeaveRequest = () => {
    const [fullName, setFullName] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [reason, setReason] = useState('');
    const [documentation, setDocumentation] = useState(null);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        const today = new Date().toISOString().split('T')[0];

        if (!fullName.trim()) newErrors.fullName = "Full Name is required.";
        if (!fromDate) {
            newErrors.fromDate = "From date is required.";
        } else if (fromDate < today) {
            newErrors.fromDate = "From date cannot be in the past.";
        }
        if (!toDate) {
            newErrors.toDate = "To date is required.";
        } else if (toDate < fromDate) {
            newErrors.toDate = "To date cannot be before From date.";
        }
        if (!reason.trim()) newErrors.reason = "Reason for leave is required.";
        if (!documentation) newErrors.documentation = "Documentation is required.";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            console.log("Form submitted successfully!");
        }
    };

    return (
        <div className="ml-14 h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-white shadow-md rounded-lg p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 transition-all duration-300 border-2 border-gray-300 hover:border-blue-600">
                <h1 className="text-sm sm:text-base md:text-lg font-bold mb-4 sm:mb-6 text-center">Leave Request</h1>
                <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-xs sm:text-sm md:text-base font-medium">Full Name</label>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-2.5 text-gray-400" />
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className={`mt-1 block w-full border pl-10 transition-colors duration-300 ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:border-blue-500 text-xs sm:text-sm md:text-base`}
                                placeholder="Samantha"
                            />
                        </div>
                        {errors.fullName && <p className="text-red-500 text-xs sm:text-sm">{errors.fullName}</p>}
                    </div>
                    <div>
                        <label className="block text-xs sm:text-sm md:text-base font-medium">From</label>
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className={`mt-1 block w-full border transition-colors duration-300 ${errors.fromDate ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:border-blue-500 text-xs sm:text-sm md:text-base`}
                        />
                        {errors.fromDate && <p className="text-red-500 text-xs sm:text-sm">{errors.fromDate}</p>}
                    </div>
                    <div>
                        <label className="block text-xs sm:text-sm md:text-base font-medium">To</label>
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className={`mt-1 block w-full border transition-colors duration-300 ${errors.toDate ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:border-blue-500 text-xs sm:text-sm md:text-base`}
                        />
                        {errors.toDate && <p className="text-red-500 text-xs sm:text-sm">{errors.toDate}</p>}
                    </div>
                    <div>
                        <label className="block text-xs sm:text-sm md:text-base font-medium">Reason for Leave</label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className={`mt-1 block w-full border transition-colors duration-300 ${errors.reason ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:border-blue-500 text-xs sm:text-sm md:text-base`}
                            rows="3"
                            placeholder="Enter the reason for the leave request..."
                        ></textarea>
                        {errors.reason && <p className="text-red-500 text-xs sm:text-sm">{errors.reason}</p>}
                    </div>
                    <div>
                        <label className="block text-xs sm:text-sm md:text-base font-medium">Documentation</label>
                        <div className="relative">
                            <FaFileUpload className="absolute left-3 top-2.5 text-gray-400" />
                            <input
                                type="file"
                                onChange={(e) => setDocumentation(e.target.files[0])}
                                className={`mt-1 block w-full border pl-10 transition-colors duration-300 ${errors.documentation ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 focus:border-blue-500 text-xs sm:text-sm md:text-base`}
                            />
                        </div>
                        {errors.documentation && <p className="text-red-500 text-xs sm:text-sm">{errors.documentation}</p>}
                    </div>
                    <button 
                        type="submit" 
                        className="mt-4 bg-[#1D5C96] text-white py-2 px-4 rounded w-full transition-transform transform hover:bg-blue-700 hover:scale-105 duration-300 text-xs sm:text-sm md:text-base"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LeaveRequest;
