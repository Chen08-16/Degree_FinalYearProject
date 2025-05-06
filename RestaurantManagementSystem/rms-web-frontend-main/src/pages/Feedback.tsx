import React, { useRef } from "react";
import { Form, Input, Button, Typography, Card, message } from "antd";
import emailjs from "@emailjs/browser";

const { Title, Text } = Typography;

export const Feedback = () => {
  const formRef  = useRef();

    const sendEmail = (values) => {
        const { from_name, from_email, messageContent: feedbackMessage } = values;
        console.log("message",feedbackMessage)
        emailjs
            .send(
                  "service_qy3xkug", // Replace with your Service ID
                  "template_3byf62e", // Replace with your Template ID
                  {
                      from_name,
                      from_email,
                      message: feedbackMessage,
                  },
                      "br7yLMO422SzZtVrC" // Replace with your Public Key
            )
            .then(
              () => {
                  message.success("Feedback submitted successfully!");
                  formRef.current.resetFields(); // Reset the form
              },
              (error) => {
                  console.error("Error:", error.text);
                  message.error("Failed to submit feedback. Please try again.");
              }
            );
    };
  return (
      <div
          style={{
              padding: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              backgroundColor: "#0000",
          }}
      >
        <Card
            style={{
                width: "100%",
                maxWidth: "600px",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
        >
            <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
                We Value Your Feedback!
            </Title>
            <Text style={{ textAlign: "center", display: "block", marginBottom: "30px" }}>
                Share your thoughts with us to help improve your experience.
            </Text>
            {/* <form ref={form} onSubmit={sendEmail}> */}
                <Form 
                    layout="vertical"
                    ref={formRef} // Attach form reference
                    // layout="vertical"
                    onFinish={sendEmail} // Use Ant Design's onFinish for form submission
                >
                    <Form.Item
                        label={<Text strong>Name</Text>}
                        name="from_name"
                        rules={[{ required: true, message: "Please enter your name!" }]}
                    >
                        <Input placeholder="Your Name" />
                    </Form.Item>
                    <Form.Item
                        label={<Text strong>Email</Text>}
                        name="from_email"
                        rules={[
                            { required: true, message: "Please enter your email!" },
                            { type: "email", message: "Please enter a valid email!" },
                        ]}
                    >
                       <Input placeholder="Your Email" />
                    </Form.Item>
                    <Form.Item
                        label={<Text strong>Message</Text>}
                        name="messageContent"
                        rules={[{ required: true, message: "Please provide your feedback!" }]}
                    >
                        <Input.TextArea
                          rows={4}
                          placeholder="Type your feedback here..."
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                            Submit Feedback
                        </Button>
                    </Form.Item>
                </Form>
            {/* </form> */}
        </Card>
      </div>
  );
};