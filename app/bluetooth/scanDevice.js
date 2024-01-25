import { BleManager } from 'react-native-ble-plx';
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';

const BleComponent = () => {
  const [manager] = useState(new BleManager());
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    return () => manager.destroy();
  }, [manager]);

  const scanDevices = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        // Handle error
        return;
      }

      // Add device to list of found devices
      if (device) {
        setDevices((prevDevices) => [...prevDevices, device]);
      }
    });

    // Stop scanning after 5 seconds
    setTimeout(() => {
      manager.stopDeviceScan();
    }, 5000);
  };

  return (
    <View>
      <Button title="Scan for Devices" onPress={scanDevices} />
      {devices.map((device) => (
        <Text key={device.id}>{device.name}</Text>
      ))}
    </View>
  );
};

export default BleComponent;
