import React from "react";
import { Link } from 'react-router-dom';
import { Row, Col, Card, Typography, Divider, Button } from "antd";
import SmokedChicken from '../images/SmokedChicken.jpg';
import Salad from '../images/Salad.jpg';
import Spaghetti from '../images/Spaghetti.jpg';
import EggBenedict from '../images/EggBenedict.jpg';
import SharkFinSoup from '../images/SharkFinSoup.jpg';
import PadThai from '../images/PadThai.jpg';
import SalmonSteak from '../images/SalmonSteak.jpg';
import ChocolateCake from '../images/ChocolateCake.jpg';
import R_Wallpaper_3 from '../images/R_Wallpaper_3.jpg';

const { Title, Text } = Typography;

export const Home = () => {
  const foodItems = [
    { id: 1, name: "Smoked Chicken", image: SmokedChicken, price: "$15" },
    { id: 2, name: "Salad", image: Salad, price: "$12" },
    { id: 3, name: "Spaghetti", image: Spaghetti, price: "$12" },
    { id: 4, name: "Egg Benedict", image: EggBenedict, price: "$10" },
    { id: 5, name: "Shark Fin Soup", image: SharkFinSoup, price: "$20" },
    { id: 6, name: "Pad Thai", image: PadThai, price: "$13" },
    { id: 7, name: "Salmon Steak", image: SalmonSteak, price: "$18" },
    { id: 8, name: "Chocolate Cake", image: ChocolateCake, price: "$7" },
  ];

  return (
    <div style={{ width: "100%", minHeight: "100vh", backgroundColor: "#0000" }}>
      {/* Top Banner Section */}
      <div
        style={{
          background: `url('/src/images/R_Wallpaper_3.jpg') center/cover no-repeat`,
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "white",
        }}
      >
      </div>

      {/* Welcome Message Section */}
      <div style={{ padding: "50px", textAlign: "center" }}>
        <Title level={1} style={{ fontSize: "3.5rem", marginBottom: "20px" }}>
          Welcome to Fusion Delight!
        </Title>
        <Title level={2} style={{ fontSize: "3rem", marginBottom: "20px" }}>
          A Unique Dining Experience Awaits
        </Title>
        <Text style={{ fontSize: "1.5rem" }}>
          Indulge in a variety of cuisines crafted with passion, blending the best of Asian and Western flavors for an unforgettable meal.
        </Text>
      </div>

        {/* Buttons: Order Now and Reserve Now */}
        <div style={{ padding: "20px", textAlign: "center" }}>
        <Link to="/Menu">
          <Button 
            type="primary" 
            size="large" 
            style={{ marginRight: "20px", width: "200px", height: "50px", fontSize: "1.2rem" }}
          >
            Order Now
          </Button>
        </Link>
        <Link to="/Reservation">
          <Button 
            type="default" 
            size="large" 
            style={{ width: "200px", height: "50px", fontSize: "1.2rem" }}
          >
            Reserve Now
          </Button>
        </Link>
      </div>

      {/* Food Menu Section */}
      <div style={{ padding: "40px" }}>
        <Title level={2} style={{ textAlign: "center" }}>
          Hot Picks
        </Title>
        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          {foodItems.map((item) => (
            <Col xs={24} sm={12} md={6} key={item.id}>
              <Card
                hoverable
                cover={<img alt={item.name} src={item.image} style={{ height: "150px", objectFit: "cover" }} />}
              >
                <Card.Meta title={item.name} description={`Price: ${item.price}`} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* About Us Section */}
      <div style={{ padding: "40px", backgroundColor: "#0000" }}>
        <Title level={2} style={{ textAlign: "center" }}>
          About Us
        </Title>
        <Divider />
        <Text style={{ fontSize: "1.2rem", lineHeight: "1.8" }}>
          Fusion Delight is a modern dining destination that fuses Asian and Western cuisines for an innovative and
          memorable experience. Located in the heart of Georgetown, Penang, our restaurant offers a cozy ambiance,
          top-notch service, and a menu filled with flavors to excite your palate. Join us to celebrate food and
          togetherness!
        </Text>
        <div style={{ marginTop: "60px", textAlign: "center" }}>
          <Text strong>📞 Phone:</Text> +60 123-456-7890 <br />
          <Text strong>📧 Email:</Text> contact@fusiondelight.com <br />
          <Text strong>📍 Address:</Text> 123 Fusion Lane, Georgetown, Penang, Malaysia
        </div>
      </div>
    </div>
  );
};
