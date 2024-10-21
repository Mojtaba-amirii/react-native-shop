import { FlatList, StyleSheet, Text, View } from "react-native";
import { PRODUCTS } from "../../../assets/products";
import { ProductListItem } from "../../components/product-list-item";
import { ListHeader } from "../../components/list-header";

const Home = () => {
  return (
    <View>
      <FlatList
        data={PRODUCTS}
        renderItem={({ item }) => <ProductListItem product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.FlatListContent}
        columnWrapperStyle={styles.FlatListColumnWrapper}
        style={{ paddingHorizontal: 10, paddingVertical: 10 }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  FlatListContent: {
    paddingBottom: 20,
  },
  FlatListColumnWrapper: {
    justifyContent: "space-between",
  },
});
