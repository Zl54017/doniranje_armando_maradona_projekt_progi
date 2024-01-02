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
        padding: '20px',
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
      award: {
        fontSize: '18px',
        
        color: '#444',
      },
});

interface CertificatePDFProps {
    donorName: string | undefined,
      
    award: {
      name: string;
      benefits: string;
      createdAt: Date;
    };
  }

const certificatePDF = ({ donorName , award }: CertificatePDFProps) => {
    return (
        <Document>
            <Page size='A4' style={styles.page}> 
            <Text style={styles.title}>{award.name}</Text>
            <View  >
            <Text style={styles.date}>
                Datum izdavanja: {format(new Date(award.createdAt), 'P', { locale: hr })}
            </Text>
            </View>

            <View>
                <Text style={styles.award}>Hvala {donorName}. {award.benefits} </Text>
            </View>

            </Page>

        </Document>
    )}

    export default certificatePDF;
