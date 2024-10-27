import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Styles for the PDF Document
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
    fontFamily: 'Helvetica',
    backgroundColor: '#f9f9f9',
  },
  section: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#333',
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textTransform: 'uppercase',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: 20,
    border: '1px solid #ccc',
  },
  companyInfo: {
    marginBottom: 20,
    fontSize: 12,
    color: '#555',
    backgroundColor: '#f3f4f6',
    padding: 10,
    borderRadius: 5,
  },
  table: {
    display: 'table',
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: 20,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2980B9',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    color: '#fff',
  },
  tableColHeader: {
    width: '25%',
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCol: {
    width: '25%',
    padding: 10,
    textAlign: 'center',
    fontSize: 12,
    color: '#333',
  },
  total: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    borderTopWidth: 2,
    borderTopColor: '#2980B9',
    paddingTop: 10,
    textAlign: 'right',
  },
  footer: {
    marginTop: 20,
    fontSize: 10,
    color: '#777',
    textAlign: 'center',
  },
});

// Main Invoice Document Component
const InvoiceDocument = ({ items, discount, shipping, tax, amountPaid, total, data, balanceDue }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Invoice</Text>
        <Image src={data?.companyInfo?.logo} style={styles.logo} />
      </View>
      <View style={styles.section}>
        <Text style={styles.companyInfo}>
          <Text style={{ fontWeight: 'bold' }}>{data?.companyInfo?.from}</Text>
          {'\n'}
          <Text style={{ fontWeight: 'bold' }}>{data?.companyInfo?.to}</Text>
          {'\n'}
          Invoice Number: <Text style={{ fontWeight: 'bold' }}>{data?.companyInfo?.invoiceNumber}</Text>
          {'\n'}
          Invoice Date: <Text style={{ fontWeight: 'bold' }}>{data?.companyInfo?.invoiceDate}</Text>
          {'\n'}
          Due Date: <Text style={{ fontWeight: 'bold' }}>{data?.companyInfo?.dueDate}</Text>
        </Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableColHeader}>Description</Text>
          <Text style={styles.tableColHeader}>Quantity</Text>
          <Text style={styles.tableColHeader}>Rate</Text>
          <Text style={styles.tableColHeader}>Amount</Text>
        </View>
        {items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCol}>{item.description}</Text>
            <Text style={styles.tableCol}>{item.quantity}</Text>
            <Text style={styles.tableCol}>${item.rate}</Text>
            <Text style={styles.tableCol}>${item.amount}</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.total}>Total: ${total}</Text>
        <Text>Discount: ${discount}</Text>
        <Text>Shipping: ${shipping}</Text>
        <Text>Tax: ${tax}</Text>
        <Text>Amount Paid: ${amountPaid}</Text>
        <Text>Balance Due: ${balanceDue}</Text>
      </View>
      <View style={styles.footer}>
        <Text>Terms & Conditions: {data?.terms}</Text>
        <Text>Footnote: {data?.footNote}</Text>
      </View>
    </Page>
  </Document>
);

export default InvoiceDocument;
