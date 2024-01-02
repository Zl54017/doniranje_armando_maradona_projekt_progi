import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { hr } from 'date-fns/locale';

import roboto from '../../assets/fonts/Roboto/Roboto-Regular.ttf';
import robotoBold from '../../assets/fonts/Roboto/Roboto-Bold.ttf';

Font.register({
  family: 'Roboto',
  fonts: [{ src: roboto }, { src: robotoBold }],
});

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Roboto',
        padding:'20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center content horizontally
        justifyContent: 'center', // Center content vertically
      },
      title: {
        fontSize: '24px',
        fontWeight: 800,
        marginBottom: '15px', // Increase margin between title and other text
        color: '#333',
      },
      date: {
        fontSize: '16px',
        marginBottom: '40px',
        color: '#555',
      },
      donation: {
        fontSize: '18px',
        color: '#444',
      },
});

interface DonationsPDFProps {
    donorName: string | undefined,
      
    donation: {
      address: string;
      date: Date;
    };
  }

const donationsPdf =({donorName, donation}: DonationsPDFProps)=>{
    return (
        <Document>
            <Page size='A4' style={styles.page}>
                <Text style={styles.title}>Ispričnica</Text>
                
                    <Text style={styles.donation}> Dana {format(new Date(donation.date), 'P', { locale: hr })} {donorName} darovao/la je krv na akciji dobrovoljnog darivanja krvi održanoj na lokaciji: {donation.address} </Text>
                
            </Page>
        </Document>
    )
}

export default donationsPdf;