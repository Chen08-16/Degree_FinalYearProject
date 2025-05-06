import React from 'react';
import { Collapse, Typography } from 'antd';

const { Panel } = Collapse;
const { Title } = Typography;

export const FAQ = () => {
  const getBoldHeader = (text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined) => <span style={{ fontWeight: 'bold' }}>{text}</span>;

  return (
    <div style={{ padding: '20px'}}>
      <Title style={{ padding: '20px', textAlign: 'center' }} level={2}>Frequently Asked Questions</Title>
      <div style={{ marginTop: '20px' }}>
        <Collapse accordion>
          <Panel header={getBoldHeader("What does the restaurant serve?")} key="1">
            <p>
              Our restaurant specializes in Western and Asian fusion cuisine, featuring dishes
              like pasta, burgers, sushi, and signature rice bowls. We also cater to diverse dietary
              needs with vegetarian and gluten-free options.
            </p>
          </Panel>
          <Panel header={getBoldHeader("What are the opening hours of the restaurant?")} key="2">
            <p>
              Sunday: 10:00 AM – 10:00 PM <br />
              Monday: 10:00 AM – 10:00 PM <br />
              Tuesday: Closed <br />
              Wednesday: 10:00 AM – 10:00 PM <br />
              Thursday: 10:00 AM – 10:00 PM <br />
              Friday: 10:00 AM – 11:00 PM <br />
              Saturday: 10:00 AM – 11:00 PM
            </p>
          </Panel>
          <Panel header={getBoldHeader("Where is the restaurant located?")} key="3">
            <p>
              You can find us at 123 Fusion Lane, Georgetown, Penang, Malaysia.
            </p>
          </Panel>
          <Panel header={getBoldHeader("How do I make a payment?")} key="4">
            <p>
              We accept multiple payment methods: <br />
              - Cash <br />
              - Credit/Debit Cards (Visa, MasterCard, AmEx) <br />
              - E-wallet Payments (GrabPay, Touch 'n Go)
            </p>
          </Panel>
          <Panel header={getBoldHeader("Is my data secure?")} key="5">
            <p>
              Absolutely. We employ industry-standard encryption to protect your personal and
              payment information. Our systems comply with all relevant data protection regulations
              to ensure your data remains secure.
            </p>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};
