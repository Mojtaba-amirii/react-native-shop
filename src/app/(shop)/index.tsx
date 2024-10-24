import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { ProductListItem } from "../../components/product-list-item";
import { ListHeader } from "../../components/list-header";
import { getProductsAndCategories } from "../../api/api";

const Home = () => {
  const { data, error, isLoading } = getProductsAndCategories();

  if (isLoading) return <ActivityIndicator />;

  if (error || !data)
    return <Text>Error: {error?.message || "An error ocurred"}</Text>;

  return (
    <View>
      <FlatList
        data={data.products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={<ListHeader categories={data.categories} />}
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
