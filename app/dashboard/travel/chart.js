import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { _COLORS } from "../../../style";
// { data, chartConfig, width, height }
const CountryWiseAnalysis = () => {
  const data = {
    labels: ["SUN", "MON", "THI", "WEN", "THU", "FRI", "SAT"],
    datasets: [
      {
        data: [8000, 11000, 12000, 10500, 30000, 15000, 9500],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => _COLORS.primary,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 3, // optional, default 3
  };

  const width = 350;
  const height = 220;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Country Wise Analysis</Text>
      <BarChart
        data={data}
        width={width}
        height={height}
        yAxisLabel=""
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
      <Text style={styles.footer}>Most steps taken by: Italy</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 5,
    padding: 5,
    marginVertical: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  footer: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default CountryWiseAnalysis;
