import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: 20,
  },
  companyInfo: {
    marginBottom: 20,
    fontSize: 12,
    color: '#555',
  },
  table: {
    display: 'table',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableColHeader: {
    width: '25%',
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
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
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 10,
  },
  footer: {
    marginTop: 20,
    fontSize: 10,
    color: '#777',
  },
});

const InvoiceDocument = ({ items, discount, shipping, tax, amountPaid, total, data,balanceDue }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Invoice</Text>
        <Image src={data?.companyInfo?.logo} style={styles.logo} />
      </View>
      <View style={styles.section}>
        <Text style={styles.companyInfo}>
          {data?.companyInfo?.from}
          {'\n'}
          {data?.companyInfo?.to}
          {'\n'}
          Invoice Number: {data?.companyInfo?.invoiceNumber}
          {'\n'}
          Invoice Date: {data?.companyInfo?.invoiceDate}
          {'\n'}
          Due Date: {data?.companyInfo?.dueDate}
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
            <Text style={styles.tableCol}>{item.rate}</Text>
            <Text style={styles.tableCol}>{item.amount}</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.total}>Total: {total}</Text>
        <Text>Discount: {discount}</Text>
        <Text>Shipping: {shipping}</Text>
        <Text>Tax: {tax}</Text>
        <Text>Amount Paid: {amountPaid}</Text>
        <Text>Balance Due: {balanceDue}</Text>
      </View>
      <View style={styles.footer}>
        <Text>Terms: {data?.terms}</Text>
        <Text>Footnote: {data?.footNote}</Text>
      </View>
    </Page>
  </Document>
);

export default InvoiceDocument;
