import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { VictoryPie } from 'victory-native';
import HeaderBar from './HeaderBar';
import Footer from './Footer';

export default function Home() {
    const data = [
        { x: "Work", y: 11 },
        { x: "Eat", y: 2 },
        { x: "Commute", y: 2 },
        { x: "Watch TV", y: 2 },
        { x: "Sleep", y: 7 },
    ];

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <HeaderBar />
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.heading}>Helps Managing your Expenses In Appealing Way!!!</Text>
          <Text style={styles.paragraph}>
          Our expense management app provides a range of powerful 
          visualization tools for insightful analyses of your financial data.
           Track your expenses seamlessly with an intuitive user 
           interface that presents your spending patterns through 
           dynamic pie charts and insightful bar graphs. Easily categorize 
           expenditures and visualize the distribution of your finances 
           with interactive pie charts, allowing you to understand where 
           your money is being allocated. Gain deeper insights into your 
           spending habits using our bar graphs, providing detailed 
           comparisons of expenses over time or across different 
           categories.
          </Text>
          <View style={styles.flexContainer}>
            <View style={styles.leftContent}>
              <Text style={styles.textDanger}>Visualize your Data</Text>
              <VictoryPie
                data={data}
                colorScale={['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0']}
                width={250} // Increase the width of the pie chart
                height={250} // Increase the height of the pie chart
                
            
              />
            </View>
          </View>
          {/* Remaining content */}
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  flexContainer: {
    flexDirection: 'row',
  },
  leftContent: {
    flex: 1,
    
    alignItems: "center"
  },
  textDanger: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20,
  },
});