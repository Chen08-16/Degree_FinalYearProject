import React, { useEffect, useState } from "react";
import { Card, Typography, Input, Button, Upload, message, DatePicker, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import { useGetIdentity } from "@refinedev/core";
import axios from "axios";

const { Title, Text } = Typography;

export const Profile = () => {
  const { data: user } = useGetIdentity();

  const [profile, setProfile] = useState({
    username: "",
    phone: "",
    email: user?.email || "",
    dob: null,
    profileImage: null,
  });

  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const data = {
        username: user?.name || "",
        uid: user?.id,
        email: user?.email || "",
        phone: user?.phoneNumber || "",
        dob: "",
      };
      const response = await axios.post(
        `http://localhost:3000/api/profile/user/getProfile/${user?.id}`,
        data
      );
      const userData = response.data.user;
      setProfile({
        username: userData.username || "",
        phone: userData.phone || "",
        email: userData.email || "",
        dob: userData.dob ? moment(userData.dob) : null,
        profileImage: userData.profileImage || null,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchUser();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      dob: date,
    }));
  };

  const handleImageUpload = (info) => {
    if (info.file.status === "done") {
      setProfile((prevProfile) => ({
        ...prevProfile,
        profileImage: URL.createObjectURL(info.file.originFileObj),
      }));
      message.success("Profile image uploaded successfully!");
    }
  };

  const handleSubmit = async () => {
    try {
        const updatedProfile = {
            ...profile,
            uid:user?.id,
            email:user?.email,
            dob: profile.dob ? profile.dob.format("YYYY-MM-DD") : null, // Format date
        };

        const response = await axios.put("http://localhost:3000/api/profile/user", updatedProfile);
       
        message.success("Profile updated successfully!");
        setIsModalVisible(true); // Show success modal
    } catch (error) {
        console.error("Error updating profile:", error);
        message.error("Failed to update profile. Please try again.");
    }
};

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        User Profile
      </Title>
      <Card
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        {/* Profile Image */}
        <div
          style={{
            width: "150px",
            height: "150px",
            margin: "0 auto",
            marginBottom: "20px",
            background: "#f0f0f0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {profile.profileImage ? (
            <img
              src={profile.profileImage}
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <>
              <Text>No Image</Text>
              <Upload
                showUploadList={false}
                customRequest={({ file, onSuccess }) => {
                  setTimeout(() => onSuccess("ok"), 0);
                }}
                onChange={handleImageUpload}
              >
                <Button
                  icon={<UploadOutlined />}
                  type="primary"
                  size="small"
                  style={{ marginTop: "8px" }}
                >
                  Upload
                </Button>
              </Upload>
            </>
          )}
        </div>

        {/* Profile Fields */}
        <div style={{ marginBottom: 16 }}>
          <label>Username:</label>
          <Input
            name="username"
            value={profile.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Email:</label>
          <Input
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Enter your email"
            disabled
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Phone:</label>
          <Input
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Date of Birth:</label>
          <DatePicker
            value={profile.dob}
            onChange={handleDateChange}
            style={{ width: "100%" }}
          />
        </div>
        <Button type="primary" onClick={handleSubmit} loading={loading}>
          Submit
        </Button>
      </Card>

      {/* Success Modal */}
      <Modal
        title="Success"
        open={isModalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={[
          <Button key="ok" type="primary" onClick={handleModalClose}>
            OK
          </Button>,
        ]}
      >
        <p>Profile updated successfully!</p>
      </Modal>
    </div>
  );
};
