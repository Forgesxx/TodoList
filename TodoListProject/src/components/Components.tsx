/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

interface Item {
  id: number;
  item: string;
}

const YourComponent: React.FC = () => {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    fetch('http://192.168.0.156:8080/component')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .then((data: Item[] | undefined) => {
        if (data === undefined) {
          throw new Error('Received undefined data from the server');
        }
        console.log('Data from server:', data);
        setData(data);
      })
      .catch(error => console.error('Error fetching dataa:', error.message));
  }, []);
  return (
    <View>
      <Text>Data from Server:</Text>
      {data.map(item => (
        <Text key={item.id}>{item.item}</Text>
      ))}
    </View>
  );
};
export default YourComponent;
