import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Button, Modal, Input, InputNumber, Switch, Upload, message, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;
const { Meta } = Card;

export const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [foodname, setFoodname] = useState('');
    const [price, setPrice] = useState('');
    const [foodstatus, setFoodstatus] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [form] = Form.useForm();

    const [orderItems, setOrderItems] = useState([]);  // To track ordered items
    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/menu');
            if (!response.ok) throw new Error('Failed to fetch menu items');
            const data = await response.json();
            setMenuItems(data);
        } catch (error) {
            message.error('Error loading menu items');
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setIsEditModalOpen(true);
        form.setFieldsValue({
            foodname: item.foodname,
            price: item.price,
            foodstatus: item.foodstatus === 'true',
            image: [], // Ensure this is properly reset for image handling
        });
    };
    const handleEditSubmit = async (values) => {
        const file = values.image?.[0]?.originFileObj;
        const formData = {
            foodname: values.foodname,
            price: values.price,
            foodstatus: values.foodstatus ? 'true' : 'false',
            image: editingItem.image, // Default to existing image
        };

        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                formData.image = reader.result; // Base64 encoded string
                await submitEdit(formData);
            };
            reader.readAsDataURL(file);
        } else {
            await submitEdit(formData);
        }
    };

    const submitEdit = async (formData) => {
        try {
            await axios.put(`http://localhost:3000/api/menu/${editingItem._id}`, formData);
            message.success('Menu item updated successfully!');
            setIsEditModalOpen(false);
            fetchMenuItems();
        } catch (error) {
            message.error('Failed to update menu item.');
        }
    };


    const handleAddSubmit = async (values) => {
        const file = values.image?.[0]?.originFileObj;
        if (!file) {
            message.error('Please upload an image.');
            return;
        }

        console.log('Form Data:', values);

        const reader = new FileReader();
        reader.onloadend = async () => {
            const formData = {
                foodname: values.foodname,
                price: values.price,
                foodstatus: values.foodstatus ? 'true' : 'false',
                image: reader.result, // Base64 encoded string
            };

            try {
                await axios.post('http://localhost:3000/api/menu', formData);
                message.success('Menu item added successfully!');
                setIsAddModalOpen(false);
                fetchMenuItems();
            } catch (err) {
                message.error('Failed to add menu item.');
            }
        };

        reader.readAsDataURL(file);
    };

    const handleImageChange = (info) => {
        if (info.file.status === 'done') {
            setImageFile(info.file.originFileObj);
        } else if (info.file.status === 'error') {
            message.error('Failed to upload image');
        }
    };


    const handleAddToOrder = (item) => {
        const existingItem = orderItems.find(orderItem => orderItem._id === item._id);
        if (existingItem) {
            setOrderItems(orderItems.map(orderItem => 
                orderItem._id === item._id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem
            ));
        } else {
            setOrderItems([...orderItems, { ...item, quantity: 1 }]);
        }
        message.success(`${item.foodname} added to order.`);
    };

    // Handle Order Submission (just a placeholder)
    const handleOrderSubmit = async () => {
        if (orderItems.length === 0) {
            message.error('No items in order!');
            return;
        }
    
        // Calculate the total price
        const totalPrice = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    
        const orderData = {
            items: orderItems.map(item => ({
                foodname: item.foodname,
                price: item.price,
                quantity: item.quantity,
                image: item.image, // Include image URL/path
            })),
            totalPrice: totalPrice,
        };
    
        try {
            // Send a POST request to the backend to save the order
            const response = await axios.post('http://localhost:3000/api/orders', orderData);
            if (response.status === 200) {
                message.success('Order placed successfully!');
                setOrderItems([]);  // Clear the order after successful submission
            } else {
                message.error('Failed to place order.');
            }
        } catch (error) {
            message.error('Error placing order.');
        }
    };
    const handlePlaceOrder = async () => {
        if (orderItems.length === 0) {
            message.error('No items in order!');
            return;
        }

        const totalPrice = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
        const orderData = {
            items: orderItems.map(item => ({
                foodname: item.foodname,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
            })),
            totalPrice,
        };

        try {
            await axios.post('http://localhost:3000/api/orders', orderData);
            message.success('Order placed successfully!');
            setOrderItems([]);
        } catch (error) {
            message.error('Failed to place order.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Food Menu</Title>

            <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                <Button type="primary" onClick={() => setIsAddModalOpen(true)}>
                    Add New Item
                </Button>
            </div>

            <Row gutter={[16, 16]}>
                {menuItems.map((item) => (
                    <Col xs={24} sm={12} md={8} lg={8} key={item._id}>
                        <Card
                            hoverable
                            cover={
                                <img alt={item.foodname} src={item.image} style={{
                                    width: '100%', // Adjusts to container width
                                    objectFit: 'cover',
                                    height: '200px',
                                }} />}
                            style={{
                                borderRadius: '8px',
                                overflow: 'hidden',
                                height: '350px', // Fixed height
                                // display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Meta title={item.foodname} description={`Price: $${item.price}`} />
                            <div style={{ marginTop: '10px', textAlign: 'center' }}>
                                <Button type="primary" style={{ marginRight: '10px' }}onClick={() => handleAddToOrder(item)}>Add to Order</Button>
                                
                                <Button type="default" onClick={() => handleEdit(item)}>Edit</Button>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
            {/* Order Summary */}
            <div style={{ marginTop: '20px' }}>
                <Title level={3}>Your Order</Title>
                <ul>
                    {orderItems.map((item, index) => (
                        <li key={index}>{item.foodname} - ${item.price}</li>
                    ))}
                </ul>
                <Button type="primary" onClick={handleOrderSubmit}>Place Order</Button>
            </div>

            {/* Edit Modal */}
            <Modal
                title="Edit Menu Item"
                open={isEditModalOpen}
                onCancel={() => setIsEditModalOpen(false)}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleEditSubmit}
                >
                    <Form.Item name="foodname" label="Food Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="foodstatus" label="Available" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                    <Form.Item
                        name="image"
                        label="Upload Image"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => {
                            if (Array.isArray(e)) return e;
                            return e?.fileList;
                        }}
                    >
                      <Upload listType="picture" beforeUpload={() => false}>
                          <Button icon={<UploadOutlined />}>Click to Upload</Button>
                      </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Update</Button>
                    </Form.Item>
                </Form>
            </Modal>






            {/* Add New Item Modal */}
            <Modal
              title="Add New Menu Item"
              open={isAddModalOpen}
              onCancel={() => setIsAddModalOpen(false)}
              footer={null}
            >
              <Form form={form} layout="vertical" onFinish={handleAddSubmit}>
                <Form.Item name="foodname" label="Food Name" rules={[{ required: true, message: 'Please enter food name' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter price' }]}>
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="foodstatus" label="Available" valuePropName="checked">
                  <Switch />
                </Form.Item>
                <Form.Item
                  name="image"
                  label="Upload Image"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => {
                    if (Array.isArray(e)) return e;
                    return e?.fileList;
                  }}

                >
                  <Upload listType="picture" beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">Add</Button>
                </Form.Item>
              </Form>
            </Modal>
        </div>
    );
};
