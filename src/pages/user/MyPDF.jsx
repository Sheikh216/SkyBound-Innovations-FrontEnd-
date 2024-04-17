import React from 'react';
import { Document, Page, Text, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20
  },
  text: {
    fontSize: 20,
    marginBottom: 15
  }
});

// PDF document component
const MyDocument = ({ text }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.text}>Airline: {text.airline_name}</Text>
      <Text style={styles.text}>PackageName: {text.package_name}</Text>
      <Text style={styles.text}>From: {text.flightInfo[0].from}</Text>
      <Text style={styles.text}>To: {text.flightInfo[0].to}</Text>
      <Text style={styles.text}>Time: {text.flightInfo[0].time}</Text>
      <Text style={styles.text}>BookedSeat: {text.seats}</Text>
      <Text style={styles.text}>Signed by SkyBound Travels</Text>
    </Page>
  </Document>
);

const MyPDF = ({ flightDetails, disabled }) => (
  <div>
     <div>
      {disabled ? (
        <button disabled>N/A</button>
      ) : (
        <PDFDownloadLink document={<MyDocument text={flightDetails} />} fileName="ticket.pdf">
          {({ blob, url, loading, error }) => (
            <button style={{ backgroundColor: 'blue', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px' }}>
              {loading ? 'Loading document...' : 'Download PDF'}
            </button>
          )}
        </PDFDownloadLink>
      )}
    </div>
  </div>
);

export default MyPDF;