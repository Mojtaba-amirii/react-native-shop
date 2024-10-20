import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} style={{ color: "#1BC464" }} {...props} />;
}

const TabsLayout = () => {
  return (
    <SafeAreaView edges={["top"]} style={style.SafeAreaView}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#1BC464",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: { fontSize: 16 },
          tabBarStyle: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 10,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "shop",
            tabBarIcon: (props) => (
              <TabBarIcon name="shopping-cart" color={props.color} />
            ),
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: "orders",
            tabBarIcon: (props) => (
              <TabBarIcon name="book" color={props.color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
  },
});

export default TabsLayout;
