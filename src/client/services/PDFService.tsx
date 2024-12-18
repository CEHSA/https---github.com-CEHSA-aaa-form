import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { FormData } from '../../types/FormData';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  }
});

export const ContractPDF = ({ formData }: { formData: FormData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>STANDARDISED FIXED-TERM LEASE AGREEMENT</Text>
        
        <Text style={styles.text}>Lessee Details:</Text>
        <Text style={styles.text}>Name: {formData.lesseeName}</Text>
        <Text style={styles.text}>ID Number: {formData.lesseeIdNumber}</Text>
        <Text style={styles.text}>Email: {formData.lesseeEmail}</Text>
        <Text style={styles.text}>Phone: {formData.lesseePhone}</Text>
        
        <Text style={styles.text}>Physical Address:</Text>
        {formData.physicalAddress && (
          <>
            <Text style={styles.text}>{formData.physicalAddress.street}</Text>
            <Text style={styles.text}>{formData.physicalAddress.city}</Text>
            <Text style={styles.text}>{formData.physicalAddress.state}</Text>
            <Text style={styles.text}>{formData.physicalAddress.postalCode}</Text>
          </>
        )}
        
        <Text style={styles.text}>Course Information:</Text>
        <Text style={styles.text}>Enrolled Course: {formData.enrolledCourse}</Text>
        
        <Text style={styles.text}>Property Details:</Text>
        <Text style={styles.text}>Room Number: {formData.selectedRoom?.number}</Text>
        <Text style={styles.text}>Room Type: {formData.selectedRoom?.type}</Text>
        <Text style={styles.text}>Monthly Rental: R{formData.selectedPricing?.price.toFixed(2)}</Text>
        
        {formData.selectedExtras && formData.selectedExtras.length > 0 && (
          <>
            <Text style={styles.text}>Selected Extras:</Text>
            {formData.selectedExtras.map((extra, index) => (
              <Text style={styles.text} key={index}>- {extra.name}: R{extra.pricePerMonth.toFixed(2)}/month</Text>
            ))}
          </>
        )}
      </View>
    </Page>
  </Document>
);