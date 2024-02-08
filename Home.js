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
            Our expense management application is equipped with
            an array of powerful visualization tools aimed at providing insightful analyses of your
            financial data. Seamlessly tracking your expenses, our app offers an intuitive user interface presenting
            your spending patterns through dynamic pie charts, insightful bar graphs, and more. Easily categorize your
            expenditures and visualize the distribution of your finances with interactive pie charts, allowing you to comprehend
            where your money is being allocated. Gain deeper insights into your spending habits using our bar graphs,
            presenting a detailed comparison of expenses over time or across different categories. With these visualization features,
            our app empowers you to make informed financial decisions and effectively manage your budget, offering clarity and comprehension
            in your financial journey.
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