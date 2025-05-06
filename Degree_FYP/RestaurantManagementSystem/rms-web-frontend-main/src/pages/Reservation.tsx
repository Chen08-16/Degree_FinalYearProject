import React, { useEffect, useState } from "react";
import { Form, InputNumber, Button, DatePicker, TimePicker, Select, message, Table, List, Input } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useGetIdentity } from "@refinedev/core";
import { getAuth } from "firebase/auth";

const { Option } = Select;
// const user = await getAuth()

export const Reservation = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [userReservations, setUserReservations] = useState([]);
    const [currentDate, setCurrentDate] = useState(null);
    const { data: user } = useGetIdentity();
    const [uid, setUid] = useState(user?.id);
    // Fetch user reservations from backend
    const fetchUserReservations  = async () => {
        console.log("id",user?.id)
        try {
            console.log("id",user?.id)
            if (uid) {  // Check if user.id is available
                const response = await axios.get("http://localhost:3000/api/reservations/user-reservations", {
                    params: {userId: user?.id },  // Pass the user ID in the query parameters
                });
                setUserReservations(response.data);
                console.log(response.data.reservations)
            } else {
                message.error("User ID is not available.");
            }
        } catch (error) {
            console.error("Error fetching user reservations:", error);
            message.error("Failed to fetch reservations.");
        }
    };

     // Fetch available times based on selected date
    const fetchAvailableTimes = async (date) => {
        try {
        const response = await axios.get("http://localhost:3000/api/reservations", { params: { date } });
        setAvailableTimes(response.data);
        } catch (error) {
        console.error("Error fetching available times:", error);
        message.error("Failed to fetch available times.");
        }
    };

    const handleReserve = async (values) => {
        setLoading(true);

        try {
            // Format data to send to the server
            // const reservationData = {
            //   date: values.date.format("YYYY-MM-DD"),
            //   time: values.time.format("HH:mm") + ` ${values.amPm}`,
            //   numberOfPeople: values.numberOfPeople,
            // };
            console.log("table",values.tableNumber)

            const reservationData = {
                date: values.date.format("YYYY-MM-DD"),
                time: values.time.format("HH:mm"),
                amPm: values.amPm,
                numberOfPeople: values.numberOfPeople,
                userId:user.id,
                customerName: values.customerName,
                customerContact: values.customerContact,
                tableNumber: values.tableNumber,
            };

              // Check for an existing reservation at the selected date and time
            const existingReservation = await axios.post("http://localhost:3000/api/reservations", reservationData);
            // If reservation is successfully created, show success message
            message.success("Reservation successfully created!");
            form.resetFields();
            fetchUserReservations(); //
        } catch (error) {
            message.error("Failed to create reservation. Please try again.");
        } finally {
            setLoading(false);
        }
    };

  // Handle reservation cancellation
    const handleCancelReservation = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/reservations/${id}`, {
                data: { userId:user?.id },  // Send the user ID in the request body to verify ownership
            });
            message.success(response.data.message);
            fetchUserReservations(); 
        } catch (error) {
            message.error("Failed to cancel reservation.");
            message.error("Failed to cancel the reservation.");
        }
    };
    useEffect(() => {
        if (currentDate) {
            fetchAvailableTimes(currentDate.format("YYYY-MM-DD"));
          }
          fetchUserReservations(); // Load user reservations
    }, [currentDate]);



    const columns = [
        {
            title: "Customer Name",
            dataIndex: "customerName",
            key: "customerName",
        },
        {
            title: "Table Number",
            dataIndex: "tableNumber",
            key: "tableNumber",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Time",
            dataIndex: "time",
            key: "time",
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <Button
                    danger
                    onClick={() => handleCancelReservation(record._id)}
                >
                Cancel Reservation
                </Button>
            ),
        },
    ];



    return (
        <>
            <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
                <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Table Reservation</h1>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleReserve}
                >
                    {/* Date Picker */}
                    <Form.Item
                        name="date"
                        label="Date"
                        rules={[{ required: true, message: "Please select a date!" }]}
                    >
                        <DatePicker style={{ width: "100%" }}   disabledDate={(current) => current && current < dayjs().endOf("day")}/>
                    </Form.Item>

                    {/* Time Picker */}
                    <Form.Item
                        name="time"
                        label="Time"
                        rules={[{ required: true, message: "Please select a time!" }]}
                    >
                        <TimePicker use12Hours format="h:mm" style={{ width: "100%" }} />
                    </Form.Item>

                    {/* AM/PM Selector */}
                    <Form.Item
                        name="amPm"
                        label="AM/PM"
                        rules={[{ required: true, message: "Please select AM or PM!" }]}
                    >
                        <Select placeholder="Select AM/PM">
                            <Option value="AM">AM</Option>
                            <Option value="PM">PM</Option>
                        </Select>
                    </Form.Item>

                    {/* Number of People */}
                    <Form.Item
                        name="numberOfPeople"
                        label="Number of People"
                        rules={[{ required: true, message: "Please enter the number of people!" }]}
                    >
                        <InputNumber min={1} max={20} style={{ width: "100%" }} />
                    </Form.Item>
                    {/* Table Number Selector */}
                    <Form.Item
                        name="tableNumber"
                        label="Table Number"
                        rules={[{ required: true, message: "Please select a table!" }]}
                    >
                        <Select placeholder="Select Table Number">
                            {Array.from({ length: 10 }, (_, index) => (
                                <Option key={index + 1} value={index + 1}>
                                    Table {index + 1}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                       {/* Customer Information */}
                    <Form.Item
                        name="customerName"
                        label="Your Name"
                        rules={[{ required: true, message: "Please enter your name!" }]}
                    >
                    <Input placeholder="Your Name" />
                    </Form.Item>

                    <Form.Item
                        name="customerContact"
                        label="Your Contact"
                        rules={[{ required: true, message: "Please enter your contact!" }]}
                    >
                    <Input placeholder="Your Contact" />
                    </Form.Item>
                    {/* Reserve Button */}
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                        >
                            Reserve
                        </Button>
                    </Form.Item>
                </Form>
            </div>


            <br />
            <h1>Your Reservations</h1>
            <div style={{ marginTop: "2rem" }}>
                <h2>Your Reservations</h2>
                {userReservations.length > 0 ? (
                <ul>
                    {userReservations.map((reservation) => (
                    <li key={reservation._id}>
                        <div>
                        <strong>Table {reservation.tableNumber}</strong> on {dayjs(reservation.date).format("YYYY-MM-DD")} at {reservation.time}
                        </div>
                        <Button
                        danger
                        onClick={() => handleCancelReservation(reservation._id)}
                        >
                        Cancel Reservation
                        </Button>
                    </li>
                    ))}
                </ul>
                ) : (
                <p>No reservations found.</p>
                )}
            </div>
          
        </>
    );
};