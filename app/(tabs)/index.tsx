import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Animated, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

export default function CounterScreen() {
  const [count, setCount] = useState(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const countScaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animate counter value when it changes
    Animated.sequence([
      Animated.spring(countScaleAnim, {
        toValue: 1.2,
        useNativeDriver: true,
        tension: 100,
        friction: 3,
      }),
      Animated.spring(countScaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 5,
      }),
    ]).start();
  }, [count]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.92,
      useNativeDriver: true,
      tension: 100,
      friction: 3,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 5,
    }).start();
  };

  return (
    <LinearGradient
      colors={["#667eea", "#764ba2", "#f093fb"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Decorative circles */}
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />

      <View style={styles.content}>
        <Text style={styles.title}>✨ Counter</Text>
        <Text style={styles.subtitle}>Simple & Beautiful</Text>

        {/* Glassmorphism Card */}
        <BlurView intensity={20} tint="light" style={styles.card}>
          <View style={styles.cardInner}>
            <Text style={styles.label}>Current Count</Text>
            <Animated.Text
              style={[
                styles.count,
                { transform: [{ scale: countScaleAnim }] }
              ]}
            >
              {count}
            </Animated.Text>
          </View>
        </BlurView>

        {/* Control Buttons */}
        <View style={styles.controls}>
          <Pressable
            onPress={() => setCount(count - 1)}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <LinearGradient
                colors={["#ff758c", "#ff7eb3"]}
                style={styles.btn}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.btnText}>−</Text>
              </LinearGradient>
            </Animated.View>
          </Pressable>

          <Pressable
            onPress={() => setCount(count + 1)}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <LinearGradient
                colors={["#4facfe", "#00f2fe"]}
                style={styles.btn}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.btnText}>+</Text>
              </LinearGradient>
            </Animated.View>
          </Pressable>
        </View>

        {/* Reset Button */}
        <Pressable onPress={() => setCount(0)} style={styles.resetContainer}>
          <LinearGradient
            colors={["#fa709a", "#fee140"]}
            style={styles.resetBtn}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.resetText}>↻ Reset Counter</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  circle: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  circle1: {
    width: 300,
    height: 300,
    top: -100,
    right: -100,
  },
  circle2: {
    width: 200,
    height: 200,
    bottom: 50,
    left: -50,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 50,
    opacity: 0.9,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  card: {
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  cardInner: {
    padding: 40,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
    minWidth: width * 0.7,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 10,
    opacity: 0.9,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  count: {
    fontSize: 96,
    fontWeight: "900",
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },
  controls: {
    flexDirection: "row",
    gap: 30,
    marginBottom: 40,
  },
  btn: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  btnText: {
    fontSize: 48,
    fontWeight: "900",
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  resetContainer: {
    width: "80%",
    maxWidth: 300,
  },
  resetBtn: {
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  resetText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
