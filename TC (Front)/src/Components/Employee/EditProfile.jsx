import  { useState } from 'react'; 


const EditProfile = () => {
  const [formData, setFormData] = useState({
    newAddress: '',
    newPhone: '',
    previousPassword: '',
    newPassword: '',
    phoneNumber: ''
  });

  const [errors, setErrors] = useState({});

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const numbers = value.replace(/[^\d]/g, '');
    
    if (numbers.length <= 10) {
      let formattedNumber = '';
      for (let i = 0; i < numbers.length; i += 2) {
        formattedNumber += numbers.slice(i, i + 2) + ' ';
      }
      
      setFormData({
        ...formData,
        phoneNumber: formattedNumber.trim()
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
        phone : "",
        newAddress : "",
        email : "",
        password : "",
    };

    if ( formData.phoneNumber.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Veuillez entrer un numéro de téléphone valide';
    } else if (!formData.phoneNumber) {
        newErrors.phone = 'Le numéro de téléphone est requis';}

     if (!formData.newAddress) {
      newErrors.email = 'L\'adresse est requise';
    }
      else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid.";
      } 

    if ( formData.newPassword.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    } else if (formData.newPassword === formData.previousPassword) {
        newErrors.password = 'Le nouveau mot de passe doit être différent de l\'ancien';
    } else if (!formData.newPassword) {
        newErrors.password = 'Le nouveau mot de passe est requis';
    }

    setErrors(newErrors);
    console.log('Formulaire soumis :', formData)
    console.log('errors :', newErrors)
    if (Object.keys(newErrors).length === 0) {
      // Formulaire valide, vous pouvez procéder
      console.log('Formulaire soumis :', formData);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen flex-col p-4 mt-8">
      <div className="w-full relative z-10 max-w-md">
        <div className='h-24 mx-2 absolute -top-5 rounded-3xl z-[-1] w-[95%] bg-[#7DB0DE]'></div>
        
        <div className="bg-[#12395D] rounded-3xl shadow-lg overflow-hidden">
          
          
          
          <div className='shadow-md shadow-[#12395D]'>
            <div className="bg-[#12395D] p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="phoneNumber" className="block text-white text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="05 85 96 74 12"
                    className="w-full px-3 py-2 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength="14"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="newAddress" className="block text-white text-sm font-medium mb-2">
                    New Address
                  </label>
                  <input
                    type="text"
                    id="newAddress"
                    name="newAddress"
                    placeholder='123 rue de la paix'
                    value={formData.newAddress}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                          {errors.email && (
                    <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="previousPassword" className="block text-white text-sm font-medium mb-2">
                    Previous Password
                  </label>
                  <input
                    type="password"
                    id="previousPassword"
                    name="previousPassword"
                    value={formData.previousPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                          {errors.password && (
                    <p className="mt-1 text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-white text-sm font-medium mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.Password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.password && (
                    <p className="mt-1 text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="w-[90%] mx-auto flex justify-end mt-4">
          <button 
            onClick={handleSubmit}
            className="bg-[#12395D]  w-44 text-white px-2 py-2 rounded-lg hover:bg-blue-900 transition-colors"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;