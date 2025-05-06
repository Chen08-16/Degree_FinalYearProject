import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, message, Typography } from 'antd';
import { PayCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;
export const Order = ({ orderItems = [] }) => {
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
      
      fetchOrders();
  }, []);
  const fetchOrders = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/orders');
        setOrders(response.data);
    } catch (error) {
        message.error('Failed to fetch orders.');
    }
};

  // Columns for displaying order items in a table
  const columns = [
    {
        title: 'Order ID',
        dataIndex: '_id',
        key: '_id',
    },
    {
        title: 'Items',
        dataIndex: 'items',
        key: 'items',
        render: (items) =>
            items.map((item, index) => (
                <div key={index}>
                    <strong>{item.foodname}</strong> - ${item.price} x {item.quantity}
                </div>
            )),
    },
    {
        title: 'Total Price',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        render: (price) => `$${price.toFixed(2)}`,
    },
    {
        title: 'Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date) => new Date(date).toLocaleString(),
    },
];


  // Handle checkout button click (UI only)
  const handleCheckout = () => {
    if (orderItems.length === 0) {
      message.error('Please add items to your cart before checking out.');
      return;
    }
    setIsCheckoutModalOpen(true);
  };
  const handlePayment = async (paymentMethod) => {
    try {
        await axios.delete('http://localhost:3000/api/orders'); // Clear all orders from the database
        setIsPaymentSuccessful(true);
        setTimeout(() => {
            setIsPaymentSuccessful(false);
            setIsCheckoutModalOpen(false);
            fetchOrders(); // Refresh orders to reflect empty state
        }, 2000);
        message.success(`Payment successful using ${paymentMethod}!`);
    } catch (error) {
        message.error('Payment failed. Please try again.');
    }
};

    return (
      <>
          <div style={{ padding: '20px' }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>Orders</Title>
                <Table
                    dataSource={orders}
                    columns={columns}
                    rowKey={(record) => record._id}
                    bordered
                    pagination={{ pageSize: 10 }}
                />

                <Button
                    type="primary"
                    icon={<PayCircleOutlined />}
                    style={{ marginTop: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                    onClick={() => setIsCheckoutModalOpen(true)}
                >
                    Checkout
                </Button>

                {/* Checkout Modal */}
                <Modal
                    title="Select Payment Method"
                    open={isCheckoutModalOpen}
                    onCancel={() => setIsCheckoutModalOpen(false)}
                    footer={null}
                >
                    <Button
                        type="primary"
                        style={{ width: '100%', marginBottom: '10px' }}
                        onClick={() => handlePayment('Cash')}
                    >
                        Pay at Counter (Cash)
                    </Button>
                    <Button
                        type="primary"
                        style={{ width: '100%', marginBottom: '10px' }}
                        onClick={() => handlePayment('Credit/Debit Card')}
                    >
                        Credit/Debit Card
                    </Button>
                    <Button
                        type="primary"
                        style={{ width: '100%' }}
                        onClick={() => handlePayment('Touch’n Go E-wallet')}
                    >
                        Touch’n Go E-wallet
                    </Button>
                </Modal>

                {/* Payment Success Modal */}
                <Modal
                    title="Payment Successful"
                    open={isPaymentSuccessful}
                    footer={null}
                    closable={false}
                    style={{ textAlign: 'center' }}
                >
                    <h3>Thank you for your payment!</h3>
                </Modal>
            </div>
      </>
    );
};