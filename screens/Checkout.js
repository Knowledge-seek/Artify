import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import CircleVector from "../components/CircleVector";
import SelectList from "react-native-dropdown-select-list";
import { FontAwesome } from "@expo/vector-icons";
import { useStripe } from "@stripe/stripe-react-native";
import api from "../services/apiService";
import { getToken } from "../services/AsyncStorageService";
import { useDispatch, useSelector } from "react-redux";
import { place_order } from "../slices/orderSlice";

const Checkout = ({ navigation, route }) => {
  const { shipping } = route.params;

  const dispatch = useDispatch();

  const { status: orderStatus } = useSelector((state) => state.order);

  const {
    seller,
    orderItem,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    shippingInfo,
  } = shipping;

  const payHandler = () => {
    dispatch(
      place_order(
        seller,
        orderItem,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        shippingInfo
      )
    );
  };

  useEffect(() => {
    if (orderStatus && orderStatus.type === "error") {
      Alert.alert(orderStatus.message);
      //  dispatch(clear_all_errors());
    }
    if (orderStatus && orderStatus.type === "idle") {
      Alert.alert(orderStatus.message);
    }
  }, [dispatch]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <CircleVector></CircleVector>
          <View
            style={{
              alignItems: "center",
              height: 100,
              width: "100%",
              position: "absolute",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 30,
                lineHeight: 48,
                color: "#363488",
                top: 70,
              }}
            >
              Checkout
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 22, marginTop: "5%", marginLeft: "5%" }}>
              Shipping Address
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#F5F5F5",
              width: "90%",
              marginTop: "5%",
              height: "auto",
              marginLeft: "5%",
              borderRadius: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: "8%",
                marginLeft: "5%",
              }}
            >
              <Text style={{ fontSize: 16 }}>
                {shipping.shippingInfo.address} -{" "}
                {shipping.shippingInfo.pinCode}, {shipping.shippingInfo.city},
                {shipping.shippingInfo.state}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: "5%",
                marginLeft: "5%",
              }}
            >
              <Text style={{ fontSize: 16 }}>
                Amount = {shipping.itemsPrice}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: "4%",
                marginBottom: "6%",
                marginLeft: "5%",
              }}
            >
              <Text style={{ fontSize: 16 }}>
                Shipping Price = {shipping.shippingPrice}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: ".5%",
                marginBottom: "6%",
                marginLeft: "5%",
              }}
            >
              <Text style={{ fontSize: 16 }}>
                Tax Price = {shipping.taxPrice}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: ".5%",
                marginBottom: "6%",
                marginLeft: "5%",
              }}
            >
              <Text style={{ fontSize: 16 }}>
                Total Price= {shipping.totalPrice}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              width: "90%",
              height: 50,
              backgroundColor: "#363488",
              borderRadius: 10,
              marginTop: "5%",
              marginLeft: "5%",
              marginBottom: 100,
            }}
            onPress={payHandler}
          >
            <Text
              style={{
                color: "white",
                fontSize: 15,
                textAlign: "center",
                marginTop: "3%",
              }}
            >
              Pay
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
  },
  editButton: {
    backgroundColor: "#363488",
    marginLeft: "20%",
    width: "20%",
    height: "60%",
    borderRadius: 9,
    marginTop: "5%",
  },
});
