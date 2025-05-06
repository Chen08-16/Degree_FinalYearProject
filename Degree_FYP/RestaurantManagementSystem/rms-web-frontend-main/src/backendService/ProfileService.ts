import axios from "axios";

const API_URL = 'http://localhost:3000/api';


// data = {username,phoneNumber,dateOfBirth}
export const updateProfile = async (data: any) => {
    
    const result = await axios.put(`${API_URL}/profile/update-profile`, 
        data,
        { headers: {  "Content-Type": "application/json"},}
    )

    const { message, user, error } = result.data;

      if (error) {
        message.error({
          message: 'Update Failed',
          description: error,
        });
      } else {
        message.success({
          message: 'Profile Updated',
          description: message,
        });

        // Refresh the page to reflect updated data
        window.location.reload();
      }

    return result;
  };